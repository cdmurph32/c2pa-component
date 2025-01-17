export namespace AdobeCaiManifest {
  export { Builder };
  export { Reader };
  export function getManifestStore(
    buf: Uint8Array,
    mimeType: string,
    settings: string | undefined,
  ): Uint8Array;
  export function getManifestStoreFromManifestAndAsset(
    manifestBuf: Uint8Array,
    assetBuf: Uint8Array,
    mimeType: string,
    settings: string | undefined,
  ): Uint8Array;
}
import type { InputStream } from "./adobe-cai-types.js";
export { InputStream };
import type { OutputStream } from "./adobe-cai-types.js";
export { OutputStream };
import type { Error } from "./adobe-cai-types.js";
export { Error };
import type { Input } from "./adobe-cai-types.js";
export { Input };
import type { Output } from "./adobe-cai-types.js";
export { Output };

export class Builder {
  constructor(json: string | undefined);
  addResource(uri: string, stream: Input): void;
  setRemoteUrl(url: string): void;
  addIngredient(ingredientJson: string, format: string, stream: Input): void;
  toArchive(stream: Output): void;
  static fromArchive(stream: Input): Builder;
}

export class Reader {
  constructor(json: string | undefined);
  static fromBuffer(format: string, buf: Uint8Array): Reader;
  static fromStream(format: string, stream: Input): Reader;
  static fromManifestDataAndStream(
    manifestData: Uint8Array,
    format: string,
    stream: Input,
  ): Reader;
  json(): string;
  resourceToStream(uri: string, stream: Output): bigint;
}
