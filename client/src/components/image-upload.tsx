import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    className?: string;
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop";

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError("");
        setIsUploading(true);

        try {
            // الخطوة 1: طلب Signed URL من الخادم
            const urlRes = await fetch("/api/get-upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type,
                }),
            });

            let urlData: any;
            try {
                urlData = await urlRes.json();
            } catch {
                throw new Error("استجابة غير صالحة من الخادم");
            }

            if (!urlRes.ok) {
                throw new Error(urlData.message || "فشل الحصول على رابط الرفع");
            }

            const { signedUrl, publicUrl } = urlData;

            // الخطوة 2: رفع الملف مباشرةً لـ Supabase
            const uploadRes = await fetch(signedUrl, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });

            if (!uploadRes.ok) {
                const errText = await uploadRes.text();
                throw new Error("فشل رفع الصورة إلى التخزين: " + errText);
            }

            // الخطوة 3: تحديث القيمة بالرابط العام
            onChange(publicUrl);
        } catch (err: any) {
            setError(err.message || "حدث خطأ أثناء رفع الصورة");
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleUrlSubmit = () => {
        if (urlInput.trim()) {
            onChange(urlInput.trim());
            setShowUrlInput(false);
            setUrlInput("");
            setError("");
        }
    };

    const handleRemove = () => {
        onChange("");
        setError("");
        setShowUrlInput(false);
    };

    return (
        <div className={cn("space-y-2", className)}>
            <input
                type="file"
                ref={inputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-border aspect-video bg-muted">
                    <img
                        src={value}
                        alt="معاينة الصورة"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = PLACEHOLDER;
                        }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => inputRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin ml-1" /> : <Upload className="w-4 h-4 ml-1" />}
                            تغيير
                        </Button>
                        <Button type="button" size="sm" variant="destructive" onClick={handleRemove}>
                            <X className="w-4 h-4 ml-1" />
                            حذف
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={isUploading}
                        className={cn(
                            "w-full aspect-video rounded-xl border-2 border-dashed border-border",
                            "flex flex-col items-center justify-center gap-3",
                            "bg-muted/50 hover:bg-muted transition-colors cursor-pointer",
                            "text-muted-foreground hover:text-foreground",
                            isUploading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                <p className="font-medium">جاري رفع الصورة...</p>
                            </>
                        ) : (
                            <>
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ImageIcon className="w-7 h-7 text-primary" />
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-base">اضغط لاختيار صورة</p>
                                    <p className="text-sm mt-1">PNG, JPG, WEBP حتى 10MB</p>
                                </div>
                            </>
                        )}
                    </button>

                    {/* خيار إدخال رابط يدوياً */}
                    {!showUrlInput ? (
                        <button
                            type="button"
                            onClick={() => setShowUrlInput(true)}
                            className="w-full text-xs text-muted-foreground hover:text-primary flex items-center justify-center gap-1 py-1 transition-colors"
                        >
                            <Link className="w-3 h-3" />
                            أو أدخل رابط صورة مباشرةً
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <Input
                                placeholder="https://example.com/image.jpg"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlSubmit())}
                                className="text-sm h-9"
                                dir="ltr"
                            />
                            <Button type="button" size="sm" onClick={handleUrlSubmit} className="shrink-0">إضافة</Button>
                            <Button type="button" size="sm" variant="ghost" onClick={() => setShowUrlInput(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="text-sm text-destructive flex items-start gap-2 bg-destructive/10 p-3 rounded-lg">
                    <X className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p>{error}</p>
                        <button
                            type="button"
                            onClick={() => { setError(""); setShowUrlInput(true); }}
                            className="text-xs underline mt-1 hover:no-underline"
                        >
                            استخدم رابط صورة بدلاً من ذلك
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
