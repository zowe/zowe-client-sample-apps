module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  parserOptions: {
  //   tsconfigRootDir: __dirname,
    project: ['./packages/*/tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "prettier"
  ],
  env: {
    'jest/globals': true,
    'node': true,
  }
};