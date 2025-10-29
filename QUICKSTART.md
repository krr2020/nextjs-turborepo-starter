# ⚡ Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Initialize Your Project

```bash
# Clone the repository
git clone <your-repo-url> my-project
cd my-project

# Run the init script to customize package names
node scripts/init.js

# Follow the prompts to set your project name
# Example: "my-app" → @my-app/web, @my-app/api, etc.
```

## Step 2: Install Dependencies

```bash
pnpm install
```

## Step 3: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your favorite editor
```

## Step 4: Set Up Database

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database (development)
pnpm db:push
```

## Step 5: Start Development

```bash
# Start all apps
pnpm dev
```

Visit:
- 🌐 **Web App**: http://localhost:3000
- 🚀 **API**: http://localhost:3001
- 📚 **API Docs**: http://localhost:3001/docs

---

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Lint all code |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run all tests |
| `pnpm clean` | Clean build artifacts |

## Project Structure

```
my-project/
├── apps/
│   ├── web/          # Next.js app (localhost:3000)
│   └── api/          # Fastify API (localhost:3001)
├── packages/
│   ├── config/       # Environment config
│   ├── database/     # Prisma ORM
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   ├── validation/   # Zod schemas
│   └── ui/           # UI utilities
└── scripts/
    └── init.js       # Initialization script
```

## What's Next?

- 📖 **Read full docs**: [README.md](./README.md)
- 🎨 **Customize**: [docs/CUSTOMIZATION.md](./docs/CUSTOMIZATION.md)
- 🔄 **Switch frameworks**: [docs/FRAMEWORK-ALTERNATIVES.md](./docs/FRAMEWORK-ALTERNATIVES.md)
- 🤝 **Contribute**: [CONTRIBUTING.md](./CONTRIBUTING.md)

## Need Help?

- 🐛 Found a bug? [Open an issue](https://github.com/your-repo/issues)
- 💬 Questions? Check the [full README](./README.md)
- 📚 More guides in the [docs/](./docs) folder

---

**Happy coding!** 🎉

