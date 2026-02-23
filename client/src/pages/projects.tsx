import { PageHero } from "@/components/page-hero";
import { useProjects } from "@/hooks/use-projects";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/seo";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div>
      <SEO
        title="مشاريعنا"
        description="استعرض أبرز مشاريع شركة ركائز البنيان في الإنشاءات السكنية والتجارية والتشطيبات الداخلية والخارجية بجودة عالية."
        url="https://rakaezalbonyan.vercel.app/projects"
        keywords="مشاريع مقاولات, إنشاءات سكنية, إنشاءات تجارية, تشطيبات, ركائز البنيان"
      />
      {/* luxurious interior design modern */}
      <PageHero
        title="مشاريعنا"
        subtitle="اكتشف سجل إنجازاتنا في مختلف قطاعات البناء والتشطيب"
        imageUrl="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1920&h=1080&fit=crop"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse"></div>
              ))}
            </div>
          ) : !projects?.length ? (
            <div className="text-center py-20 text-muted-foreground">
              لا توجد مشاريع مضافة حالياً.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border group flex flex-col"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold font-display mb-3">{project.title}</h3>
                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                      {project.description}
                    </p>
                    <Link href={`/projects/${project.id}`} className="inline-flex items-center text-primary font-bold hover:text-primary/80 transition-colors">
                      عرض تفاصيل المشروع
                      <ArrowLeft className="w-4 h-4 mr-2" />
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
