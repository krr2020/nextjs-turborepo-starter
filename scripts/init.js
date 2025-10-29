#!/usr/bin/env node

/**
 * Initialization script to customize the boilerplate
 * Replaces @repo with your project name throughout the codebase
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { createInterface } from "readline";

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// Validate NPM package name
function isValidPackageName(name) {
  // NPM package name rules:
  // - Must be lowercase
  // - Can contain hyphens and underscores
  // - Must start with a letter or underscore
  // - No spaces or special characters except - and _
  // - Length between 1-214 characters

  if (!name || typeof name !== "string") {
    return { valid: false, error: "Package name is required" };
  }

  if (name.length === 0 || name.length > 214) {
    return { valid: false, error: "Package name must be between 1-214 characters" };
  }

  if (name !== name.toLowerCase()) {
    return { valid: false, error: "Package name must be lowercase" };
  }

  if (!/^[a-z_]/.test(name)) {
    return { valid: false, error: "Package name must start with a letter or underscore" };
  }

  if (!/^[a-z0-9_-]+$/.test(name)) {
    return {
      valid: false,
      error: "Package name can only contain lowercase letters, numbers, hyphens, and underscores",
    };
  }

  // Reserved npm names
  const reserved = ["node_modules", "favicon.ico"];
  if (reserved.includes(name)) {
    return { valid: false, error: `"${name}" is a reserved name` };
  }

  return { valid: true };
}

// Get all files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);

    // Skip node_modules, .git, dist, .next, etc.
    const skipDirs = ["node_modules", ".git", "dist", ".next", ".turbo", "coverage", "build"];
    if (stat.isDirectory()) {
      if (!skipDirs.includes(file)) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else {
      // Only process text files
      const textExtensions = [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".json",
        ".md",
        ".mjs",
        ".cjs",
        ".yaml",
        ".yml",
        ".prisma",
      ];
      if (textExtensions.some((ext) => file.endsWith(ext))) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

// Replace content in file
function replaceInFile(filePath, oldName, newName) {
  try {
    let content = readFileSync(filePath, "utf8");
    const originalContent = content;

    // Replace @repo with new name
    content = content.replace(new RegExp(`@repo`, "g"), `@${newName}`);

    // Only write if content changed
    if (content !== originalContent) {
      writeFileSync(filePath, content, "utf8");
      return true;
    }
    return false;
  } catch (error) {
    log.error(`Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

// Prompt user for input
function prompt(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Main initialization function
async function init() {
  log.title("🚀 Next.js Turborepo Starter - Initialization");

  console.log("This script will replace all instances of '@repo' with your project name.");
  console.log(
    "Your project name will be used as the NPM scope (e.g., @your-project/web, @your-project/api)\n"
  );

  // Get project name
  let projectName = "";
  let isValid = false;

  while (!isValid) {
    projectName = await prompt(
      `${colors.cyan}?${colors.reset} Enter your project name (lowercase, hyphens/underscores allowed): `
    );

    const validation = isValidPackageName(projectName);
    if (validation.valid) {
      isValid = true;
    } else {
      log.error(validation.error);
      console.log("");
    }
  }

  // Confirm
  console.log("");
  log.info(`Your packages will be named: ${colors.bright}@${projectName}/*${colors.reset}`);
  log.info(`Examples: @${projectName}/web, @${projectName}/api, @${projectName}/config`);
  console.log("");

  const confirm = await prompt(
    `${colors.cyan}?${colors.reset} Continue with this name? (yes/no): `
  );

  if (confirm.toLowerCase() !== "yes" && confirm.toLowerCase() !== "y") {
    log.warn("Initialization cancelled.");
    process.exit(0);
  }

  console.log("");
  log.title("📝 Updating files...");

  // Get all files
  const rootDir = process.cwd();
  const files = getAllFiles(rootDir);

  let updatedCount = 0;
  let errorCount = 0;

  // Process each file
  for (const file of files) {
    const relativePath = file.replace(rootDir, "").substring(1);

    // Skip this script itself
    if (relativePath.includes("scripts/init.js")) {
      continue;
    }

    const wasUpdated = replaceInFile(file, "repo", projectName);
    if (wasUpdated) {
      updatedCount++;
      log.info(`Updated: ${relativePath}`);
    }
  }

  console.log("");
  log.success(`✨ Initialization complete!`);
  console.log("");
  log.info(`${colors.bright}Summary:${colors.reset}`);
  log.info(`  • Files updated: ${updatedCount}`);
  log.info(`  • Project scope: @${projectName}`);
  console.log("");
  log.info(`${colors.bright}Next steps:${colors.reset}`);
  log.info(`  1. Run: ${colors.bright}pnpm install${colors.reset}`);
  log.info(`  2. Set up your .env file: ${colors.bright}cp .env.example .env${colors.reset}`);
  log.info(`  3. Generate Prisma client: ${colors.bright}pnpm db:generate${colors.reset}`);
  log.info(`  4. Start development: ${colors.bright}pnpm dev${colors.reset}`);
  console.log("");
  log.success("Happy coding! 🎉");
}

// Run the script
init().catch((error) => {
  log.error(`Initialization failed: ${error.message}`);
  process.exit(1);
});

