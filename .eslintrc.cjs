module.exports = {
  root: true,
  // ESLint ignores dot files by default: https://eslint.org/docs/v8.x/use/configure/ignore
  ignorePatterns: ["!.*.js", "!.*.mjs", "!.*.cjs"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier"
  ],
  plugins: ["import", "simple-import-sort", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json"
  },
  rules: {
    // By performance: https://github.com/vuejs/eslint-config-prettier?tab=readme-ov-file#use-separate-commands-for-linting-and-formatting
    "prettier/prettier": "off",

    "no-console": "off",
    "no-debugger": "off",
    "no-void": ["error", { allowAsStatement: true }],
    "no-param-reassign": "off",
    "func-names": "off",

    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",

    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",

    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/prefer-for-of": "off",

    // https://typescript-eslint.io/rules/lines-between-class-members/
    "@typescript-eslint/lines-between-class-members": "off",
    // https://typescript-eslint.io/rules/only-throw-error/
    "@typescript-eslint/no-throw-literal": "off",

    // By performance: https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
    "import/named": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off"
  },

  overrides: [
    {
      files: ["*.js", "*.mjs", "*.cjs"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off"
      }
    }
  ],

  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json"
      }
    }
  }
};
