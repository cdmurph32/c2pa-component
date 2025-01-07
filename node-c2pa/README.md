# C2PA Node Component

This folder contains a WebAssembly Javascript component that uses [`wasi:http`][wasi-http] for enabling HTTP handlers in Javascript.

It uses [`jco`][jco] to:

- Generate a WebAssembly component (via `jco componentize`) that can be executed by a WebAssembly runtime (ex. [`wasmtime serve`][wasmtime])

* [nodejs](https://nodejs.org)
* [jco](https://bytecodealliance.github.io/jco/)
* [WebAssembly Compositions (WAC)](https://github.com/bytecodealliance/wac)
* [wasi-http](https://github.com/WebAssembly/wasi-http)
* [wasmtime](https://github.com/bytecodealliance/wasmtime)

## Build
Build using npm and create composition with WAC.
```
npm run build
wac plug c2pa-node.wasm --plug ../target/wasm32-wasip2/debug/c2pacomponent.wasm -o c2pa-node-fused.wasm
```
