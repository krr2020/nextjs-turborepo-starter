import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import importPlugin from "eslint-plugin-import";

/**
 * A shared ESLint configuration for the repository with strict rules.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs", "*.cjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
    },
    rules: {
      // Turborepo rules
      "turbo/no-undeclared-env-vars": "warn",

      // TypeScript strict rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off", // Too strict for internal code
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/consistent-type-exports": [
        "error",
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",

      // Import ordering and organization
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules
            "external", // npm packages
            "internal", // Internal aliases
            ["parent", "sibling"], // Relative imports
            "index", // Index imports
            "object",
            "type", // Type imports
          ],
          pathGroups: [
            {
              pattern: "@repo/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "off", // TypeScript handles this
      "import/no-cycle": "error",

      // General code quality rules
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      curly: ["error", "all"],
      "no-else-return": "error",

      // File size and complexity limits
      "max-lines": [
        "error",
        {
          max: 500,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "max-lines-per-function": [
        "warn",
        {
          max: 150,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
      complexity: ["warn", { max: 15 }],
      "max-depth": ["warn", { max: 4 }],
      "max-nested-callbacks": ["warn", { max: 3 }],
      "max-params": ["warn", { max: 5 }],

      // Magic values - encourage constants
      "@typescript-eslint/no-magic-numbers": [
        "warn",
        {
          ignore: [-1, 0, 1, 2],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
        },
      ],
      "no-duplicate-string": "off", // Would need a plugin, documented below

      // String handling - prefer constants for repeated strings
      "no-multi-str": "error",
      "no-useless-concat": "error",
      "prefer-template": "error", // Already set above, emphasizing here
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: [
      "dist/**",
      "build/**",
      ".next/**",
      "node_modules/**",
      "coverage/**",
      ".turbo/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.cjs",
      "*.config.ts",
      "eslint.config.*",
      ".eslintrc.*",
    ],
  },
];

