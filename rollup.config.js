import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from 'rollup-plugin-scss';
import svg from 'rollup-plugin-svg';
import copy from "rollup-plugin-copy";

const packageJson = require("./package.json");

export default [
  {
    input: "./index.ts",
    output: [
      // {
      //   file: packageJson.main,
      //   format: "cjs",
      //   sourcemap: true,
      // },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      scss(),
      copy({
        targets: [
          { src: "src/assets/css/index.css", dest: "dist/css" },
          // Puedes agregar más archivos CSS aquí si es necesario
        ],
      }),
      svg()
    ],
    external: ["react", "react-dom", "styled-components"],
  },
  {
    input: "./index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
];
  // "main": "dist/cjs/index.js",

  // npm run buildLib