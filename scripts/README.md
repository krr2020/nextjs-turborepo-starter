# Scripts

This directory contains utility scripts for the boilerplate.

## init.js

Interactive initialization script to customize the boilerplate for your project.

### Usage

```bash
node scripts/init.js
```

### What it does

1. **Prompts for project name** - Interactive prompt with validation
2. **Validates input** - Ensures name follows NPM package naming rules:
   - Must be lowercase
   - Can contain hyphens and underscores
   - Must start with letter or underscore
   - No spaces or special characters
   - Length between 1-214 characters
3. **Replaces package scopes** - Changes all `@repo` instances to `@your-project`
4. **Updates files** - Processes all TypeScript, JSON, Markdown, and config files
5. **Shows summary** - Displays count of updated files

### Example

```bash
$ node scripts/init.js

🚀 Next.js Turborepo Starter - Initialization

This script will replace all instances of '@repo' with your project name.
Your project name will be used as the NPM scope (e.g., @your-project/web, @your-project/api)

? Enter your project name (lowercase, hyphens/underscores allowed): my-awesome-app

ℹ Your packages will be named: @my-awesome-app/*
ℹ Examples: @my-awesome-app/web, @my-awesome-app/api, @my-awesome-app/config

? Continue with this name? (yes/no): yes

📝 Updating files...

ℹ Updated: package.json
ℹ Updated: turbo.json
ℹ Updated: tsconfig.json
... (more files)

✓ ✨ Initialization complete!

ℹ Summary:
ℹ   • Files updated: 67
ℹ   • Project scope: @my-awesome-app

ℹ Next steps:
ℹ   1. Run: pnpm install
ℹ   2. Set up your .env file: cp .env.example .env
ℹ   3. Generate Prisma client: pnpm db:generate
ℹ   4. Start development: pnpm dev

✓ Happy coding! 🎉
```

### Files Processed

The script processes these file types:
- `.ts`, `.tsx` - TypeScript files
- `.js`, `.jsx`, `.mjs`, `.cjs` - JavaScript files
- `.json` - JSON files (package.json, tsconfig.json, etc.)
- `.md` - Markdown documentation
- `.yaml`, `.yml` - YAML config files
- `.prisma` - Prisma schema files

### Skipped Directories

The script automatically skips:
- `node_modules/`
- `.git/`
- `dist/`
- `.next/`
- `.turbo/`
- `coverage/`
- `build/`

### Error Handling

If the script encounters errors:
- Invalid package names are rejected with helpful messages
- File processing errors are logged but don't stop execution
- You can re-run the script multiple times safely

### Manual Alternative

If you prefer manual renaming, see [CUSTOMIZATION.md](../docs/CUSTOMIZATION.md#renaming-packages).

