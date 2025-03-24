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
        additional_derives: [serde::Serialize, serde::Deserialize],
        additional_derives_ignore: ["output", "input"],
    });
}

use crate::bindings::adobe::cai::{
    c2pa::{format_from_path, Builder, Input, ManifestDefinition, Output, Reader, SignerConfig},
    types::SigningAlgorithm,
};
use anyhow::{anyhow, Context, Result};
use base64::prelude::*;
use clap::Parser;
use serde::Deserialize;
use std::io::Read;
use std::path::{Path, PathBuf};
use wasi::cli::stdout::get_stdout;
use wasi::filesystem::preopens::get_directories;
use wasi::filesystem::types::{Descriptor, DescriptorFlags, OpenFlags, PathFlags};
use wasi::io::streams::{InputStream, StreamError};

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    file: PathBuf,

    /// Path to manifest definition JSON file.
    #[clap(short, long, requires = "config")]
    manifest: Option<PathBuf>,

    /// Path to output file or folder.
    #[clap(short, long)]
    output: Option<PathBuf>,

    /// Manifest definition passed as a JSON string.
    #[clap(short, long)]
    config: Option<PathBuf>,
}

fn main() -> Result<()> {
    let args = Args::parse();
    let file_path = Path::new(&args.file);

    let file = open_file(file_path, OpenFlags::empty(), DescriptorFlags::READ)?;

    if args.manifest.is_some() {
        // read the json from file or config, and get base path if from file
        let manifest_json = args
            .manifest
            .as_deref()
            .ok_or(anyhow!("Manifest path is missing"))
            .and_then(|manifest_path| {
                open_file(manifest_path, OpenFlags::empty(), DescriptorFlags::READ)
            })
            .and_then(read_file_to_string)?;
        let sign_config: SignerConfig = args
            .config
            .as_deref()
            .ok_or(anyhow!("Config path is missing"))
            .and_then(|config_path| {
                open_file(config_path, OpenFlags::empty(), DescriptorFlags::READ)
            })
            .and_then(read_file_to_string)
            .and_then(|json| {
                let signer_config: SignerConfigFile =
                    serde_json::from_str(&json).map_err(|e| anyhow!(e))?;
                signer_config.try_into()
            })?;
        let format = format_from_path(args.file.to_str().ok_or(anyhow!("Invalid file path"))?)
            .ok_or(anyhow!("Could not determine format"))?;
        let output = match args.output {
            Some(output) => {
                let output_file = open_file(&output, OpenFlags::CREATE, DescriptorFlags::WRITE)?;
                Output::File(output_file)
            }
            // If no output is specified, then write to STDOUT
            None => Output::Stream(get_stdout()),
        };
        let builder = Builder::new(Some(&manifest_json));
        builder.sign(&sign_config, &format, Input::File(file), output)?;
    } else {
        let reader = Reader::from_stream("image/jpeg", Input::File(file))
            .context("Failed to read manifest from stream")?;
        println!("{}", reader.json());
    }
    Ok(())
}

#[derive(serde::Deserialize)]
struct SignerConfigFile {
    pub alg: SigningAlgorithm,
    pub cert_base64: String,
    pub reserve_size: u64,
    pub ts_url: Option<String>,
}

impl TryFrom<SignerConfigFile> for SignerConfig {
    type Error = anyhow::Error;

    fn try_from(config_file: SignerConfigFile) -> Result<Self, Self::Error> {
        let sign_cert = BASE64_STANDARD
            .decode(&config_file.cert_base64)
            .map_err(|e| anyhow!("Failed to decode cert base64: {}", e))?;
        let alg = config_file.alg;
        let reserve_size = config_file.reserve_size;
        let ts_url = config_file.ts_url;

        Ok(SignerConfig {
            alg,
            sign_cert,
            reserve_size,
            ts_url,
        })
    }
}

#[allow(dead_code)]
#[derive(Deserialize)]
struct ManifestFile {
    manifest: ManifestDefinition,
    ingredients: Option<Vec<String>>,
}

#[allow(dead_code)]
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

fn read_file_to_string(dir: Descriptor) -> Result<String, anyhow::Error> {
    let mut body = dir
        .read_via_stream(0)
        .map_err(|e| anyhow!("Failed to read file: {}", e))?;
    let mut buf = String::new();
    InputStreamReader::from(&mut body)
        .read_to_string(&mut buf)
        .map_err(|e| anyhow!("Failed to read file to string: {}", e))?;
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
