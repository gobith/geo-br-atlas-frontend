import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import serve from "rollup-plugin-serve-proxy";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: "src/main.ts",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "public/build/bundle.js",
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: "bundle.css" }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ["svelte"],
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		serve({
			// Multiple folders to serve from
			contentBase: ["public", "public/build"],

			// Set to true to return index.html (200) instead of error page (404)
			historyApiFallback: true,

			// Options used in setting up server
			host: "localhost",
			port: 5000,

			// Set up simple proxy
			// this will route all traffic starting with
			// `/api` to http://localhost:8181/api
			proxy: {
				map: "http://localhost:8101" ,
				world: "http://localhost:8101"
			},
		}),
	],
	watch: {
		clearScreen: false,
	},
};