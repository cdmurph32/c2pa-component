# C2PA Component

## Build Prerequisites
* [WASI SDK](https://github.com/WebAssembly/wasi-sdk) installed.
* [WebAssembly Compositions (WAC)](https://github.com/bytecodealliance/wac)
* [wasmtime](https://github.com/bytecodealliance/wasmtime)
* Rust Nightly with wasm32-wasip2 target

## Build
To build both the component and the c2pa-tool example run the following:
```
export WASI_SDK_PATH=/opt/wasi-sdk CC=/opt/wasi-sdk/bin/clang
cargo +nightly build --target wasm32-wasip2 && wac plug target/wasm32-wasip2/debug/c2pa_component.wasm --plug target/wasm32-wasip2/debug/signer.wasm -o c2pa_component.wasm && wac plug target/wasm32-wasip2/debug/c2pa-tool.wasm --plug c2pa_component.wasm -o c2pa-tool.wasm
```

Run the manifest read example with
```
wasmtime -S common --dir . ./c2pa-tool.wasm -- fixtures/CA.jpg 
```
Run the building and signing example with
```
wasmtime -S cli -S http --dir . --dir signer --dir fixtures c2pa-tool.wasm fixtures/CA.jpg --config signer/signer_config.json --manifest fixtures/manifest_data.json --output ./CA_signer.jpeg
```
