import commonjs from 'rollup-plugin-commonjs';
import { terser }  from 'rollup-plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
//import nodeResolve from 'rollup-plugin-node-resolve';


// import _regeneratorRuntime from 'babel-runtime/regenerator';
// import _Promise from 'babel-runtime/core-js/promise';
 // import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
 //import {_createClass} from 'babel-runtime/helpers/createClass'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',

	output: {
		file: 'dist/BJS.js',		// not BABYLON (for now) to avoid confusion
		format: 'iife',				// umd or iife
		sourcemap: true,
		name: 'asteroids.js'
	},
	plugins: [
		typescript2(),
		commonjs(),
		babel({
			babelrc: false,
			exclude: ["node_modules/** */","ammo.js"],
			plugins:[
				["@babel/plugin-proposal-decorators", { "legacy": true }],
				["@babel/plugin-proposal-class-properties", { "loose" : true }],
				["@babel/plugin-proposal-object-rest-spread"]
				// '@babel/transform-runtime'
			],
			presets:[
				["@babel/preset-env",
				{	"useBuiltIns": "entry", "corejs": "3.1.2", modules: false }],
				["@babel/preset-typescript"],
			],
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			externalHelpers: true,
			runtimeHelpers: false
		}),
		replace({
            delimiters: ["", ""],
            "_typeof2(Symbol.iterator)": "typeof Symbol.iterator",
            "_typeof2(obj);": "typeof obj;"
        }),
		serve({
			contentBase:'',
			open: true,
			openPage: '/index.html',
			host: 'localhost',
			port: 1234,
			verbose: true
		}),
		production && terser() // minify, but only in production
	],
	external: ['babylonjs','babylonjs-materials','ammo']
};
