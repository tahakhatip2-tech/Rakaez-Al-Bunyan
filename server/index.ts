// This file is only for local development
import handler from "../api/index.js";
import { app, httpServer, appReady, log } from "../api/index.js"; // This won't work because index exports default as handler

// Better way for local development:
import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";

const app = express();
const httpServer = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  await registerRoutes(httpServer, app);

  if (process.env.NODE_ENV !== "production") {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen({ port, host: "0.0.0.0" }, () => {
    console.log(`[local] serving on port ${port}`);
  });
})();
