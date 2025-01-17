import { nodeResolve } from '@rollup/plugin-node-resolve';
//import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './types/c2pacomponent.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: true

  },
  plugins: [nodeResolve(), typescript()]
};
