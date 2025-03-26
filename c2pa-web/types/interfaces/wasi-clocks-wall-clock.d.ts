/** @module Interface wasi:clocks/wall-clock@0.2.4 **/
export function now(): Datetime;
export interface Datetime {
  seconds: bigint,
  nanoseconds: number,
}
