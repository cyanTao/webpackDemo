module.exports = {
  extends: "eslint:recommended",
  root: true,
  parser: 'babel-eslint', //默认情况下ESLint使用Espree解析器，这里我们可以修改它的默认设置。
  parserOptions: {
    // ecmaVersion: 9,//ES的版本
    sourceType: 'module', //指定源代码存在的位置，script | module，默认为script。
    // allowImportExportEverywhere: true,//允许在任务地方导入
  },
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: false,
  },
  rules: {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "space-before-function-paren": ["error", "always"],
    "no-console": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "arrow-parens": 0,
  }
}