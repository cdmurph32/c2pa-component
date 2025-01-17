# C2PA Web

This folder contains a WebAssembly Javascript project that uses the component of the world `cai`.

It was created with jco by transpiling the `cai` component into JS.
`jco transpile target/wasm32-wasip2/debug/c2pacomponent.wasm -o c2pa-web/types`

* [http-server](https://www.npmjs.com/package/http-server)
* [jco](https://bytecodealliance.github.io/jco/)

## Build
Build using npm and serve with http-server

```
npm run bundle
npm run compile
http-server
```

## IDE Compatibility
Ensure typescript and typescript-language-server are globally installed
To run the project locally, install http-server.
```
npm install -g typescript typescript-language-server http-server
```
