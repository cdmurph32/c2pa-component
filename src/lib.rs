mod bindings {
    wit_bindgen::generate!({
        world: "cai",
        with: {
            "wasi:io/streams@0.2.2": ::wasi::io::streams,
            "wasi:io/poll@0.2.2": ::wasi::io::poll,
            "wasi:io/error@0.2.2": ::wasi::io::error,
        }
    });
}

use crate::bindings::exports::adobe::cai::{reader::Guest, types::Error};
use std::io::{self, Cursor, Read};

pub struct Reader;

impl Guest for Reader {
    fn from_stream(
        format: String,
        stream: wasi::io::streams::InputStream,
    ) -> Result<String, Error> {
        let mut stream = add_seek_to_read(stream).unwrap();
        let reader = match c2pa::Reader::from_stream(&format, &mut stream) {
            Ok(reader) => reader,
            Err(e) => return Err(Error::Other(e.to_string())),
        };
        let json = reader.to_string();
        Ok(json)
    }

    fn from_manifest_data_and_stream(
        manifest_data: Vec<u8>,
        format: String,
        stream: wasi::io::streams::InputStream,
    ) -> Result<String, Error> {
        let mut stream = add_seek_to_read(stream).unwrap();
        let reader =
            match c2pa::Reader::from_manifest_data_and_stream(&manifest_data, &format, &mut stream)
            {
                Ok(reader) => reader,
                Err(e) => return Err(Error::Other(e.to_string())),
            };
        let json = reader.to_string();
        Ok(json)
    }
    /*
        // uniffi doesn't allow mutable parameters, so we we use an adapter
        let reader = c2pa::Reader::from_stream(format, &mut stream)?;
        let json = reader.to_string();
        if let Ok(mut st) = self.reader.try_write() {
            *st = reader;
        } else {
            return Err(Error::RwLock);
        };
        Ok(json)
    }

    fn from_manifest_data_and_stream() {
        panic!("Not implemented");
    }

    fn json(&self) -> Result<String> {
        if let Ok(st) = self.reader.try_read() {
            Ok(st.json())
        } else {
            Err(Error::RwLock)
        }
    }
    */
}
fn add_seek_to_read<R: Read>(mut reader: R) -> io::Result<Cursor<Vec<u8>>> {
    let mut buffer = Vec::new();
    reader.read_to_end(&mut buffer)?;
    Ok(Cursor::new(buffer))
}
