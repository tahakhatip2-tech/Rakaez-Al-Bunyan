import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "../server/routes.js";
import { serveStatic } from "../server/static.js";

export function log(message: string, source = "express") {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    console.log(`${formattedTime} [${source}] ${message}`);
}

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

const appReady = (async () => {
    try {
        await registerRoutes(httpServer, app);
        app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
            const status = err.status || err.statusCode || 500;
            const message = err.message || "Internal Server Error";
            console.error("Internal Server Error:", err);
            if (res.headersSent) return next(err);
            return res.status(status).json({ message });
        });
        if (process.env.NODE_ENV !== "production") {
            serveStatic(app);
        }
    } catch (error) {
        console.error("Failed to initialize app:", error);
    }
})();

export default async function handler(req: any, res: any) {
    await appReady;
    return app(req, res);
}
