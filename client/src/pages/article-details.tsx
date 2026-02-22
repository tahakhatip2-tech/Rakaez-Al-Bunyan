import { useRoute } from "wouter";
import { useArticle } from "@/hooks/use-articles";
import { PageHero } from "@/components/page-hero";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function ArticleDetails() {
  const [, params] = useRoute("/blog/:id");
  const id = params?.id ? Number(params.id) : 0;
  
  const { data: article, isLoading, error } = useArticle(id);

  if (isLoading) return <div className="h-screen flex items-center justify-center text-xl">جاري التحميل...</div>;
  if (error || !article) return <div className="h-screen flex items-center justify-center text-xl text-destructive">المقال غير موجود</div>;

  return (
    <div>
      <PageHero 
        title={article.title} 
        imageUrl={article.image}
      />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للمدونة
            </Link>

            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground border-b border-border pb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{article.createdAt ? format(new Date(article.createdAt), 'dd MMMM yyyy', { locale: ar }) : 'تاريخ غير محدد'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>بواسطة: إدارة ركائز البنيان</span>
                </div>
              </div>

              <div className="prose prose-lg prose-slate rtl:prose-reverse max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-loose text-lg">
                  {article.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
