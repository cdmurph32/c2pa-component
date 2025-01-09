import {
  Fields,
  IncomingRequest,
  OutgoingBody,
  OutgoingResponse,
  ResponseOutparam,
} from "wasi:http/types@0.2.2";

import { Reader, InputStream } from "adobe:cai/manifest@0.1.0";

/**
 * This export represents the `wasi:http/incoming-handler` interface,
 * which describes implementing a HTTP handler in WebAssembly using WASI types.
 */
export const incomingHandler = {
  handle(
    incomingRequest: IncomingRequest,
    _responseOutparam: ResponseOutparam,
  ) {
    // Start building an outgoing response
    const outgoingResponse = new OutgoingResponse(new Fields());
    if (incomingRequest.method().tag !== "post") {
      outgoingResponse.setStatusCode(405);
    } else {
      const contentLengthHeader = incomingRequest
        .headers()
        .get("content-length");
      if (contentLengthHeader === undefined) {
        outgoingResponse.setStatusCode(400);
        ResponseOutparam.set(outgoingResponse, {
          tag: "ok",
          val: outgoingResponse,
        });
        return;
      }
      const contentLength = asciiArraysToNumber(contentLengthHeader);
      console.log(`contentLength: ${contentLength}`);
      // Pass the data stream to the C2PA reader.
      const bodyStream = incomingRequest.consume().stream();
      const input: InputStream = { tag: "stream", val: bodyStream };
      const reader = Reader.fromStream("image/jpeg", input);

      // Access the outgoing response body
      let outgoingBody = outgoingResponse.body();
      {
        // Create a stream for the response body
        let outputStream = outgoingBody.write();
        // Write hello world to the response stream
        outputStream.blockingWriteAndFlush(
          new Uint8Array(new TextEncoder().encode(reader.json())),
        );
        // @ts-ignore: This is required in order to dispose the stream before we return
        outputStream[Symbol.dispose]();
      }

      // Set the status code for the response
      outgoingResponse.setStatusCode(200);
      // Finish the response body
      OutgoingBody.finish(outgoingBody, undefined);
    }
    // Set the created response to an "OK" Result<T> value
    ResponseOutparam.set(outgoingResponse, {
      tag: "ok",
      val: outgoingResponse,
    });
  },
};

function asciiArraysToNumber(uint8Arrays: Uint8Array[]): BigInt {
  const uint8Array = concatUint8Arrays(uint8Arrays);
  return uint8Array.reduce((acc, byte) => {
    return acc * 10n + BigInt(byte - 48);
  }, 0n);
}

function concatUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
