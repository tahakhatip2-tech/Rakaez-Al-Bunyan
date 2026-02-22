import { PageHero } from "@/components/page-hero";
import { useArticles } from "@/hooks/use-articles";
import { Link } from "wouter";
import { Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function Blog() {
  const { data: articles, isLoading } = useArticles();

  return (
    <div>
      {/* architecture and engineering workspace */}
      <PageHero 
        title="المدونة" 
        subtitle="أحدث المقالات، النصائح، والأخبار في عالم المقاولات والبناء"
        imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=1080&fit=crop"
      />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse"></div>
              ))}
            </div>
          ) : !articles?.length ? (
            <div className="text-center py-20 text-muted-foreground">
              لا توجد مقالات مضافة حالياً.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md border border-border group hover:shadow-xl transition-shadow flex flex-col"
                >
                  <Link href={`/blog/${article.id}`} className="block h-56 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.createdAt ? format(new Date(article.createdAt), 'dd MMM yyyy', { locale: ar }) : 'جديد'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>الإدارة</span>
                      </div>
                    </div>
                    <Link href={`/blog/${article.id}`}>
                      <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                    </Link>
                    <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                      {article.content}
                    </p>
                    <Link href={`/blog/${article.id}`} className="text-primary font-semibold hover:underline">
                      اقرأ المزيد...
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
