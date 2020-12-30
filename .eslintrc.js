module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 8
  },
  rules: {
    indent: [0, 2],
    "func-style": "off",
    quotes: ["error", "double"],
    semi: [1, "always"],
    "no-useless-escape": [0, "off"],
    "no-unsafe-finally": "off",
    "no-unused-vars": "off",
    "no-console": "off"
  }
};
