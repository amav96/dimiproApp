import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from 'rollup-plugin-scss';
import svg from 'rollup-plugin-svg';
import copy from "rollup-plugin-copy";
import ignore from 'rollup-plugin-ignore';

const packageJson = require("./package.json");

export default [
  {
    input: "./index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        // sourcemap: true,
      },
    ],
  
    external: ["react", "react-dom", "styled-components"],
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
      svg(),
      ignore([
        'src/views/**',
        'src/router/**',
      ]),
    ],

  },
  // {
  //   input: "./index.ts",
  //   output: [{ file: "dist/index.d.ts", format: "esm" }],
  //   plugins: [dts.default()],
  // },
];