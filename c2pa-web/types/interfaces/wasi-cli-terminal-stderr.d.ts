/** @module Interface wasi:cli/terminal-stderr@0.2.4 **/
export function getTerminalStderr(): TerminalOutput | undefined;
export type TerminalOutput = import('./wasi-cli-terminal-output.js').TerminalOutput;
