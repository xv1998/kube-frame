module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
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
    "no-loop-func": "off",
    "no-script-url": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 0,
    'react/no-unknown-property': 'off',
    "react/prop-types" : "off",
    "react/sort-comp": "off",
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
    "typescript/member-ordering": "off"
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
