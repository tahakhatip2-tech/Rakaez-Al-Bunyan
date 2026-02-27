import { createClient } from "@supabase/supabase-js";
import express, { type Express, type Request, type Response } from "express";

export function registerUploadRoute(app: Express) {
    // POST /api/get-upload-url — يُعيد signed URL للرفع المباشر من المتصفح
    app.post("/api/get-upload-url", express.json(), async (req: Request, res: Response) => {
        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

        if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
            console.error("Missing Supabase config");
            return res.status(500).json({ message: "إعدادات التخزين غير مكتملة في البيئة" });
        }

        const { filename, contentType } = req.body;
        if (!filename || !contentType) {
            return res.status(400).json({ message: "filename و contentType مطلوبان" });
        }

        if (!contentType.startsWith("image/")) {
            return res.status(400).json({ message: "فقط ملفات الصور مسموحة" });
        }

        try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

            // إنشاء Bucket تلقائياً إذا لم يكن موجوداً
            const { data: buckets } = await supabase.storage.listBuckets();
            const bucketExists = buckets?.some((b) => b.name === "images");
            if (!bucketExists) {
                const { error: bucketError } = await supabase.storage.createBucket("images", {
                    public: true,
                    fileSizeLimit: 10 * 1024 * 1024,
                });
                if (bucketError && !bucketError.message.includes("already exists")) {
                    console.error("Bucket creation error:", bucketError);
                    return res.status(500).json({ message: "فشل إنشاء حاوية الصور: " + bucketError.message });
                }
            }

            const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
            const filePath = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

            const { data, error } = await supabase.storage
                .from("images")
                .createSignedUploadUrl(filePath);

            if (error || !data) {
                console.error("Signed URL error:", error);
                return res.status(500).json({ message: "فشل إنشاء رابط الرفع: " + error?.message });
            }

            const { data: publicData } = supabase.storage.from("images").getPublicUrl(filePath);

            return res.json({
                signedUrl: data.signedUrl,
                token: data.token,
                path: filePath,
                publicUrl: publicData.publicUrl,
            });
        } catch (err: any) {
            console.error("Upload URL error:", err);
            return res.status(500).json({ message: err.message || "خطأ غير متوقع" });
        }
    });

    console.log("Upload route registered: POST /api/get-upload-url");
}
