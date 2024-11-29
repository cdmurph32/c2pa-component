mod bindings {
    use crate::Manifest;

    wit_bindgen::generate!({
        world: "cai",
        with: {
            "wasi:clocks/wall-clock@0.2.2": generate,
            "wasi:io/streams@0.2.2": ::wasi::io::streams,
            "wasi:io/poll@0.2.2": ::wasi::io::poll,
            "wasi:io/error@0.2.2": ::wasi::io::error,
            "wasi:filesystem/types@0.2.2": ::wasi::filesystem::types,
        },
        path: "../wit",
    });

    export!(Manifest);
}

use crate::bindings::exports::adobe::cai::{
    manifest::{Builder, Guest, GuestBuilder, GuestReader, Input, Output, Reader},
    types::Error,
};
use bindings::exports::adobe::cai::types::Descriptor;
use c2pa::{
    settings, Builder as C2paBuilder, Error as C2paError, ManifestStore, Reader as C2paReader,
};
use std::cell::RefCell;
use std::io::{Cursor, Read, Seek, SeekFrom, Write};

trait ReadWriteSeekSend: Read + Write + Seek + Send {}

impl<T: Read + Write + Seek + Send> ReadWriteSeekSend for T {}

pub struct Manifest;

impl Guest for Manifest {
    fn get_manifest_store(
        data: Vec<u8>,
        mime_type: String,
        settings: Option<String>,
    ) -> Result<Vec<u8>, Error> {
        let result = get_manifest_store_data(&data, &mime_type, settings.as_deref()).unwrap();
        Ok(serde_json::to_vec(&result).unwrap())
    }

    fn get_manifest_store_from_manifest_and_asset(
        manifest: Vec<u8>,
        asset: Vec<u8>,
        mime_type: String,
        settings: Option<String>,
    ) -> Result<Vec<u8>, Error> {
        let result = get_manifest_store_data_from_manifest_and_asset_bytes(
            &manifest,
            &mime_type,
            &asset,
            settings.as_deref(),
        )
        .unwrap();
        Ok(serde_json::to_vec(&result).unwrap())
    }

    type Builder = ComponentBuilder;
    type Reader = ComponentReader;
}

pub struct ComponentBuilder {
    builder: RefCell<C2paBuilder>,
}

impl GuestBuilder for ComponentBuilder {
    fn new(json: Option<String>) -> Self {
        Self {
            builder: match json {
                Some(json) => C2paBuilder::from_json(&json).unwrap().into(),
                None => C2paBuilder::new().into(),
            },
        }
    }

    fn add_resource(&self, uri: String, stream: Input) -> Result<(), Error> {
        let seekable_stream = seekable_input_stream(stream).unwrap();
        match self
            .builder
            .borrow_mut()
            .add_resource(&uri, seekable_stream)
        {
            Ok(_) => Ok(()),
            Err(e) => Err(e.into()),
        }
    }

    fn set_remote_url(&self, url: String) {
        self.builder.borrow_mut().set_remote_url(url);
    }

    fn add_ingredient(
        &self,
        ingredient_json: String,
        format: String,
        stream: Input,
    ) -> Result<(), Error> {
        let mut seekable_stream = seekable_input_stream(stream).unwrap();
        match self.builder.borrow_mut().add_ingredient_from_stream(
            &ingredient_json,
            &format,
            &mut seekable_stream,
        ) {
            Ok(_) => Ok(()),
            Err(e) => Err(e.into()),
        }
    }

    fn to_archive(&self, stream: Output) -> Result<(), Error> {
        match stream {
            Output::Stream(mut stream) => {
                let mut seekable_stream = Cursor::new(Vec::new());
                self.builder.borrow_mut().to_archive(&mut seekable_stream)?;
                seekable_stream.set_position(0); // Reset cursor to the beginning
                std::io::copy(&mut seekable_stream, &mut stream)
                    .map_err(|e| Error::Io(e.to_string()))?;
                Ok(())
            }
            Output::File(descriptor) => {
                let seekable_stream = SeekableDescriptor::new(descriptor);
                self.builder.borrow_mut().to_archive(seekable_stream)?;
                Ok(())
            }
        }
    }

    fn from_archive(stream: Input) -> Result<Builder, Error> {
        let seekable_stream = seekable_input_stream(stream).unwrap();
        let component_builder = ComponentBuilder {
            //TODO pass error
            builder: C2paBuilder::from_archive(seekable_stream).unwrap().into(),
        };
        Ok(Builder::new(component_builder))
    }
}

pub struct ComponentReader {
    reader: RefCell<C2paReader>,
}

impl GuestReader for ComponentReader {
    fn new(json: Option<String>) -> Self {
        Self {
            reader: match json {
                Some(json) => C2paReader::from_json(&json).unwrap().into(),
                None => C2paReader::default().into(),
            },
        }
    }

    fn from_stream(format: String, stream: Input) -> Result<Reader, Error> {
        let seekable_stream =
            seekable_input_stream(stream).map_err(|e| Error::Io(e.to_string()))?;
        Ok(Reader::new(ComponentReader {
            reader: C2paReader::from_stream(&format, seekable_stream)?.into(),
        }))
    }

    fn from_manifest_data_and_stream(
        manifest_bytes: Vec<u8>,
        format: String,
        stream: Input,
    ) -> Result<Reader, Error> {
        let seekable_stream = seekable_input_stream(stream).unwrap();
        //TODO pass error
        Ok(Reader::new(ComponentReader {
            reader: C2paReader::from_manifest_data_and_stream(
                &manifest_bytes,
                &format,
                seekable_stream,
            )
            .unwrap()
            .into(),
        }))
    }

    fn resource_to_stream(&self, uri: String, stream: Output) -> Result<u64, Error> {
        match stream {
            Output::Stream(mut stream) => {
                let mut seekable_stream = Cursor::new(Vec::new());
                self.reader
                    .borrow_mut()
                    .resource_to_stream(&uri, &mut seekable_stream)?;
                seekable_stream.set_position(0); // Reset cursor to the beginning
                let bytes_written = std::io::copy(&mut seekable_stream, &mut stream)
                    .map_err(|e| Error::Io(e.to_string()))?;
                Ok(bytes_written)
            }
            Output::File(descriptor) => {
                let mut seekable_stream = SeekableDescriptor::new(descriptor);
                let bytes_written = self
                    .reader
                    .borrow_mut()
                    .resource_to_stream(&uri, &mut seekable_stream)?;
                Ok(bytes_written as u64)
            }
        }
    }

    fn json(&self) -> String {
        self.reader.borrow_mut().json()
    }
}

pub fn get_manifest_store_data(
    data: &[u8],
    mime_type: &str,
    settings: Option<&str>,
) -> Result<ManifestStore, Error> {
    if let Some(settings) = settings {
        settings::load_settings_from_str(settings, "json").unwrap();
    }
    Ok(ManifestStore::from_bytes(mime_type, data, true).unwrap())
}

pub fn get_manifest_store_data_from_manifest_and_asset_bytes(
    manifest_bytes: &[u8],
    format: &str,
    asset_bytes: &[u8],
    settings: Option<&str>,
) -> Result<ManifestStore, Error> {
    if let Some(settings) = settings {
        settings::load_settings_from_str(settings, "json").unwrap();
    }
    Ok(ManifestStore::from_manifest_and_asset_bytes(manifest_bytes, format, asset_bytes).unwrap())
}

fn add_seek_to_read<R: Read>(mut reader: R) -> std::io::Result<Cursor<Vec<u8>>> {
    let mut buffer = Vec::new();
    reader.read_to_end(&mut buffer)?;
    Ok(Cursor::new(buffer))
}

struct SeekableDescriptor {
    descriptor: Descriptor,
    position: u64,
}

impl SeekableDescriptor {
    fn new(descriptor: Descriptor) -> Self {
        SeekableDescriptor {
            descriptor,
            position: 0,
        }
    }
}

impl Seek for SeekableDescriptor {
    fn seek(&mut self, pos: SeekFrom) -> std::io::Result<u64> {
        match pos {
            SeekFrom::Start(offset) => {
                self.position = offset;
            }
            SeekFrom::End(offset) => {
                // Assuming we have a way to get the file size
                let file_size = 100; // Placeholder for file size
                self.position = (file_size as i64 + offset) as u64;
            }
            SeekFrom::Current(offset) => {
                self.position = (self.position as i64 + offset) as u64;
            }
        }
        Ok(self.position)
    }
}

impl Read for SeekableDescriptor {
    fn read(&mut self, buf: &mut [u8]) -> std::io::Result<usize> {
        let length = buf.len() as u64;
        let (data, _) = self
            .descriptor
            .read(length, self.position)
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e.to_string()))?;
        let bytes_read = data.len();
        buf[..bytes_read].copy_from_slice(&data);
        self.position += bytes_read as u64;
        Ok(bytes_read)
    }
}

impl Write for SeekableDescriptor {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        let length = buf.len() as u64;
        self.descriptor
            .write(buf, self.position)
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e.to_string()))?;
        self.position += length;
        Ok(length as usize)
    }

    fn flush(&mut self) -> std::io::Result<()> {
        self.descriptor
            .sync()
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e.to_string()))?;
        Ok(())
    }
}

fn seekable_input_stream(input: Input) -> std::io::Result<Box<dyn ReadWriteSeekSend>> {
    match input {
        Input::Stream(mut stream) => {
            let mut buffer = Vec::new();
            stream.read_to_end(&mut buffer)?;
            Ok(Box::new(Cursor::new(buffer)))
        }
        Input::File(descriptor) => Ok(Box::new(SeekableDescriptor::new(descriptor))),
    }
}

//TODO: Add more error handling
impl From<C2paError> for Error {
    fn from(e: C2paError) -> Self {
        match e {
            C2paError::AssertionUnsupportedVersion => {
                Error::NotSupported("Unsupported assertion version".to_string())
            }
            C2paError::AssertionMissing { url } => {
                Error::AssertionNotFound(format!("Assertion missing, url {url}"))
            }
            C2paError::AssertionEncoding => Error::Assertion("Encode failed".to_string()),
            C2paError::AssertionDecoding(err) => Error::Assertion(format!("Decode failed {err}")),
            C2paError::OtherError(err) => Error::Other(err.to_string()),
            C2paError::UnsupportedType => {
                Error::NotSupported("File type is not supported".to_string())
            }
            _ => Error::Other(format!("Unknown error: {e}")),
        }
    }
}
