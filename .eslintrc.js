module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'prettier'
  ]
}
