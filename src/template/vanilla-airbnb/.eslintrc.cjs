/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

const path = require("node:path");
const createAliasSetting = require("@vue/eslint-config-airbnb/createAliasSetting");

var a = 1;

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:import/recommended",
    "plugin:vue/strongly-recommended",
    "@vue/eslint-config-airbnb",
    "prettier"
  ],
  plugins: ["vue", "import", "simple-import-sort"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest"
  },
  rules: {
    // By performance: https://github.com/vuejs/eslint-config-prettier?tab=readme-ov-file#use-separate-commands-for-linting-and-formatting
    "prettier/prettier": "off",

    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/prop-name-casing": "error",
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    "vue/attributes-order": "error",

    "no-console": "off",
    "no-debugger": "off",
    "no-param-reassign": "off",
    "func-names": "off",

    "import/no-unresolved": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",

    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^vue", "^@?\\w"],
          ["^(@|components)(/.*|$)"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.?(css)$"],
          ["^\\u0000"]
        ]
      }
    ]
  },

  settings: {
    ...createAliasSetting({
      "@": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./tests")
    })
  },

  // For the test files, we need to add the globals for the test runner
  globals: {
    // suite
    suite: "readonly",
    test: "readonly",
    describe: "readonly",
    it: "readonly",
    // chai
    chai: "readonly",
    expect: "readonly",
    assert: "readonly",
    // typecheck
    expectTypeOf: "readonly",
    assertType: "readonly",
    // utils
    vitest: "readonly",
    vi: "readonly",
    // hooks
    beforeAll: "readonly",
    afterAll: "readonly",
    beforeEach: "readonly",
    afterEach: "readonly",
    onTestFinished: "readonly",
    onTestFailed: "readonly"
  }
};
