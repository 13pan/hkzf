module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    'no-unused-expressions': 0,
    'no-sequences': 0,
    'key-spacing': 0,
    'vue/no-parsing-error': 0,
    indent: 0,
    'vue/no-duplicate-attributes': 0
  }
}
