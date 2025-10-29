import { getEnv } from "@repo/config";

import { createServer } from "./server.js";

async function start() {
  try {
    // Validate environment variables on startup
    console.info("🔍 Validating environment variables...");
    const env = getEnv();
    console.info("✅ Environment variables validated successfully\n");

    const PORT = env.PORT;
    const HOST = env.HOST;

    const server = await createServer();

    await server.listen({ port: PORT, host: HOST });

    console.info(`🚀 API Server`);
    console.info(`📡 Server running at http://${HOST}:${String(PORT)}`);
    console.info(`📚 API Documentation: http://${HOST}:${String(PORT)}/docs`);
    console.info(`🔍 Health Check: http://${HOST}:${String(PORT)}/health`);

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.info(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      try {
        await server.close();
        console.info("✅ Server closed successfully");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
        process.exit(1);
      }
    };

    process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

void start();

