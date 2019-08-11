import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync'
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';
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
    !production &&
      browsersync({
        open: true,
        server: 'dist'
      }),
    production &&
      terser({
        output: { preamble: banner }
      })
  ]
}
