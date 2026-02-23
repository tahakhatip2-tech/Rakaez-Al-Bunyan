import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Star, Building2, Paintbrush, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/use-services";
import { useProjects } from "@/hooks/use-projects";
import { useReviews } from "@/hooks/use-reviews";
import { usePartners } from "@/hooks/use-partners";
import { SEO } from "@/components/seo";

export default function Home() {
  const { data: services } = useServices();
  const { data: projects } = useProjects();
  const { data: reviews } = useReviews();
  const { data: partners } = usePartners();

  return (
    <div>
      <SEO
        title="الرئيسية"
        description="ركائز البنيان للمقاولات العامة — متخصصون في الإنشاءات السكنية والتجارية، الدهانات، السباكة، الكهرباء، والديكورات الداخلية. جودة عالية وخبرة واسعة في المملكة العربية السعودية."
        url="https://rakaezalbonyan.vercel.app/"
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* landing page hero modern construction site */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=1920&h=1080&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <span className="inline-block py-1 px-4 rounded-full bg-primary/20 text-primary font-bold text-sm mb-2 border border-primary/30 backdrop-blur-sm">
                مرحباً بكم في شركة ركائز البنيان
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-display leading-tight drop-shadow-2xl">
                نبني <span className="text-primary">مستقبلك</span> <br />بأسس راسخة وجودة عالية
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
                الخيار الأمثل للمقاولات العامة والتشطيبات. خبرة واسعة، دقة في التنفيذ، والالتزام بالمواعيد هو ما يميزنا.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link href="/services">
                  <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                    استكشف خدماتنا
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6 bg-white/10 text-white border-white/40 hover:bg-white/20 backdrop-blur-lg transition-all">
                    تواصل معنا
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* construction team reviewing blueprints */}
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
                alt="عن الشركة"
                className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-5xl font-bold font-display mb-2">+15</p>
                <p className="text-lg font-medium">عاماً من الخبرة</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-bold tracking-wider mb-2">من نحن</h2>
              <h3 className="text-4xl font-bold text-foreground font-display mb-6">
                شريكك الموثوق في كل تفاصيل البناء
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                شركة ركائز البنيان هي صرح رائد في عالم المقاولات، تأسست على مبادئ الجودة والثقة. نحن نقدم حلولاً متكاملة تشمل الإنشاءات، التشطيبات، وأعمال الصيانة، مع التركيز على أدق التفاصيل لضمان رضا عملائنا.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "فريق هندسي متخصص ذو كفاءة عالية",
                  "استخدام أفضل المواد وأحدث التقنيات",
                  "التزام تام بالجدول الزمني للمشروع",
                  "أسعار تنافسية وشفافية في التعامل"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/about">
                <Button variant="outline" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-8">
                  اقرأ المزيد عنا
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-wider mb-2">خدماتنا</h2>
            <h3 className="text-4xl font-bold text-foreground font-display mb-4">
              نقدم حلولاً متكاملة لاحتياجاتك
            </h3>
            <p className="text-muted-foreground text-lg">
              تتنوع خدماتنا لتغطي كافة جوانب البناء والتشطيب، لنوفر لك تجربة مريحة ونتيجة تفوق التوقعات.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {/* Default icons based on index for variety since actual icon is text field in schema */}
                  {index % 3 === 0 ? <Building2 className="w-8 h-8" /> : index % 3 === 1 ? <Paintbrush className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
                </div>
                <h4 className="text-2xl font-bold font-display mb-3 text-foreground">{service.title}</h4>
                <p className="text-muted-foreground line-clamp-3 mb-6">
                  {service.description}
                </p>
                <Link href={`/services/${service.id}`} className="inline-flex items-center text-primary font-semibold hover:text-primary/80 group/link">
                  تفاصيل الخدمة
                  <ArrowLeft className="w-4 h-4 mr-2 transform group-hover/link:-translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" className="rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                عرض جميع الخدمات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-primary font-bold tracking-wider mb-2">أعمالنا</h2>
              <h3 className="text-4xl font-bold text-foreground font-display">
                مشاريع نفخر بإنجازها
              </h3>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="rounded-full border-2">
                عرض كل المشاريع
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg h-[400px]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-primary font-medium mb-2">{project.category}</span>
                  <h4 className="text-2xl font-bold text-white font-display mb-2">{project.title}</h4>
                  <p className="text-gray-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.description}
                  </p>
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="link" className="text-white p-0 h-auto hover:text-primary">
                      التفاصيل <ArrowLeft className="w-4 h-4 mr-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-bold tracking-wider mb-2 text-white/80">آراء العملاء</h2>
            <h3 className="text-4xl font-bold font-display text-white">
              ماذا يقول عملاؤنا عنا
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews?.slice(0, 3).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-white/30'}`} />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 text-white/90">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">{review.customerName}</h5>
                    <p className="text-white/70 text-sm">عميل راضٍ</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-center text-muted-foreground font-semibold mb-10">شركاء النجاح الموثوقين</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {partners?.map(partner => (
              <img
                key={partner.id}
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain"
                title={partner.name}
              />
            ))}
            {/* Fallbacks if empty */}
            {(!partners || partners.length === 0) && (
              <>
                <div className="text-2xl font-bold font-display text-gray-400">سابك</div>
                <div className="text-2xl font-bold font-display text-gray-400">أرامكو</div>
                <div className="text-2xl font-bold font-display text-gray-400">الراجحي</div>
                <div className="text-2xl font-bold font-display text-gray-400">المراعي</div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
