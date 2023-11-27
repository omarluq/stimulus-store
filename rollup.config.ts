import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import sizes from 'rollup-plugin-sizes'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.ts', // Entry point
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs', // CommonJS format
      sourcemap: true
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm', // ES Module format
      sourcemap: true
    }
  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }), // TypeScript support
    commonjs(), // CommonJS support
    resolve(), // Node.js module resolution
    production &&
      terser({
        // Terser for minification in production
        output: { comments: false },
        compress: {
          drop_console: true // Remove console logs in production
        }
      }),
    analyze(), // Bundle analysis
    sizes() // Size analysis
  ]
}
