# C2PA Node Component

This folder contains a WebAssembly Javascript component that uses [`wasi:http`][wasi-http] for enabling HTTP handlers in Node JS.

It was created with jco using the types from the `c2pa-node` world in `cai.wit`.
`jco types wit -n c2pa-node -o node-c2pa/types`

* [nodejs](https://nodejs.org)
* [jco](https://bytecodealliance.github.io/jco/)
* [WebAssembly Compositions (WAC)](https://github.com/bytecodealliance/wac)
* [wasi-http](https://github.com/WebAssembly/wasi-http)
* [wasmtime](https://github.com/bytecodealliance/wasmtime)

## Type Generation
JCO generates TS type, as follows when run in the project root directory.
```
jco types wit -n c2pa-webserver -o node-c2pa/types
```

Due to the overloading of the type `InputStream`, these types need to be manually adjusted. This will now longer be required with WASI 0.3, as `InputStream` and `OutputStream` will both be `Stream`.

## Build
Build using npm and create composition with WAC.
```
pnpm install
npm run all
```

## IDE Compatibility
Ensure typescript and typescript-language-server are globally installed
```
npm install -g typescript typescript-language-server
```
