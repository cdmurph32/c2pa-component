mod bindings {
    wit_bindgen::generate!({
        world: "c2pa-tool",
        with: {
            "wasi:io/streams@0.2.2": ::wasi::io::streams,
            "wasi:io/poll@0.2.2": ::wasi::io::poll,
            "wasi:io/error@0.2.2": ::wasi::io::error,
            "adobe:cai/manifest@0.1.0": generate,
            "adobe:cai/types@0.1.0": generate,
        },
        path: "../wit",
    });
}

use crate::bindings::adobe::cai::manifest::Reader;
use anyhow::Result;
use clap::Parser;
use wasi::filesystem::types::{DescriptorFlags, OpenFlags, PathFlags};

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    #[arg(short, long)]
    file: String,
}

fn main() -> Result<()> {
    let args = Args::parse();
    let file_name = args.file;

    let files = wasi::filesystem::preopens::get_directories();
    files
        .into_iter()
        .filter(|file| file.1 == file_name)
        .for_each(|file| {
            let descriptor = file
                .0
                .open_at(
                    PathFlags::SYMLINK_FOLLOW,
                    &file.1,
                    OpenFlags::EXCLUSIVE,
                    DescriptorFlags::READ,
                )
                .unwrap();
            let stats = descriptor.stat().unwrap();
            let stream = descriptor.read_via_stream(stats.size).unwrap();
            let reader = Reader::from_stream("jpeg", stream).unwrap();

            println!("{}", reader.json());
        });
    Ok(())
}
