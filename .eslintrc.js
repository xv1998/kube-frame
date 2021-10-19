module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    amd: true,
    node: true,
    es6: true,
    jquery: true,
    "jest/globals": true
  },
  globals: {
    __DEV__: "readonly",
    __RN__: "readonly",
  },
  plugins: ['json', 'html', 'jest', 'react'],
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    complexity: ['error', { max: 70 }],
    'react/no-unknown-property': 'off',
    'template-curly-spacing': 'off',
    'react/no-string-refs': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/no-deprecated': 0,
    'no-script-url': 'off',
    'no-undefined': 'off',
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-unused-vars": "error",
    "typescript/member-ordering": "off",
    "react/sort-comp": "off"
  },
  settings: {
    'html/html-extensions': ['.html', '.ejs'],
    'html/indent': '+2',
    'html/report-bad-indent': 'error',
    react: {
      version: '17.0'
    }
  }
};
