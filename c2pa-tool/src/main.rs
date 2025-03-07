mod bindings {
    wit_bindgen::generate!({
        world: "c2pa-tool",
        with: {
            "wasi:clocks/wall-clock@0.2.2": generate,
            "wasi:io/streams@0.2.2": ::wasi::io::streams,
            "wasi:io/poll@0.2.2": ::wasi::io::poll,
            "wasi:io/error@0.2.2": ::wasi::io::error,
            "wasi:filesystem/types@0.2.2": ::wasi::filesystem::types,
            "adobe:cai/c2pa@0.1.0": generate,
            "adobe:cai/types@0.1.0": generate,
        },
        path: "../wit",
    });
}

use crate::bindings::adobe::cai::c2pa::{Builder, Input, Reader, SignerConfig};
use anyhow::{anyhow, Context, Result};
use clap::Parser;
use std::io::Read;
use std::path::{Path, PathBuf};
use wasi::filesystem::preopens::get_directories;
use wasi::filesystem::types::{Descriptor, DescriptorFlags, OpenFlags, PathFlags};
use wasi::io::streams::{InputStream, StreamError};

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    file: PathBuf,

    /// Path to manifest definition JSON file.
    #[clap(short, long, requires = "output")]
    manifest: Option<PathBuf>,

    /// Path to output file or folder.
    #[clap(short, long)]
    output: PathBuf,

    /// Manifest definition passed as a JSON string.
    #[clap(short, long, conflicts_with = "manifest")]
    config: Option<String>,
}

fn main() -> Result<()> {
    let args = Args::parse();
    let file_path = Path::new(&args.file);

    let file = open_file(file_path, OpenFlags::empty(), DescriptorFlags::READ)?;
    let reader = Reader::from_stream("image/jpeg", Input::File(file))
        .context("Failed to read manifest from stream")?;

    if args.manifest.is_some() || args.config.is_some() {
        // read the json from file or config, and get base path if from file
        let (json, base_path) = match args.manifest.as_deref() {
            Some(manifest_path) => {
                let base_path = std::fs::canonicalize(manifest_path)?
                    .parent()
                    .map(|p| p.to_path_buf());
                (std::fs::read_to_string(manifest_path)?, base_path)
            }
            None => (
                args.config.unwrap_or_default(),
                std::env::current_dir().ok(),
            ),
        };
        let mut sign_config = SignerConfig::from_json(&json)?;
        let manifest_def = serde_json::from_slice(json.as_bytes())?;
        let mut builder = Builder::new(Some(&json));
        let mut manifest = manifest_def.manifest;
    }

    eprintln!("{}", reader.json());
    Ok(())
}

impl SignerConfig {
    pub fn from_json(json: &str) -> Result<Self> {
        serde_json::from_str(json).context("reading manifest configuration")
    }
}

fn get_dir(path: impl AsRef<Path>) -> Result<Descriptor> {
    get_directories()
        .into_iter()
        .find_map(|(dir, dir_path)| {
            (<std::string::String as std::convert::AsRef<Path>>::as_ref(&dir_path) == path.as_ref())
                .then_some(dir)
        })
        .ok_or_else(|| anyhow!("Could not find directory {}", path.as_ref().display()))
}

/// Opens the given file. This should be the canonicalized path to the file.
pub(crate) fn open_file(
    path: impl AsRef<Path>,
    open_flags: OpenFlags,
    descriptor_flags: DescriptorFlags,
) -> Result<Descriptor> {
    let dir = path
        .as_ref()
        .parent()
        // I mean, if someone passed a path that is at the root, that probably wasn't a good idea
        .ok_or_else(|| {
            anyhow!(
                "Could not find parent directory of {}",
                path.as_ref().display()
            )
        })?;
    let dir = get_dir(dir)?;
    dir.open_at(
        PathFlags::empty(),
        path.as_ref()
            .file_name()
            .ok_or_else(|| anyhow!("Path did not have a file name: {}", path.as_ref().display()))?
            .to_str()
            .ok_or_else(|| anyhow!("Path is not a valid string"))?,
        open_flags,
        descriptor_flags,
    )
    .map_err(|e| anyhow!("Failed to open file {}: {}", path.as_ref().display(), e))
}

#[allow(dead_code)]
fn read_file(dir: Descriptor) -> Result<Vec<u8>> {
    let mut body = dir
        .read_via_stream(0)
        .map_err(|e| anyhow!("Failed to read file: {}", e))?;
    let mut buf = vec![];
    InputStreamReader::from(&mut body)
        .read_to_end(&mut buf)
        .map_err(|e| anyhow!("Failed to read file: {}", e))?;
    Ok(buf)
}

// Helpers for reading from streams.
pub struct InputStreamReader<'a> {
    stream: &'a mut InputStream,
}

impl<'a> From<&'a mut InputStream> for InputStreamReader<'a> {
    fn from(stream: &'a mut InputStream) -> Self {
        Self { stream }
    }
}

impl std::io::Read for InputStreamReader<'_> {
    fn read(&mut self, buf: &mut [u8]) -> std::io::Result<usize> {
        use std::io;
        use StreamError;

        let n = buf
            .len()
            .try_into()
            .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
        match self.stream.blocking_read(n) {
            Ok(chunk) => {
                let n = chunk.len();
                if n > buf.len() {
                    return Err(io::Error::new(
                        io::ErrorKind::Other,
                        "more bytes read than requested",
                    ));
                }
                buf[..n].copy_from_slice(&chunk);
                Ok(n)
            }
            Err(StreamError::Closed) => Ok(0),
            Err(StreamError::LastOperationFailed(e)) => {
                Err(io::Error::new(io::ErrorKind::Other, e.to_debug_string()))
            }
        }
    }
}
