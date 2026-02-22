import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { PageHero } from "@/components/page-hero";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function ProjectDetails() {
  const [, params] = useRoute("/projects/:id");
  const id = params?.id ? Number(params.id) : 0;
  
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) return <div className="h-screen flex items-center justify-center text-xl">جاري التحميل...</div>;
  if (error || !project) return <div className="h-screen flex items-center justify-center text-xl text-destructive">المشروع غير موجود</div>;

  return (
    <div>
      <PageHero 
        title={project.title} 
        imageUrl={project.image}
      />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للمشاريع
          </Link>

          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border">
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground border-b border-border pb-8">
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                <Tag className="w-4 h-4 text-primary" />
                <span className="font-semibold">{project.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {project.createdAt ? format(new Date(project.createdAt), 'dd MMMM yyyy', { locale: ar }) : 'تاريخ غير محدد'}
                </span>
              </div>
            </div>

            <div className="prose prose-lg prose-slate rtl:prose-reverse max-w-none">
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">تفاصيل المشروع</h2>
              <div className="whitespace-pre-wrap text-muted-foreground leading-loose">
                {project.description}
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-border flex justify-center">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg">
                  اطلب مشروعاً مشابهاً
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
