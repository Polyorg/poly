module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'react-hooks'],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': ['warn', { functions: false }],
    '@typescript-eslint/no-var-requires': 'warn',
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'arrow-spacing': 'error',
    complexity: 0,
    'consistent-return': 'warn',
    curly: 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 0,
    'no-unused-vars': ['error', { varsIgnorePattern: '_' }],
    'no-duplicate-imports': 'off', // prefer import plugin for flow types
    'no-else-return': 'error',
    'no-extra-semi': 'error',
    'no-loop-func': 'error',
    'no-proto': 'error',
    'no-return-await': 'error',
    'no-useless-constructor': 'error',
    'react/prop-types': [0],
    'react/display-name': 0,
    'react/jsx-key': 0,
    'react/no-unescaped-entities': 1,
    'react/jsx-no-target-blank': 1,
    'react/no-string-refs': 1,
    'react/no-children-prop': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', 'tsx'],
      },
      alias: {
        map: [['app', './src']],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
