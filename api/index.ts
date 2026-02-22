import { app, appReady } from "./app.js";

export default async function handler(req: any, res: any) {
    await appReady;
    return app(req, res);
}
