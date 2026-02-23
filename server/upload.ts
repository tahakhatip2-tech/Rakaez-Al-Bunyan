import { createClient } from "@supabase/supabase-js";
import type { Express, Request, Response } from "express";
import multer from "multer";

export function registerUploadRoute(app: Express) {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            if (file.mimetype.startsWith("image/")) {
                cb(null, true);
            } else {
                cb(new Error("فقط ملفات الصور مسموحة"));
            }
        },
    });

    // Use the multer middleware manually for better Express 5 compatibility
    app.post("/api/upload", (req: Request, res: Response) => {
        upload.single("image")(req, res, async (err) => {
            // Handle multer errors
            if (err) {
                console.error("Multer error:", err);
                return res.status(400).json({ message: err.message || "خطأ في رفع الملف" });
            }

            if (!req.file) {
                return res.status(400).json({ message: "لم يتم إرسال أي صورة" });
            }

            // Check Supabase config
            if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
                console.error("Missing Supabase config: SUPABASE_URL or SUPABASE_SERVICE_KEY not set");
                return res.status(500).json({ message: "إعدادات التخزين غير مكتملة — يرجى إضافة متغيرات Supabase" });
            }

            try {
                const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

                const fileExt = (req.file.originalname.split(".").pop() || "jpg").toLowerCase();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `uploads/${fileName}`;

                const { error } = await supabase.storage
                    .from("images")
                    .upload(filePath, req.file.buffer, {
                        contentType: req.file.mimetype,
                        upsert: false,
                    });

                if (error) {
                    console.error("Supabase storage error:", error);
                    return res.status(500).json({ message: "فشل رفع الصورة: " + error.message });
                }

                const { data: publicData } = supabase.storage.from("images").getPublicUrl(filePath);

                console.log("Image uploaded successfully:", publicData.publicUrl);
                return res.json({ url: publicData.publicUrl });
            } catch (uploadError: any) {
                console.error("Upload error:", uploadError);
                return res.status(500).json({ message: uploadError.message || "حدث خطأ أثناء رفع الصورة" });
            }
        });
    });

    console.log("Upload route registered: POST /api/upload");
}
