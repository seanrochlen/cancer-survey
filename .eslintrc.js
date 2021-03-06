module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  extends: 'airbnb',
  rules: {
    'arrow-body-style': 'off',
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    curly: ['warn', 'multi-or-nest'],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-confusing-arrow': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-shadow': 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, consistent: true },
      ObjectPattern: { multiline: true, consistent: true },
      ImportDeclaration: { multiline: true, consistent: true },
      ExportDeclaration: { multiline: true, consistent: true },
    }],
    'object-shorthand': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 'off',
  },
  globals: {
    __CLIENT__: true,
    __SERVER__: true,
    __DEV__: true,
  },
};
