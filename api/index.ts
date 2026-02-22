import { app, appReady } from "./app";

export default async function handler(req: any, res: any) {
    await appReady;
    return app(req, res);
}
