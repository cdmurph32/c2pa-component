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
const { getRandomBytes } = random;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

function clampGuest(i, min, max) {
  if (i < min || i > max) throw new TypeError(`must be between ${min} and ${max}`);
  return i;
}

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

function throwInvalidBool() {
  throw new TypeError('invalid variant discriminant for bool');
}

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
let exports1;
const handleTable13 = [T_FLAG, 0];
const captureTable3= new Map();
let captureCnt3 = 0;
handleTables[13] = handleTable13;

function trampoline4() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable13, rep);
  }
  return handle0;
}

const handleTable14 = [T_FLAG, 0];
const captureTable2= new Map();
let captureCnt2 = 0;
handleTables[14] = handleTable14;

function trampoline5() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable14, rep);
  }
  return handle0;
}


function trampoline6() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable13, rep);
  }
  return handle0;
}


function trampoline7(arg0) {
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

function trampoline8(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

const handleTable15 = [T_FLAG, 0];
const captureTable0= new Map();
let captureCnt0 = 0;
handleTables[15] = handleTable15;

function trampoline9(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable15[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
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

const handleTable12 = [T_FLAG, 0];
const captureTable4= new Map();
let captureCnt4 = 0;
handleTables[12] = handleTable12;

function trampoline10(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
        handle3 = rscTableCreateOwn(handleTable13, rep);
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


function trampoline11(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
        handle3 = rscTableCreateOwn(handleTable13, rep);
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


function trampoline12(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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


function trampoline13(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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


function trampoline14(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable13[(handle1 << 1) + 1] & ~T_FLAG;
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
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable15, rep);
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


function trampoline15(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable13[(handle1 << 1) + 1] & ~T_FLAG;
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
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable15, rep);
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


function trampoline16(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable13[(handle1 << 1) + 1] & ~T_FLAG;
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
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable15, rep);
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


function trampoline17(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable13[(handle1 << 1) + 1] & ~T_FLAG;
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
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable15, rep);
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


function trampoline18(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt4;
      captureTable4.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable12, rep);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

let exports3;
let exports4;
const handleTable21 = [T_FLAG, 0];
const captureTable1= new Map();
let captureCnt1 = 0;
handleTables[21] = handleTable21;

function trampoline27(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable21[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
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

const handleTable19 = [T_FLAG, 0];
handleTables[19] = handleTable19;

function trampoline29(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
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
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable21, rep);
  }
  return handle3;
}

let exports5;

function trampoline37() {
  const ret = now();
  return toUint64(ret);
}


function trampoline43() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable19, rep);
  }
  return handle0;
}

const handleTable20 = [T_FLAG, 0];
handleTables[20] = handleTable20;

function trampoline46() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable20, rep);
  }
  return handle0;
}


function trampoline47() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable19, rep);
  }
  return handle0;
}


function trampoline48(arg0) {
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

let exports6;
let memory1;
let exports7;
let realloc1;
let realloc2;
const handleTable18 = [T_FLAG, 0];
handleTables[18] = handleTable18;

function trampoline50(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
      dataView(memory1).setInt8(arg3 + 0, 0, true);
      var [tuple3_0, tuple3_1] = e;
      var val4 = tuple3_0;
      var len4 = val4.byteLength;
      var ptr4 = realloc1(0, 0, 1, len4 * 1);
      var src4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, len4 * 1);
      (new Uint8Array(memory1.buffer, ptr4, len4 * 1)).set(src4);
      dataView(memory1).setInt32(arg3 + 8, len4, true);
      dataView(memory1).setInt32(arg3 + 4, ptr4, true);
      dataView(memory1).setInt8(arg3 + 12, tuple3_1 ? 1 : 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory1).setInt8(arg3 + 0, 1, true);
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
      dataView(memory1).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline51(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory1.buffer.slice(ptr3, ptr3 + len3 * 1));
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
      dataView(memory1).setInt8(arg4 + 0, 0, true);
      dataView(memory1).setBigInt64(arg4 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg4 + 0, 1, true);
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
      dataView(memory1).setInt8(arg4 + 8, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline52(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
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
      dataView(memory1).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

const handleTable22 = [T_FLAG, 0];
handleTables[22] = handleTable22;

function trampoline53(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable20[(handle1 << 1) + 1] & ~T_FLAG;
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
      dataView(memory1).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc1(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory1.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory1).setInt32(arg2 + 8, len3, true);
      dataView(memory1).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory1).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory1).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg2 + 4, 1, true);
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


function trampoline54(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
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
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      dataView(memory1).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory1).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg1 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg1 + 8, 1, true);
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


function trampoline55(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory1.buffer.slice(ptr3, ptr3 + len3 * 1));
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
      dataView(memory1).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory1).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory1).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg3 + 4, 1, true);
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


function trampoline56(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable22[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
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
  var ptr3 = utf8Encode(ret, realloc1, memory1);
  var len3 = utf8EncodedLen;
  dataView(memory1).setInt32(arg1 + 4, len3, true);
  dataView(memory1).setInt32(arg1 + 0, ptr3, true);
}


function trampoline57(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc2(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc2, memory1);
    var len1 = utf8EncodedLen;
    dataView(memory1).setInt32(base + 4, len1, true);
    dataView(memory1).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc2, memory1);
    var len2 = utf8EncodedLen;
    dataView(memory1).setInt32(base + 12, len2, true);
    dataView(memory1).setInt32(base + 8, ptr2, true);
  }
  dataView(memory1).setInt32(arg0 + 4, len3, true);
  dataView(memory1).setInt32(arg0 + 0, result3, true);
}


function trampoline58(arg0) {
  const ret = now$1();
  var {seconds: v0_0, nanoseconds: v0_1 } = ret;
  dataView(memory1).setBigInt64(arg0 + 0, toUint64(v0_0), true);
  dataView(memory1).setInt32(arg0 + 8, toUint32(v0_1), true);
}


function trampoline59(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable22[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
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
    dataView(memory1).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory1).setInt8(arg1 + 0, 1, true);
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
    dataView(memory1).setInt8(arg1 + 1, enum3, true);
  }
}


function trampoline60(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr3, len3));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.createDirectoryAt(result3)};
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
      dataView(memory1).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg3 + 0, 1, true);
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
      dataView(memory1).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline61(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
  var result4 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr4, len4));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.statAt(flags3, result4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant14 = ret;
  switch (variant14.tag) {
    case 'ok': {
      const e = variant14.val;
      dataView(memory1).setInt8(arg4 + 0, 0, true);
      var {type: v5_0, linkCount: v5_1, size: v5_2, dataAccessTimestamp: v5_3, dataModificationTimestamp: v5_4, statusChangeTimestamp: v5_5 } = e;
      var val6 = v5_0;
      let enum6;
      switch (val6) {
        case 'unknown': {
          enum6 = 0;
          break;
        }
        case 'block-device': {
          enum6 = 1;
          break;
        }
        case 'character-device': {
          enum6 = 2;
          break;
        }
        case 'directory': {
          enum6 = 3;
          break;
        }
        case 'fifo': {
          enum6 = 4;
          break;
        }
        case 'symbolic-link': {
          enum6 = 5;
          break;
        }
        case 'regular-file': {
          enum6 = 6;
          break;
        }
        case 'socket': {
          enum6 = 7;
          break;
        }
        default: {
          if ((v5_0) instanceof Error) {
            console.error(v5_0);
          }
          
          throw new TypeError(`"${val6}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory1).setInt8(arg4 + 8, enum6, true);
      dataView(memory1).setBigInt64(arg4 + 16, toUint64(v5_1), true);
      dataView(memory1).setBigInt64(arg4 + 24, toUint64(v5_2), true);
      var variant8 = v5_3;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory1).setInt8(arg4 + 32, 0, true);
      } else {
        const e = variant8;
        dataView(memory1).setInt8(arg4 + 32, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory1).setBigInt64(arg4 + 40, toUint64(v7_0), true);
        dataView(memory1).setInt32(arg4 + 48, toUint32(v7_1), true);
      }
      var variant10 = v5_4;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory1).setInt8(arg4 + 56, 0, true);
      } else {
        const e = variant10;
        dataView(memory1).setInt8(arg4 + 56, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory1).setBigInt64(arg4 + 64, toUint64(v9_0), true);
        dataView(memory1).setInt32(arg4 + 72, toUint32(v9_1), true);
      }
      var variant12 = v5_5;
      if (variant12 === null || variant12=== undefined) {
        dataView(memory1).setInt8(arg4 + 80, 0, true);
      } else {
        const e = variant12;
        dataView(memory1).setInt8(arg4 + 80, 1, true);
        var {seconds: v11_0, nanoseconds: v11_1 } = e;
        dataView(memory1).setBigInt64(arg4 + 88, toUint64(v11_0), true);
        dataView(memory1).setInt32(arg4 + 96, toUint32(v11_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant14.val;
      dataView(memory1).setInt8(arg4 + 0, 1, true);
      var val13 = e;
      let enum13;
      switch (val13) {
        case 'access': {
          enum13 = 0;
          break;
        }
        case 'would-block': {
          enum13 = 1;
          break;
        }
        case 'already': {
          enum13 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum13 = 3;
          break;
        }
        case 'busy': {
          enum13 = 4;
          break;
        }
        case 'deadlock': {
          enum13 = 5;
          break;
        }
        case 'quota': {
          enum13 = 6;
          break;
        }
        case 'exist': {
          enum13 = 7;
          break;
        }
        case 'file-too-large': {
          enum13 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum13 = 9;
          break;
        }
        case 'in-progress': {
          enum13 = 10;
          break;
        }
        case 'interrupted': {
          enum13 = 11;
          break;
        }
        case 'invalid': {
          enum13 = 12;
          break;
        }
        case 'io': {
          enum13 = 13;
          break;
        }
        case 'is-directory': {
          enum13 = 14;
          break;
        }
        case 'loop': {
          enum13 = 15;
          break;
        }
        case 'too-many-links': {
          enum13 = 16;
          break;
        }
        case 'message-size': {
          enum13 = 17;
          break;
        }
        case 'name-too-long': {
          enum13 = 18;
          break;
        }
        case 'no-device': {
          enum13 = 19;
          break;
        }
        case 'no-entry': {
          enum13 = 20;
          break;
        }
        case 'no-lock': {
          enum13 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum13 = 22;
          break;
        }
        case 'insufficient-space': {
          enum13 = 23;
          break;
        }
        case 'not-directory': {
          enum13 = 24;
          break;
        }
        case 'not-empty': {
          enum13 = 25;
          break;
        }
        case 'not-recoverable': {
          enum13 = 26;
          break;
        }
        case 'unsupported': {
          enum13 = 27;
          break;
        }
        case 'no-tty': {
          enum13 = 28;
          break;
        }
        case 'no-such-device': {
          enum13 = 29;
          break;
        }
        case 'overflow': {
          enum13 = 30;
          break;
        }
        case 'not-permitted': {
          enum13 = 31;
          break;
        }
        case 'pipe': {
          enum13 = 32;
          break;
        }
        case 'read-only': {
          enum13 = 33;
          break;
        }
        case 'invalid-seek': {
          enum13 = 34;
          break;
        }
        case 'text-file-busy': {
          enum13 = 35;
          break;
        }
        case 'cross-device': {
          enum13 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val13}" is not one of the cases of error-code`);
        }
      }
      dataView(memory1).setInt8(arg4 + 8, enum13, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline62(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
  var result4 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr4, len4));
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
      dataView(memory1).setInt8(arg6 + 0, 0, true);
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle7 = e[symbolRscHandle];
      if (!handle7) {
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle7 = rscTableCreateOwn(handleTable18, rep);
      }
      dataView(memory1).setInt32(arg6 + 4, handle7, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory1).setInt8(arg6 + 0, 1, true);
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
      dataView(memory1).setInt8(arg6 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline63(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr3, len3));
  var handle5 = arg3;
  var rep6 = handleTable18[(handle5 << 1) + 1] & ~T_FLAG;
  var rsc4 = captureTable4.get(rep6);
  if (!rsc4) {
    rsc4 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc4, symbolRscHandle, { writable: true, value: handle5});
    Object.defineProperty(rsc4, symbolRscRep, { writable: true, value: rep6});
  }
  curResourceBorrows.push(rsc4);
  var ptr7 = arg4;
  var len7 = arg5;
  var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
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
      dataView(memory1).setInt8(arg6 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory1).setInt8(arg6 + 0, 1, true);
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
      dataView(memory1).setInt8(arg6 + 1, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline64(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr3, len3));
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
      dataView(memory1).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg3 + 0, 1, true);
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
      dataView(memory1).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline65(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
      dataView(memory1).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable20, rep);
      }
      dataView(memory1).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg2 + 0, 1, true);
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
      dataView(memory1).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline66(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
      dataView(memory1).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable19, rep);
      }
      dataView(memory1).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg2 + 0, 1, true);
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
      dataView(memory1).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline67(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable19, rep);
      }
      dataView(memory1).setInt32(arg1 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
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
      dataView(memory1).setInt8(arg1 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline68(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
      dataView(memory1).setInt8(arg1 + 0, 0, true);
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
      dataView(memory1).setInt8(arg1 + 1, enum3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
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
      dataView(memory1).setInt8(arg1 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline69(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
      dataView(memory1).setInt8(arg1 + 0, 0, true);
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
      dataView(memory1).setInt8(arg1 + 8, enum4, true);
      dataView(memory1).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      dataView(memory1).setBigInt64(arg1 + 24, toUint64(v3_2), true);
      var variant6 = v3_3;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory1).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant6;
        dataView(memory1).setInt8(arg1 + 32, 1, true);
        var {seconds: v5_0, nanoseconds: v5_1 } = e;
        dataView(memory1).setBigInt64(arg1 + 40, toUint64(v5_0), true);
        dataView(memory1).setInt32(arg1 + 48, toUint32(v5_1), true);
      }
      var variant8 = v3_4;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory1).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant8;
        dataView(memory1).setInt8(arg1 + 56, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory1).setBigInt64(arg1 + 64, toUint64(v7_0), true);
        dataView(memory1).setInt32(arg1 + 72, toUint32(v7_1), true);
      }
      var variant10 = v3_5;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory1).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant10;
        dataView(memory1).setInt8(arg1 + 80, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory1).setBigInt64(arg1 + 88, toUint64(v9_0), true);
        dataView(memory1).setInt32(arg1 + 96, toUint32(v9_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant12.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
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
      dataView(memory1).setInt8(arg1 + 8, enum11, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline70(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      var {lower: v3_0, upper: v3_1 } = e;
      dataView(memory1).setBigInt64(arg1 + 8, toUint64(v3_0), true);
      dataView(memory1).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
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
      dataView(memory1).setInt8(arg1 + 8, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline71(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable18[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
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
  var result4 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr4, len4));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.metadataHashAt(flags3, result4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory1).setInt8(arg4 + 0, 0, true);
      var {lower: v5_0, upper: v5_1 } = e;
      dataView(memory1).setBigInt64(arg4 + 8, toUint64(v5_0), true);
      dataView(memory1).setBigInt64(arg4 + 16, toUint64(v5_1), true);
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory1).setInt8(arg4 + 0, 1, true);
      var val6 = e;
      let enum6;
      switch (val6) {
        case 'access': {
          enum6 = 0;
          break;
        }
        case 'would-block': {
          enum6 = 1;
          break;
        }
        case 'already': {
          enum6 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum6 = 3;
          break;
        }
        case 'busy': {
          enum6 = 4;
          break;
        }
        case 'deadlock': {
          enum6 = 5;
          break;
        }
        case 'quota': {
          enum6 = 6;
          break;
        }
        case 'exist': {
          enum6 = 7;
          break;
        }
        case 'file-too-large': {
          enum6 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum6 = 9;
          break;
        }
        case 'in-progress': {
          enum6 = 10;
          break;
        }
        case 'interrupted': {
          enum6 = 11;
          break;
        }
        case 'invalid': {
          enum6 = 12;
          break;
        }
        case 'io': {
          enum6 = 13;
          break;
        }
        case 'is-directory': {
          enum6 = 14;
          break;
        }
        case 'loop': {
          enum6 = 15;
          break;
        }
        case 'too-many-links': {
          enum6 = 16;
          break;
        }
        case 'message-size': {
          enum6 = 17;
          break;
        }
        case 'name-too-long': {
          enum6 = 18;
          break;
        }
        case 'no-device': {
          enum6 = 19;
          break;
        }
        case 'no-entry': {
          enum6 = 20;
          break;
        }
        case 'no-lock': {
          enum6 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum6 = 22;
          break;
        }
        case 'insufficient-space': {
          enum6 = 23;
          break;
        }
        case 'not-directory': {
          enum6 = 24;
          break;
        }
        case 'not-empty': {
          enum6 = 25;
          break;
        }
        case 'not-recoverable': {
          enum6 = 26;
          break;
        }
        case 'unsupported': {
          enum6 = 27;
          break;
        }
        case 'no-tty': {
          enum6 = 28;
          break;
        }
        case 'no-such-device': {
          enum6 = 29;
          break;
        }
        case 'overflow': {
          enum6 = 30;
          break;
        }
        case 'not-permitted': {
          enum6 = 31;
          break;
        }
        case 'pipe': {
          enum6 = 32;
          break;
        }
        case 'read-only': {
          enum6 = 33;
          break;
        }
        case 'invalid-seek': {
          enum6 = 34;
          break;
        }
        case 'text-file-busy': {
          enum6 = 35;
          break;
        }
        case 'cross-device': {
          enum6 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val6}" is not one of the cases of error-code`);
        }
      }
      dataView(memory1).setInt8(arg4 + 8, enum6, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline72(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable20[(handle1 << 1) + 1] & ~T_FLAG;
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
      dataView(memory1).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc2(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory1.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory1).setInt32(arg2 + 8, len3, true);
      dataView(memory1).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory1).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory1).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg2 + 4, 1, true);
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


function trampoline73(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable20[(handle1 << 1) + 1] & ~T_FLAG;
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
      dataView(memory1).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc2(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory1.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory1).setInt32(arg2 + 8, len3, true);
      dataView(memory1).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory1).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory1).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg2 + 4, 1, true);
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


function trampoline74(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
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
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      dataView(memory1).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory1).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg1 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg1 + 8, 1, true);
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


function trampoline75(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory1.buffer.slice(ptr3, ptr3 + len3 * 1));
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
      dataView(memory1).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory1).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory1).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg3 + 4, 1, true);
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


function trampoline76(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
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
      dataView(memory1).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory1).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory1).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg1 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg1 + 4, 1, true);
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


function trampoline77(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory1.buffer.slice(ptr3, ptr3 + len3 * 1));
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
      dataView(memory1).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory1).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory1).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable22, rep);
          }
          dataView(memory1).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory1).setInt8(arg3 + 4, 1, true);
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


function trampoline78(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc2(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory1.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory1).setInt32(arg1 + 4, len0, true);
  dataView(memory1).setInt32(arg1 + 0, ptr0, true);
}


function trampoline79(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc2(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt4;
      captureTable4.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable18, rep);
    }
    dataView(memory1).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc2, memory1);
    var len2 = utf8EncodedLen;
    dataView(memory1).setInt32(base + 8, len2, true);
    dataView(memory1).setInt32(base + 4, ptr2, true);
  }
  dataView(memory1).setInt32(arg0 + 4, len3, true);
  dataView(memory1).setInt32(arg0 + 0, result3, true);
}

const handleTable28 = [T_FLAG, 0];
const captureTable6= new Map();
let captureCnt6 = 0;
handleTables[28] = handleTable28;

function trampoline80(arg0) {
  const ret = getTerminalStdin();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory1).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory1).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalInput)) {
      throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt6;
      captureTable6.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable28, rep);
    }
    dataView(memory1).setInt32(arg0 + 4, handle0, true);
  }
}

const handleTable29 = [T_FLAG, 0];
const captureTable7= new Map();
let captureCnt7 = 0;
handleTables[29] = handleTable29;

function trampoline81(arg0) {
  const ret = getTerminalStdout();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory1).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory1).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt7;
      captureTable7.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable29, rep);
    }
    dataView(memory1).setInt32(arg0 + 4, handle0, true);
  }
}


function trampoline82(arg0) {
  const ret = getTerminalStderr();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory1).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory1).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt7;
      captureTable7.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable29, rep);
    }
    dataView(memory1).setInt32(arg0 + 4, handle0, true);
  }
}

let exports8;
let postReturn0;
let postReturn1;
let postReturn2;
let postReturn3;
let postReturn4;
let postReturn5;
function trampoline0(handle) {
  const handleEntry = rscTableRemove(handleTable12, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable4.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline1(handle) {
  const handleEntry = rscTableRemove(handleTable13, handle);
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
function trampoline2(handle) {
  const handleEntry = rscTableRemove(handleTable15, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline3(handle) {
  const handleEntry = rscTableRemove(handleTable14, handle);
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
const handleTable16 = [T_FLAG, 0];
const finalizationRegistry16 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable16, handle);
  exports4['26'](rep);
});

handleTables[16] = handleTable16;
const trampoline19 = rscTableCreateOwn.bind(null, handleTable16);
const handleTable17 = [T_FLAG, 0];
const finalizationRegistry17 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable17, handle);
  exports4['27'](rep);
});

handleTables[17] = handleTable17;
const trampoline20 = rscTableCreateOwn.bind(null, handleTable17);
function trampoline21(handle) {
  const handleEntry = rscTableRemove(handleTable16, handle);
  if (handleEntry.own) {
    
    exports4['26'](handleEntry.rep);
  }
}
function trampoline22(handle) {
  const handleEntry = rscTableRemove(handleTable17, handle);
  if (handleEntry.own) {
    
    exports4['27'](handleEntry.rep);
  }
}
function trampoline23(handle) {
  const handleEntry = rscTableRemove(handleTable18, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable4.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline24(handle) {
  const handleEntry = rscTableRemove(handleTable19, handle);
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
function trampoline25(handle) {
  const handleEntry = rscTableRemove(handleTable20, handle);
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
function trampoline26(handle) {
  const handleEntry = rscTableRemove(handleTable22, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline28(handle) {
  const handleEntry = rscTableRemove(handleTable21, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (Pollable[symbolCabiDispose]) {
      Pollable[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline30(handle) {
  const handleEntry = rscTableRemove(handleTable21, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (Pollable[symbolCabiDispose]) {
      Pollable[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline31(handle) {
  const handleEntry = rscTableRemove(handleTable20, handle);
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
function trampoline32(handle) {
  const handleEntry = rscTableRemove(handleTable19, handle);
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
const handleTable23 = [T_FLAG, 0];
const captureTable8= new Map();
let captureCnt8 = 0;
handleTables[23] = handleTable23;
function trampoline33(handle) {
  const handleEntry = rscTableRemove(handleTable23, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable24 = [T_FLAG, 0];
const captureTable9= new Map();
let captureCnt9 = 0;
handleTables[24] = handleTable24;
function trampoline34(handle) {
  const handleEntry = rscTableRemove(handleTable24, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable25 = [T_FLAG, 0];
const captureTable10= new Map();
let captureCnt10 = 0;
handleTables[25] = handleTable25;
function trampoline35(handle) {
  const handleEntry = rscTableRemove(handleTable25, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable26 = [T_FLAG, 0];
const captureTable11= new Map();
let captureCnt11 = 0;
handleTables[26] = handleTable26;
function trampoline36(handle) {
  const handleEntry = rscTableRemove(handleTable26, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
const handleTable27 = [T_FLAG, 0];
const captureTable5= new Map();
let captureCnt5 = 0;
handleTables[27] = handleTable27;
function trampoline38(handle) {
  const handleEntry = rscTableRemove(handleTable27, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
function trampoline39(handle) {
  const handleEntry = rscTableRemove(handleTable18, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable4.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline40(handle) {
  const handleEntry = rscTableRemove(handleTable19, handle);
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
function trampoline41(handle) {
  const handleEntry = rscTableRemove(handleTable22, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline42(handle) {
  const handleEntry = rscTableRemove(handleTable20, handle);
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
function trampoline44(handle) {
  const handleEntry = rscTableRemove(handleTable28, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable6.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable6.delete(handleEntry.rep);
    } else if (TerminalInput[symbolCabiDispose]) {
      TerminalInput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline45(handle) {
  const handleEntry = rscTableRemove(handleTable29, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable7.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable7.delete(handleEntry.rep);
    } else if (TerminalOutput[symbolCabiDispose]) {
      TerminalOutput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let c2pa010ConstructorBuilder;

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
      var ptr0 = utf8Encode(e, realloc1, memory1);
      var len0 = utf8EncodedLen;
      variant1_0 = 1;
      variant1_1 = ptr0;
      variant1_2 = len0;
    }
    const ret = c2pa010ConstructorBuilder(variant1_0, variant1_1, variant1_2);
    var handle3 = ret;
    var rsc2 = new.target === Builder ? this : Object.create(Builder.prototype);
    Object.defineProperty(rsc2, symbolRscHandle, { writable: true, value: handle3});
    finalizationRegistry16.register(rsc2, handle3, rsc2);
    Object.defineProperty(rsc2, symbolDispose, { writable: true, value: function () {
      finalizationRegistry16.unregister(rsc2);
      rscTableRemove(handleTable16, handle3);
      rsc2[symbolDispose] = emptyFunc;
      rsc2[symbolRscHandle] = undefined;
      exports4['26'](handleTable16[(handle3 << 1) + 1] & ~T_FLAG);
    }});
    return rsc2;
  }
}
let c2pa010MethodBuilderSetRemoteUrl;

Builder.prototype.setRemoteUrl = function setRemoteUrl(arg1) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable16[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc1, memory1);
  var len2 = utf8EncodedLen;
  c2pa010MethodBuilderSetRemoteUrl(handle0, ptr2, len2);
};
let c2pa010MethodBuilderSetNoEmbed;

Builder.prototype.setNoEmbed = function setNoEmbed(arg1) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable16[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
  c2pa010MethodBuilderSetNoEmbed(handle0, arg1 ? 1 : 0);
};
let c2pa010MethodBuilderAddAssertion;

Builder.prototype.addAssertion = function addAssertion(arg1, arg2, arg3) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable16[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc1, memory1);
  var len2 = utf8EncodedLen;
  var ptr3 = utf8Encode(arg2, realloc1, memory1);
  var len3 = utf8EncodedLen;
  var variant5 = arg3;
  let variant5_0;
  let variant5_1;
  if (variant5 === null || variant5=== undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
  } else {
    const e = variant5;
    var variant4 = e;
    let variant4_0;
    switch (variant4.tag) {
      case 'json': {
        variant4_0 = 0;
        break;
      }
      case 'cbor': {
        variant4_0 = 1;
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`AssertionType\``);
      }
    }
    variant5_0 = 1;
    variant5_1 = variant4_0;
  }
  const ret = c2pa010MethodBuilderAddAssertion(handle0, ptr2, len2, ptr3, len3, variant5_0, variant5_1);
  let variant24;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      variant24= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      let variant23;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr6 = dataView(memory1).getInt32(ret + 8, true);
          var len6 = dataView(memory1).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr6, len6));
          variant23= {
            tag: 'assertion',
            val: result6
          };
          break;
        }
        case 1: {
          var ptr7 = dataView(memory1).getInt32(ret + 8, true);
          var len7 = dataView(memory1).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant23= {
            tag: 'assertion-not-found',
            val: result7
          };
          break;
        }
        case 2: {
          var ptr8 = dataView(memory1).getInt32(ret + 8, true);
          var len8 = dataView(memory1).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant23= {
            tag: 'bad-param',
            val: result8
          };
          break;
        }
        case 3: {
          var ptr9 = dataView(memory1).getInt32(ret + 8, true);
          var len9 = dataView(memory1).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant23= {
            tag: 'decoding',
            val: result9
          };
          break;
        }
        case 4: {
          var ptr10 = dataView(memory1).getInt32(ret + 8, true);
          var len10 = dataView(memory1).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant23= {
            tag: 'encoding',
            val: result10
          };
          break;
        }
        case 5: {
          var ptr11 = dataView(memory1).getInt32(ret + 8, true);
          var len11 = dataView(memory1).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant23= {
            tag: 'file-not-found',
            val: result11
          };
          break;
        }
        case 6: {
          var ptr12 = dataView(memory1).getInt32(ret + 8, true);
          var len12 = dataView(memory1).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant23= {
            tag: 'io',
            val: result12
          };
          break;
        }
        case 7: {
          var ptr13 = dataView(memory1).getInt32(ret + 8, true);
          var len13 = dataView(memory1).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant23= {
            tag: 'json',
            val: result13
          };
          break;
        }
        case 8: {
          var ptr14 = dataView(memory1).getInt32(ret + 8, true);
          var len14 = dataView(memory1).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant23= {
            tag: 'manifest',
            val: result14
          };
          break;
        }
        case 9: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant23= {
            tag: 'manifest-not-found',
            val: result15
          };
          break;
        }
        case 10: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant23= {
            tag: 'not-supported',
            val: result16
          };
          break;
        }
        case 11: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant23= {
            tag: 'other',
            val: result17
          };
          break;
        }
        case 12: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant23= {
            tag: 'raw-signer',
            val: result18
          };
          break;
        }
        case 13: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant23= {
            tag: 'remote-manifest',
            val: result19
          };
          break;
        }
        case 14: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant23= {
            tag: 'resource-not-found',
            val: result20
          };
          break;
        }
        case 15: {
          variant23= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr21 = dataView(memory1).getInt32(ret + 8, true);
          var len21 = dataView(memory1).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
          variant23= {
            tag: 'signature',
            val: result21
          };
          break;
        }
        case 17: {
          var ptr22 = dataView(memory1).getInt32(ret + 8, true);
          var len22 = dataView(memory1).getInt32(ret + 12, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr22, len22));
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
let c2pa010MethodBuilderAddIngredient;

Builder.prototype.addIngredient = function addIngredient(arg1, arg2, arg3) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable16[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc1, memory1);
  var len2 = utf8EncodedLen;
  var ptr3 = utf8Encode(arg2, realloc1, memory1);
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
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable18, rep);
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
        handle5 = rscTableCreateOwn(handleTable20, rep);
      }
      variant6_0 = 1;
      variant6_1 = handle5;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`Input\``);
    }
  }
  const ret = c2pa010MethodBuilderAddIngredient(handle0, ptr2, len2, ptr3, len3, variant6_0, variant6_1);
  let variant25;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      variant25= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      let variant24;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr7 = dataView(memory1).getInt32(ret + 8, true);
          var len7 = dataView(memory1).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant24= {
            tag: 'assertion',
            val: result7
          };
          break;
        }
        case 1: {
          var ptr8 = dataView(memory1).getInt32(ret + 8, true);
          var len8 = dataView(memory1).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant24= {
            tag: 'assertion-not-found',
            val: result8
          };
          break;
        }
        case 2: {
          var ptr9 = dataView(memory1).getInt32(ret + 8, true);
          var len9 = dataView(memory1).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant24= {
            tag: 'bad-param',
            val: result9
          };
          break;
        }
        case 3: {
          var ptr10 = dataView(memory1).getInt32(ret + 8, true);
          var len10 = dataView(memory1).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant24= {
            tag: 'decoding',
            val: result10
          };
          break;
        }
        case 4: {
          var ptr11 = dataView(memory1).getInt32(ret + 8, true);
          var len11 = dataView(memory1).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant24= {
            tag: 'encoding',
            val: result11
          };
          break;
        }
        case 5: {
          var ptr12 = dataView(memory1).getInt32(ret + 8, true);
          var len12 = dataView(memory1).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant24= {
            tag: 'file-not-found',
            val: result12
          };
          break;
        }
        case 6: {
          var ptr13 = dataView(memory1).getInt32(ret + 8, true);
          var len13 = dataView(memory1).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant24= {
            tag: 'io',
            val: result13
          };
          break;
        }
        case 7: {
          var ptr14 = dataView(memory1).getInt32(ret + 8, true);
          var len14 = dataView(memory1).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant24= {
            tag: 'json',
            val: result14
          };
          break;
        }
        case 8: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant24= {
            tag: 'manifest',
            val: result15
          };
          break;
        }
        case 9: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant24= {
            tag: 'manifest-not-found',
            val: result16
          };
          break;
        }
        case 10: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant24= {
            tag: 'not-supported',
            val: result17
          };
          break;
        }
        case 11: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant24= {
            tag: 'other',
            val: result18
          };
          break;
        }
        case 12: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant24= {
            tag: 'raw-signer',
            val: result19
          };
          break;
        }
        case 13: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant24= {
            tag: 'remote-manifest',
            val: result20
          };
          break;
        }
        case 14: {
          var ptr21 = dataView(memory1).getInt32(ret + 8, true);
          var len21 = dataView(memory1).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
          variant24= {
            tag: 'resource-not-found',
            val: result21
          };
          break;
        }
        case 15: {
          variant24= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr22 = dataView(memory1).getInt32(ret + 8, true);
          var len22 = dataView(memory1).getInt32(ret + 12, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr22, len22));
          variant24= {
            tag: 'signature',
            val: result22
          };
          break;
        }
        case 17: {
          var ptr23 = dataView(memory1).getInt32(ret + 8, true);
          var len23 = dataView(memory1).getInt32(ret + 12, true);
          var result23 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr23, len23));
          variant24= {
            tag: 'verify',
            val: result23
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant25= {
        tag: 'err',
        val: variant24
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant25;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
let c2pa010MethodBuilderAddResource;

Builder.prototype.addResource = function addResource(arg1, arg2) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable16[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc1, memory1);
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
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable18, rep);
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
        handle4 = rscTableCreateOwn(handleTable20, rep);
      }
      variant5_0 = 1;
      variant5_1 = handle4;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`Input\``);
    }
  }
  const ret = c2pa010MethodBuilderAddResource(handle0, ptr2, len2, variant5_0, variant5_1);
  let variant24;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      variant24= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      let variant23;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr6 = dataView(memory1).getInt32(ret + 8, true);
          var len6 = dataView(memory1).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr6, len6));
          variant23= {
            tag: 'assertion',
            val: result6
          };
          break;
        }
        case 1: {
          var ptr7 = dataView(memory1).getInt32(ret + 8, true);
          var len7 = dataView(memory1).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant23= {
            tag: 'assertion-not-found',
            val: result7
          };
          break;
        }
        case 2: {
          var ptr8 = dataView(memory1).getInt32(ret + 8, true);
          var len8 = dataView(memory1).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant23= {
            tag: 'bad-param',
            val: result8
          };
          break;
        }
        case 3: {
          var ptr9 = dataView(memory1).getInt32(ret + 8, true);
          var len9 = dataView(memory1).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant23= {
            tag: 'decoding',
            val: result9
          };
          break;
        }
        case 4: {
          var ptr10 = dataView(memory1).getInt32(ret + 8, true);
          var len10 = dataView(memory1).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant23= {
            tag: 'encoding',
            val: result10
          };
          break;
        }
        case 5: {
          var ptr11 = dataView(memory1).getInt32(ret + 8, true);
          var len11 = dataView(memory1).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant23= {
            tag: 'file-not-found',
            val: result11
          };
          break;
        }
        case 6: {
          var ptr12 = dataView(memory1).getInt32(ret + 8, true);
          var len12 = dataView(memory1).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant23= {
            tag: 'io',
            val: result12
          };
          break;
        }
        case 7: {
          var ptr13 = dataView(memory1).getInt32(ret + 8, true);
          var len13 = dataView(memory1).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant23= {
            tag: 'json',
            val: result13
          };
          break;
        }
        case 8: {
          var ptr14 = dataView(memory1).getInt32(ret + 8, true);
          var len14 = dataView(memory1).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant23= {
            tag: 'manifest',
            val: result14
          };
          break;
        }
        case 9: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant23= {
            tag: 'manifest-not-found',
            val: result15
          };
          break;
        }
        case 10: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant23= {
            tag: 'not-supported',
            val: result16
          };
          break;
        }
        case 11: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant23= {
            tag: 'other',
            val: result17
          };
          break;
        }
        case 12: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant23= {
            tag: 'raw-signer',
            val: result18
          };
          break;
        }
        case 13: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant23= {
            tag: 'remote-manifest',
            val: result19
          };
          break;
        }
        case 14: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant23= {
            tag: 'resource-not-found',
            val: result20
          };
          break;
        }
        case 15: {
          variant23= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr21 = dataView(memory1).getInt32(ret + 8, true);
          var len21 = dataView(memory1).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
          variant23= {
            tag: 'signature',
            val: result21
          };
          break;
        }
        case 17: {
          var ptr22 = dataView(memory1).getInt32(ret + 8, true);
          var len22 = dataView(memory1).getInt32(ret + 12, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr22, len22));
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
let c2pa010MethodBuilderToArchive;

Builder.prototype.toArchive = function toArchive(arg1) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable16[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
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
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle2 = rscTableCreateOwn(handleTable18, rep);
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
        handle3 = rscTableCreateOwn(handleTable19, rep);
      }
      variant4_0 = 1;
      variant4_1 = handle3;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`Output\``);
    }
  }
  const ret = c2pa010MethodBuilderToArchive(handle0, variant4_0, variant4_1);
  let variant23;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      variant23= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      let variant22;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr5 = dataView(memory1).getInt32(ret + 8, true);
          var len5 = dataView(memory1).getInt32(ret + 12, true);
          var result5 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr5, len5));
          variant22= {
            tag: 'assertion',
            val: result5
          };
          break;
        }
        case 1: {
          var ptr6 = dataView(memory1).getInt32(ret + 8, true);
          var len6 = dataView(memory1).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr6, len6));
          variant22= {
            tag: 'assertion-not-found',
            val: result6
          };
          break;
        }
        case 2: {
          var ptr7 = dataView(memory1).getInt32(ret + 8, true);
          var len7 = dataView(memory1).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant22= {
            tag: 'bad-param',
            val: result7
          };
          break;
        }
        case 3: {
          var ptr8 = dataView(memory1).getInt32(ret + 8, true);
          var len8 = dataView(memory1).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant22= {
            tag: 'decoding',
            val: result8
          };
          break;
        }
        case 4: {
          var ptr9 = dataView(memory1).getInt32(ret + 8, true);
          var len9 = dataView(memory1).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant22= {
            tag: 'encoding',
            val: result9
          };
          break;
        }
        case 5: {
          var ptr10 = dataView(memory1).getInt32(ret + 8, true);
          var len10 = dataView(memory1).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant22= {
            tag: 'file-not-found',
            val: result10
          };
          break;
        }
        case 6: {
          var ptr11 = dataView(memory1).getInt32(ret + 8, true);
          var len11 = dataView(memory1).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant22= {
            tag: 'io',
            val: result11
          };
          break;
        }
        case 7: {
          var ptr12 = dataView(memory1).getInt32(ret + 8, true);
          var len12 = dataView(memory1).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant22= {
            tag: 'json',
            val: result12
          };
          break;
        }
        case 8: {
          var ptr13 = dataView(memory1).getInt32(ret + 8, true);
          var len13 = dataView(memory1).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant22= {
            tag: 'manifest',
            val: result13
          };
          break;
        }
        case 9: {
          var ptr14 = dataView(memory1).getInt32(ret + 8, true);
          var len14 = dataView(memory1).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant22= {
            tag: 'manifest-not-found',
            val: result14
          };
          break;
        }
        case 10: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant22= {
            tag: 'not-supported',
            val: result15
          };
          break;
        }
        case 11: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant22= {
            tag: 'other',
            val: result16
          };
          break;
        }
        case 12: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant22= {
            tag: 'raw-signer',
            val: result17
          };
          break;
        }
        case 13: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant22= {
            tag: 'remote-manifest',
            val: result18
          };
          break;
        }
        case 14: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant22= {
            tag: 'resource-not-found',
            val: result19
          };
          break;
        }
        case 15: {
          variant22= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant22= {
            tag: 'signature',
            val: result20
          };
          break;
        }
        case 17: {
          var ptr21 = dataView(memory1).getInt32(ret + 8, true);
          var len21 = dataView(memory1).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
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
let c2pa010StaticBuilderFromArchive;

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
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle0 = rscTableCreateOwn(handleTable18, rep);
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
        handle1 = rscTableCreateOwn(handleTable20, rep);
      }
      variant2_0 = 1;
      variant2_1 = handle1;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant2.tag)}\` (received \`${variant2}\`) specified for \`Input\``);
    }
  }
  const ret = c2pa010StaticBuilderFromArchive(variant2_0, variant2_1);
  let variant23;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      var handle4 = dataView(memory1).getInt32(ret + 4, true);
      var rsc3 = new.target === Builder ? this : Object.create(Builder.prototype);
      Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
      finalizationRegistry16.register(rsc3, handle4, rsc3);
      Object.defineProperty(rsc3, symbolDispose, { writable: true, value: function () {
        finalizationRegistry16.unregister(rsc3);
        rscTableRemove(handleTable16, handle4);
        rsc3[symbolDispose] = emptyFunc;
        rsc3[symbolRscHandle] = undefined;
        exports4['26'](handleTable16[(handle4 << 1) + 1] & ~T_FLAG);
      }});
      variant23= {
        tag: 'ok',
        val: rsc3
      };
      break;
    }
    case 1: {
      let variant22;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr5 = dataView(memory1).getInt32(ret + 8, true);
          var len5 = dataView(memory1).getInt32(ret + 12, true);
          var result5 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr5, len5));
          variant22= {
            tag: 'assertion',
            val: result5
          };
          break;
        }
        case 1: {
          var ptr6 = dataView(memory1).getInt32(ret + 8, true);
          var len6 = dataView(memory1).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr6, len6));
          variant22= {
            tag: 'assertion-not-found',
            val: result6
          };
          break;
        }
        case 2: {
          var ptr7 = dataView(memory1).getInt32(ret + 8, true);
          var len7 = dataView(memory1).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant22= {
            tag: 'bad-param',
            val: result7
          };
          break;
        }
        case 3: {
          var ptr8 = dataView(memory1).getInt32(ret + 8, true);
          var len8 = dataView(memory1).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant22= {
            tag: 'decoding',
            val: result8
          };
          break;
        }
        case 4: {
          var ptr9 = dataView(memory1).getInt32(ret + 8, true);
          var len9 = dataView(memory1).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant22= {
            tag: 'encoding',
            val: result9
          };
          break;
        }
        case 5: {
          var ptr10 = dataView(memory1).getInt32(ret + 8, true);
          var len10 = dataView(memory1).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant22= {
            tag: 'file-not-found',
            val: result10
          };
          break;
        }
        case 6: {
          var ptr11 = dataView(memory1).getInt32(ret + 8, true);
          var len11 = dataView(memory1).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant22= {
            tag: 'io',
            val: result11
          };
          break;
        }
        case 7: {
          var ptr12 = dataView(memory1).getInt32(ret + 8, true);
          var len12 = dataView(memory1).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant22= {
            tag: 'json',
            val: result12
          };
          break;
        }
        case 8: {
          var ptr13 = dataView(memory1).getInt32(ret + 8, true);
          var len13 = dataView(memory1).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant22= {
            tag: 'manifest',
            val: result13
          };
          break;
        }
        case 9: {
          var ptr14 = dataView(memory1).getInt32(ret + 8, true);
          var len14 = dataView(memory1).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant22= {
            tag: 'manifest-not-found',
            val: result14
          };
          break;
        }
        case 10: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant22= {
            tag: 'not-supported',
            val: result15
          };
          break;
        }
        case 11: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant22= {
            tag: 'other',
            val: result16
          };
          break;
        }
        case 12: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant22= {
            tag: 'raw-signer',
            val: result17
          };
          break;
        }
        case 13: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant22= {
            tag: 'remote-manifest',
            val: result18
          };
          break;
        }
        case 14: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant22= {
            tag: 'resource-not-found',
            val: result19
          };
          break;
        }
        case 15: {
          variant22= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant22= {
            tag: 'signature',
            val: result20
          };
          break;
        }
        case 17: {
          var ptr21 = dataView(memory1).getInt32(ret + 8, true);
          var len21 = dataView(memory1).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
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
let c2pa010MethodBuilderSign;

Builder.prototype.sign = function sign(arg1, arg2, arg3, arg4) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable16[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Builder" resource.');
  }
  var handle0 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
  var {alg: v2_0, signCert: v2_1, reserveSize: v2_2, tsUrl: v2_3 } = arg1;
  var variant3 = v2_0;
  let variant3_0;
  switch (variant3.tag) {
    case 'ps256': {
      variant3_0 = 0;
      break;
    }
    case 'ps384': {
      variant3_0 = 1;
      break;
    }
    case 'ps512': {
      variant3_0 = 2;
      break;
    }
    case 'ed25519': {
      variant3_0 = 3;
      break;
    }
    case 'es256': {
      variant3_0 = 4;
      break;
    }
    case 'es384': {
      variant3_0 = 5;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`SigningAlgorithm\``);
    }
  }
  var val4 = v2_1;
  var len4 = val4.byteLength;
  var ptr4 = realloc1(0, 0, 1, len4 * 1);
  var src4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, len4 * 1);
  (new Uint8Array(memory1.buffer, ptr4, len4 * 1)).set(src4);
  var variant6 = v2_3;
  let variant6_0;
  let variant6_1;
  let variant6_2;
  if (variant6 === null || variant6=== undefined) {
    variant6_0 = 0;
    variant6_1 = 0;
    variant6_2 = 0;
  } else {
    const e = variant6;
    var ptr5 = utf8Encode(e, realloc1, memory1);
    var len5 = utf8EncodedLen;
    variant6_0 = 1;
    variant6_1 = ptr5;
    variant6_2 = len5;
  }
  var ptr7 = utf8Encode(arg2, realloc1, memory1);
  var len7 = utf8EncodedLen;
  var variant10 = arg3;
  let variant10_0;
  let variant10_1;
  switch (variant10.tag) {
    case 'file': {
      const e = variant10.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle8 = e[symbolRscHandle];
      if (!handle8) {
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle8 = rscTableCreateOwn(handleTable18, rep);
      }
      variant10_0 = 0;
      variant10_1 = handle8;
      break;
    }
    case 'stream': {
      const e = variant10.val;
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle9 = e[symbolRscHandle];
      if (!handle9) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle9 = rscTableCreateOwn(handleTable20, rep);
      }
      variant10_0 = 1;
      variant10_1 = handle9;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant10.tag)}\` (received \`${variant10}\`) specified for \`Input\``);
    }
  }
  var variant13 = arg4;
  let variant13_0;
  let variant13_1;
  switch (variant13.tag) {
    case 'file': {
      const e = variant13.val;
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle11 = e[symbolRscHandle];
      if (!handle11) {
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle11 = rscTableCreateOwn(handleTable18, rep);
      }
      variant13_0 = 0;
      variant13_1 = handle11;
      break;
    }
    case 'stream': {
      const e = variant13.val;
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle12 = e[symbolRscHandle];
      if (!handle12) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle12 = rscTableCreateOwn(handleTable19, rep);
      }
      variant13_0 = 1;
      variant13_1 = handle12;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant13.tag)}\` (received \`${variant13}\`) specified for \`Output\``);
    }
  }
  const ret = c2pa010MethodBuilderSign(handle0, variant3_0, ptr4, len4, toUint64(v2_2), variant6_0, variant6_1, variant6_2, ptr7, len7, variant10_0, variant10_1, variant13_0, variant13_1);
  let variant33;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      var ptr14 = dataView(memory1).getInt32(ret + 4, true);
      var len14 = dataView(memory1).getInt32(ret + 8, true);
      var result14 = new Uint8Array(memory1.buffer.slice(ptr14, ptr14 + len14 * 1));
      variant33= {
        tag: 'ok',
        val: result14
      };
      break;
    }
    case 1: {
      let variant32;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant32= {
            tag: 'assertion',
            val: result15
          };
          break;
        }
        case 1: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant32= {
            tag: 'assertion-not-found',
            val: result16
          };
          break;
        }
        case 2: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant32= {
            tag: 'bad-param',
            val: result17
          };
          break;
        }
        case 3: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant32= {
            tag: 'decoding',
            val: result18
          };
          break;
        }
        case 4: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant32= {
            tag: 'encoding',
            val: result19
          };
          break;
        }
        case 5: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant32= {
            tag: 'file-not-found',
            val: result20
          };
          break;
        }
        case 6: {
          var ptr21 = dataView(memory1).getInt32(ret + 8, true);
          var len21 = dataView(memory1).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
          variant32= {
            tag: 'io',
            val: result21
          };
          break;
        }
        case 7: {
          var ptr22 = dataView(memory1).getInt32(ret + 8, true);
          var len22 = dataView(memory1).getInt32(ret + 12, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr22, len22));
          variant32= {
            tag: 'json',
            val: result22
          };
          break;
        }
        case 8: {
          var ptr23 = dataView(memory1).getInt32(ret + 8, true);
          var len23 = dataView(memory1).getInt32(ret + 12, true);
          var result23 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr23, len23));
          variant32= {
            tag: 'manifest',
            val: result23
          };
          break;
        }
        case 9: {
          var ptr24 = dataView(memory1).getInt32(ret + 8, true);
          var len24 = dataView(memory1).getInt32(ret + 12, true);
          var result24 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr24, len24));
          variant32= {
            tag: 'manifest-not-found',
            val: result24
          };
          break;
        }
        case 10: {
          var ptr25 = dataView(memory1).getInt32(ret + 8, true);
          var len25 = dataView(memory1).getInt32(ret + 12, true);
          var result25 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr25, len25));
          variant32= {
            tag: 'not-supported',
            val: result25
          };
          break;
        }
        case 11: {
          var ptr26 = dataView(memory1).getInt32(ret + 8, true);
          var len26 = dataView(memory1).getInt32(ret + 12, true);
          var result26 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr26, len26));
          variant32= {
            tag: 'other',
            val: result26
          };
          break;
        }
        case 12: {
          var ptr27 = dataView(memory1).getInt32(ret + 8, true);
          var len27 = dataView(memory1).getInt32(ret + 12, true);
          var result27 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr27, len27));
          variant32= {
            tag: 'raw-signer',
            val: result27
          };
          break;
        }
        case 13: {
          var ptr28 = dataView(memory1).getInt32(ret + 8, true);
          var len28 = dataView(memory1).getInt32(ret + 12, true);
          var result28 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr28, len28));
          variant32= {
            tag: 'remote-manifest',
            val: result28
          };
          break;
        }
        case 14: {
          var ptr29 = dataView(memory1).getInt32(ret + 8, true);
          var len29 = dataView(memory1).getInt32(ret + 12, true);
          var result29 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr29, len29));
          variant32= {
            tag: 'resource-not-found',
            val: result29
          };
          break;
        }
        case 15: {
          variant32= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr30 = dataView(memory1).getInt32(ret + 8, true);
          var len30 = dataView(memory1).getInt32(ret + 12, true);
          var result30 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr30, len30));
          variant32= {
            tag: 'signature',
            val: result30
          };
          break;
        }
        case 17: {
          var ptr31 = dataView(memory1).getInt32(ret + 8, true);
          var len31 = dataView(memory1).getInt32(ret + 12, true);
          var result31 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr31, len31));
          variant32= {
            tag: 'verify',
            val: result31
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant33= {
        tag: 'err',
        val: variant32
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant33;
  postReturn1(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
let c2pa010ConstructorReader;

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
      var ptr0 = utf8Encode(e, realloc1, memory1);
      var len0 = utf8EncodedLen;
      variant1_0 = 1;
      variant1_1 = ptr0;
      variant1_2 = len0;
    }
    const ret = c2pa010ConstructorReader(variant1_0, variant1_1, variant1_2);
    var handle3 = ret;
    var rsc2 = new.target === Reader ? this : Object.create(Reader.prototype);
    Object.defineProperty(rsc2, symbolRscHandle, { writable: true, value: handle3});
    finalizationRegistry17.register(rsc2, handle3, rsc2);
    Object.defineProperty(rsc2, symbolDispose, { writable: true, value: function () {
      finalizationRegistry17.unregister(rsc2);
      rscTableRemove(handleTable17, handle3);
      rsc2[symbolDispose] = emptyFunc;
      rsc2[symbolRscHandle] = undefined;
      exports4['27'](handleTable17[(handle3 << 1) + 1] & ~T_FLAG);
    }});
    return rsc2;
  }
}
let c2pa010StaticReaderFromBuffer;

Reader.fromBuffer = function fromBuffer(arg0, arg1) {
  var ptr0 = utf8Encode(arg0, realloc1, memory1);
  var len0 = utf8EncodedLen;
  var val1 = arg1;
  var len1 = val1.byteLength;
  var ptr1 = realloc1(0, 0, 1, len1 * 1);
  var src1 = new Uint8Array(val1.buffer || val1, val1.byteOffset, len1 * 1);
  (new Uint8Array(memory1.buffer, ptr1, len1 * 1)).set(src1);
  const ret = c2pa010StaticReaderFromBuffer(ptr0, len0, ptr1, len1);
  let variant22;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      var handle3 = dataView(memory1).getInt32(ret + 4, true);
      var rsc2 = new.target === Reader ? this : Object.create(Reader.prototype);
      Object.defineProperty(rsc2, symbolRscHandle, { writable: true, value: handle3});
      finalizationRegistry17.register(rsc2, handle3, rsc2);
      Object.defineProperty(rsc2, symbolDispose, { writable: true, value: function () {
        finalizationRegistry17.unregister(rsc2);
        rscTableRemove(handleTable17, handle3);
        rsc2[symbolDispose] = emptyFunc;
        rsc2[symbolRscHandle] = undefined;
        exports4['27'](handleTable17[(handle3 << 1) + 1] & ~T_FLAG);
      }});
      variant22= {
        tag: 'ok',
        val: rsc2
      };
      break;
    }
    case 1: {
      let variant21;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr4 = dataView(memory1).getInt32(ret + 8, true);
          var len4 = dataView(memory1).getInt32(ret + 12, true);
          var result4 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr4, len4));
          variant21= {
            tag: 'assertion',
            val: result4
          };
          break;
        }
        case 1: {
          var ptr5 = dataView(memory1).getInt32(ret + 8, true);
          var len5 = dataView(memory1).getInt32(ret + 12, true);
          var result5 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr5, len5));
          variant21= {
            tag: 'assertion-not-found',
            val: result5
          };
          break;
        }
        case 2: {
          var ptr6 = dataView(memory1).getInt32(ret + 8, true);
          var len6 = dataView(memory1).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr6, len6));
          variant21= {
            tag: 'bad-param',
            val: result6
          };
          break;
        }
        case 3: {
          var ptr7 = dataView(memory1).getInt32(ret + 8, true);
          var len7 = dataView(memory1).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant21= {
            tag: 'decoding',
            val: result7
          };
          break;
        }
        case 4: {
          var ptr8 = dataView(memory1).getInt32(ret + 8, true);
          var len8 = dataView(memory1).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant21= {
            tag: 'encoding',
            val: result8
          };
          break;
        }
        case 5: {
          var ptr9 = dataView(memory1).getInt32(ret + 8, true);
          var len9 = dataView(memory1).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant21= {
            tag: 'file-not-found',
            val: result9
          };
          break;
        }
        case 6: {
          var ptr10 = dataView(memory1).getInt32(ret + 8, true);
          var len10 = dataView(memory1).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant21= {
            tag: 'io',
            val: result10
          };
          break;
        }
        case 7: {
          var ptr11 = dataView(memory1).getInt32(ret + 8, true);
          var len11 = dataView(memory1).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant21= {
            tag: 'json',
            val: result11
          };
          break;
        }
        case 8: {
          var ptr12 = dataView(memory1).getInt32(ret + 8, true);
          var len12 = dataView(memory1).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant21= {
            tag: 'manifest',
            val: result12
          };
          break;
        }
        case 9: {
          var ptr13 = dataView(memory1).getInt32(ret + 8, true);
          var len13 = dataView(memory1).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant21= {
            tag: 'manifest-not-found',
            val: result13
          };
          break;
        }
        case 10: {
          var ptr14 = dataView(memory1).getInt32(ret + 8, true);
          var len14 = dataView(memory1).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant21= {
            tag: 'not-supported',
            val: result14
          };
          break;
        }
        case 11: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant21= {
            tag: 'other',
            val: result15
          };
          break;
        }
        case 12: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant21= {
            tag: 'raw-signer',
            val: result16
          };
          break;
        }
        case 13: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant21= {
            tag: 'remote-manifest',
            val: result17
          };
          break;
        }
        case 14: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant21= {
            tag: 'resource-not-found',
            val: result18
          };
          break;
        }
        case 15: {
          variant21= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant21= {
            tag: 'signature',
            val: result19
          };
          break;
        }
        case 17: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
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
let c2pa010StaticReaderFromStream;

Reader.fromStream = function fromStream(arg0, arg1) {
  var ptr0 = utf8Encode(arg0, realloc1, memory1);
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
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle1 = rscTableCreateOwn(handleTable18, rep);
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
        handle2 = rscTableCreateOwn(handleTable20, rep);
      }
      variant3_0 = 1;
      variant3_1 = handle2;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant3.tag)}\` (received \`${variant3}\`) specified for \`Input\``);
    }
  }
  const ret = c2pa010StaticReaderFromStream(ptr0, len0, variant3_0, variant3_1);
  let variant24;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      var handle5 = dataView(memory1).getInt32(ret + 4, true);
      var rsc4 = new.target === Reader ? this : Object.create(Reader.prototype);
      Object.defineProperty(rsc4, symbolRscHandle, { writable: true, value: handle5});
      finalizationRegistry17.register(rsc4, handle5, rsc4);
      Object.defineProperty(rsc4, symbolDispose, { writable: true, value: function () {
        finalizationRegistry17.unregister(rsc4);
        rscTableRemove(handleTable17, handle5);
        rsc4[symbolDispose] = emptyFunc;
        rsc4[symbolRscHandle] = undefined;
        exports4['27'](handleTable17[(handle5 << 1) + 1] & ~T_FLAG);
      }});
      variant24= {
        tag: 'ok',
        val: rsc4
      };
      break;
    }
    case 1: {
      let variant23;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr6 = dataView(memory1).getInt32(ret + 8, true);
          var len6 = dataView(memory1).getInt32(ret + 12, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr6, len6));
          variant23= {
            tag: 'assertion',
            val: result6
          };
          break;
        }
        case 1: {
          var ptr7 = dataView(memory1).getInt32(ret + 8, true);
          var len7 = dataView(memory1).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant23= {
            tag: 'assertion-not-found',
            val: result7
          };
          break;
        }
        case 2: {
          var ptr8 = dataView(memory1).getInt32(ret + 8, true);
          var len8 = dataView(memory1).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant23= {
            tag: 'bad-param',
            val: result8
          };
          break;
        }
        case 3: {
          var ptr9 = dataView(memory1).getInt32(ret + 8, true);
          var len9 = dataView(memory1).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant23= {
            tag: 'decoding',
            val: result9
          };
          break;
        }
        case 4: {
          var ptr10 = dataView(memory1).getInt32(ret + 8, true);
          var len10 = dataView(memory1).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant23= {
            tag: 'encoding',
            val: result10
          };
          break;
        }
        case 5: {
          var ptr11 = dataView(memory1).getInt32(ret + 8, true);
          var len11 = dataView(memory1).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant23= {
            tag: 'file-not-found',
            val: result11
          };
          break;
        }
        case 6: {
          var ptr12 = dataView(memory1).getInt32(ret + 8, true);
          var len12 = dataView(memory1).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant23= {
            tag: 'io',
            val: result12
          };
          break;
        }
        case 7: {
          var ptr13 = dataView(memory1).getInt32(ret + 8, true);
          var len13 = dataView(memory1).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant23= {
            tag: 'json',
            val: result13
          };
          break;
        }
        case 8: {
          var ptr14 = dataView(memory1).getInt32(ret + 8, true);
          var len14 = dataView(memory1).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant23= {
            tag: 'manifest',
            val: result14
          };
          break;
        }
        case 9: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant23= {
            tag: 'manifest-not-found',
            val: result15
          };
          break;
        }
        case 10: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant23= {
            tag: 'not-supported',
            val: result16
          };
          break;
        }
        case 11: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant23= {
            tag: 'other',
            val: result17
          };
          break;
        }
        case 12: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant23= {
            tag: 'raw-signer',
            val: result18
          };
          break;
        }
        case 13: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant23= {
            tag: 'remote-manifest',
            val: result19
          };
          break;
        }
        case 14: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant23= {
            tag: 'resource-not-found',
            val: result20
          };
          break;
        }
        case 15: {
          variant23= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr21 = dataView(memory1).getInt32(ret + 8, true);
          var len21 = dataView(memory1).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
          variant23= {
            tag: 'signature',
            val: result21
          };
          break;
        }
        case 17: {
          var ptr22 = dataView(memory1).getInt32(ret + 8, true);
          var len22 = dataView(memory1).getInt32(ret + 12, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr22, len22));
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
let c2pa010StaticReaderFromManifestDataAndStream;

Reader.fromManifestDataAndStream = function fromManifestDataAndStream(arg0, arg1, arg2) {
  var val0 = arg0;
  var len0 = val0.byteLength;
  var ptr0 = realloc1(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory1.buffer, ptr0, len0 * 1)).set(src0);
  var ptr1 = utf8Encode(arg1, realloc1, memory1);
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
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle2 = rscTableCreateOwn(handleTable18, rep);
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
        handle3 = rscTableCreateOwn(handleTable20, rep);
      }
      variant4_0 = 1;
      variant4_1 = handle3;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`Input\``);
    }
  }
  const ret = c2pa010StaticReaderFromManifestDataAndStream(ptr0, len0, ptr1, len1, variant4_0, variant4_1);
  let variant25;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      var handle6 = dataView(memory1).getInt32(ret + 4, true);
      var rsc5 = new.target === Reader ? this : Object.create(Reader.prototype);
      Object.defineProperty(rsc5, symbolRscHandle, { writable: true, value: handle6});
      finalizationRegistry17.register(rsc5, handle6, rsc5);
      Object.defineProperty(rsc5, symbolDispose, { writable: true, value: function () {
        finalizationRegistry17.unregister(rsc5);
        rscTableRemove(handleTable17, handle6);
        rsc5[symbolDispose] = emptyFunc;
        rsc5[symbolRscHandle] = undefined;
        exports4['27'](handleTable17[(handle6 << 1) + 1] & ~T_FLAG);
      }});
      variant25= {
        tag: 'ok',
        val: rsc5
      };
      break;
    }
    case 1: {
      let variant24;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          var ptr7 = dataView(memory1).getInt32(ret + 8, true);
          var len7 = dataView(memory1).getInt32(ret + 12, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant24= {
            tag: 'assertion',
            val: result7
          };
          break;
        }
        case 1: {
          var ptr8 = dataView(memory1).getInt32(ret + 8, true);
          var len8 = dataView(memory1).getInt32(ret + 12, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant24= {
            tag: 'assertion-not-found',
            val: result8
          };
          break;
        }
        case 2: {
          var ptr9 = dataView(memory1).getInt32(ret + 8, true);
          var len9 = dataView(memory1).getInt32(ret + 12, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant24= {
            tag: 'bad-param',
            val: result9
          };
          break;
        }
        case 3: {
          var ptr10 = dataView(memory1).getInt32(ret + 8, true);
          var len10 = dataView(memory1).getInt32(ret + 12, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant24= {
            tag: 'decoding',
            val: result10
          };
          break;
        }
        case 4: {
          var ptr11 = dataView(memory1).getInt32(ret + 8, true);
          var len11 = dataView(memory1).getInt32(ret + 12, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant24= {
            tag: 'encoding',
            val: result11
          };
          break;
        }
        case 5: {
          var ptr12 = dataView(memory1).getInt32(ret + 8, true);
          var len12 = dataView(memory1).getInt32(ret + 12, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant24= {
            tag: 'file-not-found',
            val: result12
          };
          break;
        }
        case 6: {
          var ptr13 = dataView(memory1).getInt32(ret + 8, true);
          var len13 = dataView(memory1).getInt32(ret + 12, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant24= {
            tag: 'io',
            val: result13
          };
          break;
        }
        case 7: {
          var ptr14 = dataView(memory1).getInt32(ret + 8, true);
          var len14 = dataView(memory1).getInt32(ret + 12, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant24= {
            tag: 'json',
            val: result14
          };
          break;
        }
        case 8: {
          var ptr15 = dataView(memory1).getInt32(ret + 8, true);
          var len15 = dataView(memory1).getInt32(ret + 12, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant24= {
            tag: 'manifest',
            val: result15
          };
          break;
        }
        case 9: {
          var ptr16 = dataView(memory1).getInt32(ret + 8, true);
          var len16 = dataView(memory1).getInt32(ret + 12, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant24= {
            tag: 'manifest-not-found',
            val: result16
          };
          break;
        }
        case 10: {
          var ptr17 = dataView(memory1).getInt32(ret + 8, true);
          var len17 = dataView(memory1).getInt32(ret + 12, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant24= {
            tag: 'not-supported',
            val: result17
          };
          break;
        }
        case 11: {
          var ptr18 = dataView(memory1).getInt32(ret + 8, true);
          var len18 = dataView(memory1).getInt32(ret + 12, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant24= {
            tag: 'other',
            val: result18
          };
          break;
        }
        case 12: {
          var ptr19 = dataView(memory1).getInt32(ret + 8, true);
          var len19 = dataView(memory1).getInt32(ret + 12, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant24= {
            tag: 'raw-signer',
            val: result19
          };
          break;
        }
        case 13: {
          var ptr20 = dataView(memory1).getInt32(ret + 8, true);
          var len20 = dataView(memory1).getInt32(ret + 12, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant24= {
            tag: 'remote-manifest',
            val: result20
          };
          break;
        }
        case 14: {
          var ptr21 = dataView(memory1).getInt32(ret + 8, true);
          var len21 = dataView(memory1).getInt32(ret + 12, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
          variant24= {
            tag: 'resource-not-found',
            val: result21
          };
          break;
        }
        case 15: {
          variant24= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr22 = dataView(memory1).getInt32(ret + 8, true);
          var len22 = dataView(memory1).getInt32(ret + 12, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr22, len22));
          variant24= {
            tag: 'signature',
            val: result22
          };
          break;
        }
        case 17: {
          var ptr23 = dataView(memory1).getInt32(ret + 8, true);
          var len23 = dataView(memory1).getInt32(ret + 12, true);
          var result23 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr23, len23));
          variant24= {
            tag: 'verify',
            val: result23
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for Error');
        }
      }
      variant25= {
        tag: 'err',
        val: variant24
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant25;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
let c2pa010MethodReaderJson;

Reader.prototype.json = function json() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable17[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Reader" resource.');
  }
  var handle0 = handleTable17[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = c2pa010MethodReaderJson(handle0);
  var ptr2 = dataView(memory1).getInt32(ret + 0, true);
  var len2 = dataView(memory1).getInt32(ret + 4, true);
  var result2 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr2, len2));
  const retVal = result2;
  postReturn2(ret);
  return retVal;
};
let c2pa010MethodReaderResourceToStream;

Reader.prototype.resourceToStream = function resourceToStream(arg1, arg2) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable17[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Reader" resource.');
  }
  var handle0 = handleTable17[(handle1 << 1) + 1] & ~T_FLAG;
  var ptr2 = utf8Encode(arg1, realloc1, memory1);
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
        const rep = e[symbolRscRep] || ++captureCnt4;
        captureTable4.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable18, rep);
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
        handle4 = rscTableCreateOwn(handleTable19, rep);
      }
      variant5_0 = 1;
      variant5_1 = handle4;
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`Output\``);
    }
  }
  const ret = c2pa010MethodReaderResourceToStream(handle0, ptr2, len2, variant5_0, variant5_1);
  let variant24;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      variant24= {
        tag: 'ok',
        val: BigInt.asUintN(64, dataView(memory1).getBigInt64(ret + 8, true))
      };
      break;
    }
    case 1: {
      let variant23;
      switch (dataView(memory1).getUint8(ret + 8, true)) {
        case 0: {
          var ptr6 = dataView(memory1).getInt32(ret + 12, true);
          var len6 = dataView(memory1).getInt32(ret + 16, true);
          var result6 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr6, len6));
          variant23= {
            tag: 'assertion',
            val: result6
          };
          break;
        }
        case 1: {
          var ptr7 = dataView(memory1).getInt32(ret + 12, true);
          var len7 = dataView(memory1).getInt32(ret + 16, true);
          var result7 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr7, len7));
          variant23= {
            tag: 'assertion-not-found',
            val: result7
          };
          break;
        }
        case 2: {
          var ptr8 = dataView(memory1).getInt32(ret + 12, true);
          var len8 = dataView(memory1).getInt32(ret + 16, true);
          var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
          variant23= {
            tag: 'bad-param',
            val: result8
          };
          break;
        }
        case 3: {
          var ptr9 = dataView(memory1).getInt32(ret + 12, true);
          var len9 = dataView(memory1).getInt32(ret + 16, true);
          var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
          variant23= {
            tag: 'decoding',
            val: result9
          };
          break;
        }
        case 4: {
          var ptr10 = dataView(memory1).getInt32(ret + 12, true);
          var len10 = dataView(memory1).getInt32(ret + 16, true);
          var result10 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr10, len10));
          variant23= {
            tag: 'encoding',
            val: result10
          };
          break;
        }
        case 5: {
          var ptr11 = dataView(memory1).getInt32(ret + 12, true);
          var len11 = dataView(memory1).getInt32(ret + 16, true);
          var result11 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr11, len11));
          variant23= {
            tag: 'file-not-found',
            val: result11
          };
          break;
        }
        case 6: {
          var ptr12 = dataView(memory1).getInt32(ret + 12, true);
          var len12 = dataView(memory1).getInt32(ret + 16, true);
          var result12 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr12, len12));
          variant23= {
            tag: 'io',
            val: result12
          };
          break;
        }
        case 7: {
          var ptr13 = dataView(memory1).getInt32(ret + 12, true);
          var len13 = dataView(memory1).getInt32(ret + 16, true);
          var result13 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr13, len13));
          variant23= {
            tag: 'json',
            val: result13
          };
          break;
        }
        case 8: {
          var ptr14 = dataView(memory1).getInt32(ret + 12, true);
          var len14 = dataView(memory1).getInt32(ret + 16, true);
          var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
          variant23= {
            tag: 'manifest',
            val: result14
          };
          break;
        }
        case 9: {
          var ptr15 = dataView(memory1).getInt32(ret + 12, true);
          var len15 = dataView(memory1).getInt32(ret + 16, true);
          var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
          variant23= {
            tag: 'manifest-not-found',
            val: result15
          };
          break;
        }
        case 10: {
          var ptr16 = dataView(memory1).getInt32(ret + 12, true);
          var len16 = dataView(memory1).getInt32(ret + 16, true);
          var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
          variant23= {
            tag: 'not-supported',
            val: result16
          };
          break;
        }
        case 11: {
          var ptr17 = dataView(memory1).getInt32(ret + 12, true);
          var len17 = dataView(memory1).getInt32(ret + 16, true);
          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
          variant23= {
            tag: 'other',
            val: result17
          };
          break;
        }
        case 12: {
          var ptr18 = dataView(memory1).getInt32(ret + 12, true);
          var len18 = dataView(memory1).getInt32(ret + 16, true);
          var result18 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr18, len18));
          variant23= {
            tag: 'raw-signer',
            val: result18
          };
          break;
        }
        case 13: {
          var ptr19 = dataView(memory1).getInt32(ret + 12, true);
          var len19 = dataView(memory1).getInt32(ret + 16, true);
          var result19 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr19, len19));
          variant23= {
            tag: 'remote-manifest',
            val: result19
          };
          break;
        }
        case 14: {
          var ptr20 = dataView(memory1).getInt32(ret + 12, true);
          var len20 = dataView(memory1).getInt32(ret + 16, true);
          var result20 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr20, len20));
          variant23= {
            tag: 'resource-not-found',
            val: result20
          };
          break;
        }
        case 15: {
          variant23= {
            tag: 'rw-lock',
          };
          break;
        }
        case 16: {
          var ptr21 = dataView(memory1).getInt32(ret + 12, true);
          var len21 = dataView(memory1).getInt32(ret + 16, true);
          var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
          variant23= {
            tag: 'signature',
            val: result21
          };
          break;
        }
        case 17: {
          var ptr22 = dataView(memory1).getInt32(ret + 12, true);
          var len22 = dataView(memory1).getInt32(ret + 16, true);
          var result22 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr22, len22));
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
  postReturn3(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
let c2pa010MethodReaderActiveManifest;

Reader.prototype.activeManifest = function activeManifest() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable17[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Reader" resource.');
  }
  var handle0 = handleTable17[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = c2pa010MethodReaderActiveManifest(handle0);
  let variant367;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      variant367 = undefined;
      break;
    }
    case 1: {
      let variant2;
      switch (dataView(memory1).getUint8(ret + 4, true)) {
        case 0: {
          variant2 = undefined;
          break;
        }
        case 1: {
          variant2 = clampGuest(dataView(memory1).getUint8(ret + 5, true), 0, 255);
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      let variant4;
      switch (dataView(memory1).getUint8(ret + 8, true)) {
        case 0: {
          variant4 = undefined;
          break;
        }
        case 1: {
          var ptr3 = dataView(memory1).getInt32(ret + 12, true);
          var len3 = dataView(memory1).getInt32(ret + 16, true);
          var result3 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr3, len3));
          variant4 = result3;
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      var len32 = dataView(memory1).getInt32(ret + 24, true);
      var base32 = dataView(memory1).getInt32(ret + 20, true);
      var result32 = [];
      for (let i = 0; i < len32; i++) {
        const base = base32 + i * 100;
        var ptr5 = dataView(memory1).getInt32(base + 0, true);
        var len5 = dataView(memory1).getInt32(base + 4, true);
        var result5 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr5, len5));
        let variant7;
        switch (dataView(memory1).getUint8(base + 8, true)) {
          case 0: {
            variant7 = undefined;
            break;
          }
          case 1: {
            var ptr6 = dataView(memory1).getInt32(base + 12, true);
            var len6 = dataView(memory1).getInt32(base + 16, true);
            var result6 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr6, len6));
            variant7 = result6;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant26;
        switch (dataView(memory1).getUint8(base + 20, true)) {
          case 0: {
            variant26 = undefined;
            break;
          }
          case 1: {
            let variant25;
            switch (dataView(memory1).getUint8(base + 24, true)) {
              case 0: {
                var ptr8 = dataView(memory1).getInt32(base + 28, true);
                var len8 = dataView(memory1).getInt32(base + 32, true);
                var result8 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr8, len8));
                let variant10;
                switch (dataView(memory1).getUint8(base + 36, true)) {
                  case 0: {
                    variant10 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr9 = dataView(memory1).getInt32(base + 40, true);
                    var len9 = dataView(memory1).getInt32(base + 44, true);
                    var result9 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr9, len9));
                    variant10 = result9;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                var ptr11 = dataView(memory1).getInt32(base + 48, true);
                var len11 = dataView(memory1).getInt32(base + 52, true);
                var result11 = new Uint8Array(memory1.buffer.slice(ptr11, ptr11 + len11 * 1));
                let variant13;
                switch (dataView(memory1).getUint8(base + 56, true)) {
                  case 0: {
                    variant13 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr12 = dataView(memory1).getInt32(base + 60, true);
                    var len12 = dataView(memory1).getInt32(base + 64, true);
                    var result12 = new Uint8Array(memory1.buffer.slice(ptr12, ptr12 + len12 * 1));
                    variant13 = result12;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                variant25= {
                  tag: 'hashed-uri',
                  val: {
                    url: result8,
                    alg: variant10,
                    hash: result11,
                    salt: variant13,
                  }
                };
                break;
              }
              case 1: {
                var ptr14 = dataView(memory1).getInt32(base + 28, true);
                var len14 = dataView(memory1).getInt32(base + 32, true);
                var result14 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr14, len14));
                var ptr15 = dataView(memory1).getInt32(base + 36, true);
                var len15 = dataView(memory1).getInt32(base + 40, true);
                var result15 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr15, len15));
                let variant20;
                switch (dataView(memory1).getUint8(base + 44, true)) {
                  case 0: {
                    variant20 = undefined;
                    break;
                  }
                  case 1: {
                    var len19 = dataView(memory1).getInt32(base + 52, true);
                    var base19 = dataView(memory1).getInt32(base + 48, true);
                    var result19 = [];
                    for (let i = 0; i < len19; i++) {
                      const base = base19 + i * 20;
                      var ptr16 = dataView(memory1).getInt32(base + 0, true);
                      var len16 = dataView(memory1).getInt32(base + 4, true);
                      var result16 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr16, len16));
                      let variant18;
                      switch (dataView(memory1).getUint8(base + 8, true)) {
                        case 0: {
                          variant18 = undefined;
                          break;
                        }
                        case 1: {
                          var ptr17 = dataView(memory1).getInt32(base + 12, true);
                          var len17 = dataView(memory1).getInt32(base + 16, true);
                          var result17 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr17, len17));
                          variant18 = result17;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      result19.push({
                        type: result16,
                        version: variant18,
                      });
                    }
                    variant20 = result19;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant22;
                switch (dataView(memory1).getUint8(base + 56, true)) {
                  case 0: {
                    variant22 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr21 = dataView(memory1).getInt32(base + 60, true);
                    var len21 = dataView(memory1).getInt32(base + 64, true);
                    var result21 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr21, len21));
                    variant22 = result21;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant24;
                switch (dataView(memory1).getUint8(base + 68, true)) {
                  case 0: {
                    variant24 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr23 = dataView(memory1).getInt32(base + 72, true);
                    var len23 = dataView(memory1).getInt32(base + 76, true);
                    var result23 = new Uint8Array(memory1.buffer.slice(ptr23, ptr23 + len23 * 1));
                    variant24 = result23;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                variant25= {
                  tag: 'resource-ref',
                  val: {
                    format: result14,
                    identifier: result15,
                    dataTypes: variant20,
                    alg: variant22,
                    hash: variant24,
                  }
                };
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for UriOrResource');
              }
            }
            variant26 = variant25;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant28;
        switch (dataView(memory1).getUint8(base + 80, true)) {
          case 0: {
            variant28 = undefined;
            break;
          }
          case 1: {
            var ptr27 = dataView(memory1).getInt32(base + 84, true);
            var len27 = dataView(memory1).getInt32(base + 88, true);
            var result27 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr27, len27));
            variant28 = result27;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        var len31 = dataView(memory1).getInt32(base + 96, true);
        var base31 = dataView(memory1).getInt32(base + 92, true);
        var result31 = [];
        for (let i = 0; i < len31; i++) {
          const base = base31 + i * 16;
          var ptr29 = dataView(memory1).getInt32(base + 0, true);
          var len29 = dataView(memory1).getInt32(base + 4, true);
          var result29 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr29, len29));
          var ptr30 = dataView(memory1).getInt32(base + 8, true);
          var len30 = dataView(memory1).getInt32(base + 12, true);
          var result30 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr30, len30));
          result31.push([result29, result30]);
        }
        result32.push({
          name: result5,
          version: variant7,
          icon: variant26,
          operatingSystem: variant28,
          other: result31,
        });
      }
      let variant112;
      switch (dataView(memory1).getUint8(ret + 28, true)) {
        case 0: {
          variant112 = undefined;
          break;
        }
        case 1: {
          var len111 = dataView(memory1).getInt32(ret + 36, true);
          var base111 = dataView(memory1).getInt32(ret + 32, true);
          var result111 = [];
          for (let i = 0; i < len111; i++) {
            const base = base111 + i * 188;
            let variant37;
            switch (dataView(memory1).getUint8(base + 0, true)) {
              case 0: {
                variant37 = undefined;
                break;
              }
              case 1: {
                var len36 = dataView(memory1).getInt32(base + 8, true);
                var base36 = dataView(memory1).getInt32(base + 4, true);
                var result36 = [];
                for (let i = 0; i < len36; i++) {
                  const base = base36 + i * 24;
                  var ptr33 = dataView(memory1).getInt32(base + 0, true);
                  var len33 = dataView(memory1).getInt32(base + 4, true);
                  var result33 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr33, len33));
                  let variant35;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant35 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr34 = dataView(memory1).getInt32(base + 12, true);
                      var len34 = dataView(memory1).getInt32(base + 16, true);
                      var result34 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr34, len34));
                      variant35 = result34;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result36.push({
                    explanation: result33,
                    code: variant35,
                    value: clampGuest(dataView(memory1).getUint8(base + 20, true), 0, 255),
                  });
                }
                variant37 = result36;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant39;
            switch (dataView(memory1).getUint8(base + 12, true)) {
              case 0: {
                variant39 = undefined;
                break;
              }
              case 1: {
                var ptr38 = dataView(memory1).getInt32(base + 16, true);
                var len38 = dataView(memory1).getInt32(base + 20, true);
                var result38 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr38, len38));
                variant39 = result38;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant46;
            switch (dataView(memory1).getUint8(base + 24, true)) {
              case 0: {
                variant46 = undefined;
                break;
              }
              case 1: {
                var ptr40 = dataView(memory1).getInt32(base + 28, true);
                var len40 = dataView(memory1).getInt32(base + 32, true);
                var result40 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr40, len40));
                let variant42;
                switch (dataView(memory1).getUint8(base + 36, true)) {
                  case 0: {
                    variant42 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr41 = dataView(memory1).getInt32(base + 40, true);
                    var len41 = dataView(memory1).getInt32(base + 44, true);
                    var result41 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr41, len41));
                    variant42 = result41;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                var ptr43 = dataView(memory1).getInt32(base + 48, true);
                var len43 = dataView(memory1).getInt32(base + 52, true);
                var result43 = new Uint8Array(memory1.buffer.slice(ptr43, ptr43 + len43 * 1));
                let variant45;
                switch (dataView(memory1).getUint8(base + 56, true)) {
                  case 0: {
                    variant45 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr44 = dataView(memory1).getInt32(base + 60, true);
                    var len44 = dataView(memory1).getInt32(base + 64, true);
                    var result44 = new Uint8Array(memory1.buffer.slice(ptr44, ptr44 + len44 * 1));
                    variant45 = result44;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                variant46 = {
                  url: result40,
                  alg: variant42,
                  hash: result43,
                  salt: variant45,
                };
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant62;
            switch (dataView(memory1).getUint8(base + 68, true)) {
              case 0: {
                variant62 = undefined;
                break;
              }
              case 1: {
                var ptr47 = dataView(memory1).getInt32(base + 72, true);
                var len47 = dataView(memory1).getInt32(base + 76, true);
                var result47 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr47, len47));
                let variant49;
                switch (dataView(memory1).getUint8(base + 80, true)) {
                  case 0: {
                    variant49 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr48 = dataView(memory1).getInt32(base + 84, true);
                    var len48 = dataView(memory1).getInt32(base + 88, true);
                    var result48 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr48, len48));
                    variant49 = result48;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant61;
                switch (dataView(memory1).getUint8(base + 92, true)) {
                  case 0: {
                    variant61 = undefined;
                    break;
                  }
                  case 1: {
                    var len60 = dataView(memory1).getInt32(base + 100, true);
                    var base60 = dataView(memory1).getInt32(base + 96, true);
                    var result60 = [];
                    for (let i = 0; i < len60; i++) {
                      const base = base60 + i * 24;
                      let variant51;
                      switch (dataView(memory1).getUint8(base + 0, true)) {
                        case 0: {
                          variant51 = undefined;
                          break;
                        }
                        case 1: {
                          var ptr50 = dataView(memory1).getInt32(base + 4, true);
                          var len50 = dataView(memory1).getInt32(base + 8, true);
                          var result50 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr50, len50));
                          variant51 = result50;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant59;
                      switch (dataView(memory1).getUint8(base + 12, true)) {
                        case 0: {
                          variant59 = undefined;
                          break;
                        }
                        case 1: {
                          var len58 = dataView(memory1).getInt32(base + 20, true);
                          var base58 = dataView(memory1).getInt32(base + 16, true);
                          var result58 = [];
                          for (let i = 0; i < len58; i++) {
                            const base = base58 + i * 40;
                            var ptr52 = dataView(memory1).getInt32(base + 0, true);
                            var len52 = dataView(memory1).getInt32(base + 4, true);
                            var result52 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr52, len52));
                            let variant54;
                            switch (dataView(memory1).getUint8(base + 8, true)) {
                              case 0: {
                                variant54 = undefined;
                                break;
                              }
                              case 1: {
                                var ptr53 = dataView(memory1).getInt32(base + 12, true);
                                var len53 = dataView(memory1).getInt32(base + 16, true);
                                var result53 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr53, len53));
                                variant54 = result53;
                                break;
                              }
                              default: {
                                throw new TypeError('invalid variant discriminant for option');
                              }
                            }
                            var ptr55 = dataView(memory1).getInt32(base + 20, true);
                            var len55 = dataView(memory1).getInt32(base + 24, true);
                            var result55 = new Uint8Array(memory1.buffer.slice(ptr55, ptr55 + len55 * 1));
                            let variant57;
                            switch (dataView(memory1).getUint8(base + 28, true)) {
                              case 0: {
                                variant57 = undefined;
                                break;
                              }
                              case 1: {
                                var ptr56 = dataView(memory1).getInt32(base + 32, true);
                                var len56 = dataView(memory1).getInt32(base + 36, true);
                                var result56 = new Uint8Array(memory1.buffer.slice(ptr56, ptr56 + len56 * 1));
                                variant57 = result56;
                                break;
                              }
                              default: {
                                throw new TypeError('invalid variant discriminant for option');
                              }
                            }
                            result58.push({
                              url: result52,
                              alg: variant54,
                              hash: result55,
                              salt: variant57,
                            });
                          }
                          variant59 = result58;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      result60.push({
                        identifier: variant51,
                        credentials: variant59,
                      });
                    }
                    variant61 = result60;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                variant62 = {
                  sourceType: result47,
                  details: variant49,
                  actors: variant61,
                };
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant107;
            switch (dataView(memory1).getUint8(base + 104, true)) {
              case 0: {
                variant107 = undefined;
                break;
              }
              case 1: {
                var len94 = dataView(memory1).getInt32(base + 112, true);
                var base94 = dataView(memory1).getInt32(base + 108, true);
                var result94 = [];
                for (let i = 0; i < len94; i++) {
                  const base = base94 + i * 176;
                  let variant63;
                  switch (dataView(memory1).getUint8(base + 0, true)) {
                    case 0: {
                      variant63= {
                        tag: 'spatial',
                      };
                      break;
                    }
                    case 1: {
                      variant63= {
                        tag: 'temporal',
                      };
                      break;
                    }
                    case 2: {
                      variant63= {
                        tag: 'frame',
                      };
                      break;
                    }
                    case 3: {
                      variant63= {
                        tag: 'textual',
                      };
                      break;
                    }
                    case 4: {
                      variant63= {
                        tag: 'identified',
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for RangeType');
                    }
                  }
                  let variant72;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant72 = undefined;
                      break;
                    }
                    case 1: {
                      let variant64;
                      switch (dataView(memory1).getUint8(base + 16, true)) {
                        case 0: {
                          variant64= {
                            tag: 'rectangle',
                          };
                          break;
                        }
                        case 1: {
                          variant64= {
                            tag: 'circle',
                          };
                          break;
                        }
                        case 2: {
                          variant64= {
                            tag: 'polygon',
                          };
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for ShapeType');
                        }
                      }
                      let variant65;
                      switch (dataView(memory1).getUint8(base + 17, true)) {
                        case 0: {
                          variant65= {
                            tag: 'pixel',
                          };
                          break;
                        }
                        case 1: {
                          variant65= {
                            tag: 'percent',
                          };
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for UnitType');
                        }
                      }
                      let variant66;
                      switch (dataView(memory1).getUint8(base + 40, true)) {
                        case 0: {
                          variant66 = undefined;
                          break;
                        }
                        case 1: {
                          variant66 = dataView(memory1).getFloat64(base + 48, true);
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant67;
                      switch (dataView(memory1).getUint8(base + 56, true)) {
                        case 0: {
                          variant67 = undefined;
                          break;
                        }
                        case 1: {
                          variant67 = dataView(memory1).getFloat64(base + 64, true);
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant69;
                      switch (dataView(memory1).getUint8(base + 72, true)) {
                        case 0: {
                          variant69 = undefined;
                          break;
                        }
                        case 1: {
                          var bool68 = dataView(memory1).getUint8(base + 73, true);
                          variant69 = bool68 == 0 ? false : (bool68 == 1 ? true : throwInvalidBool());
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant71;
                      switch (dataView(memory1).getUint8(base + 76, true)) {
                        case 0: {
                          variant71 = undefined;
                          break;
                        }
                        case 1: {
                          var len70 = dataView(memory1).getInt32(base + 84, true);
                          var base70 = dataView(memory1).getInt32(base + 80, true);
                          var result70 = [];
                          for (let i = 0; i < len70; i++) {
                            const base = base70 + i * 16;
                            result70.push({
                              x: dataView(memory1).getFloat64(base + 0, true),
                              y: dataView(memory1).getFloat64(base + 8, true),
                            });
                          }
                          variant71 = result70;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      variant72 = {
                        shapeType: variant64,
                        unit: variant65,
                        origin: {
                          x: dataView(memory1).getFloat64(base + 24, true),
                          y: dataView(memory1).getFloat64(base + 32, true),
                        },
                        width: variant66,
                        height: variant67,
                        inside: variant69,
                        vertices: variant71,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant78;
                  switch (dataView(memory1).getUint8(base + 88, true)) {
                    case 0: {
                      variant78 = undefined;
                      break;
                    }
                    case 1: {
                      let variant73;
                      switch (dataView(memory1).getUint8(base + 92, true)) {
                        case 0: {
                          variant73= {
                            tag: 'npt',
                          };
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for TimeType');
                        }
                      }
                      let variant75;
                      switch (dataView(memory1).getUint8(base + 96, true)) {
                        case 0: {
                          variant75 = undefined;
                          break;
                        }
                        case 1: {
                          var ptr74 = dataView(memory1).getInt32(base + 100, true);
                          var len74 = dataView(memory1).getInt32(base + 104, true);
                          var result74 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr74, len74));
                          variant75 = result74;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant77;
                      switch (dataView(memory1).getUint8(base + 108, true)) {
                        case 0: {
                          variant77 = undefined;
                          break;
                        }
                        case 1: {
                          var ptr76 = dataView(memory1).getInt32(base + 112, true);
                          var len76 = dataView(memory1).getInt32(base + 116, true);
                          var result76 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr76, len76));
                          variant77 = result76;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      variant78 = {
                        timeType: variant73,
                        start: variant75,
                        end: variant77,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant81;
                  switch (dataView(memory1).getUint8(base + 120, true)) {
                    case 0: {
                      variant81 = undefined;
                      break;
                    }
                    case 1: {
                      let variant79;
                      switch (dataView(memory1).getUint8(base + 124, true)) {
                        case 0: {
                          variant79 = undefined;
                          break;
                        }
                        case 1: {
                          variant79 = dataView(memory1).getInt32(base + 128, true);
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant80;
                      switch (dataView(memory1).getUint8(base + 132, true)) {
                        case 0: {
                          variant80 = undefined;
                          break;
                        }
                        case 1: {
                          variant80 = dataView(memory1).getInt32(base + 136, true);
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      variant81 = {
                        start: variant79,
                        end: variant80,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant90;
                  switch (dataView(memory1).getUint8(base + 140, true)) {
                    case 0: {
                      variant90 = undefined;
                      break;
                    }
                    case 1: {
                      var len89 = dataView(memory1).getInt32(base + 148, true);
                      var base89 = dataView(memory1).getInt32(base + 144, true);
                      var result89 = [];
                      for (let i = 0; i < len89; i++) {
                        const base = base89 + i * 52;
                        var ptr82 = dataView(memory1).getInt32(base + 0, true);
                        var len82 = dataView(memory1).getInt32(base + 4, true);
                        var result82 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr82, len82));
                        let variant83;
                        switch (dataView(memory1).getUint8(base + 8, true)) {
                          case 0: {
                            variant83 = undefined;
                            break;
                          }
                          case 1: {
                            variant83 = dataView(memory1).getInt32(base + 12, true);
                            break;
                          }
                          default: {
                            throw new TypeError('invalid variant discriminant for option');
                          }
                        }
                        let variant84;
                        switch (dataView(memory1).getUint8(base + 16, true)) {
                          case 0: {
                            variant84 = undefined;
                            break;
                          }
                          case 1: {
                            variant84 = dataView(memory1).getInt32(base + 20, true);
                            break;
                          }
                          default: {
                            throw new TypeError('invalid variant discriminant for option');
                          }
                        }
                        let variant88;
                        switch (dataView(memory1).getUint8(base + 24, true)) {
                          case 0: {
                            variant88 = undefined;
                            break;
                          }
                          case 1: {
                            var ptr85 = dataView(memory1).getInt32(base + 28, true);
                            var len85 = dataView(memory1).getInt32(base + 32, true);
                            var result85 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr85, len85));
                            let variant86;
                            switch (dataView(memory1).getUint8(base + 36, true)) {
                              case 0: {
                                variant86 = undefined;
                                break;
                              }
                              case 1: {
                                variant86 = dataView(memory1).getInt32(base + 40, true);
                                break;
                              }
                              default: {
                                throw new TypeError('invalid variant discriminant for option');
                              }
                            }
                            let variant87;
                            switch (dataView(memory1).getUint8(base + 44, true)) {
                              case 0: {
                                variant87 = undefined;
                                break;
                              }
                              case 1: {
                                variant87 = dataView(memory1).getInt32(base + 48, true);
                                break;
                              }
                              default: {
                                throw new TypeError('invalid variant discriminant for option');
                              }
                            }
                            variant88 = {
                              fragment: result85,
                              start: variant86,
                              end: variant87,
                            };
                            break;
                          }
                          default: {
                            throw new TypeError('invalid variant discriminant for option');
                          }
                        }
                        result89.push({
                          selector: {
                            fragment: result82,
                            start: variant83,
                            end: variant84,
                          },
                          end: variant88,
                        });
                      }
                      variant90 = {
                        selectors: result89,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant93;
                  switch (dataView(memory1).getUint8(base + 152, true)) {
                    case 0: {
                      variant93 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr91 = dataView(memory1).getInt32(base + 156, true);
                      var len91 = dataView(memory1).getInt32(base + 160, true);
                      var result91 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr91, len91));
                      var ptr92 = dataView(memory1).getInt32(base + 164, true);
                      var len92 = dataView(memory1).getInt32(base + 168, true);
                      var result92 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr92, len92));
                      variant93 = {
                        identifier: result91,
                        value: result92,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result94.push({
                    rangeType: variant63,
                    shape: variant72,
                    time: variant78,
                    frame: variant81,
                    text: variant90,
                    item: variant93,
                  });
                }
                let variant96;
                switch (dataView(memory1).getUint8(base + 116, true)) {
                  case 0: {
                    variant96 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr95 = dataView(memory1).getInt32(base + 120, true);
                    var len95 = dataView(memory1).getInt32(base + 124, true);
                    var result95 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr95, len95));
                    variant96 = result95;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant98;
                switch (dataView(memory1).getUint8(base + 128, true)) {
                  case 0: {
                    variant98 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr97 = dataView(memory1).getInt32(base + 132, true);
                    var len97 = dataView(memory1).getInt32(base + 136, true);
                    var result97 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr97, len97));
                    variant98 = result97;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant100;
                switch (dataView(memory1).getUint8(base + 140, true)) {
                  case 0: {
                    variant100 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr99 = dataView(memory1).getInt32(base + 144, true);
                    var len99 = dataView(memory1).getInt32(base + 148, true);
                    var result99 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr99, len99));
                    variant100 = result99;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant102;
                switch (dataView(memory1).getUint8(base + 152, true)) {
                  case 0: {
                    variant102 = undefined;
                    break;
                  }
                  case 1: {
                    let variant101;
                    switch (dataView(memory1).getUint8(base + 153, true)) {
                      case 0: {
                        variant101= {
                          tag: 'area-of-interest',
                        };
                        break;
                      }
                      case 1: {
                        variant101= {
                          tag: 'cropped',
                        };
                        break;
                      }
                      case 2: {
                        variant101= {
                          tag: 'edited',
                        };
                        break;
                      }
                      case 3: {
                        variant101= {
                          tag: 'placed',
                        };
                        break;
                      }
                      case 4: {
                        variant101= {
                          tag: 'redacted',
                        };
                        break;
                      }
                      case 5: {
                        variant101= {
                          tag: 'subject-area',
                        };
                        break;
                      }
                      case 6: {
                        variant101= {
                          tag: 'deleted',
                        };
                        break;
                      }
                      case 7: {
                        variant101= {
                          tag: 'styled',
                        };
                        break;
                      }
                      case 8: {
                        variant101= {
                          tag: 'watermarked',
                        };
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for Role');
                      }
                    }
                    variant102 = variant101;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant104;
                switch (dataView(memory1).getUint8(base + 156, true)) {
                  case 0: {
                    variant104 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr103 = dataView(memory1).getInt32(base + 160, true);
                    var len103 = dataView(memory1).getInt32(base + 164, true);
                    var result103 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr103, len103));
                    variant104 = result103;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant106;
                switch (dataView(memory1).getUint8(base + 168, true)) {
                  case 0: {
                    variant106 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr105 = dataView(memory1).getInt32(base + 172, true);
                    var len105 = dataView(memory1).getInt32(base + 176, true);
                    var result105 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr105, len105));
                    variant106 = result105;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                variant107 = {
                  region: result94,
                  name: variant96,
                  identifier: variant98,
                  regionType: variant100,
                  role: variant102,
                  description: variant104,
                  metadata: variant106,
                };
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            var len110 = dataView(memory1).getInt32(base + 184, true);
            var base110 = dataView(memory1).getInt32(base + 180, true);
            var result110 = [];
            for (let i = 0; i < len110; i++) {
              const base = base110 + i * 16;
              var ptr108 = dataView(memory1).getInt32(base + 0, true);
              var len108 = dataView(memory1).getInt32(base + 4, true);
              var result108 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr108, len108));
              var ptr109 = dataView(memory1).getInt32(base + 8, true);
              var len109 = dataView(memory1).getInt32(base + 12, true);
              var result109 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr109, len109));
              result110.push([result108, result109]);
            }
            result111.push({
              reviews: variant37,
              dateTime: variant39,
              reference: variant46,
              dataSource: variant62,
              regionOfInterest: variant107,
              other: result110,
            });
          }
          variant112 = result111;
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      let variant114;
      switch (dataView(memory1).getUint8(ret + 40, true)) {
        case 0: {
          variant114 = undefined;
          break;
        }
        case 1: {
          var ptr113 = dataView(memory1).getInt32(ret + 44, true);
          var len113 = dataView(memory1).getInt32(ret + 48, true);
          var result113 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr113, len113));
          variant114 = result113;
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      var ptr115 = dataView(memory1).getInt32(ret + 52, true);
      var len115 = dataView(memory1).getInt32(ret + 56, true);
      var result115 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr115, len115));
      var ptr116 = dataView(memory1).getInt32(ret + 60, true);
      var len116 = dataView(memory1).getInt32(ret + 64, true);
      var result116 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr116, len116));
      let variant128;
      switch (dataView(memory1).getUint8(ret + 68, true)) {
        case 0: {
          variant128 = undefined;
          break;
        }
        case 1: {
          var ptr117 = dataView(memory1).getInt32(ret + 72, true);
          var len117 = dataView(memory1).getInt32(ret + 76, true);
          var result117 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr117, len117));
          var ptr118 = dataView(memory1).getInt32(ret + 80, true);
          var len118 = dataView(memory1).getInt32(ret + 84, true);
          var result118 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr118, len118));
          let variant123;
          switch (dataView(memory1).getUint8(ret + 88, true)) {
            case 0: {
              variant123 = undefined;
              break;
            }
            case 1: {
              var len122 = dataView(memory1).getInt32(ret + 96, true);
              var base122 = dataView(memory1).getInt32(ret + 92, true);
              var result122 = [];
              for (let i = 0; i < len122; i++) {
                const base = base122 + i * 20;
                var ptr119 = dataView(memory1).getInt32(base + 0, true);
                var len119 = dataView(memory1).getInt32(base + 4, true);
                var result119 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr119, len119));
                let variant121;
                switch (dataView(memory1).getUint8(base + 8, true)) {
                  case 0: {
                    variant121 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr120 = dataView(memory1).getInt32(base + 12, true);
                    var len120 = dataView(memory1).getInt32(base + 16, true);
                    var result120 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr120, len120));
                    variant121 = result120;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                result122.push({
                  type: result119,
                  version: variant121,
                });
              }
              variant123 = result122;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          let variant125;
          switch (dataView(memory1).getUint8(ret + 100, true)) {
            case 0: {
              variant125 = undefined;
              break;
            }
            case 1: {
              var ptr124 = dataView(memory1).getInt32(ret + 104, true);
              var len124 = dataView(memory1).getInt32(ret + 108, true);
              var result124 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr124, len124));
              variant125 = result124;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          let variant127;
          switch (dataView(memory1).getUint8(ret + 112, true)) {
            case 0: {
              variant127 = undefined;
              break;
            }
            case 1: {
              var ptr126 = dataView(memory1).getInt32(ret + 116, true);
              var len126 = dataView(memory1).getInt32(ret + 120, true);
              var result126 = new Uint8Array(memory1.buffer.slice(ptr126, ptr126 + len126 * 1));
              variant127 = result126;
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for option');
            }
          }
          variant128 = {
            format: result117,
            identifier: result118,
            dataTypes: variant123,
            alg: variant125,
            hash: variant127,
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      var len358 = dataView(memory1).getInt32(ret + 128, true);
      var base358 = dataView(memory1).getInt32(ret + 124, true);
      var result358 = [];
      for (let i = 0; i < len358; i++) {
        const base = base358 + i * 572;
        let variant130;
        switch (dataView(memory1).getUint8(base + 0, true)) {
          case 0: {
            variant130 = undefined;
            break;
          }
          case 1: {
            var ptr129 = dataView(memory1).getInt32(base + 4, true);
            var len129 = dataView(memory1).getInt32(base + 8, true);
            var result129 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr129, len129));
            variant130 = result129;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant132;
        switch (dataView(memory1).getUint8(base + 12, true)) {
          case 0: {
            variant132 = undefined;
            break;
          }
          case 1: {
            var ptr131 = dataView(memory1).getInt32(base + 16, true);
            var len131 = dataView(memory1).getInt32(base + 20, true);
            var result131 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr131, len131));
            variant132 = result131;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant134;
        switch (dataView(memory1).getUint8(base + 24, true)) {
          case 0: {
            variant134 = undefined;
            break;
          }
          case 1: {
            var ptr133 = dataView(memory1).getInt32(base + 28, true);
            var len133 = dataView(memory1).getInt32(base + 32, true);
            var result133 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr133, len133));
            variant134 = result133;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant136;
        switch (dataView(memory1).getUint8(base + 36, true)) {
          case 0: {
            variant136 = undefined;
            break;
          }
          case 1: {
            var ptr135 = dataView(memory1).getInt32(base + 40, true);
            var len135 = dataView(memory1).getInt32(base + 44, true);
            var result135 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr135, len135));
            variant136 = result135;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant138;
        switch (dataView(memory1).getUint8(base + 48, true)) {
          case 0: {
            variant138 = undefined;
            break;
          }
          case 1: {
            var ptr137 = dataView(memory1).getInt32(base + 52, true);
            var len137 = dataView(memory1).getInt32(base + 56, true);
            var result137 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr137, len137));
            variant138 = result137;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant150;
        switch (dataView(memory1).getUint8(base + 60, true)) {
          case 0: {
            variant150 = undefined;
            break;
          }
          case 1: {
            var ptr139 = dataView(memory1).getInt32(base + 64, true);
            var len139 = dataView(memory1).getInt32(base + 68, true);
            var result139 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr139, len139));
            var ptr140 = dataView(memory1).getInt32(base + 72, true);
            var len140 = dataView(memory1).getInt32(base + 76, true);
            var result140 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr140, len140));
            let variant145;
            switch (dataView(memory1).getUint8(base + 80, true)) {
              case 0: {
                variant145 = undefined;
                break;
              }
              case 1: {
                var len144 = dataView(memory1).getInt32(base + 88, true);
                var base144 = dataView(memory1).getInt32(base + 84, true);
                var result144 = [];
                for (let i = 0; i < len144; i++) {
                  const base = base144 + i * 20;
                  var ptr141 = dataView(memory1).getInt32(base + 0, true);
                  var len141 = dataView(memory1).getInt32(base + 4, true);
                  var result141 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr141, len141));
                  let variant143;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant143 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr142 = dataView(memory1).getInt32(base + 12, true);
                      var len142 = dataView(memory1).getInt32(base + 16, true);
                      var result142 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr142, len142));
                      variant143 = result142;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result144.push({
                    type: result141,
                    version: variant143,
                  });
                }
                variant145 = result144;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant147;
            switch (dataView(memory1).getUint8(base + 92, true)) {
              case 0: {
                variant147 = undefined;
                break;
              }
              case 1: {
                var ptr146 = dataView(memory1).getInt32(base + 96, true);
                var len146 = dataView(memory1).getInt32(base + 100, true);
                var result146 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr146, len146));
                variant147 = result146;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant149;
            switch (dataView(memory1).getUint8(base + 104, true)) {
              case 0: {
                variant149 = undefined;
                break;
              }
              case 1: {
                var ptr148 = dataView(memory1).getInt32(base + 108, true);
                var len148 = dataView(memory1).getInt32(base + 112, true);
                var result148 = new Uint8Array(memory1.buffer.slice(ptr148, ptr148 + len148 * 1));
                variant149 = result148;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            variant150 = {
              format: result139,
              identifier: result140,
              dataTypes: variant145,
              alg: variant147,
              hash: variant149,
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant152;
        switch (dataView(memory1).getUint8(base + 116, true)) {
          case 0: {
            variant152 = undefined;
            break;
          }
          case 1: {
            var ptr151 = dataView(memory1).getInt32(base + 120, true);
            var len151 = dataView(memory1).getInt32(base + 124, true);
            var result151 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr151, len151));
            variant152 = result151;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant153;
        switch (dataView(memory1).getUint8(base + 128, true)) {
          case 0: {
            variant153= {
              tag: 'parent-of',
            };
            break;
          }
          case 1: {
            variant153= {
              tag: 'component-of',
            };
            break;
          }
          case 2: {
            variant153= {
              tag: 'input-to',
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for Relationship');
          }
        }
        let variant155;
        switch (dataView(memory1).getUint8(base + 132, true)) {
          case 0: {
            variant155 = undefined;
            break;
          }
          case 1: {
            var ptr154 = dataView(memory1).getInt32(base + 136, true);
            var len154 = dataView(memory1).getInt32(base + 140, true);
            var result154 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr154, len154));
            variant155 = result154;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant167;
        switch (dataView(memory1).getUint8(base + 144, true)) {
          case 0: {
            variant167 = undefined;
            break;
          }
          case 1: {
            var len166 = dataView(memory1).getInt32(base + 152, true);
            var base166 = dataView(memory1).getInt32(base + 148, true);
            var result166 = [];
            for (let i = 0; i < len166; i++) {
              const base = base166 + i * 48;
              var ptr156 = dataView(memory1).getInt32(base + 0, true);
              var len156 = dataView(memory1).getInt32(base + 4, true);
              var result156 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr156, len156));
              let variant158;
              switch (dataView(memory1).getUint8(base + 8, true)) {
                case 0: {
                  variant158 = undefined;
                  break;
                }
                case 1: {
                  var ptr157 = dataView(memory1).getInt32(base + 12, true);
                  var len157 = dataView(memory1).getInt32(base + 16, true);
                  var result157 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr157, len157));
                  variant158 = result157;
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for option');
                }
              }
              let variant160;
              switch (dataView(memory1).getUint8(base + 20, true)) {
                case 0: {
                  variant160 = undefined;
                  break;
                }
                case 1: {
                  var ptr159 = dataView(memory1).getInt32(base + 24, true);
                  var len159 = dataView(memory1).getInt32(base + 28, true);
                  var result159 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr159, len159));
                  variant160 = result159;
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for option');
                }
              }
              let variant162;
              switch (dataView(memory1).getUint8(base + 32, true)) {
                case 0: {
                  variant162 = undefined;
                  break;
                }
                case 1: {
                  var bool161 = dataView(memory1).getUint8(base + 33, true);
                  variant162 = bool161 == 0 ? false : (bool161 == 1 ? true : throwInvalidBool());
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for option');
                }
              }
              let variant163;
              switch (dataView(memory1).getUint8(base + 34, true)) {
                case 0: {
                  variant163= {
                    tag: 'success',
                  };
                  break;
                }
                case 1: {
                  variant163= {
                    tag: 'informational',
                  };
                  break;
                }
                case 2: {
                  variant163= {
                    tag: 'failure',
                  };
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for LogKind');
                }
              }
              let variant165;
              switch (dataView(memory1).getUint8(base + 36, true)) {
                case 0: {
                  variant165 = undefined;
                  break;
                }
                case 1: {
                  var ptr164 = dataView(memory1).getInt32(base + 40, true);
                  var len164 = dataView(memory1).getInt32(base + 44, true);
                  var result164 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr164, len164));
                  variant165 = result164;
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for option');
                }
              }
              result166.push({
                code: result156,
                url: variant158,
                explanation: variant160,
                success: variant162,
                kind: variant163,
                ingredientUri: variant165,
              });
            }
            variant167 = result166;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant238;
        switch (dataView(memory1).getUint8(base + 156, true)) {
          case 0: {
            variant238 = undefined;
            break;
          }
          case 1: {
            let variant201;
            switch (dataView(memory1).getUint8(base + 160, true)) {
              case 0: {
                variant201 = undefined;
                break;
              }
              case 1: {
                var len178 = dataView(memory1).getInt32(base + 168, true);
                var base178 = dataView(memory1).getInt32(base + 164, true);
                var result178 = [];
                for (let i = 0; i < len178; i++) {
                  const base = base178 + i * 48;
                  var ptr168 = dataView(memory1).getInt32(base + 0, true);
                  var len168 = dataView(memory1).getInt32(base + 4, true);
                  var result168 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr168, len168));
                  let variant170;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant170 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr169 = dataView(memory1).getInt32(base + 12, true);
                      var len169 = dataView(memory1).getInt32(base + 16, true);
                      var result169 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr169, len169));
                      variant170 = result169;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant172;
                  switch (dataView(memory1).getUint8(base + 20, true)) {
                    case 0: {
                      variant172 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr171 = dataView(memory1).getInt32(base + 24, true);
                      var len171 = dataView(memory1).getInt32(base + 28, true);
                      var result171 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr171, len171));
                      variant172 = result171;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant174;
                  switch (dataView(memory1).getUint8(base + 32, true)) {
                    case 0: {
                      variant174 = undefined;
                      break;
                    }
                    case 1: {
                      var bool173 = dataView(memory1).getUint8(base + 33, true);
                      variant174 = bool173 == 0 ? false : (bool173 == 1 ? true : throwInvalidBool());
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant175;
                  switch (dataView(memory1).getUint8(base + 34, true)) {
                    case 0: {
                      variant175= {
                        tag: 'success',
                      };
                      break;
                    }
                    case 1: {
                      variant175= {
                        tag: 'informational',
                      };
                      break;
                    }
                    case 2: {
                      variant175= {
                        tag: 'failure',
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for LogKind');
                    }
                  }
                  let variant177;
                  switch (dataView(memory1).getUint8(base + 36, true)) {
                    case 0: {
                      variant177 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr176 = dataView(memory1).getInt32(base + 40, true);
                      var len176 = dataView(memory1).getInt32(base + 44, true);
                      var result176 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr176, len176));
                      variant177 = result176;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result178.push({
                    code: result168,
                    url: variant170,
                    explanation: variant172,
                    success: variant174,
                    kind: variant175,
                    ingredientUri: variant177,
                  });
                }
                var len189 = dataView(memory1).getInt32(base + 176, true);
                var base189 = dataView(memory1).getInt32(base + 172, true);
                var result189 = [];
                for (let i = 0; i < len189; i++) {
                  const base = base189 + i * 48;
                  var ptr179 = dataView(memory1).getInt32(base + 0, true);
                  var len179 = dataView(memory1).getInt32(base + 4, true);
                  var result179 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr179, len179));
                  let variant181;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant181 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr180 = dataView(memory1).getInt32(base + 12, true);
                      var len180 = dataView(memory1).getInt32(base + 16, true);
                      var result180 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr180, len180));
                      variant181 = result180;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant183;
                  switch (dataView(memory1).getUint8(base + 20, true)) {
                    case 0: {
                      variant183 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr182 = dataView(memory1).getInt32(base + 24, true);
                      var len182 = dataView(memory1).getInt32(base + 28, true);
                      var result182 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr182, len182));
                      variant183 = result182;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant185;
                  switch (dataView(memory1).getUint8(base + 32, true)) {
                    case 0: {
                      variant185 = undefined;
                      break;
                    }
                    case 1: {
                      var bool184 = dataView(memory1).getUint8(base + 33, true);
                      variant185 = bool184 == 0 ? false : (bool184 == 1 ? true : throwInvalidBool());
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant186;
                  switch (dataView(memory1).getUint8(base + 34, true)) {
                    case 0: {
                      variant186= {
                        tag: 'success',
                      };
                      break;
                    }
                    case 1: {
                      variant186= {
                        tag: 'informational',
                      };
                      break;
                    }
                    case 2: {
                      variant186= {
                        tag: 'failure',
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for LogKind');
                    }
                  }
                  let variant188;
                  switch (dataView(memory1).getUint8(base + 36, true)) {
                    case 0: {
                      variant188 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr187 = dataView(memory1).getInt32(base + 40, true);
                      var len187 = dataView(memory1).getInt32(base + 44, true);
                      var result187 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr187, len187));
                      variant188 = result187;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result189.push({
                    code: result179,
                    url: variant181,
                    explanation: variant183,
                    success: variant185,
                    kind: variant186,
                    ingredientUri: variant188,
                  });
                }
                var len200 = dataView(memory1).getInt32(base + 184, true);
                var base200 = dataView(memory1).getInt32(base + 180, true);
                var result200 = [];
                for (let i = 0; i < len200; i++) {
                  const base = base200 + i * 48;
                  var ptr190 = dataView(memory1).getInt32(base + 0, true);
                  var len190 = dataView(memory1).getInt32(base + 4, true);
                  var result190 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr190, len190));
                  let variant192;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant192 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr191 = dataView(memory1).getInt32(base + 12, true);
                      var len191 = dataView(memory1).getInt32(base + 16, true);
                      var result191 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr191, len191));
                      variant192 = result191;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant194;
                  switch (dataView(memory1).getUint8(base + 20, true)) {
                    case 0: {
                      variant194 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr193 = dataView(memory1).getInt32(base + 24, true);
                      var len193 = dataView(memory1).getInt32(base + 28, true);
                      var result193 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr193, len193));
                      variant194 = result193;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant196;
                  switch (dataView(memory1).getUint8(base + 32, true)) {
                    case 0: {
                      variant196 = undefined;
                      break;
                    }
                    case 1: {
                      var bool195 = dataView(memory1).getUint8(base + 33, true);
                      variant196 = bool195 == 0 ? false : (bool195 == 1 ? true : throwInvalidBool());
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant197;
                  switch (dataView(memory1).getUint8(base + 34, true)) {
                    case 0: {
                      variant197= {
                        tag: 'success',
                      };
                      break;
                    }
                    case 1: {
                      variant197= {
                        tag: 'informational',
                      };
                      break;
                    }
                    case 2: {
                      variant197= {
                        tag: 'failure',
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for LogKind');
                    }
                  }
                  let variant199;
                  switch (dataView(memory1).getUint8(base + 36, true)) {
                    case 0: {
                      variant199 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr198 = dataView(memory1).getInt32(base + 40, true);
                      var len198 = dataView(memory1).getInt32(base + 44, true);
                      var result198 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr198, len198));
                      variant199 = result198;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result200.push({
                    code: result190,
                    url: variant192,
                    explanation: variant194,
                    success: variant196,
                    kind: variant197,
                    ingredientUri: variant199,
                  });
                }
                variant201 = {
                  success: result178,
                  informational: result189,
                  failure: result200,
                };
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant237;
            switch (dataView(memory1).getUint8(base + 188, true)) {
              case 0: {
                variant237 = undefined;
                break;
              }
              case 1: {
                var len236 = dataView(memory1).getInt32(base + 196, true);
                var base236 = dataView(memory1).getInt32(base + 192, true);
                var result236 = [];
                for (let i = 0; i < len236; i++) {
                  const base = base236 + i * 32;
                  var ptr202 = dataView(memory1).getInt32(base + 0, true);
                  var len202 = dataView(memory1).getInt32(base + 4, true);
                  var result202 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr202, len202));
                  var len213 = dataView(memory1).getInt32(base + 12, true);
                  var base213 = dataView(memory1).getInt32(base + 8, true);
                  var result213 = [];
                  for (let i = 0; i < len213; i++) {
                    const base = base213 + i * 48;
                    var ptr203 = dataView(memory1).getInt32(base + 0, true);
                    var len203 = dataView(memory1).getInt32(base + 4, true);
                    var result203 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr203, len203));
                    let variant205;
                    switch (dataView(memory1).getUint8(base + 8, true)) {
                      case 0: {
                        variant205 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr204 = dataView(memory1).getInt32(base + 12, true);
                        var len204 = dataView(memory1).getInt32(base + 16, true);
                        var result204 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr204, len204));
                        variant205 = result204;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant207;
                    switch (dataView(memory1).getUint8(base + 20, true)) {
                      case 0: {
                        variant207 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr206 = dataView(memory1).getInt32(base + 24, true);
                        var len206 = dataView(memory1).getInt32(base + 28, true);
                        var result206 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr206, len206));
                        variant207 = result206;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant209;
                    switch (dataView(memory1).getUint8(base + 32, true)) {
                      case 0: {
                        variant209 = undefined;
                        break;
                      }
                      case 1: {
                        var bool208 = dataView(memory1).getUint8(base + 33, true);
                        variant209 = bool208 == 0 ? false : (bool208 == 1 ? true : throwInvalidBool());
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant210;
                    switch (dataView(memory1).getUint8(base + 34, true)) {
                      case 0: {
                        variant210= {
                          tag: 'success',
                        };
                        break;
                      }
                      case 1: {
                        variant210= {
                          tag: 'informational',
                        };
                        break;
                      }
                      case 2: {
                        variant210= {
                          tag: 'failure',
                        };
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for LogKind');
                      }
                    }
                    let variant212;
                    switch (dataView(memory1).getUint8(base + 36, true)) {
                      case 0: {
                        variant212 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr211 = dataView(memory1).getInt32(base + 40, true);
                        var len211 = dataView(memory1).getInt32(base + 44, true);
                        var result211 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr211, len211));
                        variant212 = result211;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    result213.push({
                      code: result203,
                      url: variant205,
                      explanation: variant207,
                      success: variant209,
                      kind: variant210,
                      ingredientUri: variant212,
                    });
                  }
                  var len224 = dataView(memory1).getInt32(base + 20, true);
                  var base224 = dataView(memory1).getInt32(base + 16, true);
                  var result224 = [];
                  for (let i = 0; i < len224; i++) {
                    const base = base224 + i * 48;
                    var ptr214 = dataView(memory1).getInt32(base + 0, true);
                    var len214 = dataView(memory1).getInt32(base + 4, true);
                    var result214 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr214, len214));
                    let variant216;
                    switch (dataView(memory1).getUint8(base + 8, true)) {
                      case 0: {
                        variant216 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr215 = dataView(memory1).getInt32(base + 12, true);
                        var len215 = dataView(memory1).getInt32(base + 16, true);
                        var result215 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr215, len215));
                        variant216 = result215;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant218;
                    switch (dataView(memory1).getUint8(base + 20, true)) {
                      case 0: {
                        variant218 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr217 = dataView(memory1).getInt32(base + 24, true);
                        var len217 = dataView(memory1).getInt32(base + 28, true);
                        var result217 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr217, len217));
                        variant218 = result217;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant220;
                    switch (dataView(memory1).getUint8(base + 32, true)) {
                      case 0: {
                        variant220 = undefined;
                        break;
                      }
                      case 1: {
                        var bool219 = dataView(memory1).getUint8(base + 33, true);
                        variant220 = bool219 == 0 ? false : (bool219 == 1 ? true : throwInvalidBool());
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant221;
                    switch (dataView(memory1).getUint8(base + 34, true)) {
                      case 0: {
                        variant221= {
                          tag: 'success',
                        };
                        break;
                      }
                      case 1: {
                        variant221= {
                          tag: 'informational',
                        };
                        break;
                      }
                      case 2: {
                        variant221= {
                          tag: 'failure',
                        };
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for LogKind');
                      }
                    }
                    let variant223;
                    switch (dataView(memory1).getUint8(base + 36, true)) {
                      case 0: {
                        variant223 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr222 = dataView(memory1).getInt32(base + 40, true);
                        var len222 = dataView(memory1).getInt32(base + 44, true);
                        var result222 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr222, len222));
                        variant223 = result222;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    result224.push({
                      code: result214,
                      url: variant216,
                      explanation: variant218,
                      success: variant220,
                      kind: variant221,
                      ingredientUri: variant223,
                    });
                  }
                  var len235 = dataView(memory1).getInt32(base + 28, true);
                  var base235 = dataView(memory1).getInt32(base + 24, true);
                  var result235 = [];
                  for (let i = 0; i < len235; i++) {
                    const base = base235 + i * 48;
                    var ptr225 = dataView(memory1).getInt32(base + 0, true);
                    var len225 = dataView(memory1).getInt32(base + 4, true);
                    var result225 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr225, len225));
                    let variant227;
                    switch (dataView(memory1).getUint8(base + 8, true)) {
                      case 0: {
                        variant227 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr226 = dataView(memory1).getInt32(base + 12, true);
                        var len226 = dataView(memory1).getInt32(base + 16, true);
                        var result226 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr226, len226));
                        variant227 = result226;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant229;
                    switch (dataView(memory1).getUint8(base + 20, true)) {
                      case 0: {
                        variant229 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr228 = dataView(memory1).getInt32(base + 24, true);
                        var len228 = dataView(memory1).getInt32(base + 28, true);
                        var result228 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr228, len228));
                        variant229 = result228;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant231;
                    switch (dataView(memory1).getUint8(base + 32, true)) {
                      case 0: {
                        variant231 = undefined;
                        break;
                      }
                      case 1: {
                        var bool230 = dataView(memory1).getUint8(base + 33, true);
                        variant231 = bool230 == 0 ? false : (bool230 == 1 ? true : throwInvalidBool());
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    let variant232;
                    switch (dataView(memory1).getUint8(base + 34, true)) {
                      case 0: {
                        variant232= {
                          tag: 'success',
                        };
                        break;
                      }
                      case 1: {
                        variant232= {
                          tag: 'informational',
                        };
                        break;
                      }
                      case 2: {
                        variant232= {
                          tag: 'failure',
                        };
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for LogKind');
                      }
                    }
                    let variant234;
                    switch (dataView(memory1).getUint8(base + 36, true)) {
                      case 0: {
                        variant234 = undefined;
                        break;
                      }
                      case 1: {
                        var ptr233 = dataView(memory1).getInt32(base + 40, true);
                        var len233 = dataView(memory1).getInt32(base + 44, true);
                        var result233 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr233, len233));
                        variant234 = result233;
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for option');
                      }
                    }
                    result235.push({
                      code: result225,
                      url: variant227,
                      explanation: variant229,
                      success: variant231,
                      kind: variant232,
                      ingredientUri: variant234,
                    });
                  }
                  result236.push({
                    ingredientAssertionUri: result202,
                    validationDeltas: {
                      success: result213,
                      informational: result224,
                      failure: result235,
                    },
                  });
                }
                variant237 = result236;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            variant238 = {
              activeManifest: variant201,
              ingredientDeltas: variant237,
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant250;
        switch (dataView(memory1).getUint8(base + 200, true)) {
          case 0: {
            variant250 = undefined;
            break;
          }
          case 1: {
            var ptr239 = dataView(memory1).getInt32(base + 204, true);
            var len239 = dataView(memory1).getInt32(base + 208, true);
            var result239 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr239, len239));
            var ptr240 = dataView(memory1).getInt32(base + 212, true);
            var len240 = dataView(memory1).getInt32(base + 216, true);
            var result240 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr240, len240));
            let variant245;
            switch (dataView(memory1).getUint8(base + 220, true)) {
              case 0: {
                variant245 = undefined;
                break;
              }
              case 1: {
                var len244 = dataView(memory1).getInt32(base + 228, true);
                var base244 = dataView(memory1).getInt32(base + 224, true);
                var result244 = [];
                for (let i = 0; i < len244; i++) {
                  const base = base244 + i * 20;
                  var ptr241 = dataView(memory1).getInt32(base + 0, true);
                  var len241 = dataView(memory1).getInt32(base + 4, true);
                  var result241 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr241, len241));
                  let variant243;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant243 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr242 = dataView(memory1).getInt32(base + 12, true);
                      var len242 = dataView(memory1).getInt32(base + 16, true);
                      var result242 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr242, len242));
                      variant243 = result242;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result244.push({
                    type: result241,
                    version: variant243,
                  });
                }
                variant245 = result244;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant247;
            switch (dataView(memory1).getUint8(base + 232, true)) {
              case 0: {
                variant247 = undefined;
                break;
              }
              case 1: {
                var ptr246 = dataView(memory1).getInt32(base + 236, true);
                var len246 = dataView(memory1).getInt32(base + 240, true);
                var result246 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr246, len246));
                variant247 = result246;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant249;
            switch (dataView(memory1).getUint8(base + 244, true)) {
              case 0: {
                variant249 = undefined;
                break;
              }
              case 1: {
                var ptr248 = dataView(memory1).getInt32(base + 248, true);
                var len248 = dataView(memory1).getInt32(base + 252, true);
                var result248 = new Uint8Array(memory1.buffer.slice(ptr248, ptr248 + len248 * 1));
                variant249 = result248;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            variant250 = {
              format: result239,
              identifier: result240,
              dataTypes: variant245,
              alg: variant247,
              hash: variant249,
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant252;
        switch (dataView(memory1).getUint8(base + 256, true)) {
          case 0: {
            variant252 = undefined;
            break;
          }
          case 1: {
            var ptr251 = dataView(memory1).getInt32(base + 260, true);
            var len251 = dataView(memory1).getInt32(base + 264, true);
            var result251 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr251, len251));
            variant252 = result251;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant254;
        switch (dataView(memory1).getUint8(base + 268, true)) {
          case 0: {
            variant254 = undefined;
            break;
          }
          case 1: {
            var ptr253 = dataView(memory1).getInt32(base + 272, true);
            var len253 = dataView(memory1).getInt32(base + 276, true);
            var result253 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr253, len253));
            variant254 = result253;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant333;
        switch (dataView(memory1).getUint8(base + 280, true)) {
          case 0: {
            variant333 = undefined;
            break;
          }
          case 1: {
            let variant259;
            switch (dataView(memory1).getUint8(base + 284, true)) {
              case 0: {
                variant259 = undefined;
                break;
              }
              case 1: {
                var len258 = dataView(memory1).getInt32(base + 292, true);
                var base258 = dataView(memory1).getInt32(base + 288, true);
                var result258 = [];
                for (let i = 0; i < len258; i++) {
                  const base = base258 + i * 24;
                  var ptr255 = dataView(memory1).getInt32(base + 0, true);
                  var len255 = dataView(memory1).getInt32(base + 4, true);
                  var result255 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr255, len255));
                  let variant257;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant257 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr256 = dataView(memory1).getInt32(base + 12, true);
                      var len256 = dataView(memory1).getInt32(base + 16, true);
                      var result256 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr256, len256));
                      variant257 = result256;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result258.push({
                    explanation: result255,
                    code: variant257,
                    value: clampGuest(dataView(memory1).getUint8(base + 20, true), 0, 255),
                  });
                }
                variant259 = result258;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant261;
            switch (dataView(memory1).getUint8(base + 296, true)) {
              case 0: {
                variant261 = undefined;
                break;
              }
              case 1: {
                var ptr260 = dataView(memory1).getInt32(base + 300, true);
                var len260 = dataView(memory1).getInt32(base + 304, true);
                var result260 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr260, len260));
                variant261 = result260;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant268;
            switch (dataView(memory1).getUint8(base + 308, true)) {
              case 0: {
                variant268 = undefined;
                break;
              }
              case 1: {
                var ptr262 = dataView(memory1).getInt32(base + 312, true);
                var len262 = dataView(memory1).getInt32(base + 316, true);
                var result262 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr262, len262));
                let variant264;
                switch (dataView(memory1).getUint8(base + 320, true)) {
                  case 0: {
                    variant264 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr263 = dataView(memory1).getInt32(base + 324, true);
                    var len263 = dataView(memory1).getInt32(base + 328, true);
                    var result263 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr263, len263));
                    variant264 = result263;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                var ptr265 = dataView(memory1).getInt32(base + 332, true);
                var len265 = dataView(memory1).getInt32(base + 336, true);
                var result265 = new Uint8Array(memory1.buffer.slice(ptr265, ptr265 + len265 * 1));
                let variant267;
                switch (dataView(memory1).getUint8(base + 340, true)) {
                  case 0: {
                    variant267 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr266 = dataView(memory1).getInt32(base + 344, true);
                    var len266 = dataView(memory1).getInt32(base + 348, true);
                    var result266 = new Uint8Array(memory1.buffer.slice(ptr266, ptr266 + len266 * 1));
                    variant267 = result266;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                variant268 = {
                  url: result262,
                  alg: variant264,
                  hash: result265,
                  salt: variant267,
                };
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant284;
            switch (dataView(memory1).getUint8(base + 352, true)) {
              case 0: {
                variant284 = undefined;
                break;
              }
              case 1: {
                var ptr269 = dataView(memory1).getInt32(base + 356, true);
                var len269 = dataView(memory1).getInt32(base + 360, true);
                var result269 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr269, len269));
                let variant271;
                switch (dataView(memory1).getUint8(base + 364, true)) {
                  case 0: {
                    variant271 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr270 = dataView(memory1).getInt32(base + 368, true);
                    var len270 = dataView(memory1).getInt32(base + 372, true);
                    var result270 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr270, len270));
                    variant271 = result270;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant283;
                switch (dataView(memory1).getUint8(base + 376, true)) {
                  case 0: {
                    variant283 = undefined;
                    break;
                  }
                  case 1: {
                    var len282 = dataView(memory1).getInt32(base + 384, true);
                    var base282 = dataView(memory1).getInt32(base + 380, true);
                    var result282 = [];
                    for (let i = 0; i < len282; i++) {
                      const base = base282 + i * 24;
                      let variant273;
                      switch (dataView(memory1).getUint8(base + 0, true)) {
                        case 0: {
                          variant273 = undefined;
                          break;
                        }
                        case 1: {
                          var ptr272 = dataView(memory1).getInt32(base + 4, true);
                          var len272 = dataView(memory1).getInt32(base + 8, true);
                          var result272 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr272, len272));
                          variant273 = result272;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant281;
                      switch (dataView(memory1).getUint8(base + 12, true)) {
                        case 0: {
                          variant281 = undefined;
                          break;
                        }
                        case 1: {
                          var len280 = dataView(memory1).getInt32(base + 20, true);
                          var base280 = dataView(memory1).getInt32(base + 16, true);
                          var result280 = [];
                          for (let i = 0; i < len280; i++) {
                            const base = base280 + i * 40;
                            var ptr274 = dataView(memory1).getInt32(base + 0, true);
                            var len274 = dataView(memory1).getInt32(base + 4, true);
                            var result274 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr274, len274));
                            let variant276;
                            switch (dataView(memory1).getUint8(base + 8, true)) {
                              case 0: {
                                variant276 = undefined;
                                break;
                              }
                              case 1: {
                                var ptr275 = dataView(memory1).getInt32(base + 12, true);
                                var len275 = dataView(memory1).getInt32(base + 16, true);
                                var result275 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr275, len275));
                                variant276 = result275;
                                break;
                              }
                              default: {
                                throw new TypeError('invalid variant discriminant for option');
                              }
                            }
                            var ptr277 = dataView(memory1).getInt32(base + 20, true);
                            var len277 = dataView(memory1).getInt32(base + 24, true);
                            var result277 = new Uint8Array(memory1.buffer.slice(ptr277, ptr277 + len277 * 1));
                            let variant279;
                            switch (dataView(memory1).getUint8(base + 28, true)) {
                              case 0: {
                                variant279 = undefined;
                                break;
                              }
                              case 1: {
                                var ptr278 = dataView(memory1).getInt32(base + 32, true);
                                var len278 = dataView(memory1).getInt32(base + 36, true);
                                var result278 = new Uint8Array(memory1.buffer.slice(ptr278, ptr278 + len278 * 1));
                                variant279 = result278;
                                break;
                              }
                              default: {
                                throw new TypeError('invalid variant discriminant for option');
                              }
                            }
                            result280.push({
                              url: result274,
                              alg: variant276,
                              hash: result277,
                              salt: variant279,
                            });
                          }
                          variant281 = result280;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      result282.push({
                        identifier: variant273,
                        credentials: variant281,
                      });
                    }
                    variant283 = result282;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                variant284 = {
                  sourceType: result269,
                  details: variant271,
                  actors: variant283,
                };
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant329;
            switch (dataView(memory1).getUint8(base + 388, true)) {
              case 0: {
                variant329 = undefined;
                break;
              }
              case 1: {
                var len316 = dataView(memory1).getInt32(base + 396, true);
                var base316 = dataView(memory1).getInt32(base + 392, true);
                var result316 = [];
                for (let i = 0; i < len316; i++) {
                  const base = base316 + i * 176;
                  let variant285;
                  switch (dataView(memory1).getUint8(base + 0, true)) {
                    case 0: {
                      variant285= {
                        tag: 'spatial',
                      };
                      break;
                    }
                    case 1: {
                      variant285= {
                        tag: 'temporal',
                      };
                      break;
                    }
                    case 2: {
                      variant285= {
                        tag: 'frame',
                      };
                      break;
                    }
                    case 3: {
                      variant285= {
                        tag: 'textual',
                      };
                      break;
                    }
                    case 4: {
                      variant285= {
                        tag: 'identified',
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for RangeType');
                    }
                  }
                  let variant294;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant294 = undefined;
                      break;
                    }
                    case 1: {
                      let variant286;
                      switch (dataView(memory1).getUint8(base + 16, true)) {
                        case 0: {
                          variant286= {
                            tag: 'rectangle',
                          };
                          break;
                        }
                        case 1: {
                          variant286= {
                            tag: 'circle',
                          };
                          break;
                        }
                        case 2: {
                          variant286= {
                            tag: 'polygon',
                          };
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for ShapeType');
                        }
                      }
                      let variant287;
                      switch (dataView(memory1).getUint8(base + 17, true)) {
                        case 0: {
                          variant287= {
                            tag: 'pixel',
                          };
                          break;
                        }
                        case 1: {
                          variant287= {
                            tag: 'percent',
                          };
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for UnitType');
                        }
                      }
                      let variant288;
                      switch (dataView(memory1).getUint8(base + 40, true)) {
                        case 0: {
                          variant288 = undefined;
                          break;
                        }
                        case 1: {
                          variant288 = dataView(memory1).getFloat64(base + 48, true);
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant289;
                      switch (dataView(memory1).getUint8(base + 56, true)) {
                        case 0: {
                          variant289 = undefined;
                          break;
                        }
                        case 1: {
                          variant289 = dataView(memory1).getFloat64(base + 64, true);
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant291;
                      switch (dataView(memory1).getUint8(base + 72, true)) {
                        case 0: {
                          variant291 = undefined;
                          break;
                        }
                        case 1: {
                          var bool290 = dataView(memory1).getUint8(base + 73, true);
                          variant291 = bool290 == 0 ? false : (bool290 == 1 ? true : throwInvalidBool());
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant293;
                      switch (dataView(memory1).getUint8(base + 76, true)) {
                        case 0: {
                          variant293 = undefined;
                          break;
                        }
                        case 1: {
                          var len292 = dataView(memory1).getInt32(base + 84, true);
                          var base292 = dataView(memory1).getInt32(base + 80, true);
                          var result292 = [];
                          for (let i = 0; i < len292; i++) {
                            const base = base292 + i * 16;
                            result292.push({
                              x: dataView(memory1).getFloat64(base + 0, true),
                              y: dataView(memory1).getFloat64(base + 8, true),
                            });
                          }
                          variant293 = result292;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      variant294 = {
                        shapeType: variant286,
                        unit: variant287,
                        origin: {
                          x: dataView(memory1).getFloat64(base + 24, true),
                          y: dataView(memory1).getFloat64(base + 32, true),
                        },
                        width: variant288,
                        height: variant289,
                        inside: variant291,
                        vertices: variant293,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant300;
                  switch (dataView(memory1).getUint8(base + 88, true)) {
                    case 0: {
                      variant300 = undefined;
                      break;
                    }
                    case 1: {
                      let variant295;
                      switch (dataView(memory1).getUint8(base + 92, true)) {
                        case 0: {
                          variant295= {
                            tag: 'npt',
                          };
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for TimeType');
                        }
                      }
                      let variant297;
                      switch (dataView(memory1).getUint8(base + 96, true)) {
                        case 0: {
                          variant297 = undefined;
                          break;
                        }
                        case 1: {
                          var ptr296 = dataView(memory1).getInt32(base + 100, true);
                          var len296 = dataView(memory1).getInt32(base + 104, true);
                          var result296 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr296, len296));
                          variant297 = result296;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant299;
                      switch (dataView(memory1).getUint8(base + 108, true)) {
                        case 0: {
                          variant299 = undefined;
                          break;
                        }
                        case 1: {
                          var ptr298 = dataView(memory1).getInt32(base + 112, true);
                          var len298 = dataView(memory1).getInt32(base + 116, true);
                          var result298 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr298, len298));
                          variant299 = result298;
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      variant300 = {
                        timeType: variant295,
                        start: variant297,
                        end: variant299,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant303;
                  switch (dataView(memory1).getUint8(base + 120, true)) {
                    case 0: {
                      variant303 = undefined;
                      break;
                    }
                    case 1: {
                      let variant301;
                      switch (dataView(memory1).getUint8(base + 124, true)) {
                        case 0: {
                          variant301 = undefined;
                          break;
                        }
                        case 1: {
                          variant301 = dataView(memory1).getInt32(base + 128, true);
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      let variant302;
                      switch (dataView(memory1).getUint8(base + 132, true)) {
                        case 0: {
                          variant302 = undefined;
                          break;
                        }
                        case 1: {
                          variant302 = dataView(memory1).getInt32(base + 136, true);
                          break;
                        }
                        default: {
                          throw new TypeError('invalid variant discriminant for option');
                        }
                      }
                      variant303 = {
                        start: variant301,
                        end: variant302,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant312;
                  switch (dataView(memory1).getUint8(base + 140, true)) {
                    case 0: {
                      variant312 = undefined;
                      break;
                    }
                    case 1: {
                      var len311 = dataView(memory1).getInt32(base + 148, true);
                      var base311 = dataView(memory1).getInt32(base + 144, true);
                      var result311 = [];
                      for (let i = 0; i < len311; i++) {
                        const base = base311 + i * 52;
                        var ptr304 = dataView(memory1).getInt32(base + 0, true);
                        var len304 = dataView(memory1).getInt32(base + 4, true);
                        var result304 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr304, len304));
                        let variant305;
                        switch (dataView(memory1).getUint8(base + 8, true)) {
                          case 0: {
                            variant305 = undefined;
                            break;
                          }
                          case 1: {
                            variant305 = dataView(memory1).getInt32(base + 12, true);
                            break;
                          }
                          default: {
                            throw new TypeError('invalid variant discriminant for option');
                          }
                        }
                        let variant306;
                        switch (dataView(memory1).getUint8(base + 16, true)) {
                          case 0: {
                            variant306 = undefined;
                            break;
                          }
                          case 1: {
                            variant306 = dataView(memory1).getInt32(base + 20, true);
                            break;
                          }
                          default: {
                            throw new TypeError('invalid variant discriminant for option');
                          }
                        }
                        let variant310;
                        switch (dataView(memory1).getUint8(base + 24, true)) {
                          case 0: {
                            variant310 = undefined;
                            break;
                          }
                          case 1: {
                            var ptr307 = dataView(memory1).getInt32(base + 28, true);
                            var len307 = dataView(memory1).getInt32(base + 32, true);
                            var result307 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr307, len307));
                            let variant308;
                            switch (dataView(memory1).getUint8(base + 36, true)) {
                              case 0: {
                                variant308 = undefined;
                                break;
                              }
                              case 1: {
                                variant308 = dataView(memory1).getInt32(base + 40, true);
                                break;
                              }
                              default: {
                                throw new TypeError('invalid variant discriminant for option');
                              }
                            }
                            let variant309;
                            switch (dataView(memory1).getUint8(base + 44, true)) {
                              case 0: {
                                variant309 = undefined;
                                break;
                              }
                              case 1: {
                                variant309 = dataView(memory1).getInt32(base + 48, true);
                                break;
                              }
                              default: {
                                throw new TypeError('invalid variant discriminant for option');
                              }
                            }
                            variant310 = {
                              fragment: result307,
                              start: variant308,
                              end: variant309,
                            };
                            break;
                          }
                          default: {
                            throw new TypeError('invalid variant discriminant for option');
                          }
                        }
                        result311.push({
                          selector: {
                            fragment: result304,
                            start: variant305,
                            end: variant306,
                          },
                          end: variant310,
                        });
                      }
                      variant312 = {
                        selectors: result311,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  let variant315;
                  switch (dataView(memory1).getUint8(base + 152, true)) {
                    case 0: {
                      variant315 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr313 = dataView(memory1).getInt32(base + 156, true);
                      var len313 = dataView(memory1).getInt32(base + 160, true);
                      var result313 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr313, len313));
                      var ptr314 = dataView(memory1).getInt32(base + 164, true);
                      var len314 = dataView(memory1).getInt32(base + 168, true);
                      var result314 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr314, len314));
                      variant315 = {
                        identifier: result313,
                        value: result314,
                      };
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result316.push({
                    rangeType: variant285,
                    shape: variant294,
                    time: variant300,
                    frame: variant303,
                    text: variant312,
                    item: variant315,
                  });
                }
                let variant318;
                switch (dataView(memory1).getUint8(base + 400, true)) {
                  case 0: {
                    variant318 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr317 = dataView(memory1).getInt32(base + 404, true);
                    var len317 = dataView(memory1).getInt32(base + 408, true);
                    var result317 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr317, len317));
                    variant318 = result317;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant320;
                switch (dataView(memory1).getUint8(base + 412, true)) {
                  case 0: {
                    variant320 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr319 = dataView(memory1).getInt32(base + 416, true);
                    var len319 = dataView(memory1).getInt32(base + 420, true);
                    var result319 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr319, len319));
                    variant320 = result319;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant322;
                switch (dataView(memory1).getUint8(base + 424, true)) {
                  case 0: {
                    variant322 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr321 = dataView(memory1).getInt32(base + 428, true);
                    var len321 = dataView(memory1).getInt32(base + 432, true);
                    var result321 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr321, len321));
                    variant322 = result321;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant324;
                switch (dataView(memory1).getUint8(base + 436, true)) {
                  case 0: {
                    variant324 = undefined;
                    break;
                  }
                  case 1: {
                    let variant323;
                    switch (dataView(memory1).getUint8(base + 437, true)) {
                      case 0: {
                        variant323= {
                          tag: 'area-of-interest',
                        };
                        break;
                      }
                      case 1: {
                        variant323= {
                          tag: 'cropped',
                        };
                        break;
                      }
                      case 2: {
                        variant323= {
                          tag: 'edited',
                        };
                        break;
                      }
                      case 3: {
                        variant323= {
                          tag: 'placed',
                        };
                        break;
                      }
                      case 4: {
                        variant323= {
                          tag: 'redacted',
                        };
                        break;
                      }
                      case 5: {
                        variant323= {
                          tag: 'subject-area',
                        };
                        break;
                      }
                      case 6: {
                        variant323= {
                          tag: 'deleted',
                        };
                        break;
                      }
                      case 7: {
                        variant323= {
                          tag: 'styled',
                        };
                        break;
                      }
                      case 8: {
                        variant323= {
                          tag: 'watermarked',
                        };
                        break;
                      }
                      default: {
                        throw new TypeError('invalid variant discriminant for Role');
                      }
                    }
                    variant324 = variant323;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant326;
                switch (dataView(memory1).getUint8(base + 440, true)) {
                  case 0: {
                    variant326 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr325 = dataView(memory1).getInt32(base + 444, true);
                    var len325 = dataView(memory1).getInt32(base + 448, true);
                    var result325 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr325, len325));
                    variant326 = result325;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                let variant328;
                switch (dataView(memory1).getUint8(base + 452, true)) {
                  case 0: {
                    variant328 = undefined;
                    break;
                  }
                  case 1: {
                    var ptr327 = dataView(memory1).getInt32(base + 456, true);
                    var len327 = dataView(memory1).getInt32(base + 460, true);
                    var result327 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr327, len327));
                    variant328 = result327;
                    break;
                  }
                  default: {
                    throw new TypeError('invalid variant discriminant for option');
                  }
                }
                variant329 = {
                  region: result316,
                  name: variant318,
                  identifier: variant320,
                  regionType: variant322,
                  role: variant324,
                  description: variant326,
                  metadata: variant328,
                };
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            var len332 = dataView(memory1).getInt32(base + 468, true);
            var base332 = dataView(memory1).getInt32(base + 464, true);
            var result332 = [];
            for (let i = 0; i < len332; i++) {
              const base = base332 + i * 16;
              var ptr330 = dataView(memory1).getInt32(base + 0, true);
              var len330 = dataView(memory1).getInt32(base + 4, true);
              var result330 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr330, len330));
              var ptr331 = dataView(memory1).getInt32(base + 8, true);
              var len331 = dataView(memory1).getInt32(base + 12, true);
              var result331 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr331, len331));
              result332.push([result330, result331]);
            }
            variant333 = {
              reviews: variant259,
              dateTime: variant261,
              reference: variant268,
              dataSource: variant284,
              regionOfInterest: variant329,
              other: result332,
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant338;
        switch (dataView(memory1).getUint8(base + 472, true)) {
          case 0: {
            variant338 = undefined;
            break;
          }
          case 1: {
            var len337 = dataView(memory1).getInt32(base + 480, true);
            var base337 = dataView(memory1).getInt32(base + 476, true);
            var result337 = [];
            for (let i = 0; i < len337; i++) {
              const base = base337 + i * 20;
              var ptr334 = dataView(memory1).getInt32(base + 0, true);
              var len334 = dataView(memory1).getInt32(base + 4, true);
              var result334 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr334, len334));
              let variant336;
              switch (dataView(memory1).getUint8(base + 8, true)) {
                case 0: {
                  variant336 = undefined;
                  break;
                }
                case 1: {
                  var ptr335 = dataView(memory1).getInt32(base + 12, true);
                  var len335 = dataView(memory1).getInt32(base + 16, true);
                  var result335 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr335, len335));
                  variant336 = result335;
                  break;
                }
                default: {
                  throw new TypeError('invalid variant discriminant for option');
                }
              }
              result337.push({
                type: result334,
                version: variant336,
              });
            }
            variant338 = result337;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant350;
        switch (dataView(memory1).getUint8(base + 484, true)) {
          case 0: {
            variant350 = undefined;
            break;
          }
          case 1: {
            var ptr339 = dataView(memory1).getInt32(base + 488, true);
            var len339 = dataView(memory1).getInt32(base + 492, true);
            var result339 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr339, len339));
            var ptr340 = dataView(memory1).getInt32(base + 496, true);
            var len340 = dataView(memory1).getInt32(base + 500, true);
            var result340 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr340, len340));
            let variant345;
            switch (dataView(memory1).getUint8(base + 504, true)) {
              case 0: {
                variant345 = undefined;
                break;
              }
              case 1: {
                var len344 = dataView(memory1).getInt32(base + 512, true);
                var base344 = dataView(memory1).getInt32(base + 508, true);
                var result344 = [];
                for (let i = 0; i < len344; i++) {
                  const base = base344 + i * 20;
                  var ptr341 = dataView(memory1).getInt32(base + 0, true);
                  var len341 = dataView(memory1).getInt32(base + 4, true);
                  var result341 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr341, len341));
                  let variant343;
                  switch (dataView(memory1).getUint8(base + 8, true)) {
                    case 0: {
                      variant343 = undefined;
                      break;
                    }
                    case 1: {
                      var ptr342 = dataView(memory1).getInt32(base + 12, true);
                      var len342 = dataView(memory1).getInt32(base + 16, true);
                      var result342 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr342, len342));
                      variant343 = result342;
                      break;
                    }
                    default: {
                      throw new TypeError('invalid variant discriminant for option');
                    }
                  }
                  result344.push({
                    type: result341,
                    version: variant343,
                  });
                }
                variant345 = result344;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant347;
            switch (dataView(memory1).getUint8(base + 516, true)) {
              case 0: {
                variant347 = undefined;
                break;
              }
              case 1: {
                var ptr346 = dataView(memory1).getInt32(base + 520, true);
                var len346 = dataView(memory1).getInt32(base + 524, true);
                var result346 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr346, len346));
                variant347 = result346;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            let variant349;
            switch (dataView(memory1).getUint8(base + 528, true)) {
              case 0: {
                variant349 = undefined;
                break;
              }
              case 1: {
                var ptr348 = dataView(memory1).getInt32(base + 532, true);
                var len348 = dataView(memory1).getInt32(base + 536, true);
                var result348 = new Uint8Array(memory1.buffer.slice(ptr348, ptr348 + len348 * 1));
                variant349 = result348;
                break;
              }
              default: {
                throw new TypeError('invalid variant discriminant for option');
              }
            }
            variant350 = {
              format: result339,
              identifier: result340,
              dataTypes: variant345,
              alg: variant347,
              hash: variant349,
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        var len353 = dataView(memory1).getInt32(base + 544, true);
        var base353 = dataView(memory1).getInt32(base + 540, true);
        var result353 = [];
        for (let i = 0; i < len353; i++) {
          const base = base353 + i * 16;
          var ptr351 = dataView(memory1).getInt32(base + 0, true);
          var len351 = dataView(memory1).getInt32(base + 4, true);
          var result351 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr351, len351));
          var ptr352 = dataView(memory1).getInt32(base + 8, true);
          var len352 = dataView(memory1).getInt32(base + 12, true);
          var result352 = new Uint8Array(memory1.buffer.slice(ptr352, ptr352 + len352 * 1));
          result353.push([result351, result352]);
        }
        let variant355;
        switch (dataView(memory1).getUint8(base + 548, true)) {
          case 0: {
            variant355 = undefined;
            break;
          }
          case 1: {
            var ptr354 = dataView(memory1).getInt32(base + 552, true);
            var len354 = dataView(memory1).getInt32(base + 556, true);
            var result354 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr354, len354));
            variant355 = result354;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant357;
        switch (dataView(memory1).getUint8(base + 560, true)) {
          case 0: {
            variant357 = undefined;
            break;
          }
          case 1: {
            var ptr356 = dataView(memory1).getInt32(base + 564, true);
            var len356 = dataView(memory1).getInt32(base + 568, true);
            var result356 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr356, len356));
            variant357 = result356;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        result358.push({
          title: variant130,
          format: variant132,
          documentId: variant134,
          instanceId: variant136,
          provenance: variant138,
          thumbnail: variant150,
          hash: variant152,
          relationship: variant153,
          activeManifest: variant155,
          validationStatus: variant167,
          validationResults: variant238,
          data: variant250,
          description: variant252,
          informationalUri: variant254,
          metadata: variant333,
          dataTypes: variant338,
          manifestData: variant350,
          resources: {
            resources: result353,
            basePath: variant355,
            label: variant357,
          },
        });
      }
      var len361 = dataView(memory1).getInt32(ret + 136, true);
      var base361 = dataView(memory1).getInt32(ret + 132, true);
      var result361 = [];
      for (let i = 0; i < len361; i++) {
        const base = base361 + i * 12;
        var ptr359 = dataView(memory1).getInt32(base + 0, true);
        var len359 = dataView(memory1).getInt32(base + 4, true);
        var result359 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr359, len359));
        let variant360;
        switch (dataView(memory1).getUint8(base + 8, true)) {
          case 0: {
            variant360= {
              tag: 'cbor',
            };
            break;
          }
          case 1: {
            variant360= {
              tag: 'json',
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for AssertionData');
          }
        }
        result361.push({
          label: result359,
          data: variant360,
        });
      }
      let variant364;
      switch (dataView(memory1).getUint8(ret + 140, true)) {
        case 0: {
          variant364 = undefined;
          break;
        }
        case 1: {
          var len363 = dataView(memory1).getInt32(ret + 148, true);
          var base363 = dataView(memory1).getInt32(ret + 144, true);
          var result363 = [];
          for (let i = 0; i < len363; i++) {
            const base = base363 + i * 8;
            var ptr362 = dataView(memory1).getInt32(base + 0, true);
            var len362 = dataView(memory1).getInt32(base + 4, true);
            var result362 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr362, len362));
            result363.push(result362);
          }
          variant364 = result363;
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      let variant366;
      switch (dataView(memory1).getUint8(ret + 152, true)) {
        case 0: {
          variant366 = undefined;
          break;
        }
        case 1: {
          var ptr365 = dataView(memory1).getInt32(ret + 156, true);
          var len365 = dataView(memory1).getInt32(ret + 160, true);
          var result365 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr365, len365));
          variant366 = result365;
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      variant367 = {
        claimVersion: variant2,
        vendor: variant4,
        claimGeneratorInfo: result32,
        metadata: variant112,
        title: variant114,
        format: result115,
        instanceId: result116,
        thumbnail: variant128,
        ingredients: result358,
        assertions: result361,
        redactions: variant364,
        label: variant366,
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  const retVal = variant367;
  postReturn4(ret);
  return retVal;
};
let c2pa010FormatFromPath;

function formatFromPath(arg0) {
  var ptr0 = utf8Encode(arg0, realloc1, memory1);
  var len0 = utf8EncodedLen;
  const ret = c2pa010FormatFromPath(ptr0, len0);
  let variant2;
  switch (dataView(memory1).getUint8(ret + 0, true)) {
    case 0: {
      variant2 = undefined;
      break;
    }
    case 1: {
      var ptr1 = dataView(memory1).getInt32(ret + 4, true);
      var len1 = dataView(memory1).getInt32(ret + 8, true);
      var result1 = utf8Decoder.decode(new Uint8Array(memory1.buffer, ptr1, len1));
      variant2 = result1;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  const retVal = variant2;
  postReturn5(ret);
  return retVal;
}
function trampoline49(from_ptr, len, to_ptr) {
  new Uint8Array(memory1.buffer, to_ptr, len).set(new Uint8Array(memory0.buffer, from_ptr, len));
}


const $init = (() => {
  let gen = (function* init () {
    const module0 = fetchCompile(new URL('./c2pa_component.core.wasm', import.meta.url));
    const module1 = fetchCompile(new URL('./c2pa_component.core2.wasm', import.meta.url));
    const module2 = base64Compile('AGFzbQEAAAABKQdgBH9/f38Bf2ACf38Bf2ABfwBgAX8AYAJ/fwBgA39+fwBgBH9/f38AAxAPAAEBAgMEBQQEBAQGBAYDBAUBcAEPDwdNEAEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOCCRpbXBvcnRzAQAKvQEPDwAgACABIAIgA0EAEQAACwsAIAAgAUEBEQEACwsAIAAgAUECEQEACwkAIABBAxECAAsJACAAQQQRAwALCwAgACABQQURBAALDQAgACABIAJBBhEFAAsLACAAIAFBBxEEAAsLACAAIAFBCBEEAAsLACAAIAFBCREEAAsLACAAIAFBChEEAAsPACAAIAEgAiADQQsRBgALCwAgACABQQwRBAALDwAgACABIAIgA0ENEQYACwkAIABBDhEDAAsALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIyMy4wAJgHBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0B+wYPACVhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3dyaXRlAShhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fZ2V0Ai5hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fc2l6ZXNfZ2V0AyZhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXByb2NfZXhpdAQzaW5kaXJlY3Qtd2FzaTpjbGkvZW52aXJvbm1lbnRAMC4yLjMtZ2V0LWVudmlyb25tZW50BTppbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtZmlsZXN5c3RlbS1lcnJvci1jb2RlBkhpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLndyaXRlLXZpYS1zdHJlYW0HSWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3IuYXBwZW5kLXZpYS1zdHJlYW0IQGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3IuZ2V0LXR5cGUJPGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdApAaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQs6aW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS53cml0ZQxDaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy1mbHVzaA1NaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy13cml0ZS1hbmQtZmx1c2gON2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS9wcmVvcGVuc0AwLjIuMi1nZXQtZGlyZWN0b3JpZXM');
    const module3 = base64Compile('AGFzbQEAAAABKQdgBH9/f38Bf2ACf38Bf2ABfwBgAX8AYAJ/fwBgA39+fwBgBH9/f38AAmAQAAEwAAAAATEAAQABMgABAAEzAAIAATQAAwABNQAEAAE2AAUAATcABAABOAAEAAE5AAQAAjEwAAQAAjExAAYAAjEyAAQAAjEzAAYAAjE0AAMACCRpbXBvcnRzAXABDw8JFQEAQQALDwABAgMEBQYHCAkKCwwNDgAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjIzLjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
    const module4 = fetchCompile(new URL('./c2pa_component.core3.wasm', import.meta.url));
    const module5 = fetchCompile(new URL('./c2pa_component.core4.wasm', import.meta.url));
    const module6 = base64Compile('AGFzbQEAAAABmgEVYAN/f38AYAR/fn5/AGAFf39/fn8AYAJ/fwBgA39+fwBgBH9/f38AYAJ/fwF/YAN/fn8Bf2AEf39/fwF/YAR/fn9/AX9gA39/fwF/YAV/f39/fwF/YAl/f39/f35+f38Bf2AGf39/f39/AX9gAX8Bf2ABfwBgAX8AYAV/f39/fwBgB39/f39/f38AYAd/f39/f39/AGACfn8AAzc2AAECAwQDBQMGBwYICQgKCwwNCgYGDgYKDw4PDxAQAwUREhMFBAQDAwMDEQQEAwUDBRQQEBAQBAUBcAE2NgeQAjcBMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMAjEzAA0CMTQADgIxNQAPAjE2ABACMTcAEQIxOAASAjE5ABMCMjAAFAIyMQAVAjIyABYCMjMAFwIyNAAYAjI1ABkCMjYAGgIyNwAbAjI4ABwCMjkAHQIzMAAeAjMxAB8CMzIAIAIzMwAhAjM0ACICMzUAIwIzNgAkAjM3ACUCMzgAJgIzOQAnAjQwACgCNDEAKQI0MgAqAjQzACsCNDQALAI0NQAtAjQ2AC4CNDcALwI0OAAwAjQ5ADECNTAAMgI1MQAzAjUyADQCNTMANQgkaW1wb3J0cwEACu0FNg0AIAAgASACQQARAAALDwAgACABIAIgA0EBEQEACxEAIAAgASACIAMgBEECEQIACwsAIAAgAUEDEQMACw0AIAAgASACQQQRBAALCwAgACABQQURAwALDwAgACABIAIgA0EGEQUACwsAIAAgAUEHEQMACwsAIAAgAUEIEQYACw0AIAAgASACQQkRBwALCwAgACABQQoRBgALDwAgACABIAIgA0ELEQgACw8AIAAgASACIANBDBEJAAsPACAAIAEgAiADQQ0RCAALDQAgACABIAJBDhEKAAsRACAAIAEgAiADIARBDxELAAsZACAAIAEgAiADIAQgBSAGIAcgCEEQEQwACxMAIAAgASACIAMgBCAFQRERDQALDQAgACABIAJBEhEKAAsLACAAIAFBExEGAAsLACAAIAFBFBEGAAsJACAAQRURDgALCwAgACABQRYRBgALDQAgACABIAJBFxEKAAsJACAAQRgRDwALCQAgAEEZEQ4ACwkAIABBGhEPAAsJACAAQRsRDwALCQAgAEEcERAACwkAIABBHREQAAsLACAAIAFBHhEDAAsPACAAIAEgAiADQR8RBQALEQAgACABIAIgAyAEQSAREQALFQAgACABIAIgAyAEIAUgBkEhERIACxUAIAAgASACIAMgBCAFIAZBIhETAAsPACAAIAEgAiADQSMRBQALDQAgACABIAJBJBEEAAsNACAAIAEgAkElEQQACwsAIAAgAUEmEQMACwsAIAAgAUEnEQMACwsAIAAgAUEoEQMACwsAIAAgAUEpEQMACxEAIAAgASACIAMgBEEqEREACw0AIAAgASACQSsRBAALDQAgACABIAJBLBEEAAsLACAAIAFBLREDAAsPACAAIAEgAiADQS4RBQALCwAgACABQS8RAwALDwAgACABIAIgA0EwEQUACwsAIAAgAUExERQACwkAIABBMhEQAAsJACAAQTMREAALCQAgAEE0ERAACwkAIABBNREQAAsALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIyMy4wAMgXBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0Bqxc2AClpbmRpcmVjdC1hZG9iZTpjYWkvYzJwYS1zaWduZXJAMC4xLjAtc2lnbgE8aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi40LVttZXRob2RdZGVzY3JpcHRvci5yZWFkAj1pbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjQtW21ldGhvZF1kZXNjcmlwdG9yLndyaXRlAzxpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjQtW21ldGhvZF1kZXNjcmlwdG9yLnN5bmMEQWluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuNC1bbWV0aG9kXWlucHV0LXN0cmVhbS5ibG9ja2luZy1yZWFkBUBpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjQtW21ldGhvZF1vdXRwdXQtc3RyZWFtLmNoZWNrLXdyaXRlBjppbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjQtW21ldGhvZF1vdXRwdXQtc3RyZWFtLndyaXRlBzppbmRpcmVjdC13YXNpOmlvL2Vycm9yQDAuMi40LVttZXRob2RdZXJyb3IudG8tZGVidWctc3RyaW5nCCdhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXJhbmRvbV9nZXQJK2FkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtY2xvY2tfdGltZV9nZXQKLGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfZmlsZXN0YXRfZ2V0CyRhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3JlYWQMJGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfc2Vlaw0lYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF93cml0ZQ4yYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wYXRoX2NyZWF0ZV9kaXJlY3RvcnkPLmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcGF0aF9maWxlc3RhdF9nZXQQJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcGF0aF9vcGVuEShhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXBhdGhfcmVuYW1lEi1hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXBhdGhfdW5saW5rX2ZpbGUTKGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9nZXQULmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9zaXplc19nZXQVJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfY2xvc2UWK2FkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcHJlc3RhdF9nZXQXMGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcHJlc3RhdF9kaXJfbmFtZRgmYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wcm9jX2V4aXQZMGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtYWRhcHRlcl9jbG9zZV9iYWRmZBoMZHRvci1idWlsZGVyGwtkdG9yLXJlYWRlchwzaW5kaXJlY3Qtd2FzaTpjbGkvZW52aXJvbm1lbnRAMC4yLjMtZ2V0LWVudmlyb25tZW50HSlpbmRpcmVjdC13YXNpOmNsb2Nrcy93YWxsLWNsb2NrQDAuMi4zLW5vdx46aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLWZpbGVzeXN0ZW0tZXJyb3ItY29kZR9LaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5jcmVhdGUtZGlyZWN0b3J5LWF0ID9pbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLnN0YXQtYXQhP2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3Iub3Blbi1hdCJBaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5yZW5hbWUtYXQjRmluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3IudW5saW5rLWZpbGUtYXQkR2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3IucmVhZC12aWEtc3RyZWFtJUhpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLndyaXRlLXZpYS1zdHJlYW0mSWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3IuYXBwZW5kLXZpYS1zdHJlYW0nQGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3IuZ2V0LXR5cGUoPGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdClFaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5tZXRhZGF0YS1oYXNoKkhpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLm1ldGFkYXRhLWhhc2gtYXQrOGluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMy1bbWV0aG9kXWlucHV0LXN0cmVhbS5yZWFkLEFpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjMtW21ldGhvZF1pbnB1dC1zdHJlYW0uYmxvY2tpbmctcmVhZC1AaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZS46aW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS53cml0ZS9DaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy1mbHVzaDBNaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy13cml0ZS1hbmQtZmx1c2gxMmluZGlyZWN0LXdhc2k6cmFuZG9tL3JhbmRvbUAwLjIuMy1nZXQtcmFuZG9tLWJ5dGVzMjdpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjItZ2V0LWRpcmVjdG9yaWVzMzlpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRpbkAwLjIuMy1nZXQtdGVybWluYWwtc3RkaW40O2luZGlyZWN0LXdhc2k6Y2xpL3Rlcm1pbmFsLXN0ZG91dEAwLjIuMy1nZXQtdGVybWluYWwtc3Rkb3V0NTtpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRlcnJAMC4yLjMtZ2V0LXRlcm1pbmFsLXN0ZGVycg');
    const module7 = base64Compile('AGFzbQEAAAABmgEVYAN/f38AYAR/fn5/AGAFf39/fn8AYAJ/fwBgA39+fwBgBH9/f38AYAJ/fwF/YAN/fn8Bf2AEf39/fwF/YAR/fn9/AX9gA39/fwF/YAV/f39/fwF/YAl/f39/f35+f38Bf2AGf39/f39/AX9gAX8Bf2ABfwBgAX8AYAV/f39/fwBgB39/f39/f38AYAd/f39/f39/AGACfn8AAsoCNwABMAAAAAExAAEAATIAAgABMwADAAE0AAQAATUAAwABNgAFAAE3AAMAATgABgABOQAHAAIxMAAGAAIxMQAIAAIxMgAJAAIxMwAIAAIxNAAKAAIxNQALAAIxNgAMAAIxNwANAAIxOAAKAAIxOQAGAAIyMAAGAAIyMQAOAAIyMgAGAAIyMwAKAAIyNAAPAAIyNQAOAAIyNgAPAAIyNwAPAAIyOAAQAAIyOQAQAAIzMAADAAIzMQAFAAIzMgARAAIzMwASAAIzNAATAAIzNQAFAAIzNgAEAAIzNwAEAAIzOAADAAIzOQADAAI0MAADAAI0MQADAAI0MgARAAI0MwAEAAI0NAAEAAI0NQADAAI0NgAFAAI0NwADAAI0OAAFAAI0OQAUAAI1MAAQAAI1MQAQAAI1MgAQAAI1MwAQAAgkaW1wb3J0cwFwATY2CTwBAEEACzYAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDUALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIyMy4wABwEbmFtZQAVFHdpdC1jb21wb25lbnQ6Zml4dXBz');
    const module8 = base64Compile('AGFzbQEAAAABLwhgBH9/f38Bf2ACf38Bf2ABfwBgA39/fwBgAAF/YAJ/fwF/YAN/f38AYAN/f38AAocCDAVmbGFncwlpbnN0YW5jZTEDfwEGbWVtb3J5Am0wAgAAB3JlYWxsb2MCZjAAAAVmbGFncwlpbnN0YW5jZTMDfwEHcmVhbGxvYwJmMQAABmNhbGxlZQhhZGFwdGVyMAABC3Bvc3RfcmV0dXJuCGFkYXB0ZXIwAAIJdHJhbnNjb2RlG3V0ZjgtdG8tdXRmOCAobWVtMCA9PiBtZW0xKQADCGF1Z21lbnRzD21lbTEgTWVtb3J5U2l6ZQAECGF1Z21lbnRzDm1lbTEgSTMyTG9hZDhVAAUIYXVnbWVudHMObWVtMSBJMzJTdG9yZTgABghhdWdtZW50cw1tZW0xIEkzMlN0b3JlAAcDAgEDBwwBCGFkYXB0ZXIwAAkK0BQBzRQBB38jAUEBcUUEQAALIwBBAnFFBEAACyMAQX1xJAAjAEF+cSQAIAAgASEDIQQgAyEFIAUhBkEAQQBBASAGEAAhBwJAAkAQBa1CEIYgBK0gBa18Wg0BCwALAkACQD8ArUIQhiAHrSAGrXxaDQELAAsCQCADIgZFDQAgBCEFIAchCANAIAggBUEAEAY6AAAgBUEBaiEFIAhBAWohCCAGQX9qIgYNAAsLIAcgAyMAQQFyJAAQAiEHIwFBfnEkASAHQQNxBEAACyACQQNxBEAACwJAAkACQAJAIActAAAOAgECAAsACyACQQBBABAHIAcoAgQgBygCCCEEIQMgBCEGIAYhBUEAQQBBASAFEAEhCAJAAkA/AK1CEIYgA60gBq18Wg0BCwALAkACQBAFrUIQhiAIrSAFrXxaDQELAAsCQCAEIgVFDQAgAyEGIAghCQNAIAkgBi0AAEEAEAcgBkEBaiEGIAlBAWohCSAFQX9qIgUNAAsLIAIgCEEEEAggAiAEQQgQCAwBCyACQQFBABAHAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAHLQAEDhIBAgMEBQYHCAkKCwwNDg8QERIACwALIAJBAEEEEAcgBygCCCAHKAIMIQghAyAIQYCAgIB4TwRAAAsgCCIEIQVBAEEAQQEgBRABIQYCQAJAPwCtQhCGIAOtIAitfFoNAQsACwJAAkAQBa1CEIYgBq0gBa18Wg0BCwALIAMgCCAGEAQgAiAGQQgQCCACIARBDBAIDBELIAJBAUEEEAcgBygCCCAHKAIMIQQhBiAEQYCAgIB4TwRAAAsgBCIIIQNBAEEAQQEgAxABIQUCQAJAPwCtQhCGIAatIAStfFoNAQsACwJAAkAQBa1CEIYgBa0gA618Wg0BCwALIAYgBCAFEAQgAiAFQQgQCCACIAhBDBAIDBALIAJBAkEEEAcgBygCCCAHKAIMIQghBSAIQYCAgIB4TwRAAAsgCCIEIQZBAEEAQQEgBhABIQMCQAJAPwCtQhCGIAWtIAitfFoNAQsACwJAAkAQBa1CEIYgA60gBq18Wg0BCwALIAUgCCADEAQgAiADQQgQCCACIARBDBAIDA8LIAJBA0EEEAcgBygCCCAHKAIMIQQhAyAEQYCAgIB4TwRAAAsgBCIIIQVBAEEAQQEgBRABIQYCQAJAPwCtQhCGIAOtIAStfFoNAQsACwJAAkAQBa1CEIYgBq0gBa18Wg0BCwALIAMgBCAGEAQgAiAGQQgQCCACIAhBDBAIDA4LIAJBBEEEEAcgBygCCCAHKAIMIQghBiAIQYCAgIB4TwRAAAsgCCIEIQNBAEEAQQEgAxABIQUCQAJAPwCtQhCGIAatIAitfFoNAQsACwJAAkAQBa1CEIYgBa0gA618Wg0BCwALIAYgCCAFEAQgAiAFQQgQCCACIARBDBAIDA0LIAJBBUEEEAcgBygCCCAHKAIMIQQhBSAEQYCAgIB4TwRAAAsgBCIIIQZBAEEAQQEgBhABIQMCQAJAPwCtQhCGIAWtIAStfFoNAQsACwJAAkAQBa1CEIYgA60gBq18Wg0BCwALIAUgBCADEAQgAiADQQgQCCACIAhBDBAIDAwLIAJBBkEEEAcgBygCCCAHKAIMIQghAyAIQYCAgIB4TwRAAAsgCCIEIQVBAEEAQQEgBRABIQYCQAJAPwCtQhCGIAOtIAitfFoNAQsACwJAAkAQBa1CEIYgBq0gBa18Wg0BCwALIAMgCCAGEAQgAiAGQQgQCCACIARBDBAIDAsLIAJBB0EEEAcgBygCCCAHKAIMIQQhBiAEQYCAgIB4TwRAAAsgBCIIIQNBAEEAQQEgAxABIQUCQAJAPwCtQhCGIAatIAStfFoNAQsACwJAAkAQBa1CEIYgBa0gA618Wg0BCwALIAYgBCAFEAQgAiAFQQgQCCACIAhBDBAIDAoLIAJBCEEEEAcgBygCCCAHKAIMIQghBSAIQYCAgIB4TwRAAAsgCCIEIQZBAEEAQQEgBhABIQMCQAJAPwCtQhCGIAWtIAitfFoNAQsACwJAAkAQBa1CEIYgA60gBq18Wg0BCwALIAUgCCADEAQgAiADQQgQCCACIARBDBAIDAkLIAJBCUEEEAcgBygCCCAHKAIMIQQhAyAEQYCAgIB4TwRAAAsgBCIIIQVBAEEAQQEgBRABIQYCQAJAPwCtQhCGIAOtIAStfFoNAQsACwJAAkAQBa1CEIYgBq0gBa18Wg0BCwALIAMgBCAGEAQgAiAGQQgQCCACIAhBDBAIDAgLIAJBCkEEEAcgBygCCCAHKAIMIQghBiAIQYCAgIB4TwRAAAsgCCIEIQNBAEEAQQEgAxABIQUCQAJAPwCtQhCGIAatIAitfFoNAQsACwJAAkAQBa1CEIYgBa0gA618Wg0BCwALIAYgCCAFEAQgAiAFQQgQCCACIARBDBAIDAcLIAJBC0EEEAcgBygCCCAHKAIMIQQhBSAEQYCAgIB4TwRAAAsgBCIIIQZBAEEAQQEgBhABIQMCQAJAPwCtQhCGIAWtIAStfFoNAQsACwJAAkAQBa1CEIYgA60gBq18Wg0BCwALIAUgBCADEAQgAiADQQgQCCACIAhBDBAIDAYLIAJBDEEEEAcgBygCCCAHKAIMIQghAyAIQYCAgIB4TwRAAAsgCCIEIQVBAEEAQQEgBRABIQYCQAJAPwCtQhCGIAOtIAitfFoNAQsACwJAAkAQBa1CEIYgBq0gBa18Wg0BCwALIAMgCCAGEAQgAiAGQQgQCCACIARBDBAIDAULIAJBDUEEEAcgBygCCCAHKAIMIQQhBiAEQYCAgIB4TwRAAAsgBCIIIQNBAEEAQQEgAxABIQUCQAJAPwCtQhCGIAatIAStfFoNAQsACwJAAkAQBa1CEIYgBa0gA618Wg0BCwALIAYgBCAFEAQgAiAFQQgQCCACIAhBDBAIDAQLIAJBDkEEEAcgBygCCCAHKAIMIQghBSAIQYCAgIB4TwRAAAsgCCIEIQZBAEEAQQEgBhABIQMCQAJAPwCtQhCGIAWtIAitfFoNAQsACwJAAkAQBa1CEIYgA60gBq18Wg0BCwALIAUgCCADEAQgAiADQQgQCCACIARBDBAIDAMLIAJBD0EEEAcMAgsgAkEQQQQQByAHKAIIIAcoAgwhBCEDIARBgICAgHhPBEAACyAEIgghBUEAQQBBASAFEAEhBgJAAkA/AK1CEIYgA60gBK18Wg0BCwALAkACQBAFrUIQhiAGrSAFrXxaDQELAAsgAyAEIAYQBCACIAZBCBAIIAIgCEEMEAgMAQsgAkERQQQQByAHKAIIIAcoAgwhCCEGIAhBgICAgHhPBEAACyAIIgQhA0EAQQBBASADEAEhBQJAAkA/AK1CEIYgBq0gCK18Wg0BCwALAkACQBAFrUIQhiAFrSADrXxaDQELAAsgBiAIIAUQBCACIAVBCBAIIAIgBEEMEAgLCyMBQQFyJAEgBxADIwBBAnIkAAs');
    const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
    const instanceFlags3 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
    ({ exports: exports0 } = yield instantiateCore(yield module2));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      wasi_snapshot_preview1: {
        environ_get: exports0['1'],
        environ_sizes_get: exports0['2'],
        fd_write: exports0['0'],
        proc_exit: exports0['3'],
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
        'get-environment': exports0['4'],
      },
      'wasi:cli/exit@0.2.3': {
        exit: trampoline7,
      },
      'wasi:cli/stderr@0.2.3': {
        'get-stderr': trampoline4,
      },
      'wasi:cli/stdin@0.2.3': {
        'get-stdin': trampoline5,
      },
      'wasi:cli/stdout@0.2.3': {
        'get-stdout': trampoline6,
      },
      'wasi:filesystem/preopens@0.2.2': {
        'get-directories': exports0['14'],
      },
      'wasi:filesystem/types@0.2.3': {
        '[method]descriptor.append-via-stream': exports0['7'],
        '[method]descriptor.get-type': exports0['8'],
        '[method]descriptor.stat': exports0['9'],
        '[method]descriptor.write-via-stream': exports0['6'],
        '[resource-drop]descriptor': trampoline0,
        'filesystem-error-code': exports0['5'],
      },
      'wasi:io/error@0.2.3': {
        '[resource-drop]error': trampoline2,
      },
      'wasi:io/streams@0.2.3': {
        '[method]output-stream.blocking-flush': exports0['12'],
        '[method]output-stream.blocking-write-and-flush': exports0['13'],
        '[method]output-stream.check-write': exports0['10'],
        '[method]output-stream.write': exports0['11'],
        '[resource-drop]input-stream': trampoline3,
        '[resource-drop]output-stream': trampoline1,
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports2.cabi_import_realloc;
    ({ exports: exports3 } = yield instantiateCore(yield module3, {
      '': {
        $imports: exports0.$imports,
        '0': exports2.fd_write,
        '1': exports2.environ_get,
        '10': trampoline14,
        '11': trampoline15,
        '12': trampoline16,
        '13': trampoline17,
        '14': trampoline18,
        '2': exports2.environ_sizes_get,
        '3': exports2.proc_exit,
        '4': trampoline8,
        '5': trampoline9,
        '6': trampoline10,
        '7': trampoline11,
        '8': trampoline12,
        '9': trampoline13,
      },
    }));
    ({ exports: exports4 } = yield instantiateCore(yield module6));
    ({ exports: exports5 } = yield instantiateCore(yield module4, {
      '[export]adobe:cai/c2pa@0.1.0': {
        '[resource-drop]builder': trampoline21,
        '[resource-drop]reader': trampoline22,
        '[resource-new]builder': trampoline19,
        '[resource-new]reader': trampoline20,
      },
      'adobe:cai/c2pa-signer@0.1.0': {
        sign: exports4['0'],
      },
      'wasi:filesystem/types@0.2.4': {
        '[method]descriptor.read': exports4['1'],
        '[method]descriptor.sync': exports4['3'],
        '[method]descriptor.write': exports4['2'],
        '[resource-drop]descriptor': trampoline23,
      },
      'wasi:io/error@0.2.4': {
        '[method]error.to-debug-string': exports4['7'],
        '[resource-drop]error': trampoline26,
      },
      'wasi:io/poll@0.2.0': {
        '[resource-drop]pollable': trampoline30,
      },
      'wasi:io/poll@0.2.4': {
        '[method]pollable.block': trampoline27,
        '[resource-drop]pollable': trampoline28,
      },
      'wasi:io/streams@0.2.0': {
        '[resource-drop]input-stream': trampoline31,
        '[resource-drop]output-stream': trampoline32,
      },
      'wasi:io/streams@0.2.4': {
        '[method]input-stream.blocking-read': exports4['4'],
        '[method]output-stream.check-write': exports4['5'],
        '[method]output-stream.subscribe': trampoline29,
        '[method]output-stream.write': exports4['6'],
        '[resource-drop]input-stream': trampoline25,
        '[resource-drop]output-stream': trampoline24,
      },
      'wasi:sockets/tcp@0.2.0': {
        '[resource-drop]tcp-socket': trampoline36,
      },
      'wasi:sockets/udp@0.2.0': {
        '[resource-drop]incoming-datagram-stream': trampoline34,
        '[resource-drop]outgoing-datagram-stream': trampoline35,
        '[resource-drop]udp-socket': trampoline33,
      },
      wasi_snapshot_preview1: {
        adapter_close_badfd: exports4['25'],
        clock_time_get: exports4['9'],
        environ_get: exports4['19'],
        environ_sizes_get: exports4['20'],
        fd_close: exports4['21'],
        fd_filestat_get: exports4['10'],
        fd_prestat_dir_name: exports4['23'],
        fd_prestat_get: exports4['22'],
        fd_read: exports4['11'],
        fd_seek: exports4['12'],
        fd_write: exports4['13'],
        path_create_directory: exports4['14'],
        path_filestat_get: exports4['15'],
        path_open: exports4['16'],
        path_rename: exports4['17'],
        path_unlink_file: exports4['18'],
        proc_exit: exports4['24'],
        random_get: exports4['8'],
      },
    }));
    ({ exports: exports6 } = yield instantiateCore(yield module5, {
      __main_module__: {
        cabi_realloc: exports5.cabi_realloc,
      },
      env: {
        memory: exports5.memory,
      },
      'wasi:cli/environment@0.2.3': {
        'get-environment': exports4['28'],
      },
      'wasi:cli/exit@0.2.3': {
        exit: trampoline48,
      },
      'wasi:cli/stderr@0.2.3': {
        'get-stderr': trampoline43,
      },
      'wasi:cli/stdin@0.2.3': {
        'get-stdin': trampoline46,
      },
      'wasi:cli/stdout@0.2.3': {
        'get-stdout': trampoline47,
      },
      'wasi:cli/terminal-input@0.2.3': {
        '[resource-drop]terminal-input': trampoline44,
      },
      'wasi:cli/terminal-output@0.2.3': {
        '[resource-drop]terminal-output': trampoline45,
      },
      'wasi:cli/terminal-stderr@0.2.3': {
        'get-terminal-stderr': exports4['53'],
      },
      'wasi:cli/terminal-stdin@0.2.3': {
        'get-terminal-stdin': exports4['51'],
      },
      'wasi:cli/terminal-stdout@0.2.3': {
        'get-terminal-stdout': exports4['52'],
      },
      'wasi:clocks/monotonic-clock@0.2.3': {
        now: trampoline37,
      },
      'wasi:clocks/wall-clock@0.2.3': {
        now: exports4['29'],
      },
      'wasi:filesystem/preopens@0.2.2': {
        'get-directories': exports4['50'],
      },
      'wasi:filesystem/types@0.2.3': {
        '[method]descriptor.append-via-stream': exports4['38'],
        '[method]descriptor.create-directory-at': exports4['31'],
        '[method]descriptor.get-type': exports4['39'],
        '[method]descriptor.metadata-hash': exports4['41'],
        '[method]descriptor.metadata-hash-at': exports4['42'],
        '[method]descriptor.open-at': exports4['33'],
        '[method]descriptor.read-via-stream': exports4['36'],
        '[method]descriptor.rename-at': exports4['34'],
        '[method]descriptor.stat': exports4['40'],
        '[method]descriptor.stat-at': exports4['32'],
        '[method]descriptor.unlink-file-at': exports4['35'],
        '[method]descriptor.write-via-stream': exports4['37'],
        '[resource-drop]descriptor': trampoline39,
        '[resource-drop]directory-entry-stream': trampoline38,
        'filesystem-error-code': exports4['30'],
      },
      'wasi:io/error@0.2.3': {
        '[resource-drop]error': trampoline41,
      },
      'wasi:io/streams@0.2.3': {
        '[method]input-stream.blocking-read': exports4['44'],
        '[method]input-stream.read': exports4['43'],
        '[method]output-stream.blocking-flush': exports4['47'],
        '[method]output-stream.blocking-write-and-flush': exports4['48'],
        '[method]output-stream.check-write': exports4['45'],
        '[method]output-stream.write': exports4['46'],
        '[resource-drop]input-stream': trampoline42,
        '[resource-drop]output-stream': trampoline40,
      },
      'wasi:random/random@0.2.3': {
        'get-random-bytes': exports4['49'],
      },
    }));
    memory1 = exports5.memory;
    ({ exports: exports7 } = yield instantiateCore(yield module8, {
      augments: {
        'mem1 I32Load8U': (ptr, off) => new DataView(exports5.memory.buffer).getUint8(ptr + off, true),
        'mem1 I32Store': (ptr, val, offset) => {
          new DataView(exports5.memory.buffer).setInt32(ptr + offset, val, true);
        },
        'mem1 I32Store8': (ptr, val, offset) => {
          new DataView(exports5.memory.buffer).setInt8(ptr + offset, val, true);
        },
        'mem1 MemorySize': ptr => exports5.memory.buffer.byteLength / 65536,
      },
      callee: {
        adapter0: exports1['adobe:cai/c2pa-signer@0.1.0#sign'],
      },
      flags: {
        instance1: instanceFlags1,
        instance3: instanceFlags3,
      },
      memory: {
        m0: exports1.memory,
      },
      post_return: {
        adapter0: exports1['cabi_post_adobe:cai/c2pa-signer@0.1.0#sign'],
      },
      realloc: {
        f0: exports1.cabi_realloc,
        f1: exports5.cabi_realloc,
      },
      transcode: {
        'utf8-to-utf8 (mem0 => mem1)': trampoline49,
      },
    }));
    realloc1 = exports5.cabi_realloc;
    realloc2 = exports6.cabi_import_realloc;
    ({ exports: exports8 } = yield instantiateCore(yield module7, {
      '': {
        $imports: exports4.$imports,
        '0': exports7.adapter0,
        '1': trampoline50,
        '10': exports6.fd_filestat_get,
        '11': exports6.fd_read,
        '12': exports6.fd_seek,
        '13': exports6.fd_write,
        '14': exports6.path_create_directory,
        '15': exports6.path_filestat_get,
        '16': exports6.path_open,
        '17': exports6.path_rename,
        '18': exports6.path_unlink_file,
        '19': exports6.environ_get,
        '2': trampoline51,
        '20': exports6.environ_sizes_get,
        '21': exports6.fd_close,
        '22': exports6.fd_prestat_get,
        '23': exports6.fd_prestat_dir_name,
        '24': exports6.proc_exit,
        '25': exports6.adapter_close_badfd,
        '26': exports5['adobe:cai/c2pa@0.1.0#[dtor]builder'],
        '27': exports5['adobe:cai/c2pa@0.1.0#[dtor]reader'],
        '28': trampoline57,
        '29': trampoline58,
        '3': trampoline52,
        '30': trampoline59,
        '31': trampoline60,
        '32': trampoline61,
        '33': trampoline62,
        '34': trampoline63,
        '35': trampoline64,
        '36': trampoline65,
        '37': trampoline66,
        '38': trampoline67,
        '39': trampoline68,
        '4': trampoline53,
        '40': trampoline69,
        '41': trampoline70,
        '42': trampoline71,
        '43': trampoline72,
        '44': trampoline73,
        '45': trampoline74,
        '46': trampoline75,
        '47': trampoline76,
        '48': trampoline77,
        '49': trampoline78,
        '5': trampoline54,
        '50': trampoline79,
        '51': trampoline80,
        '52': trampoline81,
        '53': trampoline82,
        '6': trampoline55,
        '7': trampoline56,
        '8': exports6.random_get,
        '9': exports6.clock_time_get,
      },
    }));
    postReturn0 = exports5['cabi_post_adobe:cai/c2pa@0.1.0#[method]builder.add-assertion'];
    postReturn1 = exports5['cabi_post_adobe:cai/c2pa@0.1.0#[method]builder.sign'];
    postReturn2 = exports5['cabi_post_adobe:cai/c2pa@0.1.0#[method]reader.json'];
    postReturn3 = exports5['cabi_post_adobe:cai/c2pa@0.1.0#[method]reader.resource-to-stream'];
    postReturn4 = exports5['cabi_post_adobe:cai/c2pa@0.1.0#[method]reader.active-manifest'];
    postReturn5 = exports5['cabi_post_adobe:cai/c2pa@0.1.0#format-from-path'];
    c2pa010ConstructorBuilder = exports5['adobe:cai/c2pa@0.1.0#[constructor]builder'];
    c2pa010MethodBuilderSetRemoteUrl = exports5['adobe:cai/c2pa@0.1.0#[method]builder.set-remote-url'];
    c2pa010MethodBuilderSetNoEmbed = exports5['adobe:cai/c2pa@0.1.0#[method]builder.set-no-embed'];
    c2pa010MethodBuilderAddAssertion = exports5['adobe:cai/c2pa@0.1.0#[method]builder.add-assertion'];
    c2pa010MethodBuilderAddIngredient = exports5['adobe:cai/c2pa@0.1.0#[method]builder.add-ingredient'];
    c2pa010MethodBuilderAddResource = exports5['adobe:cai/c2pa@0.1.0#[method]builder.add-resource'];
    c2pa010MethodBuilderToArchive = exports5['adobe:cai/c2pa@0.1.0#[method]builder.to-archive'];
    c2pa010StaticBuilderFromArchive = exports5['adobe:cai/c2pa@0.1.0#[static]builder.from-archive'];
    c2pa010MethodBuilderSign = exports5['adobe:cai/c2pa@0.1.0#[method]builder.sign'];
    c2pa010ConstructorReader = exports5['adobe:cai/c2pa@0.1.0#[constructor]reader'];
    c2pa010StaticReaderFromBuffer = exports5['adobe:cai/c2pa@0.1.0#[static]reader.from-buffer'];
    c2pa010StaticReaderFromStream = exports5['adobe:cai/c2pa@0.1.0#[static]reader.from-stream'];
    c2pa010StaticReaderFromManifestDataAndStream = exports5['adobe:cai/c2pa@0.1.0#[static]reader.from-manifest-data-and-stream'];
    c2pa010MethodReaderJson = exports5['adobe:cai/c2pa@0.1.0#[method]reader.json'];
    c2pa010MethodReaderResourceToStream = exports5['adobe:cai/c2pa@0.1.0#[method]reader.resource-to-stream'];
    c2pa010MethodReaderActiveManifest = exports5['adobe:cai/c2pa@0.1.0#[method]reader.active-manifest'];
    c2pa010FormatFromPath = exports5['adobe:cai/c2pa@0.1.0#format-from-path'];
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
const c2pa010 = {
  Builder: Builder,
  Reader: Reader,
  formatFromPath: formatFromPath,
  
};

export { c2pa010 as c2pa, c2pa010 as 'adobe:cai/c2pa@0.1.0',  }