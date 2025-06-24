# babel-preset-typescript-vue3

> TypeScript preset for Babel 7.x supporting Vue.js 3 components written in TS. A drop-in replacement for [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript.html).

## Why?

This preset was created to support TypeScript transpilation using Babel (not Microsoft TypeScript), also for [Typescript Support for Vue.js 3](https://v3.vuejs.org/guide/typescript-support.html), without enforced TS-to-JS transpilation for all files (which can be achieved by adding `@babel/plugin-transform-typescript` to your Babel config).

Due to architectural limitations of `vue-loader` the original [@babel/preset-typescript](https://babeljs.io/docs/en/next/babel-preset-typescript.html) preset was always assuming that the `<script>` section of Vue SFC was written in JavaScript. This wasn't an issue when `webpack` was using different loaders for .js and .ts files. Since Babel unifies that, `vue-loader` is always passing this file to `babel-loader` with an original filename (and a `resourceQuery` which is not accessible from the transpiling preset). Since `preset-typescript` was transpiling files with .ts and .tsx extensions, not .vue, SFCs were ignored and reported errors during ES6 to ES5 transpilation.

Most likely in the future, this won't be no longer needed if `vue-loader` will consider also Babel transpilation. As for this is the only friendly way to resolve the issue.

## How?

This preset checks whether the .vue file (SFC) has a `lang="ts"` attribute set for the `<script>` tag. If so, [@babel/plugin-transform-typescript](https://babeljs.io/docs/en/babel-plugin-transform-typescript) is applied explicitly to the SFC file.

## Options

All the options match the original [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript.html) preset options.

You can read more about configuring preset options [here](https://babeljs.io/docs/en/presets#preset-options)

## Original notes and issues

See [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript.html) for more information or the [issues](https://github.com/babel/babel/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22area%3A%20typescript%22+is%3Aopen) associated with the original preset package.

## Install

Using npm:

```sh
npm install --save-dev babel-preset-typescript-vue3
```

or using yarn:

```sh
yarn add babel-preset-typescript-vue3 --dev
```

## Additional Notes

This package is originated from [babel-preset-typescript-vue](https://github.com/pawelgabryelewicz/babel-preset-typescript-vue) by [pawelgabryelewicz](https://github.com/pawelgabryelewicz) and revised to meet the Vue.js 3 requirements using [@vue/compiler-sfc](https://www.npmjs.com/package/@vue/compiler-sfc), and following tests.

## Example Usage

### Webpack

```javascript
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: "vue-loader",
    },
    {
      test: /\.(j|t)sx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "babel-preset-typescript-vue3",
            "@babel/preset-typescript",
          ],
        },
      },
    },
  ]
}
```

### Babel Configuration

```javascript
// babel.config.js
export default {
  presets: [
    "@babel/preset-env",
    "babel-preset-typescript-vue3"
  ]
};
```

## Requirements

- Node.js >= 8.0.0
- Babel >= 7.0.0
- Vue.js >= 3.0.0

## Peer Dependencies

```json
{
  "@babel/core": "^7.0.0-0"
}
```

## Change Log

**v2.0.16** - Major dependency updates
- Updated to Babel 7.27.x
- Updated @vue/compiler-sfc to 3.5.13
- Updated Vue.js to 3.5.13
- Migrated to @rollup/plugin-* packages
- Added ES module support
- Security fixes for all dependabot alerts

**v2.0.14** - Update Dependencies

**v2.0.11** - Supports `<script setup>` ([Link](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md))

**v2.0.8** - Update Dependencies (vue@3.0.3 -> vue@3.0.5)

## License

[MIT](http://opensource.org/licenses/MIT)
