import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'types/c2pa_component.js',
    output: {
      file: 'types/bundle.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [nodeResolve(),
    copy({
      targets: [
        { src: 'types/c2pa_component.core.wasm', dest: 'dist' },
        { src: 'types/c2pa_component.core2.wasm', dest: 'dist' }
      ]
    })
    ]
  },
  {
    input: 'types/c2pa_component.d.ts',
    output: {
      file: 'types/bundle.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
