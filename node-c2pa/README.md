# C2PA Node Component

This folder contains a WebAssembly Javascript component that uses [`wasi:http`][wasi-http] for enabling HTTP handlers in Javascript.

It uses [`jco`](https://bytecodealliance.github.io/jco/) to:

- Generate a WebAssembly component (via `jco componentize`) that can be executed by a WebAssembly runtime (ex. [`wasmtime serve`](https://github.com/bytecodealliance/wasmtime))

* [nodejs](https://nodejs.org)
* [jco](https://bytecodealliance.github.io/jco/)
* [WebAssembly Compositions (WAC)](https://github.com/bytecodealliance/wac)
* [wasi-http](https://github.com/WebAssembly/wasi-http)
* [wasmtime](https://github.com/bytecodealliance/wasmtime)

## Build
Build using npm and create composition with WAC.
```
npm run compile
npm run build
```

## IDE Compatibility
Ensure typescript and typescript-language-server are globally installed
```
npm install -g typescript typescript-language-server
```
