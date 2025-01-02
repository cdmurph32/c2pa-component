export namespace CAI {
  export namespace types {
    import type { InputStream } from "./wasi-io-streams.js";
    export { InputStream };
    import type { OutputStream } from "./wasi-io-streams.js";
    export { OutputStream };
    import type { Descriptor } from "./wasi-filesystem-types.js";
    export { Descriptor };

    export type Error =
      | { kind: "assertion"; value: string }
      | { kind: "assertion-not-found"; value: string }
      | { kind: "bad-param"; value: string }
      | { kind: "decoding"; value: string }
      | { kind: "encoding"; value: string }
      | { kind: "file-not-found"; value: string }
      | { kind: "io"; value: string }
      | { kind: "json"; value: string }
      | { kind: "manifest"; value: string }
      | { kind: "manifest-not-found"; value: string }
      | { kind: "not-supported"; value: string }
      | { kind: "other"; value: string }
      | { kind: "remote-manifest"; value: string }
      | { kind: "resource-not-found"; value: string }
      | { kind: "rw-lock" }
      | { kind: "signature"; value: string }
      | { kind: "verify"; value: string };

    export type Input =
      | { kind: "file"; value: Descriptor }
      | { kind: "stream"; value: InputStream };

    export type Output =
      | { kind: "file"; value: Descriptor }
      | { kind: "stream"; value: OutputStream };
  }

  export namespace manifest {
    import Error = types.Error;
    import Input = types.Input;
    import Output = types.Output;
    import Input = types.InputStream;
    import Output = types.OutputStream;

    export type GetManifestStore = (
      buf: Uint8Array,
      mimeType: string,
      settings: string | null,
    ) => Promise<Result<Uint8Array, Error>>;

    export type GetManifestStoreFromManifestAndAsset = (
      manifestBuf: Uint8Array,
      assetBuf: Uint8Array,
      mimeType: string,
      settings: string | null,
    ) => Promise<Result<Uint8Array, Error>>;

    export interface Builder {
      addResource(uri: string, stream: Input): Promise<void>;
      setRemoteUrl(url: string): void;
      addIngredient(
        ingredientJson: string,
        format: string,
        stream: Input,
      ): Promise<void>;
      toArchive(stream: Output): Promise<void>;
    }

    export interface Reader {
      json(): string;
      resourceToStream(uri: string, stream: Output): Promise<number>;
    }

    export function fromArchive(stream: Input): Promise<Result<Builder, Error>>;
    export function fromStream(
      format: string,
      stream: Input,
    ): Promise<Result<Reader, Error>>;
    export function fromManifestDataAndStream(
      manifestData: Uint8Array,
      format: string,
      stream: Input,
    ): Promise<Result<Reader, Error>>;
  }
}

type Result<T, E> = { ok: T } | { err: E };
