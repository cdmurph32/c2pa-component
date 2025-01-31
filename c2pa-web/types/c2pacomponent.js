import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { monotonicClock, wallClock } from '@bytecodealliance/preview2-shim/clocks';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, poll, streams } from '@bytecodealliance/preview2-shim/io';
import { random } from '@bytecodealliance/preview2-shim/random';
const { getEnvironment } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { TerminalInput } = terminalInput;
const { TerminalOutput } = terminalOutput;
const { getTerminalStderr } = terminalStderr;
const { getTerminalStdin } = terminalStdin;
const { getTerminalStdout } = terminalStdout;
const { now } = monotonicClock;
const { now: now$1 } = wallClock;
const { getDirectories } = preopens;
const { Descriptor,
  filesystemErrorCode } = types;
const { Error: Error$1 } = error;
const { Pollable } = poll;
const { InputStream,
  OutputStream } = streams;
const { getRandomBytes,
  getRandomU64 } = random;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let curResourceBorrows = [];

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const emptyFunc = () => {};

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('node:fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function finalizationRegistryCreate (unregister) {
  if (typeof FinalizationRegistry === 'undefined') {
    return { unregister () {} };
  }
  return new FinalizationRegistry(unregister);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}

const handleTables = [];

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const T_FLAG = 1 << 30;

function rscTableCreateOwn (table, rep) {
  const free = table[0] & ~T_FLAG;
  if (free === 0) {
    table.push(0);
    table.push(rep | T_FLAG);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep | T_FLAG;
  return free;
}

function rscTableRemove (table, handle) {
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep = val & ~T_FLAG;
  if (val === 0 || (scope & T_FLAG) !== 0) throw new TypeError('Invalid handle');
  table[handle << 1] = table[0] | T_FLAG;
  table[0] = handle | T_FLAG;
  return { rep, scope, own };
}

const symbolCabiDispose = Symbol.for('cabiDispose');

const symbolRscHandle = Symbol('handle');

const symbolRscRep = Symbol.for('cabiRep');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let buf = utf8Encoder.encode(s);
  let ptr = realloc(0, 0, 1, buf.length);
  new Uint8Array(memory.buffer).set(buf, ptr);
  utf8EncodedLen = buf.length;
  return ptr;
}


let exports0;
const handleTable3 = [T_FLAG, 0];
const captureTable3= new Map();
let captureCnt3 = 0;
handleTables[3] = handleTable3;
const handleTable0 = [T_FLAG, 0];
const captureTable0= new Map();
let captureCnt0 = 0;
handleTables[0] = handleTable0;

function trampoline8(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt0;
    captureTable0.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable0, rep);
  }
  return handle3;
}

function trampoline9(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Pollable.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  rsc0.block();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
}

function trampoline11() {
  const ret = getRandomU64();
  return toUint64(ret);
}
let exports1;

function trampoline16() {
  const ret = now();
  return toUint64(ret);
}

function trampoline18() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable3, rep);
  }
  return handle0;
}
const handleTable2 = [T_FLAG, 0];
const captureTable2= new Map();
let captureCnt2 = 0;
handleTables[2] = handleTable2;

function trampoline21() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep);
  }
  return handle0;
}

function trampoline22() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable3, rep);
  }
  return handle0;
}

function trampoline23(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}
let exports2;
let memory0;
let realloc0;
let realloc1;
const handleTable6 = [T_FLAG, 0];
const captureTable6= new Map();
let captureCnt6 = 0;
handleTables[6] = handleTable6;

function trampoline24(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.read(BigInt.asUintN(64, arg1), BigInt.asUintN(64, arg2))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      var [tuple3_0, tuple3_1] = e;
      var val4 = tuple3_0;
      var len4 = val4.byteLength;
      var ptr4 = realloc0(0, 0, 1, len4 * 1);
      var src4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, len4 * 1);
      (new Uint8Array(memory0.buffer, ptr4, len4 * 1)).set(src4);
      dataView(memory0).setInt32(arg3 + 8, len4, true);
      dataView(memory0).setInt32(arg3 + 4, ptr4, true);
      dataView(memory0).setInt8(arg3 + 12, tuple3_1 ? 1 : 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline25(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.write(result3, BigInt.asUintN(64, arg3))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      dataView(memory0).setBigInt64(arg4 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline26(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.sync()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
const handleTable1 = [T_FLAG, 0];
const captureTable1= new Map();
let captureCnt1 = 0;
handleTables[1] = handleTable1;

function trampoline27(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingRead(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc0(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt1;
            captureTable1.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable1, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline28(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.checkWrite()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt1;
            captureTable1.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable1, rep);
          }
          dataView(memory0).setInt32(arg1 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline29(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.write(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt1;
            captureTable1.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable1, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline30(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.toDebugString();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var ptr3 = utf8Encode(ret, realloc0, memory0);
  var len3 = utf8EncodedLen;
  dataView(memory0).setInt32(arg1 + 4, len3, true);
  dataView(memory0).setInt32(arg1 + 0, ptr3, true);
}

function trampoline31(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc1, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc1, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline32(arg0) {
  const ret = now$1();
  var {seconds: v0_0, nanoseconds: v0_1 } = ret;
  dataView(memory0).setBigInt64(arg0 + 0, toUint64(v0_0), true);
  dataView(memory0).setInt32(arg0 + 8, toUint32(v0_1), true);
}

function trampoline33(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = filesystemErrorCode(rsc0);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val3 = e;
    let enum3;
    switch (val3) {
      case 'access': {
        enum3 = 0;
        break;
      }
      case 'would-block': {
        enum3 = 1;
        break;
      }
      case 'already': {
        enum3 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum3 = 3;
        break;
      }
      case 'busy': {
        enum3 = 4;
        break;
      }
      case 'deadlock': {
        enum3 = 5;
        break;
      }
      case 'quota': {
        enum3 = 6;
        break;
      }
      case 'exist': {
        enum3 = 7;
        break;
      }
      case 'file-too-large': {
        enum3 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum3 = 9;
        break;
      }
      case 'in-progress': {
        enum3 = 10;
        break;
      }
      case 'interrupted': {
        enum3 = 11;
        break;
      }
      case 'invalid': {
        enum3 = 12;
        break;
      }
      case 'io': {
        enum3 = 13;
        break;
      }
      case 'is-directory': {
        enum3 = 14;
        break;
      }
      case 'loop': {
        enum3 = 15;
        break;
      }
      case 'too-many-links': {
        enum3 = 16;
        break;
      }
      case 'message-size': {
        enum3 = 17;
        break;
      }
      case 'name-too-long': {
        enum3 = 18;
        break;
      }
      case 'no-device': {
        enum3 = 19;
        break;
      }
      case 'no-entry': {
        enum3 = 20;
        break;
      }
      case 'no-lock': {
        enum3 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum3 = 22;
        break;
      }
      case 'insufficient-space': {
        enum3 = 23;
        break;
      }
      case 'not-directory': {
        enum3 = 24;
        break;
      }
      case 'not-empty': {
        enum3 = 25;
        break;
      }
      case 'not-recoverable': {
        enum3 = 26;
        break;
      }
      case 'unsupported': {
        enum3 = 27;
        break;
      }
      case 'no-tty': {
        enum3 = 28;
        break;
      }
      case 'no-such-device': {
        enum3 = 29;
        break;
      }
      case 'overflow': {
        enum3 = 30;
        break;
      }
      case 'not-permitted': {
        enum3 = 31;
        break;
      }
      case 'pipe': {
        enum3 = 32;
        break;
      }
      case 'read-only': {
        enum3 = 33;
        break;
      }
      case 'invalid-seek': {
        enum3 = 34;
        break;
      }
      case 'text-file-busy': {
        enum3 = 35;
        break;
      }
      case 'cross-device': {
        enum3 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val3}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum3, true);
  }
}

function trampoline34(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags5 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8),
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags6 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32),
  };
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.openAt(flags3, result4, flags5, flags6)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle7 = e[symbolRscHandle];
      if (!handle7) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle7 = rscTableCreateOwn(handleTable6, rep);
      }
      dataView(memory0).setInt32(arg6 + 4, handle7, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'access': {
          enum8 = 0;
          break;
        }
        case 'would-block': {
          enum8 = 1;
          break;
        }
        case 'already': {
          enum8 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum8 = 3;
          break;
        }
        case 'busy': {
          enum8 = 4;
          break;
        }
        case 'deadlock': {
          enum8 = 5;
          break;
        }
        case 'quota': {
          enum8 = 6;
          break;
        }
        case 'exist': {
          enum8 = 7;
          break;
        }
        case 'file-too-large': {
          enum8 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum8 = 9;
          break;
        }
        case 'in-progress': {
          enum8 = 10;
          break;
        }
        case 'interrupted': {
          enum8 = 11;
          break;
        }
        case 'invalid': {
          enum8 = 12;
          break;
        }
        case 'io': {
          enum8 = 13;
          break;
        }
        case 'is-directory': {
          enum8 = 14;
          break;
        }
        case 'loop': {
          enum8 = 15;
          break;
        }
        case 'too-many-links': {
          enum8 = 16;
          break;
        }
        case 'message-size': {
          enum8 = 17;
          break;
        }
        case 'name-too-long': {
          enum8 = 18;
          break;
        }
        case 'no-device': {
          enum8 = 19;
          break;
        }
        case 'no-entry': {
          enum8 = 20;
          break;
        }
        case 'no-lock': {
          enum8 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum8 = 22;
          break;
        }
        case 'insufficient-space': {
          enum8 = 23;
          break;
        }
        case 'not-directory': {
          enum8 = 24;
          break;
        }
        case 'not-empty': {
          enum8 = 25;
          break;
        }
        case 'not-recoverable': {
          enum8 = 26;
          break;
        }
        case 'unsupported': {
          enum8 = 27;
          break;
        }
        case 'no-tty': {
          enum8 = 28;
          break;
        }
        case 'no-such-device': {
          enum8 = 29;
          break;
        }
        case 'overflow': {
          enum8 = 30;
          break;
        }
        case 'not-permitted': {
          enum8 = 31;
          break;
        }
        case 'pipe': {
          enum8 = 32;
          break;
        }
        case 'read-only': {
          enum8 = 33;
          break;
        }
        case 'invalid-seek': {
          enum8 = 34;
          break;
        }
        case 'text-file-busy': {
          enum8 = 35;
          break;
        }
        case 'cross-device': {
          enum8 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline35(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  var handle5 = arg3;
  var rep6 = handleTable6[(handle5 << 1) + 1] & ~T_FLAG;
  var rsc4 = captureTable6.get(rep6);
  if (!rsc4) {
    rsc4 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc4, symbolRscHandle, { writable: true, value: handle5});
    Object.defineProperty(rsc4, symbolRscRep, { writable: true, value: rep6});
  }
  curResourceBorrows.push(rsc4);
  var ptr7 = arg4;
  var len7 = arg5;
  var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.renameAt(result3, rsc4, result7)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'access': {
          enum8 = 0;
          break;
        }
        case 'would-block': {
          enum8 = 1;
          break;
        }
        case 'already': {
          enum8 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum8 = 3;
          break;
        }
        case 'busy': {
          enum8 = 4;
          break;
        }
        case 'deadlock': {
          enum8 = 5;
          break;
        }
        case 'quota': {
          enum8 = 6;
          break;
        }
        case 'exist': {
          enum8 = 7;
          break;
        }
        case 'file-too-large': {
          enum8 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum8 = 9;
          break;
        }
        case 'in-progress': {
          enum8 = 10;
          break;
        }
        case 'interrupted': {
          enum8 = 11;
          break;
        }
        case 'invalid': {
          enum8 = 12;
          break;
        }
        case 'io': {
          enum8 = 13;
          break;
        }
        case 'is-directory': {
          enum8 = 14;
          break;
        }
        case 'loop': {
          enum8 = 15;
          break;
        }
        case 'too-many-links': {
          enum8 = 16;
          break;
        }
        case 'message-size': {
          enum8 = 17;
          break;
        }
        case 'name-too-long': {
          enum8 = 18;
          break;
        }
        case 'no-device': {
          enum8 = 19;
          break;
        }
        case 'no-entry': {
          enum8 = 20;
          break;
        }
        case 'no-lock': {
          enum8 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum8 = 22;
          break;
        }
        case 'insufficient-space': {
          enum8 = 23;
          break;
        }
        case 'not-directory': {
          enum8 = 24;
          break;
        }
        case 'not-empty': {
          enum8 = 25;
          break;
        }
        case 'not-recoverable': {
          enum8 = 26;
          break;
        }
        case 'unsupported': {
          enum8 = 27;
          break;
        }
        case 'no-tty': {
          enum8 = 28;
          break;
        }
        case 'no-such-device': {
          enum8 = 29;
          break;
        }
        case 'overflow': {
          enum8 = 30;
          break;
        }
        case 'not-permitted': {
          enum8 = 31;
          break;
        }
        case 'pipe': {
          enum8 = 32;
          break;
        }
        case 'read-only': {
          enum8 = 33;
          break;
        }
        case 'invalid-seek': {
          enum8 = 34;
          break;
        }
        case 'text-file-busy': {
          enum8 = 35;
          break;
        }
        case 'cross-device': {
          enum8 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 1, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline36(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.unlinkFileAt(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline37(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.readViaStream(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable2, rep);
      }
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline38(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.writeViaStream(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable3, rep);
      }
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline39(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.appendViaStream()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable3, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline40(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.getType()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline41(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.stat()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant12 = ret;
  switch (variant12.tag) {
    case 'ok': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v3_0, linkCount: v3_1, size: v3_2, dataAccessTimestamp: v3_3, dataModificationTimestamp: v3_4, statusChangeTimestamp: v3_5 } = e;
      var val4 = v3_0;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'block-device': {
          enum4 = 1;
          break;
        }
        case 'character-device': {
          enum4 = 2;
          break;
        }
        case 'directory': {
          enum4 = 3;
          break;
        }
        case 'fifo': {
          enum4 = 4;
          break;
        }
        case 'symbolic-link': {
          enum4 = 5;
          break;
        }
        case 'regular-file': {
          enum4 = 6;
          break;
        }
        case 'socket': {
          enum4 = 7;
          break;
        }
        default: {
          if ((v3_0) instanceof Error) {
            console.error(v3_0);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v3_2), true);
      var variant6 = v3_3;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant6;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v5_0, nanoseconds: v5_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v5_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v5_1), true);
      }
      var variant8 = v3_4;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant8;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v7_1), true);
      }
      var variant10 = v3_5;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant10;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v9_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val11 = e;
      let enum11;
      switch (val11) {
        case 'access': {
          enum11 = 0;
          break;
        }
        case 'would-block': {
          enum11 = 1;
          break;
        }
        case 'already': {
          enum11 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum11 = 3;
          break;
        }
        case 'busy': {
          enum11 = 4;
          break;
        }
        case 'deadlock': {
          enum11 = 5;
          break;
        }
        case 'quota': {
          enum11 = 6;
          break;
        }
        case 'exist': {
          enum11 = 7;
          break;
        }
        case 'file-too-large': {
          enum11 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum11 = 9;
          break;
        }
        case 'in-progress': {
          enum11 = 10;
          break;
        }
        case 'interrupted': {
          enum11 = 11;
          break;
        }
        case 'invalid': {
          enum11 = 12;
          break;
        }
        case 'io': {
          enum11 = 13;
          break;
        }
        case 'is-directory': {
          enum11 = 14;
          break;
        }
        case 'loop': {
          enum11 = 15;
          break;
        }
        case 'too-many-links': {
          enum11 = 16;
          break;
        }
        case 'message-size': {
          enum11 = 17;
          break;
        }
        case 'name-too-long': {
          enum11 = 18;
          break;
        }
        case 'no-device': {
          enum11 = 19;
          break;
        }
        case 'no-entry': {
          enum11 = 20;
          break;
        }
        case 'no-lock': {
          enum11 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum11 = 22;
          break;
        }
        case 'insufficient-space': {
          enum11 = 23;
          break;
        }
        case 'not-directory': {
          enum11 = 24;
          break;
        }
        case 'not-empty': {
          enum11 = 25;
          break;
        }
        case 'not-recoverable': {
          enum11 = 26;
          break;
        }
        case 'unsupported': {
          enum11 = 27;
          break;
        }
        case 'no-tty': {
          enum11 = 28;
          break;
        }
        case 'no-such-device': {
          enum11 = 29;
          break;
        }
        case 'overflow': {
          enum11 = 30;
          break;
        }
        case 'not-permitted': {
          enum11 = 31;
          break;
        }
        case 'pipe': {
          enum11 = 32;
          break;
        }
        case 'read-only': {
          enum11 = 33;
          break;
        }
        case 'invalid-seek': {
          enum11 = 34;
          break;
        }
        case 'text-file-busy': {
          enum11 = 35;
          break;
        }
        case 'cross-device': {
          enum11 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val11}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum11, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline42(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.metadataHash()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {lower: v3_0, upper: v3_1 } = e;
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(v3_0), true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline43(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.read(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc1(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt1;
            captureTable1.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable1, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline44(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingRead(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc1(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt1;
            captureTable1.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable1, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline45(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingFlush()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt1;
            captureTable1.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable1, rep);
          }
          dataView(memory0).setInt32(arg1 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline46(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingWriteAndFlush(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt1;
            captureTable1.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable1, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline47(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc1(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function trampoline48(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt6;
      captureTable6.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable6, rep);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc1, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
const handleTable4 = [T_FLAG, 0];
const captureTable4= new Map();
let captureCnt4 = 0;
handleTables[4] = handleTable4;

function trampoline49(arg0) {
  const ret = getTerminalStdin();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalInput)) {
      throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt4;
      captureTable4.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable4, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}
const handleTable5 = [T_FLAG, 0];
const captureTable5= new Map();
let captureCnt5 = 0;
handleTables[5] = handleTable5;

function trampoline50(arg0) {
  const ret = getTerminalStdout();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt5;
      captureTable5.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable5, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}

function trampoline51(arg0) {
  const ret = getTerminalStderr();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt5;
      captureTable5.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable5, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}
let exports3;
let postReturn0;
let postReturn1;
let postReturn2;
const handleTable12 = [T_FLAG, 0];
const finalizationRegistry12 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable12, handle);
  exports0['23'](rep);
});

handleTables[12] = handleTable12;

class Builder{
  constructor(arg0) {
    var variant1 = arg0;
    let variant1_0;
    let variant1_1;
    let variant1_2;
    if (variant1 === null || variant1=== undefined) {
      variant1_0 = 0;
      variant1_1 = 0;
      variant1_2 = 0;
    } else {
      const e = variant1;
      var ptr0 = utf8Encode(e, realloc0, memory0);
      var len0 = utf8EncodedLen;
      variant1_0 = 1;
      variant1_1 = ptr0;
      variant1_2 = len0;
    }
    const ret = exports1['adobe:cai/manifest@0.1.0#[constructor]builder'](variant1_0, variant1_1, variant1_2);
    var handle3 = ret;
    var rsc2 = new.target === Builder ? this : Object.create(Builder.prototype);
    Object.defineProperty(rsc2, symbolRscHandle, { writable: true, value: handle3});
    finalizationRegistry12.register(rsc2, handle3, rsc2);
    Object.defineProperty(rsc2, symbolDispose, { writable: true, value: function () {
      finalizationRegistry12.unregister(rsc2);
      rscTableRemove(handleTable12, handle3);
      rsc2[symbolDispose] = emptyFunc;
      rsc2[symbolRscHandle] = undefined;
      exports0['23'](handleTable12[(handle3 << 1) + 1] & ~T_FLAG);
    }});
    return rsc2;
  }
}

Builder.prototype.addResource = function addResource(arg1, arg2) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable12[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc0, memory0);
  var len2 = utf8EncodedLen;
  var variant5 = arg2;
  let variant5_0;
  let variant5_1;
  switch (variant5.tag) {
    case 'file': {
      const e = variant5.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable6, rep);
      }
      variant5_0 = 0;
      variant5_1 = handle3;
      break;
    }
    case 'stream': {
      const e = variant5.val;
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable2, rep);
      }
      variant5_0 = 1;
      variant5_1 = handle4;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`Input\``);
    }
  }
  const ret = exports1['adobe:cai/manifest@0.1.0#[method]builder.add-resource'](handle0, ptr2, len2, variant5_0, variant5_1);
  let variant23;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant23= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      let variant22;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          var ptr6 = dataView(memory0).getInt32(ret + 8, true);
          var len6 = dataView(memory0).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
          variant22= {
            tag: 'assertion',
            val: result6
          };
          break;
        }
        case 1: {
          var ptr7 = dataView(memory0).getInt32(ret + 8, true);
          var len7 = dataView(memory0).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant22= {
            tag: 'assertion-not-found',
            val: result7
          };
          break;
        }
        case 2: {
          var ptr8 = dataView(memory0).getInt32(ret + 8, true);
          var len8 = dataView(memory0).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant22= {
            tag: 'bad-param',
            val: result8
          };
          break;
        }
        case 3: {
          var ptr9 = dataView(memory0).getInt32(ret + 8, true);
          var len9 = dataView(memory0).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
          variant22= {
            tag: 'decoding',
            val: result9
          };
          break;
        }
        case 4: {
          var ptr10 = dataView(memory0).getInt32(ret + 8, true);
          var len10 = dataView(memory0).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
          variant22= {
            tag: 'encoding',
            val: result10
          };
          break;
        }
        case 5: {
          var ptr11 = dataView(memory0).getInt32(ret + 8, true);
          var len11 = dataView(memory0).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
          variant22= {
            tag: 'file-not-found',
            val: result11
          };
          break;
        }
        case 6: {
          var ptr12 = dataView(memory0).getInt32(ret + 8, true);
          var len12 = dataView(memory0).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
          variant22= {
            tag: 'io',
            val: result12
          };
          break;
        }
        case 7: {
          var ptr13 = dataView(memory0).getInt32(ret + 8, true);
          var len13 = dataView(memory0).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
          variant22= {
            tag: 'json',
            val: result13
          };
          break;
        }
        case 8: {
          var ptr14 = dataView(memory0).getInt32(ret + 8, true);
          var len14 = dataView(memory0).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
          variant22= {
            tag: 'manifest',
            val: result14
          };
          break;
        }
        case 9: {
          var ptr15 = dataView(memory0).getInt32(ret + 8, true);
          var len15 = dataView(memory0).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
          variant22= {
            tag: 'manifest-not-found',
            val: result15
          };
          break;
        }
        case 10: {
          var ptr16 = dataView(memory0).getInt32(ret + 8, true);
          var len16 = dataView(memory0).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
          variant22= {
            tag: 'not-supported',
            val: result16
          };
          break;
        }
        case 11: {
          var ptr17 = dataView(memory0).getInt32(ret + 8, true);
          var len17 = dataView(memory0).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
          variant22= {
            tag: 'other',
            val: result17
          };
          break;
        }
        case 12: {
          var ptr18 = dataView(memory0).getInt32(ret + 8, true);
          var len18 = dataView(memory0).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
          variant22= {
            tag: 'remote-manifest',
            val: result18
          };
          break;
        }
        case 13: {
          var ptr19 = dataView(memory0).getInt32(ret + 8, true);
          var len19 = dataView(memory0).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
          variant22= {
            tag: 'resource-not-found',
            val: result19
          };
          break;
        }
        case 14: {
          variant22= {
            tag: 'rw-lock',
          };
          break;
        }
        case 15: {
          var ptr20 = dataView(memory0).getInt32(ret + 8, true);
          var len20 = dataView(memory0).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
          variant22= {
            tag: 'signature',
            val: result20
          };
          break;
        }
        case 16: {
          var ptr21 = dataView(memory0).getInt32(ret + 8, true);
          var len21 = dataView(memory0).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr21, len21));
          variant22= {
            tag: 'verify',
            val: result21
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant23= {
        tag: 'err',
        val: variant22
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant23;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};

Builder.prototype.setRemoteUrl = function setRemoteUrl(arg1) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable12[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc0, memory0);
  var len2 = utf8EncodedLen;
  exports1['adobe:cai/manifest@0.1.0#[method]builder.set-remote-url'](handle0, ptr2, len2);
};

Builder.prototype.addIngredient = function addIngredient(arg1, arg2, arg3) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable12[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc0, memory0);
  var len2 = utf8EncodedLen;
  var ptr3 = utf8Encode(arg2, realloc0, memory0);
  var len3 = utf8EncodedLen;
  var variant6 = arg3;
  let variant6_0;
  let variant6_1;
  switch (variant6.tag) {
    case 'file': {
      const e = variant6.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable6, rep);
      }
      variant6_0 = 0;
      variant6_1 = handle4;
      break;
    }
    case 'stream': {
      const e = variant6.val;
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle5 = e[symbolRscHandle];
      if (!handle5) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle5 = rscTableCreateOwn(handleTable2, rep);
      }
      variant6_0 = 1;
      variant6_1 = handle5;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`Input\``);
    }
  }
  const ret = exports1['adobe:cai/manifest@0.1.0#[method]builder.add-ingredient'](handle0, ptr2, len2, ptr3, len3, variant6_0, variant6_1);
  let variant24;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant24= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      let variant23;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          var ptr7 = dataView(memory0).getInt32(ret + 8, true);
          var len7 = dataView(memory0).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant23= {
            tag: 'assertion',
            val: result7
          };
          break;
        }
        case 1: {
          var ptr8 = dataView(memory0).getInt32(ret + 8, true);
          var len8 = dataView(memory0).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant23= {
            tag: 'assertion-not-found',
            val: result8
          };
          break;
        }
        case 2: {
          var ptr9 = dataView(memory0).getInt32(ret + 8, true);
          var len9 = dataView(memory0).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
          variant23= {
            tag: 'bad-param',
            val: result9
          };
          break;
        }
        case 3: {
          var ptr10 = dataView(memory0).getInt32(ret + 8, true);
          var len10 = dataView(memory0).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
          variant23= {
            tag: 'decoding',
            val: result10
          };
          break;
        }
        case 4: {
          var ptr11 = dataView(memory0).getInt32(ret + 8, true);
          var len11 = dataView(memory0).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
          variant23= {
            tag: 'encoding',
            val: result11
          };
          break;
        }
        case 5: {
          var ptr12 = dataView(memory0).getInt32(ret + 8, true);
          var len12 = dataView(memory0).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
          variant23= {
            tag: 'file-not-found',
            val: result12
          };
          break;
        }
        case 6: {
          var ptr13 = dataView(memory0).getInt32(ret + 8, true);
          var len13 = dataView(memory0).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
          variant23= {
            tag: 'io',
            val: result13
          };
          break;
        }
        case 7: {
          var ptr14 = dataView(memory0).getInt32(ret + 8, true);
          var len14 = dataView(memory0).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
          variant23= {
            tag: 'json',
            val: result14
          };
          break;
        }
        case 8: {
          var ptr15 = dataView(memory0).getInt32(ret + 8, true);
          var len15 = dataView(memory0).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
          variant23= {
            tag: 'manifest',
            val: result15
          };
          break;
        }
        case 9: {
          var ptr16 = dataView(memory0).getInt32(ret + 8, true);
          var len16 = dataView(memory0).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
          variant23= {
            tag: 'manifest-not-found',
            val: result16
          };
          break;
        }
        case 10: {
          var ptr17 = dataView(memory0).getInt32(ret + 8, true);
          var len17 = dataView(memory0).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
          variant23= {
            tag: 'not-supported',
            val: result17
          };
          break;
        }
        case 11: {
          var ptr18 = dataView(memory0).getInt32(ret + 8, true);
          var len18 = dataView(memory0).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
          variant23= {
            tag: 'other',
            val: result18
          };
          break;
        }
        case 12: {
          var ptr19 = dataView(memory0).getInt32(ret + 8, true);
          var len19 = dataView(memory0).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
          variant23= {
            tag: 'remote-manifest',
            val: result19
          };
          break;
        }
        case 13: {
          var ptr20 = dataView(memory0).getInt32(ret + 8, true);
          var len20 = dataView(memory0).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
          variant23= {
            tag: 'resource-not-found',
            val: result20
          };
          break;
        }
        case 14: {
          variant23= {
            tag: 'rw-lock',
          };
          break;
        }
        case 15: {
          var ptr21 = dataView(memory0).getInt32(ret + 8, true);
          var len21 = dataView(memory0).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr21, len21));
          variant23= {
            tag: 'signature',
            val: result21
          };
          break;
        }
        case 16: {
          var ptr22 = dataView(memory0).getInt32(ret + 8, true);
          var len22 = dataView(memory0).getInt32(ret + 12, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr22, len22));
          variant23= {
            tag: 'verify',
            val: result22
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant24= {
        tag: 'err',
        val: variant23
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant24;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};

Builder.prototype.toArchive = function toArchive(arg1) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable12[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var variant4 = arg1;
  let variant4_0;
  let variant4_1;
  switch (variant4.tag) {
    case 'file': {
      const e = variant4.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle2 = e[symbolRscHandle];
      if (!handle2) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle2 = rscTableCreateOwn(handleTable6, rep);
      }
      variant4_0 = 0;
      variant4_1 = handle2;
      break;
    }
    case 'stream': {
      const e = variant4.val;
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable3, rep);
      }
      variant4_0 = 1;
      variant4_1 = handle3;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`Output\``);
    }
  }
  const ret = exports1['adobe:cai/manifest@0.1.0#[method]builder.to-archive'](handle0, variant4_0, variant4_1);
  let variant22;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant22= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      let variant21;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          var ptr5 = dataView(memory0).getInt32(ret + 8, true);
          var len5 = dataView(memory0).getInt32(ret + 12, true);
          var result5 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr5, len5));
          variant21= {
            tag: 'assertion',
            val: result5
          };
          break;
        }
        case 1: {
          var ptr6 = dataView(memory0).getInt32(ret + 8, true);
          var len6 = dataView(memory0).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
          variant21= {
            tag: 'assertion-not-found',
            val: result6
          };
          break;
        }
        case 2: {
          var ptr7 = dataView(memory0).getInt32(ret + 8, true);
          var len7 = dataView(memory0).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant21= {
            tag: 'bad-param',
            val: result7
          };
          break;
        }
        case 3: {
          var ptr8 = dataView(memory0).getInt32(ret + 8, true);
          var len8 = dataView(memory0).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant21= {
            tag: 'decoding',
            val: result8
          };
          break;
        }
        case 4: {
          var ptr9 = dataView(memory0).getInt32(ret + 8, true);
          var len9 = dataView(memory0).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
          variant21= {
            tag: 'encoding',
            val: result9
          };
          break;
        }
        case 5: {
          var ptr10 = dataView(memory0).getInt32(ret + 8, true);
          var len10 = dataView(memory0).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
          variant21= {
            tag: 'file-not-found',
            val: result10
          };
          break;
        }
        case 6: {
          var ptr11 = dataView(memory0).getInt32(ret + 8, true);
          var len11 = dataView(memory0).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
          variant21= {
            tag: 'io',
            val: result11
          };
          break;
        }
        case 7: {
          var ptr12 = dataView(memory0).getInt32(ret + 8, true);
          var len12 = dataView(memory0).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
          variant21= {
            tag: 'json',
            val: result12
          };
          break;
        }
        case 8: {
          var ptr13 = dataView(memory0).getInt32(ret + 8, true);
          var len13 = dataView(memory0).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
          variant21= {
            tag: 'manifest',
            val: result13
          };
          break;
        }
        case 9: {
          var ptr14 = dataView(memory0).getInt32(ret + 8, true);
          var len14 = dataView(memory0).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
          variant21= {
            tag: 'manifest-not-found',
            val: result14
          };
          break;
        }
        case 10: {
          var ptr15 = dataView(memory0).getInt32(ret + 8, true);
          var len15 = dataView(memory0).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
          variant21= {
            tag: 'not-supported',
            val: result15
          };
          break;
        }
        case 11: {
          var ptr16 = dataView(memory0).getInt32(ret + 8, true);
          var len16 = dataView(memory0).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
          variant21= {
            tag: 'other',
            val: result16
          };
          break;
        }
        case 12: {
          var ptr17 = dataView(memory0).getInt32(ret + 8, true);
          var len17 = dataView(memory0).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
          variant21= {
            tag: 'remote-manifest',
            val: result17
          };
          break;
        }
        case 13: {
          var ptr18 = dataView(memory0).getInt32(ret + 8, true);
          var len18 = dataView(memory0).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
          variant21= {
            tag: 'resource-not-found',
            val: result18
          };
          break;
        }
        case 14: {
          variant21= {
            tag: 'rw-lock',
          };
          break;
        }
        case 15: {
          var ptr19 = dataView(memory0).getInt32(ret + 8, true);
          var len19 = dataView(memory0).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
          variant21= {
            tag: 'signature',
            val: result19
          };
          break;
        }
        case 16: {
          var ptr20 = dataView(memory0).getInt32(ret + 8, true);
          var len20 = dataView(memory0).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
          variant21= {
            tag: 'verify',
            val: result20
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant22= {
        tag: 'err',
        val: variant21
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant22;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};

Builder.fromArchive = function fromArchive(arg0) {
  var variant2 = arg0;
  let variant2_0;
  let variant2_1;
  switch (variant2.tag) {
    case 'file': {
      const e = variant2.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle0 = e[symbolRscHandle];
      if (!handle0) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle0 = rscTableCreateOwn(handleTable6, rep);
      }
      variant2_0 = 0;
      variant2_1 = handle0;
      break;
    }
    case 'stream': {
      const e = variant2.val;
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle1 = e[symbolRscHandle];
      if (!handle1) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle1 = rscTableCreateOwn(handleTable2, rep);
      }
      variant2_0 = 1;
      variant2_1 = handle1;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant2.tag)}\` (received \`${variant2}\`) specified for \`Input\``);
    }
  }
  const ret = exports1['adobe:cai/manifest@0.1.0#[static]builder.from-archive'](variant2_0, variant2_1);
  let variant22;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var handle4 = dataView(memory0).getInt32(ret + 4, true);
      var rsc3 = new.target === Builder ? this : Object.create(Builder.prototype);
      Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
      finalizationRegistry12.register(rsc3, handle4, rsc3);
      Object.defineProperty(rsc3, symbolDispose, { writable: true, value: function () {
        finalizationRegistry12.unregister(rsc3);
        rscTableRemove(handleTable12, handle4);
        rsc3[symbolDispose] = emptyFunc;
        rsc3[symbolRscHandle] = undefined;
        exports0['23'](handleTable12[(handle4 << 1) + 1] & ~T_FLAG);
      }});
      variant22= {
        tag: 'ok',
        val: rsc3
      };
      break;
    }
    case 1: {
      let variant21;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          var ptr5 = dataView(memory0).getInt32(ret + 8, true);
          var len5 = dataView(memory0).getInt32(ret + 12, true);
          var result5 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr5, len5));
          variant21= {
            tag: 'assertion',
            val: result5
          };
          break;
        }
        case 1: {
          var ptr6 = dataView(memory0).getInt32(ret + 8, true);
          var len6 = dataView(memory0).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
          variant21= {
            tag: 'assertion-not-found',
            val: result6
          };
          break;
        }
        case 2: {
          var ptr7 = dataView(memory0).getInt32(ret + 8, true);
          var len7 = dataView(memory0).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant21= {
            tag: 'bad-param',
            val: result7
          };
          break;
        }
        case 3: {
          var ptr8 = dataView(memory0).getInt32(ret + 8, true);
          var len8 = dataView(memory0).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant21= {
            tag: 'decoding',
            val: result8
          };
          break;
        }
        case 4: {
          var ptr9 = dataView(memory0).getInt32(ret + 8, true);
          var len9 = dataView(memory0).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
          variant21= {
            tag: 'encoding',
            val: result9
          };
          break;
        }
        case 5: {
          var ptr10 = dataView(memory0).getInt32(ret + 8, true);
          var len10 = dataView(memory0).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
          variant21= {
            tag: 'file-not-found',
            val: result10
          };
          break;
        }
        case 6: {
          var ptr11 = dataView(memory0).getInt32(ret + 8, true);
          var len11 = dataView(memory0).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
          variant21= {
            tag: 'io',
            val: result11
          };
          break;
        }
        case 7: {
          var ptr12 = dataView(memory0).getInt32(ret + 8, true);
          var len12 = dataView(memory0).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
          variant21= {
            tag: 'json',
            val: result12
          };
          break;
        }
        case 8: {
          var ptr13 = dataView(memory0).getInt32(ret + 8, true);
          var len13 = dataView(memory0).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
          variant21= {
            tag: 'manifest',
            val: result13
          };
          break;
        }
        case 9: {
          var ptr14 = dataView(memory0).getInt32(ret + 8, true);
          var len14 = dataView(memory0).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
          variant21= {
            tag: 'manifest-not-found',
            val: result14
          };
          break;
        }
        case 10: {
          var ptr15 = dataView(memory0).getInt32(ret + 8, true);
          var len15 = dataView(memory0).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
          variant21= {
            tag: 'not-supported',
            val: result15
          };
          break;
        }
        case 11: {
          var ptr16 = dataView(memory0).getInt32(ret + 8, true);
          var len16 = dataView(memory0).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
          variant21= {
            tag: 'other',
            val: result16
          };
          break;
        }
        case 12: {
          var ptr17 = dataView(memory0).getInt32(ret + 8, true);
          var len17 = dataView(memory0).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
          variant21= {
            tag: 'remote-manifest',
            val: result17
          };
          break;
        }
        case 13: {
          var ptr18 = dataView(memory0).getInt32(ret + 8, true);
          var len18 = dataView(memory0).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
          variant21= {
            tag: 'resource-not-found',
            val: result18
          };
          break;
        }
        case 14: {
          variant21= {
            tag: 'rw-lock',
          };
          break;
        }
        case 15: {
          var ptr19 = dataView(memory0).getInt32(ret + 8, true);
          var len19 = dataView(memory0).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
          variant21= {
            tag: 'signature',
            val: result19
          };
          break;
        }
        case 16: {
          var ptr20 = dataView(memory0).getInt32(ret + 8, true);
          var len20 = dataView(memory0).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
          variant21= {
            tag: 'verify',
            val: result20
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant22= {
        tag: 'err',
        val: variant21
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant22;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
const handleTable13 = [T_FLAG, 0];
const finalizationRegistry13 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable13, handle);
  exports0['24'](rep);
});

handleTables[13] = handleTable13;

class Reader{
  constructor(arg0) {
    var variant1 = arg0;
    let variant1_0;
    let variant1_1;
    let variant1_2;
    if (variant1 === null || variant1=== undefined) {
      variant1_0 = 0;
      variant1_1 = 0;
      variant1_2 = 0;
    } else {
      const e = variant1;
      var ptr0 = utf8Encode(e, realloc0, memory0);
      var len0 = utf8EncodedLen;
      variant1_0 = 1;
      variant1_1 = ptr0;
      variant1_2 = len0;
    }
    const ret = exports1['adobe:cai/manifest@0.1.0#[constructor]reader'](variant1_0, variant1_1, variant1_2);
    var handle3 = ret;
    var rsc2 = new.target === Reader ? this : Object.create(Reader.prototype);
    Object.defineProperty(rsc2, symbolRscHandle, { writable: true, value: handle3});
    finalizationRegistry13.register(rsc2, handle3, rsc2);
    Object.defineProperty(rsc2, symbolDispose, { writable: true, value: function () {
      finalizationRegistry13.unregister(rsc2);
      rscTableRemove(handleTable13, handle3);
      rsc2[symbolDispose] = emptyFunc;
      rsc2[symbolRscHandle] = undefined;
      exports0['24'](handleTable13[(handle3 << 1) + 1] & ~T_FLAG);
    }});
    return rsc2;
  }
}

Reader.fromBuffer = function fromBuffer(arg0, arg1) {
  var ptr0 = utf8Encode(arg0, realloc0, memory0);
  var len0 = utf8EncodedLen;
  var val1 = arg1;
  var len1 = val1.byteLength;
  var ptr1 = realloc0(0, 0, 1, len1 * 1);
  var src1 = new Uint8Array(val1.buffer || val1, val1.byteOffset, len1 * 1);
  (new Uint8Array(memory0.buffer, ptr1, len1 * 1)).set(src1);
  const ret = exports1['adobe:cai/manifest@0.1.0#[static]reader.from-buffer'](ptr0, len0, ptr1, len1);
  let variant21;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var handle3 = dataView(memory0).getInt32(ret + 4, true);
      var rsc2 = new.target === Reader ? this : Object.create(Reader.prototype);
      Object.defineProperty(rsc2, symbolRscHandle, { writable: true, value: handle3});
      finalizationRegistry13.register(rsc2, handle3, rsc2);
      Object.defineProperty(rsc2, symbolDispose, { writable: true, value: function () {
        finalizationRegistry13.unregister(rsc2);
        rscTableRemove(handleTable13, handle3);
        rsc2[symbolDispose] = emptyFunc;
        rsc2[symbolRscHandle] = undefined;
        exports0['24'](handleTable13[(handle3 << 1) + 1] & ~T_FLAG);
      }});
      variant21= {
        tag: 'ok',
        val: rsc2
      };
      break;
    }
    case 1: {
      let variant20;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          var ptr4 = dataView(memory0).getInt32(ret + 8, true);
          var len4 = dataView(memory0).getInt32(ret + 12, true);
          var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
          variant20= {
            tag: 'assertion',
            val: result4
          };
          break;
        }
        case 1: {
          var ptr5 = dataView(memory0).getInt32(ret + 8, true);
          var len5 = dataView(memory0).getInt32(ret + 12, true);
          var result5 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr5, len5));
          variant20= {
            tag: 'assertion-not-found',
            val: result5
          };
          break;
        }
        case 2: {
          var ptr6 = dataView(memory0).getInt32(ret + 8, true);
          var len6 = dataView(memory0).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
          variant20= {
            tag: 'bad-param',
            val: result6
          };
          break;
        }
        case 3: {
          var ptr7 = dataView(memory0).getInt32(ret + 8, true);
          var len7 = dataView(memory0).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant20= {
            tag: 'decoding',
            val: result7
          };
          break;
        }
        case 4: {
          var ptr8 = dataView(memory0).getInt32(ret + 8, true);
          var len8 = dataView(memory0).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant20= {
            tag: 'encoding',
            val: result8
          };
          break;
        }
        case 5: {
          var ptr9 = dataView(memory0).getInt32(ret + 8, true);
          var len9 = dataView(memory0).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
          variant20= {
            tag: 'file-not-found',
            val: result9
          };
          break;
        }
        case 6: {
          var ptr10 = dataView(memory0).getInt32(ret + 8, true);
          var len10 = dataView(memory0).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
          variant20= {
            tag: 'io',
            val: result10
          };
          break;
        }
        case 7: {
          var ptr11 = dataView(memory0).getInt32(ret + 8, true);
          var len11 = dataView(memory0).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
          variant20= {
            tag: 'json',
            val: result11
          };
          break;
        }
        case 8: {
          var ptr12 = dataView(memory0).getInt32(ret + 8, true);
          var len12 = dataView(memory0).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
          variant20= {
            tag: 'manifest',
            val: result12
          };
          break;
        }
        case 9: {
          var ptr13 = dataView(memory0).getInt32(ret + 8, true);
          var len13 = dataView(memory0).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
          variant20= {
            tag: 'manifest-not-found',
            val: result13
          };
          break;
        }
        case 10: {
          var ptr14 = dataView(memory0).getInt32(ret + 8, true);
          var len14 = dataView(memory0).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
          variant20= {
            tag: 'not-supported',
            val: result14
          };
          break;
        }
        case 11: {
          var ptr15 = dataView(memory0).getInt32(ret + 8, true);
          var len15 = dataView(memory0).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
          variant20= {
            tag: 'other',
            val: result15
          };
          break;
        }
        case 12: {
          var ptr16 = dataView(memory0).getInt32(ret + 8, true);
          var len16 = dataView(memory0).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
          variant20= {
            tag: 'remote-manifest',
            val: result16
          };
          break;
        }
        case 13: {
          var ptr17 = dataView(memory0).getInt32(ret + 8, true);
          var len17 = dataView(memory0).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
          variant20= {
            tag: 'resource-not-found',
            val: result17
          };
          break;
        }
        case 14: {
          variant20= {
            tag: 'rw-lock',
          };
          break;
        }
        case 15: {
          var ptr18 = dataView(memory0).getInt32(ret + 8, true);
          var len18 = dataView(memory0).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
          variant20= {
            tag: 'signature',
            val: result18
          };
          break;
        }
        case 16: {
          var ptr19 = dataView(memory0).getInt32(ret + 8, true);
          var len19 = dataView(memory0).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
          variant20= {
            tag: 'verify',
            val: result19
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant21= {
        tag: 'err',
        val: variant20
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant21;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};

Reader.fromStream = function fromStream(arg0, arg1) {
  var ptr0 = utf8Encode(arg0, realloc0, memory0);
  var len0 = utf8EncodedLen;
  var variant3 = arg1;
  let variant3_0;
  let variant3_1;
  switch (variant3.tag) {
    case 'file': {
      const e = variant3.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle1 = e[symbolRscHandle];
      if (!handle1) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle1 = rscTableCreateOwn(handleTable6, rep);
      }
      variant3_0 = 0;
      variant3_1 = handle1;
      break;
    }
    case 'stream': {
      const e = variant3.val;
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle2 = e[symbolRscHandle];
      if (!handle2) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle2 = rscTableCreateOwn(handleTable2, rep);
      }
      variant3_0 = 1;
      variant3_1 = handle2;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`Input\``);
    }
  }
  const ret = exports1['adobe:cai/manifest@0.1.0#[static]reader.from-stream'](ptr0, len0, variant3_0, variant3_1);
  let variant23;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var handle5 = dataView(memory0).getInt32(ret + 4, true);
      var rsc4 = new.target === Reader ? this : Object.create(Reader.prototype);
      Object.defineProperty(rsc4, symbolRscHandle, { writable: true, value: handle5});
      finalizationRegistry13.register(rsc4, handle5, rsc4);
      Object.defineProperty(rsc4, symbolDispose, { writable: true, value: function () {
        finalizationRegistry13.unregister(rsc4);
        rscTableRemove(handleTable13, handle5);
        rsc4[symbolDispose] = emptyFunc;
        rsc4[symbolRscHandle] = undefined;
        exports0['24'](handleTable13[(handle5 << 1) + 1] & ~T_FLAG);
      }});
      variant23= {
        tag: 'ok',
        val: rsc4
      };
      break;
    }
    case 1: {
      let variant22;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          var ptr6 = dataView(memory0).getInt32(ret + 8, true);
          var len6 = dataView(memory0).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
          variant22= {
            tag: 'assertion',
            val: result6
          };
          break;
        }
        case 1: {
          var ptr7 = dataView(memory0).getInt32(ret + 8, true);
          var len7 = dataView(memory0).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant22= {
            tag: 'assertion-not-found',
            val: result7
          };
          break;
        }
        case 2: {
          var ptr8 = dataView(memory0).getInt32(ret + 8, true);
          var len8 = dataView(memory0).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant22= {
            tag: 'bad-param',
            val: result8
          };
          break;
        }
        case 3: {
          var ptr9 = dataView(memory0).getInt32(ret + 8, true);
          var len9 = dataView(memory0).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
          variant22= {
            tag: 'decoding',
            val: result9
          };
          break;
        }
        case 4: {
          var ptr10 = dataView(memory0).getInt32(ret + 8, true);
          var len10 = dataView(memory0).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
          variant22= {
            tag: 'encoding',
            val: result10
          };
          break;
        }
        case 5: {
          var ptr11 = dataView(memory0).getInt32(ret + 8, true);
          var len11 = dataView(memory0).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
          variant22= {
            tag: 'file-not-found',
            val: result11
          };
          break;
        }
        case 6: {
          var ptr12 = dataView(memory0).getInt32(ret + 8, true);
          var len12 = dataView(memory0).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
          variant22= {
            tag: 'io',
            val: result12
          };
          break;
        }
        case 7: {
          var ptr13 = dataView(memory0).getInt32(ret + 8, true);
          var len13 = dataView(memory0).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
          variant22= {
            tag: 'json',
            val: result13
          };
          break;
        }
        case 8: {
          var ptr14 = dataView(memory0).getInt32(ret + 8, true);
          var len14 = dataView(memory0).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
          variant22= {
            tag: 'manifest',
            val: result14
          };
          break;
        }
        case 9: {
          var ptr15 = dataView(memory0).getInt32(ret + 8, true);
          var len15 = dataView(memory0).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
          variant22= {
            tag: 'manifest-not-found',
            val: result15
          };
          break;
        }
        case 10: {
          var ptr16 = dataView(memory0).getInt32(ret + 8, true);
          var len16 = dataView(memory0).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
          variant22= {
            tag: 'not-supported',
            val: result16
          };
          break;
        }
        case 11: {
          var ptr17 = dataView(memory0).getInt32(ret + 8, true);
          var len17 = dataView(memory0).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
          variant22= {
            tag: 'other',
            val: result17
          };
          break;
        }
        case 12: {
          var ptr18 = dataView(memory0).getInt32(ret + 8, true);
          var len18 = dataView(memory0).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
          variant22= {
            tag: 'remote-manifest',
            val: result18
          };
          break;
        }
        case 13: {
          var ptr19 = dataView(memory0).getInt32(ret + 8, true);
          var len19 = dataView(memory0).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
          variant22= {
            tag: 'resource-not-found',
            val: result19
          };
          break;
        }
        case 14: {
          variant22= {
            tag: 'rw-lock',
          };
          break;
        }
        case 15: {
          var ptr20 = dataView(memory0).getInt32(ret + 8, true);
          var len20 = dataView(memory0).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
          variant22= {
            tag: 'signature',
            val: result20
          };
          break;
        }
        case 16: {
          var ptr21 = dataView(memory0).getInt32(ret + 8, true);
          var len21 = dataView(memory0).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr21, len21));
          variant22= {
            tag: 'verify',
            val: result21
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant23= {
        tag: 'err',
        val: variant22
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant23;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};

Reader.fromManifestDataAndStream = function fromManifestDataAndStream(arg0, arg1, arg2) {
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc0(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  var ptr1 = utf8Encode(arg1, realloc0, memory0);
  var len1 = utf8EncodedLen;
  var variant4 = arg2;
  let variant4_0;
  let variant4_1;
  switch (variant4.tag) {
    case 'file': {
      const e = variant4.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle2 = e[symbolRscHandle];
      if (!handle2) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle2 = rscTableCreateOwn(handleTable6, rep);
      }
      variant4_0 = 0;
      variant4_1 = handle2;
      break;
    }
    case 'stream': {
      const e = variant4.val;
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable2, rep);
      }
      variant4_0 = 1;
      variant4_1 = handle3;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`Input\``);
    }
  }
  const ret = exports1['adobe:cai/manifest@0.1.0#[static]reader.from-manifest-data-and-stream'](ptr0, len0, ptr1, len1, variant4_0, variant4_1);
  let variant24;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var handle6 = dataView(memory0).getInt32(ret + 4, true);
      var rsc5 = new.target === Reader ? this : Object.create(Reader.prototype);
      Object.defineProperty(rsc5, symbolRscHandle, { writable: true, value: handle6});
      finalizationRegistry13.register(rsc5, handle6, rsc5);
      Object.defineProperty(rsc5, symbolDispose, { writable: true, value: function () {
        finalizationRegistry13.unregister(rsc5);
        rscTableRemove(handleTable13, handle6);
        rsc5[symbolDispose] = emptyFunc;
        rsc5[symbolRscHandle] = undefined;
        exports0['24'](handleTable13[(handle6 << 1) + 1] & ~T_FLAG);
      }});
      variant24= {
        tag: 'ok',
        val: rsc5
      };
      break;
    }
    case 1: {
      let variant23;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          var ptr7 = dataView(memory0).getInt32(ret + 8, true);
          var len7 = dataView(memory0).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant23= {
            tag: 'assertion',
            val: result7
          };
          break;
        }
        case 1: {
          var ptr8 = dataView(memory0).getInt32(ret + 8, true);
          var len8 = dataView(memory0).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant23= {
            tag: 'assertion-not-found',
            val: result8
          };
          break;
        }
        case 2: {
          var ptr9 = dataView(memory0).getInt32(ret + 8, true);
          var len9 = dataView(memory0).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
          variant23= {
            tag: 'bad-param',
            val: result9
          };
          break;
        }
        case 3: {
          var ptr10 = dataView(memory0).getInt32(ret + 8, true);
          var len10 = dataView(memory0).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
          variant23= {
            tag: 'decoding',
            val: result10
          };
          break;
        }
        case 4: {
          var ptr11 = dataView(memory0).getInt32(ret + 8, true);
          var len11 = dataView(memory0).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
          variant23= {
            tag: 'encoding',
            val: result11
          };
          break;
        }
        case 5: {
          var ptr12 = dataView(memory0).getInt32(ret + 8, true);
          var len12 = dataView(memory0).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
          variant23= {
            tag: 'file-not-found',
            val: result12
          };
          break;
        }
        case 6: {
          var ptr13 = dataView(memory0).getInt32(ret + 8, true);
          var len13 = dataView(memory0).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
          variant23= {
            tag: 'io',
            val: result13
          };
          break;
        }
        case 7: {
          var ptr14 = dataView(memory0).getInt32(ret + 8, true);
          var len14 = dataView(memory0).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
          variant23= {
            tag: 'json',
            val: result14
          };
          break;
        }
        case 8: {
          var ptr15 = dataView(memory0).getInt32(ret + 8, true);
          var len15 = dataView(memory0).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
          variant23= {
            tag: 'manifest',
            val: result15
          };
          break;
        }
        case 9: {
          var ptr16 = dataView(memory0).getInt32(ret + 8, true);
          var len16 = dataView(memory0).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
          variant23= {
            tag: 'manifest-not-found',
            val: result16
          };
          break;
        }
        case 10: {
          var ptr17 = dataView(memory0).getInt32(ret + 8, true);
          var len17 = dataView(memory0).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
          variant23= {
            tag: 'not-supported',
            val: result17
          };
          break;
        }
        case 11: {
          var ptr18 = dataView(memory0).getInt32(ret + 8, true);
          var len18 = dataView(memory0).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
          variant23= {
            tag: 'other',
            val: result18
          };
          break;
        }
        case 12: {
          var ptr19 = dataView(memory0).getInt32(ret + 8, true);
          var len19 = dataView(memory0).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
          variant23= {
            tag: 'remote-manifest',
            val: result19
          };
          break;
        }
        case 13: {
          var ptr20 = dataView(memory0).getInt32(ret + 8, true);
          var len20 = dataView(memory0).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
          variant23= {
            tag: 'resource-not-found',
            val: result20
          };
          break;
        }
        case 14: {
          variant23= {
            tag: 'rw-lock',
          };
          break;
        }
        case 15: {
          var ptr21 = dataView(memory0).getInt32(ret + 8, true);
          var len21 = dataView(memory0).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr21, len21));
          variant23= {
            tag: 'signature',
            val: result21
          };
          break;
        }
        case 16: {
          var ptr22 = dataView(memory0).getInt32(ret + 8, true);
          var len22 = dataView(memory0).getInt32(ret + 12, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr22, len22));
          variant23= {
            tag: 'verify',
            val: result22
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant24= {
        tag: 'err',
        val: variant23
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant24;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};

Reader.prototype.json = function json() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable13[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Reader" resource.');
  }
  var handle0 = handleTable13[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = exports1['adobe:cai/manifest@0.1.0#[method]reader.json'](handle0);
  var ptr2 = dataView(memory0).getInt32(ret + 0, true);
  var len2 = dataView(memory0).getInt32(ret + 4, true);
  var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
  const retVal = result2;
  postReturn1(ret);
  return retVal;
};

Reader.prototype.resourceToStream = function resourceToStream(arg1, arg2) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable13[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Reader" resource.');
  }
  var handle0 = handleTable13[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc0, memory0);
  var len2 = utf8EncodedLen;
  var variant5 = arg2;
  let variant5_0;
  let variant5_1;
  switch (variant5.tag) {
    case 'file': {
      const e = variant5.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable6, rep);
      }
      variant5_0 = 0;
      variant5_1 = handle3;
      break;
    }
    case 'stream': {
      const e = variant5.val;
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable3, rep);
      }
      variant5_0 = 1;
      variant5_1 = handle4;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`Output\``);
    }
  }
  const ret = exports1['adobe:cai/manifest@0.1.0#[method]reader.resource-to-stream'](handle0, ptr2, len2, variant5_0, variant5_1);
  let variant23;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant23= {
        tag: 'ok',
        val: BigInt.asUintN(64, dataView(memory0).getBigInt64(ret + 8, true))
      };
      break;
    }
    case 1: {
      let variant22;
      switch (dataView(memory0).getUint8(ret + 8, true)) {
        case 0: {
          var ptr6 = dataView(memory0).getInt32(ret + 12, true);
          var len6 = dataView(memory0).getInt32(ret + 16, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
          variant22= {
            tag: 'assertion',
            val: result6
          };
          break;
        }
        case 1: {
          var ptr7 = dataView(memory0).getInt32(ret + 12, true);
          var len7 = dataView(memory0).getInt32(ret + 16, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
          variant22= {
            tag: 'assertion-not-found',
            val: result7
          };
          break;
        }
        case 2: {
          var ptr8 = dataView(memory0).getInt32(ret + 12, true);
          var len8 = dataView(memory0).getInt32(ret + 16, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
          variant22= {
            tag: 'bad-param',
            val: result8
          };
          break;
        }
        case 3: {
          var ptr9 = dataView(memory0).getInt32(ret + 12, true);
          var len9 = dataView(memory0).getInt32(ret + 16, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
          variant22= {
            tag: 'decoding',
            val: result9
          };
          break;
        }
        case 4: {
          var ptr10 = dataView(memory0).getInt32(ret + 12, true);
          var len10 = dataView(memory0).getInt32(ret + 16, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
          variant22= {
            tag: 'encoding',
            val: result10
          };
          break;
        }
        case 5: {
          var ptr11 = dataView(memory0).getInt32(ret + 12, true);
          var len11 = dataView(memory0).getInt32(ret + 16, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
          variant22= {
            tag: 'file-not-found',
            val: result11
          };
          break;
        }
        case 6: {
          var ptr12 = dataView(memory0).getInt32(ret + 12, true);
          var len12 = dataView(memory0).getInt32(ret + 16, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
          variant22= {
            tag: 'io',
            val: result12
          };
          break;
        }
        case 7: {
          var ptr13 = dataView(memory0).getInt32(ret + 12, true);
          var len13 = dataView(memory0).getInt32(ret + 16, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
          variant22= {
            tag: 'json',
            val: result13
          };
          break;
        }
        case 8: {
          var ptr14 = dataView(memory0).getInt32(ret + 12, true);
          var len14 = dataView(memory0).getInt32(ret + 16, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
          variant22= {
            tag: 'manifest',
            val: result14
          };
          break;
        }
        case 9: {
          var ptr15 = dataView(memory0).getInt32(ret + 12, true);
          var len15 = dataView(memory0).getInt32(ret + 16, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
          variant22= {
            tag: 'manifest-not-found',
            val: result15
          };
          break;
        }
        case 10: {
          var ptr16 = dataView(memory0).getInt32(ret + 12, true);
          var len16 = dataView(memory0).getInt32(ret + 16, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
          variant22= {
            tag: 'not-supported',
            val: result16
          };
          break;
        }
        case 11: {
          var ptr17 = dataView(memory0).getInt32(ret + 12, true);
          var len17 = dataView(memory0).getInt32(ret + 16, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
          variant22= {
            tag: 'other',
            val: result17
          };
          break;
        }
        case 12: {
          var ptr18 = dataView(memory0).getInt32(ret + 12, true);
          var len18 = dataView(memory0).getInt32(ret + 16, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
          variant22= {
            tag: 'remote-manifest',
            val: result18
          };
          break;
        }
        case 13: {
          var ptr19 = dataView(memory0).getInt32(ret + 12, true);
          var len19 = dataView(memory0).getInt32(ret + 16, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
          variant22= {
            tag: 'resource-not-found',
            val: result19
          };
          break;
        }
        case 14: {
          variant22= {
            tag: 'rw-lock',
          };
          break;
        }
        case 15: {
          var ptr20 = dataView(memory0).getInt32(ret + 12, true);
          var len20 = dataView(memory0).getInt32(ret + 16, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
          variant22= {
            tag: 'signature',
            val: result20
          };
          break;
        }
        case 16: {
          var ptr21 = dataView(memory0).getInt32(ret + 12, true);
          var len21 = dataView(memory0).getInt32(ret + 16, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr21, len21));
          variant22= {
            tag: 'verify',
            val: result21
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant23= {
        tag: 'err',
        val: variant22
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant23;
  postReturn2(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
function trampoline0(handle) {
  const handleEntry = rscTableRemove(handleTable6, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable6.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable6.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
const trampoline1 = rscTableCreateOwn.bind(null, handleTable12);
const trampoline2 = rscTableCreateOwn.bind(null, handleTable13);
function trampoline3(handle) {
  const handleEntry = rscTableRemove(handleTable12, handle);
  if (handleEntry.own) {
    
    exports0['23'](handleEntry.rep);
  }
}
function trampoline4(handle) {
  const handleEntry = rscTableRemove(handleTable13, handle);
  if (handleEntry.own) {
    
    exports0['24'](handleEntry.rep);
  }
}
function trampoline5(handle) {
  const handleEntry = rscTableRemove(handleTable3, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable3.delete(handleEntry.rep);
    } else if (OutputStream[symbolCabiDispose]) {
      OutputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline6(handle) {
  const handleEntry = rscTableRemove(handleTable2, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable2.delete(handleEntry.rep);
    } else if (InputStream[symbolCabiDispose]) {
      InputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline7(handle) {
  const handleEntry = rscTableRemove(handleTable1, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline10(handle) {
  const handleEntry = rscTableRemove(handleTable0, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Pollable[symbolCabiDispose]) {
      Pollable[symbolCabiDispose](handleEntry.rep);
    }
  }
}
const handleTable8 = [T_FLAG, 0];
const captureTable8= new Map();
let captureCnt8 = 0;
handleTables[8] = handleTable8;
function trampoline12(handle) {
  const handleEntry = rscTableRemove(handleTable8, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable9 = [T_FLAG, 0];
const captureTable9= new Map();
let captureCnt9 = 0;
handleTables[9] = handleTable9;
function trampoline13(handle) {
  const handleEntry = rscTableRemove(handleTable9, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable10 = [T_FLAG, 0];
const captureTable10= new Map();
let captureCnt10 = 0;
handleTables[10] = handleTable10;
function trampoline14(handle) {
  const handleEntry = rscTableRemove(handleTable10, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable11 = [T_FLAG, 0];
const captureTable11= new Map();
let captureCnt11 = 0;
handleTables[11] = handleTable11;
function trampoline15(handle) {
  const handleEntry = rscTableRemove(handleTable11, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable7 = [T_FLAG, 0];
const captureTable7= new Map();
let captureCnt7 = 0;
handleTables[7] = handleTable7;
function trampoline17(handle) {
  const handleEntry = rscTableRemove(handleTable7, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
function trampoline19(handle) {
  const handleEntry = rscTableRemove(handleTable4, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable4.delete(handleEntry.rep);
    } else if (TerminalInput[symbolCabiDispose]) {
      TerminalInput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline20(handle) {
  const handleEntry = rscTableRemove(handleTable5, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable5.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable5.delete(handleEntry.rep);
    } else if (TerminalOutput[symbolCabiDispose]) {
      TerminalOutput[symbolCabiDispose](handleEntry.rep);
    }
  }
}

const $init = (() => {
  let gen = (function* init () {
    const module0 = fetchCompile(new URL('./c2pacomponent.core.wasm', import.meta.url));
    const module1 = fetchCompile(new URL('./c2pacomponent.core2.wasm', import.meta.url));
    const module2 = base64Compile('AGFzbQEAAAABgwESYAR/fn5/AGAFf39/fn8AYAJ/fwBgA39+fwBgBH9/f38AYAJ/fwF/YAN/fn8Bf2AEf39/fwF/YAR/fn9/AX9gCX9/f39/fn5/fwF/YAZ/f39/f38Bf2ADf39/AX9gAX8Bf2ABfwBgAX8AYAd/f39/f39/AGAHf39/f39/fwBgAn5/AAMxMAABAgMCBAIFBgUHCAcJCgsFBQwFCw0MDQ0ODgIPEAQDAwICAgIDAwIEAgQRDg4ODgQFAXABMDAH8gExATAAAAExAAEBMgACATMAAwE0AAQBNQAFATYABgE3AAcBOAAIATkACQIxMAAKAjExAAsCMTIADAIxMwANAjE0AA4CMTUADwIxNgAQAjE3ABECMTgAEgIxOQATAjIwABQCMjEAFQIyMgAWAjIzABcCMjQAGAIyNQAZAjI2ABoCMjcAGwIyOAAcAjI5AB0CMzAAHgIzMQAfAjMyACACMzMAIQIzNAAiAjM1ACMCMzYAJAIzNwAlAjM4ACYCMzkAJwI0MAAoAjQxACkCNDIAKgI0MwArAjQ0ACwCNDUALQI0NgAuAjQ3AC8IJGltcG9ydHMBAAqLBTAPACAAIAEgAiADQQARAAALEQAgACABIAIgAyAEQQERAQALCwAgACABQQIRAgALDQAgACABIAJBAxEDAAsLACAAIAFBBBECAAsPACAAIAEgAiADQQURBAALCwAgACABQQYRAgALCwAgACABQQcRBQALDQAgACABIAJBCBEGAAsLACAAIAFBCREFAAsPACAAIAEgAiADQQoRBwALDwAgACABIAIgA0ELEQgACw8AIAAgASACIANBDBEHAAsZACAAIAEgAiADIAQgBSAGIAcgCEENEQkACxMAIAAgASACIAMgBCAFQQ4RCgALDQAgACABIAJBDxELAAsLACAAIAFBEBEFAAsLACAAIAFBEREFAAsJACAAQRIRDAALCwAgACABQRMRBQALDQAgACABIAJBFBELAAsJACAAQRURDQALCQAgAEEWEQwACwkAIABBFxENAAsJACAAQRgRDQALCQAgAEEZEQ4ACwkAIABBGhEOAAsLACAAIAFBGxECAAsVACAAIAEgAiADIAQgBSAGQRwRDwALFQAgACABIAIgAyAEIAUgBkEdERAACw8AIAAgASACIANBHhEEAAsNACAAIAEgAkEfEQMACw0AIAAgASACQSARAwALCwAgACABQSERAgALCwAgACABQSIRAgALCwAgACABQSMRAgALCwAgACABQSQRAgALDQAgACABIAJBJREDAAsNACAAIAEgAkEmEQMACwsAIAAgAUEnEQIACw8AIAAgASACIANBKBEEAAsLACAAIAFBKRECAAsPACAAIAEgAiADQSoRBAALCwAgACABQSsREQALCQAgAEEsEQ4ACwkAIABBLREOAAsJACAAQS4RDgALCQAgAEEvEQ4ACwAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjIzLjAA4RQEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQHEFDAAPGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMi1bbWV0aG9kXWRlc2NyaXB0b3IucmVhZAE9aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4yLVttZXRob2RdZGVzY3JpcHRvci53cml0ZQI8aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4yLVttZXRob2RdZGVzY3JpcHRvci5zeW5jA0FpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjItW21ldGhvZF1pbnB1dC1zdHJlYW0uYmxvY2tpbmctcmVhZARAaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4yLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQU6aW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4yLVttZXRob2Rdb3V0cHV0LXN0cmVhbS53cml0ZQY6aW5kaXJlY3Qtd2FzaTppby9lcnJvckAwLjIuMi1bbWV0aG9kXWVycm9yLnRvLWRlYnVnLXN0cmluZwcnYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1yYW5kb21fZ2V0CCthZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWNsb2NrX3RpbWVfZ2V0CSxhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX2ZpbGVzdGF0X2dldAokYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9yZWFkCyRhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3NlZWsMJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfd3JpdGUNJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcGF0aF9vcGVuDihhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXBhdGhfcmVuYW1lDy1hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXBhdGhfdW5saW5rX2ZpbGUQKGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9nZXQRLmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9zaXplc19nZXQSJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfY2xvc2UTK2FkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcHJlc3RhdF9nZXQUMGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcHJlc3RhdF9kaXJfbmFtZRUmYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wcm9jX2V4aXQWMGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtYWRhcHRlcl9jbG9zZV9iYWRmZBcMZHRvci1idWlsZGVyGAtkdG9yLXJlYWRlchkzaW5kaXJlY3Qtd2FzaTpjbGkvZW52aXJvbm1lbnRAMC4yLjMtZ2V0LWVudmlyb25tZW50GilpbmRpcmVjdC13YXNpOmNsb2Nrcy93YWxsLWNsb2NrQDAuMi4zLW5vdxs6aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLWZpbGVzeXN0ZW0tZXJyb3ItY29kZRw/aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5vcGVuLWF0HUFpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLnJlbmFtZS1hdB5GaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci51bmxpbmstZmlsZS1hdB9HaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5yZWFkLXZpYS1zdHJlYW0gSGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3Iud3JpdGUtdmlhLXN0cmVhbSFJaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5hcHBlbmQtdmlhLXN0cmVhbSJAaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5nZXQtdHlwZSM8aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5zdGF0JEVpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLm1ldGFkYXRhLWhhc2glOGluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMy1bbWV0aG9kXWlucHV0LXN0cmVhbS5yZWFkJkFpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjMtW21ldGhvZF1pbnB1dC1zdHJlYW0uYmxvY2tpbmctcmVhZCdAaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZSg6aW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS53cml0ZSlDaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy1mbHVzaCpNaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy13cml0ZS1hbmQtZmx1c2grMmluZGlyZWN0LXdhc2k6cmFuZG9tL3JhbmRvbUAwLjIuMy1nZXQtcmFuZG9tLWJ5dGVzLDdpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjItZ2V0LWRpcmVjdG9yaWVzLTlpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRpbkAwLjIuMy1nZXQtdGVybWluYWwtc3RkaW4uO2luZGlyZWN0LXdhc2k6Y2xpL3Rlcm1pbmFsLXN0ZG91dEAwLjIuMy1nZXQtdGVybWluYWwtc3Rkb3V0LztpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRlcnJAMC4yLjMtZ2V0LXRlcm1pbmFsLXN0ZGVycg');
    const module3 = base64Compile('AGFzbQEAAAABgwESYAR/fn5/AGAFf39/fn8AYAJ/fwBgA39+fwBgBH9/f38AYAJ/fwF/YAN/fn8Bf2AEf39/fwF/YAR/fn9/AX9gCX9/f39/fn5/fwF/YAZ/f39/f38Bf2ADf39/AX9gAX8Bf2ABfwBgAX8AYAd/f39/f39/AGAHf39/f39/fwBgAn5/AAKmAjEAATAAAAABMQABAAEyAAIAATMAAwABNAACAAE1AAQAATYAAgABNwAFAAE4AAYAATkABQACMTAABwACMTEACAACMTIABwACMTMACQACMTQACgACMTUACwACMTYABQACMTcABQACMTgADAACMTkABQACMjAACwACMjEADQACMjIADAACMjMADQACMjQADQACMjUADgACMjYADgACMjcAAgACMjgADwACMjkAEAACMzAABAACMzEAAwACMzIAAwACMzMAAgACMzQAAgACMzUAAgACMzYAAgACMzcAAwACMzgAAwACMzkAAgACNDAABAACNDEAAgACNDIABAACNDMAEQACNDQADgACNDUADgACNDYADgACNDcADgAIJGltcG9ydHMBcAEwMAk2AQBBAAswAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vAC8JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQHMC4yMjMuMAAcBG5hbWUAFRR3aXQtY29tcG9uZW50OmZpeHVwcw');
    ({ exports: exports0 } = yield instantiateCore(yield module2));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      '[export]adobe:cai/manifest@0.1.0': {
        '[resource-drop]builder': trampoline3,
        '[resource-drop]reader': trampoline4,
        '[resource-new]builder': trampoline1,
        '[resource-new]reader': trampoline2,
      },
      'wasi:filesystem/types@0.2.2': {
        '[method]descriptor.read': exports0['0'],
        '[method]descriptor.sync': exports0['2'],
        '[method]descriptor.write': exports0['1'],
        '[resource-drop]descriptor': trampoline0,
      },
      'wasi:io/error@0.2.2': {
        '[method]error.to-debug-string': exports0['6'],
        '[resource-drop]error': trampoline7,
      },
      'wasi:io/poll@0.2.0': {
        '[resource-drop]pollable': trampoline10,
      },
      'wasi:io/poll@0.2.2': {
        '[method]pollable.block': trampoline9,
        '[resource-drop]pollable': trampoline10,
      },
      'wasi:io/streams@0.2.0': {
        '[resource-drop]input-stream': trampoline6,
        '[resource-drop]output-stream': trampoline5,
      },
      'wasi:io/streams@0.2.2': {
        '[method]input-stream.blocking-read': exports0['3'],
        '[method]output-stream.check-write': exports0['4'],
        '[method]output-stream.subscribe': trampoline8,
        '[method]output-stream.write': exports0['5'],
        '[resource-drop]input-stream': trampoline6,
        '[resource-drop]output-stream': trampoline5,
      },
      'wasi:random/random@0.2.2': {
        'get-random-u64': trampoline11,
      },
      'wasi:sockets/tcp@0.2.0': {
        '[resource-drop]tcp-socket': trampoline15,
      },
      'wasi:sockets/udp@0.2.0': {
        '[resource-drop]incoming-datagram-stream': trampoline13,
        '[resource-drop]outgoing-datagram-stream': trampoline14,
        '[resource-drop]udp-socket': trampoline12,
      },
      wasi_snapshot_preview1: {
        adapter_close_badfd: exports0['22'],
        clock_time_get: exports0['8'],
        environ_get: exports0['16'],
        environ_sizes_get: exports0['17'],
        fd_close: exports0['18'],
        fd_filestat_get: exports0['9'],
        fd_prestat_dir_name: exports0['20'],
        fd_prestat_get: exports0['19'],
        fd_read: exports0['10'],
        fd_seek: exports0['11'],
        fd_write: exports0['12'],
        path_open: exports0['13'],
        path_rename: exports0['14'],
        path_unlink_file: exports0['15'],
        proc_exit: exports0['21'],
        random_get: exports0['7'],
      },
    }));
    ({ exports: exports2 } = yield instantiateCore(yield module1, {
      __main_module__: {
        cabi_realloc: exports1.cabi_realloc,
      },
      env: {
        memory: exports1.memory,
      },
      'wasi:cli/environment@0.2.3': {
        'get-environment': exports0['25'],
      },
      'wasi:cli/exit@0.2.3': {
        exit: trampoline23,
      },
      'wasi:cli/stderr@0.2.3': {
        'get-stderr': trampoline18,
      },
      'wasi:cli/stdin@0.2.3': {
        'get-stdin': trampoline21,
      },
      'wasi:cli/stdout@0.2.3': {
        'get-stdout': trampoline22,
      },
      'wasi:cli/terminal-input@0.2.3': {
        '[resource-drop]terminal-input': trampoline19,
      },
      'wasi:cli/terminal-output@0.2.3': {
        '[resource-drop]terminal-output': trampoline20,
      },
      'wasi:cli/terminal-stderr@0.2.3': {
        'get-terminal-stderr': exports0['47'],
      },
      'wasi:cli/terminal-stdin@0.2.3': {
        'get-terminal-stdin': exports0['45'],
      },
      'wasi:cli/terminal-stdout@0.2.3': {
        'get-terminal-stdout': exports0['46'],
      },
      'wasi:clocks/monotonic-clock@0.2.3': {
        now: trampoline16,
      },
      'wasi:clocks/wall-clock@0.2.3': {
        now: exports0['26'],
      },
      'wasi:filesystem/preopens@0.2.2': {
        'get-directories': exports0['44'],
      },
      'wasi:filesystem/types@0.2.3': {
        '[method]descriptor.append-via-stream': exports0['33'],
        '[method]descriptor.get-type': exports0['34'],
        '[method]descriptor.metadata-hash': exports0['36'],
        '[method]descriptor.open-at': exports0['28'],
        '[method]descriptor.read-via-stream': exports0['31'],
        '[method]descriptor.rename-at': exports0['29'],
        '[method]descriptor.stat': exports0['35'],
        '[method]descriptor.unlink-file-at': exports0['30'],
        '[method]descriptor.write-via-stream': exports0['32'],
        '[resource-drop]descriptor': trampoline0,
        '[resource-drop]directory-entry-stream': trampoline17,
        'filesystem-error-code': exports0['27'],
      },
      'wasi:io/error@0.2.3': {
        '[resource-drop]error': trampoline7,
      },
      'wasi:io/streams@0.2.3': {
        '[method]input-stream.blocking-read': exports0['38'],
        '[method]input-stream.read': exports0['37'],
        '[method]output-stream.blocking-flush': exports0['41'],
        '[method]output-stream.blocking-write-and-flush': exports0['42'],
        '[method]output-stream.check-write': exports0['39'],
        '[method]output-stream.write': exports0['40'],
        '[resource-drop]input-stream': trampoline6,
        '[resource-drop]output-stream': trampoline5,
      },
      'wasi:random/random@0.2.3': {
        'get-random-bytes': exports0['43'],
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports1.cabi_realloc;
    realloc1 = exports2.cabi_import_realloc;
    ({ exports: exports3 } = yield instantiateCore(yield module3, {
      '': {
        $imports: exports0.$imports,
        '0': trampoline24,
        '1': trampoline25,
        '10': exports2.fd_read,
        '11': exports2.fd_seek,
        '12': exports2.fd_write,
        '13': exports2.path_open,
        '14': exports2.path_rename,
        '15': exports2.path_unlink_file,
        '16': exports2.environ_get,
        '17': exports2.environ_sizes_get,
        '18': exports2.fd_close,
        '19': exports2.fd_prestat_get,
        '2': trampoline26,
        '20': exports2.fd_prestat_dir_name,
        '21': exports2.proc_exit,
        '22': exports2.adapter_close_badfd,
        '23': exports1['adobe:cai/manifest@0.1.0#[dtor]builder'],
        '24': exports1['adobe:cai/manifest@0.1.0#[dtor]reader'],
        '25': trampoline31,
        '26': trampoline32,
        '27': trampoline33,
        '28': trampoline34,
        '29': trampoline35,
        '3': trampoline27,
        '30': trampoline36,
        '31': trampoline37,
        '32': trampoline38,
        '33': trampoline39,
        '34': trampoline40,
        '35': trampoline41,
        '36': trampoline42,
        '37': trampoline43,
        '38': trampoline44,
        '39': trampoline28,
        '4': trampoline28,
        '40': trampoline29,
        '41': trampoline45,
        '42': trampoline46,
        '43': trampoline47,
        '44': trampoline48,
        '45': trampoline49,
        '46': trampoline50,
        '47': trampoline51,
        '5': trampoline29,
        '6': trampoline30,
        '7': exports2.random_get,
        '8': exports2.clock_time_get,
        '9': exports2.fd_filestat_get,
      },
    }));
    postReturn0 = exports1['cabi_post_adobe:cai/manifest@0.1.0#[method]builder.add-ingredient'];
    postReturn1 = exports1['cabi_post_adobe:cai/manifest@0.1.0#[method]reader.json'];
    postReturn2 = exports1['cabi_post_adobe:cai/manifest@0.1.0#[method]reader.resource-to-stream'];
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;
const manifest010 = {
  Builder: Builder,
  Reader: Reader,
  
};

export { manifest010 as manifest, manifest010 as 'adobe:cai/manifest@0.1.0',  }