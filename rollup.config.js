import sourceMap from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

import pkg  from './package.json';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    sourceMap(),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    uglify(),
    // nodeResolve(),
    // commonjs(),
  ],
};