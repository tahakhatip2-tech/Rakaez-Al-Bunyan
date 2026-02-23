import { PageHero } from "@/components/page-hero";
import { useServices } from "@/hooks/use-services";
import { Link } from "wouter";
import { ArrowLeft, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/seo";

export default function Services() {
  const { data: services, isLoading } = useServices();

  return (
    <div>
      <SEO
        title="خدماتنا"
        description="خدمات ركائز البنيان للمقاولات: إنشاءات، دهانات، سباكة، كهرباء، ديكورات داخلية، وعزل. جميع الخدمات بأعلى جودة وأسعار تنافسية."
        url="https://rakaezalbonyan.vercel.app/services"
        keywords="خدمات مقاولات, دهانات, سباكة, كهرباء, ديكور داخلي, عزل, إنشاءات"
      />
      {/* painting and finishing tools construction */}
      <PageHero
        title="خدماتنا"
        subtitle="مجموعة متكاملة من الخدمات بأعلى معايير الجودة والاحترافية"
        imageUrl="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop"
      />

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse"></div>
              ))}
            </div>
          ) : !services?.length ? (
            <div className="text-center py-20 text-muted-foreground">
              لا توجد خدمات مضافة حالياً.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border group hover:border-primary transition-all duration-300 flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1 relative">
                    <div className="absolute -top-8 right-8 w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform">
                      <Wrench className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-display mt-4 mb-3">{service.title}</h3>
                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                      {service.description}
                    </p>
                    <Link href={`/services/${service.id}`} className="inline-flex items-center text-primary font-bold group/link">
                      اقرأ المزيد
                      <ArrowLeft className="w-4 h-4 mr-2 transform group-hover/link:-translate-x-1 transition-transform" />
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
