import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SEO } from "@/components/seo";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم استلام رسالتك",
      description: "سنتواصل معك في أقرب وقت ممكن.",
    });
  };

  return (
    <div>
      {/* modern office building facade */}
      <PageHero
        title="اتصل بنا"
        subtitle="نحن هنا للرد على استفساراتك وتلبية احتياجات مشروعك"
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-display mb-6 text-foreground">معلومات التواصل</h2>
                <p className="text-muted-foreground mb-8">
                  يسعدنا تواصلكم معنا لطلب استشارة أو تسعيرة لمشروعكم. فريقنا جاهز لخدمتكم.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">العنوان</h4>
                    <p className="text-muted-foreground">الأردن، عمان<br />حي عدن، مجمع رباح، ط 3، مكتب 7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">الهاتف</h4>
                    <p className="text-muted-foreground" dir="ltr">0782633162</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">البريد الإلكتروني</h4>
                    <p className="text-muted-foreground">info@rakaez-albunyan.com<br />sales@rakaez-albunyan.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">ساعات العمل</h4>
                    <p className="text-muted-foreground">الأحد - الخميس: 8:00 ص - 5:00 م<br />السبت: 9:00 ص - 2:00 م</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border/50">
                <h3 className="text-2xl font-bold font-display mb-6">أرسل لنا رسالة</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الاسم الكامل</label>
                      <Input placeholder="أدخل اسمك" required className="bg-muted/50 border-transparent focus:bg-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">رقم الجوال</label>
                      <Input placeholder="أدخل رقمك" required className="bg-muted/50 border-transparent focus:bg-white" dir="ltr" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البريد الإلكتروني</label>
                    <Input type="email" placeholder="example@mail.com" className="bg-muted/50 border-transparent focus:bg-white" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نوع الخدمة المطلوبة</label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-transparent bg-muted/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>اختر الخدمة...</option>
                      <option>إنشاءات ومقاولات</option>
                      <option>تشطيبات وديكور</option>
                      <option>أعمال صيانة وترميم</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تفاصيل المشروع / الرسالة</label>
                    <Textarea
                      placeholder="كيف يمكننا مساعدتك؟"
                      rows={5}
                      required
                      className="bg-muted/50 border-transparent focus:bg-white resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl">
                    إرسال الطلب
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
            <p className="font-bold text-lg text-slate-500">خريطة الموقع (تضمين Google Maps هنا)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
