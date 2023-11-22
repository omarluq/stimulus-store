import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.ts', // Entry point to your library
  output: {
    file: 'dist/stimulus-store.js', // Output file name and location
    format: 'umd', // Output format (UMD, CommonJS, ES module, etc.)
    name: 'StimulusStore', // Global variable name if using UMD format
  },
  plugins: [
    typescript(), // TypeScript support
    commonjs(), // CommonJS support
    resolve(), // Node.js module resolution
  ],
};