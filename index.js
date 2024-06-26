// Services
import { Server } from "./server.js";
import { createChronosPath } from "./generate-config.js";

async function initializeAndStartServer() {
  try {
    await createChronosPath();
    new Server().start();
  } catch (error) {
    console.error("Failed to initialize the server:", error);
  }
}

initializeAndStartServer();
