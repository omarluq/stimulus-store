import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import analyze from "rollup-plugin-analyzer";
import { visualizer } from "rollup-plugin-visualizer";
import sizes from "rollup-plugin-sizes";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts", // Entry point
  treeshake: {
    moduleSideEffects: false,
  },
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs", // CommonJS format
      sourcemap: true,
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm", // ES Module format
      sourcemap: true,
    },
    {
      file: "dist/bundle.umd.js",
      name: "StimulusStore",
      format: "umd",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }), // TypeScript support
    copy({
      targets: [{ src: "src/**/*.d.ts", dest: "dist" }],
      flatten: false,
    }),
    resolve(), // Node.js module resolution
    // commonjs(), // CommonJS support
    production &&
      terser({
        // Terser for minification in production
        output: { comments: false },
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 2,
          toplevel: true,
          unsafe: true,
        },
      }),
    analyze(), // Bundle analysis
    sizes({ details: true }), // Size analysis
    visualizer(),
  ],
};
