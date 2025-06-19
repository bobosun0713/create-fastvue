import eslintJs from "@eslint/js";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import * as pluginImportX from "eslint-plugin-import-x";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

export default defineConfigWithVueTs(
  { name: "custom-ignores", ignores: ["node_modules", "dist", "public", ".cache"] },

  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  {
    name: "custom-import-x",
    rules: {
      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": "error",

      // https://typescript-eslint.io/troubleshooting/typed-linting/performance/
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-unresolved": "off"
    },
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ["./tsconfig.*.json"]
        })
      ]
    }
  },

  {
    name: "custom-simple-import-sort",
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
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
    }
  },

  eslintJs.configs.recommended,
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.strictTypeChecked,
  vueTsConfigs.stylisticTypeChecked,
  {
    name: "custom-vue-typescript-rules",
    files: ["**/*.ts", "**/*.mts", "**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        extraFileExtensions: [".vue"]
      }
    },
    rules: {
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

      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }]
    }
  },

  {
    name: "custom-specific-rules",
    files: ["**/?(*.)*?([cm])js"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  },

  eslintConfigPrettier
);
