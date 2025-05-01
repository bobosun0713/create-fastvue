/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "@vue/eslint-config-airbnb-with-typescript",
    "plugin:vue/strongly-recommended",
    "prettier"
  ],
  plugins: ["vue", "import", "simple-import-sort", "@typescript-eslint"],
  parser: "vue-eslint-parser",
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.*.json"
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
    "no-void": ["error", { allowAsStatement: true }],
    "no-param-reassign": "off",
    "func-names": "off",

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
    ],

    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/prefer-for-of": "off",

    // By performance: https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
    "import/named": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off"
  },
  overrides: [
    {
      // See issue: https://github.com/vuejs/vue-eslint-parser/issues/104
      files: ["*.vue", "*.spec.ts"],
      rules: {
        "@typescript-eslint/no-unused-assignment": "off",
        "@typescript-eslint/no-unused-argument": "off",
        "@typescript-eslint/no-unused-call": "off",
        "@typescript-eslint/no-unused-member-access": "off",
        "@typescript-eslint/no-unused-return": "off"
      }
    }
  ],

  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["./tsconfig.*.json"]
      }
    },
  }
};
