module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  parserOptions: {
    project: [
      './tsconfig.json',
      './packages/*/tsconfig.json',
      './packages/*/tsconfig.eslint.json' // eslint complains `The file does not match your project config` && `The file must be included in at least one of the projects provided`
    ],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "prettier"
  ],
  ignorePatterns: ['.eslintrc.js'],
  env: {
    'jest/globals': true,
    'node': true,
  },
  rules: {
    // TODO(Kelosky): we can disable this
    "@typescript-eslint/restrict-template-expressions": ["warn", { "allowBoolean": true }]
  }
};