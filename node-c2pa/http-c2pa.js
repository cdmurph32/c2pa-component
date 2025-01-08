import {
  OutgoingBody,
  OutgoingResponse,
  Fields,
  ResponseOutparam,
} from 'wasi:http/types@0.2.2';

import {
  Reader,
} from 'adobe:cai/manifest@0.1.0';

/**
 * This export represents the `wasi:http/incoming-handler` interface,
 * which describes implementing a HTTP handler in WebAssembly using WASI types.
 */
export const incomingHandler = {
  /**
   * This Javascript will be turned into a WebAssembly component by `jco` and turned into a
   * WebAssembly binary with a single export (this `handler` function).
   *
   * The exported `handle` method is part of the `wasi:http/incoming-handler` interface,
   * which defines how to handle incoming web requests, turning this component into one that can
   * serve web requests.
   */
  handle(incomingRequest, _responseOutparam) {
    const contentLengthHeader = incomingRequest.headers().get('content-length');
    console.log(`contentLengthHeader: ${contentLengthHeader}`);
    const contentLength = asciiArrayToNumber(contentLengthHeader);
    console.log(`contentLength: ${contentLength}`);
    const bodyStream = incomingRequest.consume().stream();
    const input = { tag: "stream", val: bodyStream };
    const reader = Reader.fromStream("image/jpeg", input);

    // Start building an outgoing response
    const outgoingResponse = new OutgoingResponse(new Fields());

    // Access the outgoing response body
    let outgoingBody = outgoingResponse.body();
    {
      // Create a stream for the response body
      let outputStream = outgoingBody.write();
      // Write hello world to the response stream
      outputStream.blockingWriteAndFlush(
        new Uint8Array(new TextEncoder().encode(reader.json()))
      );
      // @ts-ignore: This is required in order to dispose the stream before we return
      outputStream[Symbol.dispose]();
    }

    // Set the status code for the response
    outgoingResponse.setStatusCode(200);
    // Finish the response body
    OutgoingBody.finish(outgoingBody, undefined);
    // Set the created response to an "OK" Result<T> value
    ResponseOutparam.set(outgoingResponse, { tag: 'ok', val: outgoingResponse });
  }

};

function asciiArrayToNumber(uint8Arrays) {
  const uint8Array = concatUint8Arrays(uint8Arrays);
  return uint8Array.reduce((acc, byte) => {
    return acc * 10n + BigInt(byte - 48);
  }, 0n);
}

function concatUint8Arrays(arrays) {
  const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
