/** @module Interface wasi:filesystem/preopens@0.2.4 **/
export function getDirectories(): Array<[Descriptor, string]>;
export type Descriptor = import('./wasi-filesystem-types.js').Descriptor;
