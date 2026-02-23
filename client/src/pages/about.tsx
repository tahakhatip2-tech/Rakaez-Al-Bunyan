import { PageHero } from "@/components/page-hero";
import { CheckCircle2, Target, Eye, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/seo";

export default function About() {
  return (
    <div>
      <SEO
        title="من نحن"
        description="تعرف على شركة ركائز البنيان للمقاولات العامة — قصتنا، رؤيتنا، مهمتنا، وقيمنا الأساسية في عالم المقاولات والإنشاءات."
        url="https://rakaezalbonyan.vercel.app/about"
        keywords="من نحن, ركائز البنيان, شركة مقاولات, تاريخ الشركة, رؤية مهمة"
      />
      {/* architecture blueprint and hardhat */}
      <PageHero
        title="من نحن"
        subtitle="تعرف على شركة ركائز البنيان ورؤيتها ومهمتها في عالم المقاولات"
        imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=1080&fit=crop"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">
                قصتنا وبداياتنا
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                تأسست شركة ركائز البنيان كاستجابة للحاجة المتزايدة لمقاولات تتسم بالمصداقية والجودة العالية في السوق. منذ انطلاقتنا، وضعنا نصب أعيننا هدفاً واحداً: تقديم خدمات هندسية وإنشائية ترتقي لمستوى تطلعات عملائنا. اليوم، وبعد سنوات من العمل الدؤوب، نفخر بسجل حافل من المشاريع الناجحة والعلاقات المتينة مع شركائنا.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="bg-muted/50 p-8 rounded-2xl border border-border">
                <Target className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold font-display mb-4">مهمتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  توفير بيئة مبنية آمنة، مستدامة، وجذابة تلبي احتياجات العملاء من خلال دمج الخبرة الفنية مع الابتكار، والالتزام بأعلى معايير الجودة والسلامة المهنية في جميع مراحل المشروع.
                </p>
              </div>
              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
                <Eye className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold font-display mb-4">رؤيتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون الشركة الرائدة والاختيار الأول في قطاع المقاولات العامة والتشطيبات على المستوى الإقليمي، عبر تقديم نماذج معمارية ملهمة تساهم في التنمية العمرانية والحضارية.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-3xl font-bold font-display text-center mb-10">قيمنا الأساسية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "الجودة", desc: "لا مساومة على معايير الجودة في أي تفصيل." },
                  { title: "النزاهة", desc: "شفافية مطلقة في التعاملات والأسعار." },
                  { title: "الالتزام", desc: "تسليم المشاريع في وقتها المحدد." },
                  { title: "الابتكار", desc: "مواكبة أحدث تقنيات البناء والتشييد." }
                ].map((val, i) => (
                  <div key={i} className="text-center p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                    <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h4 className="font-bold text-xl mb-2">{val.title}</h4>
                    <p className="text-sm text-muted-foreground">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
