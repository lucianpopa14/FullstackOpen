module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 0,
    'indent': ['error', 2], // Enforce 2 space indentation
    'quotes': ['error', 'single'], // Enforce single quotes
    'semi': ['error', 'never'], // No semicolons
    'eqeqeq': 'error', // Require === and !==
    'no-trailing-spaces': 'error', // No trailing spaces
    'object-curly-spacing': ['error', 'always'], // Spaces inside curly braces
    'arrow-spacing': ['error', { 'before': true, 'after': true }] // Spaces around arrow function arrows
  },
}
