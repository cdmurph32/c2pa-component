mod bindings {
    wit_bindgen::generate!({
        world: "cai",
        with: {},
    });
}

use crate::bindings::exports::adobe::cai::{manifest::Guest, types::Error};
use c2pa::{settings, ManifestStore};

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
