import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the Next.js Turborepo Starter",
};

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Next.js Turborepo Starter
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              A modern monorepo starter with Next.js, Turborepo, TypeScript, and shared packages.
              Built with best practices for scalability and maintainability.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/about"
                className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
              >
                Get Started
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border-2 border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-50"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Monorepo Architecture */}
          <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl">
              📦
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Monorepo Architecture</h3>
            <p className="text-gray-600">
              Organized with Turborepo for efficient builds, caching, and shared code across apps
              and packages.
            </p>
          </div>

          {/* TypeScript */}
          <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-2xl">
              📘
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">TypeScript</h3>
            <p className="text-gray-600">
              Fully typed with strict TypeScript configuration, shared types, and validation schemas
              using Zod.
            </p>
          </div>

          {/* Shared Packages */}
          <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-2xl">
              🔧
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Shared Packages</h3>
            <p className="text-gray-600">
              Reusable packages for config, database, types, utils, validation, and UI components.
            </p>
          </div>

          {/* Next.js App Router */}
          <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-2xl">
              ⚡
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Next.js App Router</h3>
            <p className="text-gray-600">
              Built with Next.js 16 App Router for modern React Server Components and streaming.
            </p>
          </div>

          {/* Fastify API */}
          <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-2xl">
              🚀
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Fastify API</h3>
            <p className="text-gray-600">
              High-performance API server with Fastify, complete with rate limiting and Swagger
              docs.
            </p>
          </div>

          {/* Database Ready */}
          <div className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-2xl">
              🗄️
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">Database Ready</h3>
            <p className="text-gray-600">
              Prisma ORM configured with PostgreSQL, including example models and migrations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-200 bg-gray-900">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to Build?</h2>
          <p className="mb-8 text-xl text-gray-300">
            Start building your next project with this powerful boilerplate.
          </p>
          <Link
            href="/about"
            className="inline-block rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

