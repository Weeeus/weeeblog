module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // Custom rules (simplified)
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": { "max": 1, "allowFirstLine": false }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    "arrow-spacing": [2, { "before": true, "after": true }],
    "brace-style": [2, "1tbs", { "allowSingleLine": true }],
    "comma-dangle": [2, "never"],
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "indent": [2, 2, { "SwitchCase": 1 }],
    "keyword-spacing": [2, { "before": true, "after": true }],
    "no-console": "off",
    "no-unused-vars": [2, { "vars": "all", "args": "none" }],
    "quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
    "semi": [2, "never"],
    "space-before-blocks": [2, "always"],
    "space-before-function-paren": [2, "never"],
    "object-curly-spacing": [2, "always", { objectsInObjects: false }],
    "array-bracket-spacing": [2, "never"]
  }
}
