module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true
  },
  extends: ['standard-with-typescript',
    'plugin:cypress/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'cypress'
  ],
  rules: {
  }
}
