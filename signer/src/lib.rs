#![allow(unsafe_op_in_unsafe_fn)]
mod bindings {
    use crate::C2paSigner;

    wit_bindgen::generate!({
        world: "signer",
        with: {
            "wasi:clocks/wall-clock@0.2.3": generate,
            "wasi:io/streams@0.2.3": ::wasi::io::streams,
            "wasi:io/poll@0.2.3": ::wasi::io::poll,
            "wasi:io/error@0.2.3": ::wasi::io::error,
            "wasi:filesystem/types@0.2.3": ::wasi::filesystem::types,
        },
        path: "../wit",
    });

    export!(C2paSigner);
}

use bindings::adobe::cai::types::Error;
use bindings::exports::adobe::cai::c2pa_signer::Guest;
use ecdsa::signature::Signer;
use p256::{
    ecdsa::{Signature, SigningKey},
    pkcs8::DecodePrivateKey,
};

pub struct C2paSigner;

const PRIVATE_KEY: &str = include_str!("../../fixtures/certs/es256.pem");

impl Guest for C2paSigner {
    fn sign(data: Vec<u8>) -> Result<Vec<u8>, Error> {
        let private_key = SigningKey::from_pkcs8_pem(PRIVATE_KEY)
            .map_err(|e| Error::RawSigner(format!("Unable to read private key {}", e)))?;

        let signature: Signature = Signer::<Signature>::sign(&private_key, &data);
        Ok(signature.to_vec())
    }
}
