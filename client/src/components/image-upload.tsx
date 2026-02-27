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

const MAX_SIZE_MB = 2; // حد أقصى 2MB لتجنب تضخم قاعدة البيانات
const PLACEHOLDER = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop";

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError("");

        // التحقق من نوع الملف
        if (!file.type.startsWith("image/")) {
            setError("فقط ملفات الصور مسموحة (PNG, JPG, WEBP)");
            return;
        }

        // التحقق من الحجم
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`حجم الصورة كبير جداً. الحد الأقصى ${MAX_SIZE_MB}MB`);
            return;
        }

        setIsProcessing(true);

        // ضغط وتحويل الصورة إلى Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
                // ضغط الصورة عبر Canvas لتقليل الحجم
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 1200;
                const MAX_HEIGHT = 800;
                let { width, height } = img;

                if (width > MAX_WIDTH) {
                    height = (height * MAX_WIDTH) / width;
                    width = MAX_WIDTH;
                }
                if (height > MAX_HEIGHT) {
                    width = (width * MAX_HEIGHT) / height;
                    height = MAX_HEIGHT;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d")!;
                ctx.drawImage(img, 0, 0, width, height);

                // تحويل إلى JPEG بجودة 85%
                const compressed = canvas.toDataURL("image/jpeg", 0.85);
                onChange(compressed);
                setIsProcessing(false);
            };
            img.onerror = () => {
                setError("تعذّر قراءة الصورة، جرب ملفاً آخر");
                setIsProcessing(false);
            };
            img.src = reader.result as string;
        };
        reader.onerror = () => {
            setError("تعذّر تحميل الملف");
            setIsProcessing(false);
        };
        reader.readAsDataURL(file);

        // إعادة تعيين input
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleUrlSubmit = () => {
        const url = urlInput.trim();
        if (url) {
            onChange(url);
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
                // معاينة الصورة
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
                            disabled={isProcessing}
                        >
                            <Upload className="w-4 h-4 ml-1" />
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
                    {/* منطقة الرفع */}
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={isProcessing}
                        className={cn(
                            "w-full aspect-video rounded-xl border-2 border-dashed border-border",
                            "flex flex-col items-center justify-center gap-3",
                            "bg-muted/50 hover:bg-muted transition-colors cursor-pointer",
                            "text-muted-foreground hover:text-foreground",
                            isProcessing && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                <p className="font-medium">جاري معالجة الصورة...</p>
                            </>
                        ) : (
                            <>
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ImageIcon className="w-7 h-7 text-primary" />
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-base">اضغط لاختيار صورة</p>
                                    <p className="text-sm mt-1 opacity-70">PNG, JPG, WEBP — حتى {MAX_SIZE_MB}MB</p>
                                </div>
                            </>
                        )}
                    </button>

                    {/* إدخال رابط يدوي */}
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
                                autoFocus
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
                <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg flex items-center gap-2">
                    <X className="w-4 h-4 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}
