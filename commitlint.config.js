/**
 * Commitlint configuration
 *
 * Enforces conventional commit format:
 * <type>(<scope>): <subject>
 *
 * Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
 */

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Enforce type to be one of the conventional types
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only changes
        "style", // Code style changes (formatting, missing semi-colons, etc)
        "refactor", // Code refactoring (neither fixes a bug nor adds a feature)
        "perf", // Performance improvements
        "test", // Adding or updating tests
        "build", // Build system or external dependencies
        "ci", // CI configuration files and scripts
        "chore", // Other changes that don't modify src or test files
        "revert", // Reverts a previous commit
      ],
    ],
    // Subject must not be empty
    "subject-empty": [2, "never"],
    // Subject must not end with a period
    "subject-full-stop": [2, "never", "."],
    // Subject must be lowercase (conventional style)
    "subject-case": [2, "always", "lower-case"],
    // Type must be lowercase
    "type-case": [2, "always", "lower-case"],
    // Header (type + subject) max length
    "header-max-length": [2, "always", 100],
    // Body max line length
    "body-max-line-length": [1, "always", 100],
    // Footer max line length
    "footer-max-line-length": [1, "always", 100],
  },
};

