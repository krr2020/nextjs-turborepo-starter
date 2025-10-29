# Contributing Guide

Thank you for considering contributing to this project!

## Development Workflow

1. **Fork and Clone**
   \`\`\`bash
   git clone <your-fork-url>
   cd nextjs-turborepo-starter
   pnpm install
   \`\`\`

2. **Create a Branch**
   \`\`\`bash
   git checkout -b feature/my-feature
   \`\`\`

3. **Make Changes**
   - Write code following the existing patterns
   - Add tests if applicable
   - Run linting: `pnpm lint:fix`
   - Run type checking: `pnpm check-types`

4. **Commit Your Changes**
   - Follow [Conventional Commits](https://www.conventionalcommits.org/)
   - Examples:
     - `feat: add new validation schema`
     - `fix: resolve CORS issue in API`
     - `docs: update README with deployment info`
     - `chore: update dependencies`

5. **Push and Create PR**
   \`\`\`bash
   git push origin feature/my-feature
   \`\`\`
   Then create a Pull Request on GitHub.

## Code Style

- TypeScript strict mode
- ESLint for code quality
- Prettier for formatting
- Run `pnpm format` before committing

## Testing

- Write tests for new features
- Ensure all tests pass: `pnpm test`
- Aim for good code coverage

## Questions?

Feel free to open an issue for any questions or discussions!

