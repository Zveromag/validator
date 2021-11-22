import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync'
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy-watch';
import { version, description, homepage, authors, license } from './package.json'

const OUTPUT = 'dist'
const production = !process.env.ROLLUP_WATCH;
const sourcemap = !production ? 'inline' : false;

const banner = `/**
 * Form Validator - v${version}
 * ${description}
 * ${homepage}
 * Copyright (c) ${new Date().getFullYear()} ${authors.map(a => a.name).join(',')}.
 * ${license} License
 */`;

 const copyOptions = {
  targets: [{ src: 'demo/*', dest: 'dist', copyOnce: false }]
 }
 if (!production) {
  copyOptions.watch = 'demo';
 }

export default {
  input: './src/validator.js',
  output: {
    file: `${OUTPUT}/validator.js`,
    format: 'umd',
    name: 'Validator',
    sourcemap
  },
  plugins: [
    progress(),
    babel({
      exclude: 'node_modules/**'
    }),
    copy(copyOptions),
    !production &&
      browsersync({
        open: true,
        watchEvents: ['add', 'change', 'unlink'],
        files: ['demo/index.html', 'demo/styles.css'],
        server: 'dist'
      }),
    production &&
      terser({
        output: { preamble: banner }
      })
  ]
}
