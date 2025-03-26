mod bindings {
    use crate::Manifest;

    wit_bindgen::generate!({
        world: "cai",
        with: {
            "wasi:clocks/wall-clock@0.2.4": generate,
            "wasi:io/streams@0.2.4": ::wasi::io::streams,
            "wasi:io/poll@0.2.4": ::wasi::io::poll,
            "wasi:io/error@0.2.4": ::wasi::io::error,
            "wasi:filesystem/types@0.2.4": ::wasi::filesystem::types,
        },
        path: "../wit",


        additional_derives: [serde::Serialize, serde::Deserialize],
        additional_derives_ignore: ["output", "input"],
    });

    export!(Manifest);
}

use bindings::exports::adobe::cai::{
    c2pa::{Builder, Guest, GuestBuilder, GuestReader, Input, Output, Reader, SignerConfig},
    types::{AssertionType, Descriptor, Error, ManifestDefinition, SigningAlgorithm},
};
use c2pa::{Builder as C2paBuilder, Error as C2paError, Reader as C2paReader, Signer, SigningAlg};
use std::cell::RefCell;
use std::io::{Cursor, Read, Seek, SeekFrom, Write};
use std::path::Path;

trait ReadWriteSeekSend: Read + Write + Seek + Send {}

impl<T: Read + Write + Seek + Send> ReadWriteSeekSend for T {}

pub struct Manifest;

impl Guest for Manifest {
    fn format_from_path(path: String) -> Option<String> {
        c2pa::format_from_path(Path::new(&path))
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
        self.builder
            .borrow_mut()
            .add_resource(&uri, seekable_stream)?;
        Ok(())
    }

    fn set_remote_url(&self, url: String) {
        self.builder.borrow_mut().set_remote_url(url);
    }

    fn set_no_embed(&self, embed: bool) {
        self.builder.borrow_mut().set_no_embed(embed);
    }

    fn add_assertion(
        &self,
        label: String,
        assertion: String,
        kind: Option<AssertionType>,
    ) -> Result<(), Error> {
        if let Some(AssertionType::Json) = kind {
            self.builder
                .borrow_mut()
                .add_assertion_json(&label, &assertion)?;
        } else {
            self.builder
                .borrow_mut()
                .add_assertion(&label, &assertion)?;
        }
        Ok(())
    }

    fn add_ingredient(
        &self,
        ingredient_json: String,
        format: String,
        stream: Input,
    ) -> Result<(), Error> {
        let mut seekable_stream = seekable_input_stream(stream).unwrap();
        self.builder.borrow_mut().add_ingredient_from_stream(
            &ingredient_json,
            &format,
            &mut seekable_stream,
        )?;
        Ok(())
    }

    fn to_archive(&self, stream: Output) -> Result<(), Error> {
        let (mut output_stream, original_output_stream) = seekable_output_stream(stream)?;
        self.builder.borrow_mut().to_archive(&mut output_stream)?;
        if let Some(Output::Stream(mut original_stream)) = original_output_stream {
            output_stream.seek(std::io::SeekFrom::Start(0))?;
            std::io::copy(&mut output_stream, &mut original_stream)?;
        }
        Ok(())
    }

    fn from_archive(stream: Input) -> Result<Builder, Error> {
        let seekable_stream = seekable_input_stream(stream).unwrap();
        let component_builder = ComponentBuilder {
            builder: C2paBuilder::from_archive(seekable_stream)?.into(),
        };
        Ok(Builder::new(component_builder))
    }

    fn sign(
        &self,
        config: SignerConfig,
        format: String,
        source: Input,
        dest: Output,
    ) -> Result<Vec<u8>, Error> {
        let mut input_stream = seekable_input_stream(source)?;
        let (mut output_stream, original_output_stream) = seekable_output_stream(dest)?;
        let signer = C2paSignerBinding::new(config);
        let manifest = self.builder.borrow_mut().sign(
            &signer,
            &format,
            &mut input_stream,
            &mut output_stream,
        )?;
        if let Some(Output::Stream(mut original_stream)) = original_output_stream {
            output_stream.seek(std::io::SeekFrom::Start(0))?;
            std::io::copy(&mut output_stream, &mut original_stream)?;
        }
        Ok(manifest)
    }
}

struct C2paSignerBinding {
    config: SignerConfig,
}

impl C2paSignerBinding {
    fn new(config: SignerConfig) -> Self {
        Self { config }
    }
}

impl Signer for C2paSignerBinding {
    fn sign(&self, data: &[u8]) -> Result<Vec<u8>, c2pa::Error> {
        bindings::adobe::cai::c2pa_signer::sign(data)
            .map_err(|e| c2pa::Error::OtherError(Box::new(e)))
    }

    fn alg(&self) -> c2pa::SigningAlg {
        self.config.alg.into()
    }

    fn certs(&self) -> c2pa::Result<Vec<Vec<u8>>> {
        let pems = pem::parse_many(&self.config.sign_cert)
            .map_err(|e| c2pa::Error::OtherError(Box::new(e)))?;
        Ok(pems.into_iter().map(|p| p.into_contents()).collect())
    }

    fn reserve_size(&self) -> usize {
        self.config.reserve_size as usize
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

    fn from_buffer(format: String, buf: Vec<u8>) -> Result<Reader, Error> {
        let input_stream = Box::new(Cursor::new(buf));
        Ok(Reader::new(ComponentReader {
            reader: C2paReader::from_stream(&format, input_stream)
                .unwrap()
                .into(),
        }))
    }

    fn from_stream(format: String, stream: Input) -> Result<Reader, Error> {
        let input_stream = seekable_input_stream(stream)?;
        Ok(Reader::new(ComponentReader {
            reader: C2paReader::from_stream(&format, input_stream)?.into(),
        }))
    }

    fn from_manifest_data_and_stream(
        manifest_bytes: Vec<u8>,
        format: String,
        stream: Input,
    ) -> Result<Reader, Error> {
        let input_stream = seekable_input_stream(stream).unwrap();
        Ok(Reader::new(ComponentReader {
            reader: C2paReader::from_manifest_data_and_stream(
                &manifest_bytes,
                &format,
                input_stream,
            )?
            .into(),
        }))
    }

    fn resource_to_stream(&self, uri: String, output: Output) -> Result<u64, Error> {
        let (mut output_stream, original_output_stream) = seekable_output_stream(output)?;
        let bytes_written = self
            .reader
            .borrow_mut()
            .resource_to_stream(&uri, &mut *output_stream)?;
        // If we are writing to stream, copy the output to the given output stream.
        if let Some(Output::Stream(mut original_stream)) = original_output_stream {
            output_stream.seek(std::io::SeekFrom::Start(0))?;
            std::io::copy(&mut output_stream, &mut original_stream)?;
        }
        Ok(bytes_written as u64)
    }

    fn json(&self) -> String {
        self.reader.borrow_mut().json()
    }
    fn active_manifest(&self) -> Option<ManifestDefinition> {
        if let Some(active_manifest) = self.reader.borrow_mut().active_manifest() {
            // Convert from Manifest in the SDK to type defined in wit.
            // Serialize the active manifest to JSON
            let json = serde_json::to_string(&active_manifest).unwrap();
            // Deserialize the JSON back into ManifestDefinition
            let manifest_definition: ManifestDefinition = serde_json::from_str(&json).unwrap();
            Some(manifest_definition)
        } else {
            None
        }
    }
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

fn seekable_output_stream(
    output: Output,
) -> std::io::Result<(Box<dyn ReadWriteSeekSend>, Option<Output>)> {
    match output {
        Output::Stream(stream) => Ok((
            Box::new(Cursor::new(Vec::new())),
            Some(Output::Stream(stream)),
        )),
        Output::File(descriptor) => Ok((Box::new(SeekableDescriptor::new(descriptor)), None)),
    }
}

impl From<C2paError> for Error {
    fn from(e: C2paError) -> Self {
        match e {
            C2paError::AssertionUnsupportedVersion => {
                Error::NotSupported("Unsupported assertion version".to_string())
            }
            C2paError::AssertionMissing { url } => {
                Error::AssertionNotFound(format!("Assertion missing, url {url}"))
            }
            C2paError::AssertionEncoding(err) => Error::Assertion(err.to_string()),
            C2paError::AssertionDecoding(err) => Error::Assertion(format!("Decode failed {err}")),
            C2paError::OtherError(err) => Error::Other(err.to_string()),
            C2paError::UnsupportedType => {
                Error::NotSupported("File type is not supported".to_string())
            }
            _ => Error::Other(format!("Unknown error: {e}")),
        }
    }
}

impl From<std::io::Error> for Error {
    fn from(e: std::io::Error) -> Self {
        Error::Io(e.to_string())
    }
}

impl From<SigningAlgorithm> for SigningAlg {
    fn from(algorithm: SigningAlgorithm) -> Self {
        match algorithm {
            SigningAlgorithm::Ps256 => SigningAlg::Ps256,
            SigningAlgorithm::Ps384 => SigningAlg::Ps384,
            SigningAlgorithm::Ps512 => SigningAlg::Ps512,
            SigningAlgorithm::Ed25519 => SigningAlg::Ed25519,
            SigningAlgorithm::Es256 => SigningAlg::Es256,
            SigningAlgorithm::Es384 => SigningAlg::Es384,
        }
    }
}
