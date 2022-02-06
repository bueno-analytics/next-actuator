module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // To have appropriate formatting when viewed in source control UI
    'body-max-line-length': [1, 'always', 72],
    'scope-enum': [2, 'always', ['deps', 'deps-dev']]
  }
}
