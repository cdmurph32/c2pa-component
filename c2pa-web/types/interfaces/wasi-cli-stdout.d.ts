/** @module Interface wasi:cli/stdout@0.2.4 **/
export function getStdout(): OutputStream;
export type OutputStream = import('./wasi-io-streams.js').OutputStream;
