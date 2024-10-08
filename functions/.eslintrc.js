module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "linebreak-style": ["error", "unix"],
  },
};