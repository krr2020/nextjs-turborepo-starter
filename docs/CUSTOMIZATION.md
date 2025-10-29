# Customization Guide

This guide covers common customization scenarios for the boilerplate.

## Table of Contents

- [Renaming Packages](#renaming-packages)
- [Changing Colors & Branding](#changing-colors--branding)
- [Adding New Packages](#adding-new-packages)
- [Modifying Database Schema](#modifying-database-schema)
- [Customizing ESLint Rules](#customizing-eslint-rules)

---

## Renaming Packages

### Automatic Renaming (Recommended)

Use the initialization script to automatically rename all packages:

```bash
node scripts/init.js
```

This will:
- ✅ Prompt for your project name
- ✅ Validate the name (NPM rules)
- ✅ Replace all `@repo` instances
- ✅ Update package.json files
- ✅ Update import statements
- ✅ Update tsconfig paths

### Manual Renaming

If you need to rename manually:

1. **Update package.json files**
   ```bash
   # Find all package.json files
   find . -name "package.json" -not -path "*/node_modules/*"
   
   # In each file, replace:
   "@repo/package-name" → "@your-scope/package-name"
   ```

2. **Update tsconfig.json path mappings**
   ```json
   {
     "paths": {
       "@your-scope/config": ["../../packages/config/src"],
       "@your-scope/types": ["../../packages/types/src"]
     }
   }
   ```

3. **Update import statements**
   ```bash
   # Use find and replace in your editor
   # Or use sed:
   find . -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/@repo/@your-scope/g'
   ```

4. **Update turbopack config in next.config.ts**
   ```typescript
   turbopack: {
     resolveAlias: {
       "@your-scope/config": require("path").resolve(__dirname, "../../packages/config/src"),
       // ... etc
     }
   }
   ```

---

## Changing Colors & Branding

### Tailwind Theme

Edit `apps/web/tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... your brand colors
          500: '#0ea5e9',
          600: '#0284c7',
          // ...
        }
      }
    }
  }
}
```

### CSS Variables

Edit `apps/web/app/globals.css`:

```css
:root {
  --primary: oklch(0.5 0.2 250); /* Adjust for your brand */
  --secondary: oklch(0.7 0.15 180);
  /* ... other variables */
}
```

### Metadata & SEO

Update `apps/web/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Your App Name",
    template: "%s | Your App Name",
  },
  description: "Your app description",
  // ... other metadata
};
```

### Favicon

Replace `apps/web/app/favicon.ico` with your own.

---

## Adding New Packages

### 1. Create Package Directory

```bash
mkdir -p packages/my-feature/src
cd packages/my-feature
```

### 2. Create package.json

```json
{
  "name": "@repo/my-feature",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "check-types": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@repo/types": "workspace:*"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "typescript": "5.9.2",
    "eslint": "^9.38.0"
  }
}
```

### 3. Create tsconfig.json

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "composite": true,
    "incremental": true,
    "declarationMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Create eslint.config.mjs

```javascript
import { config as baseConfig } from "@repo/eslint-config/base";

export default [...baseConfig];
```

### 5. Add Package to TypeScript Paths

Update root `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@repo/my-feature": ["./packages/my-feature/src"],
      "@repo/my-feature/*": ["./packages/my-feature/src/*"]
    }
  }
}
```

### 6. Use in Apps

```typescript
// In apps/web or apps/api
import { myFunction } from "@repo/my-feature";
```

---

## Modifying Database Schema

### 1. Edit Prisma Schema

Edit `packages/database/prisma/schema.prisma`:

```prisma
model MyModel {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("my_models")
}
```

### 2. Generate Client

```bash
pnpm db:generate
```

### 3. Push to Database (Development)

```bash
pnpm db:push
```

### 4. Create Migration (Production)

```bash
pnpm db:migrate
```

### 5. Use in Code

```typescript
import { prisma } from "@repo/database";

const users = await prisma.myModel.findMany();
```

---

## Customizing ESLint Rules

### Package-Level Rules

Edit `packages/{package}/eslint.config.mjs`:

```javascript
import { config as baseConfig } from "@repo/eslint-config/base";

export default [
  ...baseConfig,
  {
    rules: {
      // Override specific rules for this package
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
```

### App-Level Rules

Edit `apps/{app}/eslint.config.mjs`:

```javascript
import { nextJsConfig } from "@repo/eslint-config/next.js";

export default [
  ...nextJsConfig,
  {
    rules: {
      // App-specific rules
      "react/no-unescaped-entities": "off",
    },
  },
];
```

### Global Rules

Edit `packages/eslint-config/base.js` to affect all packages:

```javascript
export const config = [
  // ... existing config
  {
    rules: {
      // Your global rule changes
      "max-lines": ["error", { max: 300 }], // Stricter limit
    }
  }
];
```

---

## Additional Resources

- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Tailwind Configuration](https://tailwindcss.com/docs/configuration)
- [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)
- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)

