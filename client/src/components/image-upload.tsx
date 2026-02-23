import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError("");
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "فشل رفع الصورة");
            }

            onChange(data.url);
        } catch (err: any) {
            setError(err.message || "حدث خطأ أثناء رفع الصورة");
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleRemove = () => {
        onChange("");
        setError("");
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
                // صورة تمت إضافتها - عرض المعاينة
                <div className="relative group rounded-xl overflow-hidden border border-border aspect-video bg-muted">
                    <img
                        src={value}
                        alt="معاينة الصورة"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => inputRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <Loader2 className="w-4 h-4 animate-spin ml-1" />
                            ) : (
                                <Upload className="w-4 h-4 ml-1" />
                            )}
                            تغيير
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={handleRemove}
                        >
                            <X className="w-4 h-4 ml-1" />
                            حذف
                        </Button>
                    </div>
                </div>
            ) : (
                // منطقة السحب والإفلات
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
            )}

            {error && (
                <p className="text-sm text-destructive flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {error}
                </p>
            )}
        </div>
    );
}
