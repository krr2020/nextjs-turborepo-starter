# Next.js Turborepo Starter

A modern, production-ready monorepo boilerplate built with Next.js, Turborepo, TypeScript, and best practices for scalable applications.

## 🚀 What's Inside?

This monorepo includes the following:

### Apps

- **`web`** - Next.js 16 application with App Router, Tailwind CSS, and shadcn/ui
- **`api`** - Fastify backend API with Swagger documentation, rate limiting, and security middleware

### Packages

- **`@repo/config`** - Shared configuration and environment validation
- **`@repo/database`** - Prisma ORM setup with example models
- **`@repo/types`** - Shared TypeScript types
- **`@repo/utils`** - Common utility functions
- **`@repo/validation`** - Zod validation schemas
- **`@repo/ui`** - Shared UI utilities (Tailwind class merging)
- **`@repo/eslint-config`** - Shared ESLint configurations
- **`@repo/typescript-config`** - Shared TypeScript configurations

## 📋 Features

- ✅ **Monorepo Architecture** - Turborepo for efficient builds and caching
- ✅ **TypeScript** - Strict type checking across all packages
- ✅ **Next.js 16** - App Router with React Server Components
- ✅ **Fastify API** - High-performance backend with OpenAPI docs
- ✅ **Prisma ORM** - Type-safe database access
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **shadcn/ui** - Ready for beautiful UI components
- ✅ **ESLint & Prettier** - Code quality and formatting
- ✅ **Zod** - Runtime validation schemas
- ✅ **Conventional Commits** - Enforced with commitlint
- ✅ **pnpm** - Fast, efficient package management

## 🏗️ Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 9.0.0

## 🚀 Getting Started

### 1. Clone and Initialize

\`\`\`bash
# Clone this repository
git clone <your-repo-url> my-project
cd my-project

# Run initialization script to customize package names
node scripts/init.js
# This will prompt you to replace '@repo' with your project name

# Install dependencies
pnpm install
\`\`\`

**Note:** The initialization script validates your project name and automatically replaces all instances of `@repo` with your custom scope throughout the codebase.

### 2. Set Up Environment Variables

\`\`\`bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
\`\`\`

### 3. Set Up Database

\`\`\`bash
# Generate Prisma client
pnpm db:generate

# Push schema to database (for development)
pnpm db:push

# Or run migrations (for production)
pnpm db:migrate
\`\`\`

### 4. Start Development

\`\`\`bash
# Start all apps in development mode
pnpm dev

# Or start individual apps
pnpm --filter @repo/web dev
pnpm --filter @repo/api dev
\`\`\`

The apps will be available at:
- **Web**: http://localhost:3000
- **API**: http://localhost:3001
- **API Docs**: http://localhost:3001/docs

## 📦 Available Scripts

### Root Commands

\`\`\`bash
pnpm dev            # Start all apps in development
pnpm build          # Build all apps and packages
pnpm start          # Start all apps in production
pnpm lint           # Lint all apps and packages
pnpm lint:fix       # Fix linting issues
pnpm format         # Format code with Prettier
pnpm check-types    # Type check all packages
pnpm test           # Run all tests
pnpm clean          # Clean all build artifacts
pnpm db:generate    # Generate Prisma client
pnpm db:push        # Push schema to database
pnpm db:migrate     # Run database migrations
pnpm db:studio      # Open Prisma Studio
\`\`\`

### Workspace-Specific Commands

\`\`\`bash
# Run commands in specific workspaces
pnpm --filter @repo/web <command>
pnpm --filter @repo/api <command>
pnpm --filter @repo/database <command>
\`\`\`

## 📁 Project Structure

\`\`\`
nextjs-turborepo-starter/
├── apps/
│   ├── api/                    # Fastify API application
│   │   ├── src/
│   │   │   ├── config/         # API configuration
│   │   │   ├── index.ts        # Entry point
│   │   │   └── server.ts       # Server setup
│   │   └── package.json
│   └── web/                    # Next.js web application
│       ├── app/                # App router pages
│       ├── components/         # React components
│       ├── lib/                # Utilities
│       └── package.json
├── packages/
│   ├── config/                 # Environment & config
│   ├── database/               # Prisma schema & client
│   ├── types/                  # Shared TypeScript types
│   ├── utils/                  # Shared utilities
│   ├── validation/             # Zod schemas
│   ├── ui/                     # UI utilities
│   ├── eslint-config/          # ESLint configs
│   └── typescript-config/      # TypeScript configs
├── .env.example                # Environment template
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # pnpm workspace config
├── turbo.json                  # Turborepo config
└── tsconfig.json               # Root TypeScript config
\`\`\`

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"

# Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# API
NODE_ENV="development"
PORT=3001
HOST="localhost"

# CORS
CORS_ORIGINS="http://localhost:3000,http://localhost:3001"

# Next.js
NEXT_PUBLIC_API_URL="http://localhost:3001"
\`\`\`

### Adding shadcn/ui Components

\`\`\`bash
cd apps/web
npx shadcn@latest add button
npx shadcn@latest add card
# etc...
\`\`\`

## 🎨 Customization

### Rename Packages

Update package names in:
1. Each `package.json` file
2. Import statements across the codebase
3. `tsconfig.json` path mappings

### Add a New Package

\`\`\`bash
mkdir -p packages/my-package/src
cd packages/my-package

# Create package.json
cat > package.json << 'EOF'
{
  "name": "@repo/my-package",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint .",
    "check-types": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "typescript": "5.9.2"
  }
}
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF
\`\`\`

### Add a New App

\`\`\`bash
mkdir -p apps/my-app
cd apps/my-app
# Follow similar pattern as existing apps
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
\`\`\`

## 🏗️ Building for Production

\`\`\`bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter @repo/web build
pnpm --filter @repo/api build
\`\`\`

## 🚢 Deployment

### Deploy Web App (Vercel)

\`\`\`bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
cd apps/web
vercel
\`\`\`

### Deploy API (Docker)

\`\`\`dockerfile
# Example Dockerfile for API
FROM node:18-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS builder
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @repo/api build

FROM base AS runner
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3001
CMD ["node", "dist/index.js"]
\`\`\`

## 🔄 Framework Alternatives

Want to use Express, NestJS, or another framework instead of Fastify?

Check out our comprehensive guide: **[Framework Alternatives Guide](./docs/FRAMEWORK-ALTERNATIVES.md)**

Includes detailed migration instructions for:
- ✅ Express.js
- ✅ NestJS  
- ✅ Hono
- ✅ Koa

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Fastify Documentation](https://fastify.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, Turborepo, and TypeScript

