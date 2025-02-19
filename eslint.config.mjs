import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "no-unused-vars": "error",
      // "no-unused-expressions": "error",
      "no-undef": "error",
      "no-console": "warn",
      "prefer-const": "error"
    },
  },
  {
    ignores: ["node_modules", "dist"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];