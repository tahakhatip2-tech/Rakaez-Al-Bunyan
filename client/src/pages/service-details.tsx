import { useRoute } from "wouter";
import { useService } from "@/hooks/use-services";
import { PageHero } from "@/components/page-hero";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ServiceDetails() {
  const [, params] = useRoute("/services/:id");
  const id = params?.id ? Number(params.id) : 0;
  
  const { data: service, isLoading, error } = useService(id);

  if (isLoading) return <div className="h-screen flex items-center justify-center text-xl">جاري التحميل...</div>;
  if (error || !service) return <div className="h-screen flex items-center justify-center text-xl text-destructive">الخدمة غير موجودة</div>;

  return (
    <div>
      <PageHero 
        title={service.title} 
        imageUrl={service.image}
      />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للخدمات
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border mb-8">
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">وصف الخدمة</h2>
                <div className="whitespace-pre-wrap text-lg text-muted-foreground leading-loose">
                  {service.description}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/20 sticky top-32">
                <h3 className="text-xl font-bold font-display mb-6">لماذا تختارنا في هذه الخدمة؟</h3>
                <ul className="space-y-4 mb-8">
                  {[
                    "فنيون وعمالة مدربة",
                    "مواد معتمدة ومضمونة",
                    "إنجاز سريع ودقيق",
                    "أسعار منافسة"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="w-full h-12 text-lg rounded-xl">
                    طلب الخدمة الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
