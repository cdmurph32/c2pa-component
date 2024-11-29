# C2PA Compoent

## Build Prerequisites
* [WASI SDK](https://github.com/WebAssembly/wasi-sdk) installed.
* Rust Nightly with wasm32-wasip2 target

To build both the component and the c2pa-tool example run the following:
```
export WASI_SDK_PATH=/opt/wasi-sdk CC=/opt/wasi-sdk/bin/clang
cargo +nightly build --target wasm32-wasip2 && wac plug target/wasm32-wasip2/debug/c2pa-tool.wasm --plug target/wasm32-wasip2/debug/c2pacomponent.wasm -o example.wasm
```

Run the example with
```
wasmtime -S common --dir . ./example.wasm -- ./image_with_c2pa_data.jpg
```
