/** @module Interface adobe:cai/c2pa@0.1.0 **/
export function formatFromPath(path: string): string | undefined;
export type InputStream = import('./wasi-io-streams.js').InputStream;
export type OutputStream = import('./wasi-io-streams.js').OutputStream;
export type AssertionType = import('./adobe-cai-types.js').AssertionType;
export type Error = import('./adobe-cai-types.js').Error;
export type Input = import('./adobe-cai-types.js').Input;
export type ManifestDefinition = import('./adobe-cai-types.js').ManifestDefinition;
export type Output = import('./adobe-cai-types.js').Output;
export type SignerConfig = import('./adobe-cai-types.js').SignerConfig;
export type SigningAlgorithm = import('./adobe-cai-types.js').SigningAlgorithm;

export class Builder {
  constructor(json: string | undefined)
  setRemoteUrl(url: string): void;
  setNoEmbed(embed: boolean): void;
  addAssertion(label: string, assertion: string, kind: AssertionType | undefined): void;
  addIngredient(ingredientJson: string, format: string, stream: Input): void;
  addResource(uri: string, stream: Input): void;
  toArchive(stream: Output): void;
  static fromArchive(stream: Input): Builder;
  sign(config: SignerConfig, format: string, source: Input, dest: Output): Uint8Array;
}

export class Reader {
  constructor(json: string | undefined)
  static fromBuffer(format: string, buf: Uint8Array): Reader;
  static fromStream(format: string, stream: Input): Reader;
  static fromManifestDataAndStream(manifestData: Uint8Array, format: string, stream: Input): Reader;
  json(): string;
  resourceToStream(uri: string, stream: Output): bigint;
  activeManifest(): ManifestDefinition | undefined;
}
