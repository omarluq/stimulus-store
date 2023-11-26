import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import sizes from 'rollup-plugin-sizes'

export default {
  input: 'src/index.ts', // Entry point to your library
  output: {
    dir: 'dist/', // Output file name and location
    format: 'cjs', // Output format (UMD, CommonJS, ES module, etc.)
    name: 'StimulusStore' // Global variable name if using UMD format
  },
  plugins: [
    typescript(), // TypeScript support
    commonjs(), // CommonJS support
    terser(),
    resolve(), // Node.js module resolution
    analyze(),
    sizes({ details: true })
  ]
}
