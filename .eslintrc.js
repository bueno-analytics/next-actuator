module.exports = {
  extends: ['standard-with-typescript', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  parserOptions: {
    project: './tsconfig.json'
  }
}
