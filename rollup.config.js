import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;

function execute() {
  let __app;

  function toExit() {
    if (__app) __app.kill(0);
  }

  return {
    writeBundle() {
      if (__app) return;
      __app = require("child_process").spawn("yarn", ["electron-start"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "yarn",
        ["server:svelte", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );
      process.on("SIGINT", toExit);
      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "render_src/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "./render_build/resource/bundle.js",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        dev: !production,
      },
    }),
    css({ output: "bundle.css" }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),

    copy({
      targets: [
        { src: "public/assets/*", dest: "render_build/resource/assets" },
        { src: "public/resource/*", dest: "render_build/resource" },
        { src: "public/index.html", dest: "render_build" },
      ],
    }),
    !production && serve(),
    !production && execute(),
    !production && livereload("render_build"),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
