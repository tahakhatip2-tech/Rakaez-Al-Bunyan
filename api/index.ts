import { app, appReady } from "../server/app";

// Wait for routes and DB to be ready before handling requests
export default async function handler(req: any, res: any) {
    await appReady;
    return app(req, res);
}
