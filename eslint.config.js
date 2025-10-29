import { config as baseConfig } from "@repo/eslint-config/base";

/**
 * Root ESLint configuration for the monorepo.
 *
 * Individual apps and packages can extend this configuration
 * with their own specific rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...baseConfig,
  {
    ignores: [
      // Monorepo-level ignores
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/out/**",
      "**/.cache/**",

      // Config files that might need different rules
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.cjs",

      // Generated files
      "**/next-env.d.ts",
      "**/.eslintrc.cjs",

      // Documentation
      "**/CHANGELOG.md",
    ],
  },
  {
    // Global settings for the monorepo
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: [
            "./tsconfig.json",
            "./apps/*/tsconfig.json",
            "./packages/*/tsconfig.json",
          ],
        },
      },
    },
  },
];

