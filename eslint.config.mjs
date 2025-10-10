// eslint.config.mjs
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import reactPlugin from "eslint-plugin-react";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: [".next/", "node_modules/", "public", ".yarn", "@types"],

    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      // ✅ React & Next rules
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/button-has-type": "error",
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      ],

      // ✅ Accessibility rules
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          labelComponents: ["label"],
          labelAttributes: ["label"],
          controlComponents: ["StyledHiddenInput"],
          depth: 1,
        },
      ],

      // ✅ Import sorting rules
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^next", "^@", "^[a-z]"],
            ["^~"],
            [
              "^\\.\\.(?!/?$)",
              "^\\.\\./?$",
              "^\\./(?=.*/)(?!/?$)",
              "^\\.(?!/?$)",
              "^\\./?$",
            ],
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // ✅ TypeScript rules
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "_",
          varsIgnorePattern: "_",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "interface", format: ["PascalCase"] },
        { selector: "typeAlias", format: ["PascalCase"] },
      ],
    },
  },
];
