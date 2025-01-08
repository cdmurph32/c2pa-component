export namespace AdobeCaiManifest {
  export function getManifestStore(buf: Uint8Array, mimeType: string, settings: string | undefined): Uint8Array;
  export function getManifestStoreFromManifestAndAsset(manifestBuf: Uint8Array, assetBuf: Uint8Array, mimeType: string, settings: string | undefined): Uint8Array;
  export { Builder };
  export { Reader };
}
import type { InputStream } from './wasi-io-streams.js';
export { InputStream };
import type { OutputStream } from './wasi-io-streams.js';
export { OutputStream };
import type { Error } from './adobe-cai-types.js';
export { Error };
import type { Input } from './adobe-cai-types.js';
export { Input };
import type { Output } from './adobe-cai-types.js';
export { Output };

export class Builder {
  constructor(json: string | undefined)
  addResource(uri: string, stream: Input): void;
  setRemoteUrl(url: string): void;
  addIngredient(ingredientJson: string, format: string, stream: Input): void;
  toArchive(stream: Output): void;
  static fromArchive(stream: Input): Builder;
}

export class Reader {
  constructor(json: string | undefined)
  static fromStream(format: string, stream: Input): Reader;
  static fromManifestDataAndStream(manifestData: Uint8Array, format: string, stream: Input): Reader;
  json(): string;
  resourceToStream(uri: string, stream: Output): bigint;
}
