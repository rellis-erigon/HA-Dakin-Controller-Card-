import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/daikin-controller-card.ts",
  output: {
    file: "dist/daikin-controller-card.js",
    format: "es",
  },
  plugins: [
    resolve(),
    typescript(),
    terser(),
  ],
};
