import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
    { name: "خدماتنا", path: "/services" },
    { name: "مشاريعنا", path: "/projects" },
    { name: "المدونة", path: "/blog" },
    { name: "اتصل بنا", path: "/contact" },
  ];

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:flex bg-primary text-primary-foreground py-2 px-6 justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>0782633162</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>info@rakaez-albunyan.com</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>الأردن، عمان، حي عدن</span>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-white py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-primary/30">
              <HardHat className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground leading-none">ركائز البنيان</h1>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">للمقاولات العامة</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  location === link.path 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden md:flex">
              <Button className="rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all px-6">
                طلب تسعيرة
              </Button>
            </Link>
            
            <button 
              className="lg:hidden text-foreground p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg py-4 px-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  location === link.path 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="mt-4">
              <Button className="w-full rounded-xl">طلب تسعيرة</Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                  <HardHat className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-display text-white">ركائز البنيان</h2>
              </div>
              <p className="mb-6 leading-relaxed">
                شركة ركائز البنيان للمقاولات العامة، رواد في مجال البناء والتشييد والتشطيبات بخبرة تمتد لسنوات، نقدم جودة لا تضاهى.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-display">روابط سريعة</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="hover:text-primary transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/admin" className="hover:text-primary transition-colors flex items-center gap-2 text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    لوحة الإدارة
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-display">خدماتنا</h3>
              <ul className="space-y-3">
                <li><Link href="/services" className="hover:text-primary transition-colors">الإنشاءات والمقاولات</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">أعمال الدهانات</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">السباكة والكهرباء</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">الديكور والجبس</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">العزل والإيبوكسي</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-display">تواصل معنا</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>الأردن، عمان، حي عدن، مجمع رباح، ط 3، مكتب 7</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span dir="ltr">0782633162</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>info@rakaez-albunyan.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div className="flex flex-col gap-1">
              <p>جميع الحقوق محفوظة © {new Date().getFullYear()} شركة ركائز البنيان</p>
              <p className="text-xs opacity-70">بواسطة الخطيب للبرمجيات</p>
            </div>
            <p>تم التصميم والتطوير بكل إتقان</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/962782633162" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label="تواصل معنا عبر واتساب"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>
    </div>
  );
}
