import fs from 'fs'

// 根据 tsconfig.json 把 ts 转成 js
import typescript from 'rollup-plugin-typescript2'
// 替换代码中的变量
import replace from '@rollup/plugin-replace'
// 输出打包后的文件大小
import filesize from 'rollup-plugin-filesize'
// ES6 转 ES5
import { babel } from '@rollup/plugin-babel'
// 压缩
import { terser } from 'rollup-plugin-terser'

const { name, version, author, license } = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const moduleName = name.split('/').pop()

const startYear = 2021
const currentYear = new Date().getFullYear()
const yearRange = [currentYear]

if (startYear != currentYear) {
  yearRange.unshift(startYear)
}

const banner =
  `${'/**\n' + ' * '}${moduleName}.js v${version}\n` +
  ` * (c) ${yearRange.join('-')} ${author}\n` +
  ` * Released under the ${license} License.\n` +
  ` */\n`;

const sourcemap = true

let suffix = '.js'

const env = process.env.NODE_ENV
const minify = process.env.NODE_MINIFY === 'true'

const replaces = {
  'process.env.NODE_ENV': JSON.stringify(env),
  'process.env.NODE_VERSION': JSON.stringify(version),
  preventAssignment: true
}

let plugins = [
  replace(replaces),
]

if (minify) {
  suffix = '.min' + suffix
}

const output = []

if (process.env.NODE_FORMAT === 'es') {
  plugins.push(
    typescript({
      check: false,
      useTsconfigDeclarationDir: true
    })
  )
  output.push({
    file: `dist/${moduleName}.esm${suffix}`,
    format: 'es',
    interop: false,
    banner,
    sourcemap,
  })
}
else {
  plugins.push(
    typescript({
      check: false,
      useTsconfigDeclarationDir: true
    }),
    babel({
      presets: [
        '@babel/preset-env', // 转译 ES6+ 语法
        '@babel/preset-typescript' // 支持 TypeScript
      ],
      babelHelpers: 'bundled',
      extensions: ['.ts', '.js']
    })
  )
  output.push({
    file: `dist/${moduleName}${suffix}`,
    format: 'umd',
    name: 'Validator',
    interop: false,
    banner,
    sourcemap,
  })
}

if (minify) {
  plugins.push(
    terser()
  )
}

plugins.push(
  filesize(),
)

export default [
  {
    input: 'src/index.ts',
    external: ['url'],
    output,
    plugins
  }
]