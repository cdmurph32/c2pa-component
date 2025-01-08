export namespace AdobeCaiTypes {}
import type { InputStream as WasiInputStream } from "./wasi-io-streams.js";
export { WasiInputStream };
import type { OutputStream as WasiOutputStream } from "./wasi-io-streams.js";
export { WasiOutputStream };
import type { Descriptor } from "./wasi-filesystem-types.js";
export { Descriptor };
export type Error =
  | ErrorAssertion
  | ErrorAssertionNotFound
  | ErrorBadParam
  | ErrorDecoding
  | ErrorEncoding
  | ErrorFileNotFound
  | ErrorIo
  | ErrorJson
  | ErrorManifest
  | ErrorManifestNotFound
  | ErrorNotSupported
  | ErrorOther
  | ErrorRemoteManifest
  | ErrorResourceNotFound
  | ErrorRwLock
  | ErrorSignature
  | ErrorVerify;
export interface ErrorAssertion {
  tag: "assertion";
  val: string;
}
export interface ErrorAssertionNotFound {
  tag: "assertion-not-found";
  val: string;
}
export interface ErrorBadParam {
  tag: "bad-param";
  val: string;
}
export interface ErrorDecoding {
  tag: "decoding";
  val: string;
}
export interface ErrorEncoding {
  tag: "encoding";
  val: string;
}
export interface ErrorFileNotFound {
  tag: "file-not-found";
  val: string;
}
export interface ErrorIo {
  tag: "io";
  val: string;
}
export interface ErrorJson {
  tag: "json";
  val: string;
}
export interface ErrorManifest {
  tag: "manifest";
  val: string;
}
export interface ErrorManifestNotFound {
  tag: "manifest-not-found";
  val: string;
}
export interface ErrorNotSupported {
  tag: "not-supported";
  val: string;
}
export interface ErrorOther {
  tag: "other";
  val: string;
}
export interface ErrorRemoteManifest {
  tag: "remote-manifest";
  val: string;
}
export interface ErrorResourceNotFound {
  tag: "resource-not-found";
  val: string;
}
export interface ErrorRwLock {
  tag: "rw-lock";
}
export interface ErrorSignature {
  tag: "signature";
  val: string;
}
export interface ErrorVerify {
  tag: "verify";
  val: string;
}
export type Input = InputFile | InputStream;
export interface InputFile {
  tag: "file";
  val: Descriptor;
}
export interface InputStream {
  tag: "stream";
  val: WasiInputStream;
}
export type Output = OutputFile | OutputStream;
export interface OutputFile {
  tag: "file";
  val: Descriptor;
}
export interface OutputStream {
  tag: "stream";
  val: WasiOutputStream;
}
