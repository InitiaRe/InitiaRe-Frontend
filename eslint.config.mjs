import js from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbTypescript from "eslint-config-airbnb-typescript";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Base settings
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  js.configs.recommended,
  ...ts.configs.recommended,

  // React plugin with recommended rules
  reactPlugin.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": 0,
    },
  },

  // Airbnb Base rules (for JavaScript)
  {
    rules: airbnbBase.rules,
  },

  // Airbnb TypeScript rules
  {
    rules: airbnbTypescript.rules,
  },

  // TailwindCSS plugin and settings
  {
    plugins: {
      tailwindcss,
    },
    settings: {
      tailwindcss: {
        callees: ["clsx", "cva", "twMerge"],
      },
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
    },
  },

  // Simple Import Sort plugin
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // Prettier integration (disabling conflicting rules)
  {
    rules: prettierConfig.rules,
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
];
