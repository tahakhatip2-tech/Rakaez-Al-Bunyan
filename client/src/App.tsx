import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Projects from "@/pages/projects";
import ProjectDetails from "@/pages/project-details";
import Services from "@/pages/services";
import ServiceDetails from "@/pages/service-details";
import Blog from "@/pages/blog";
import ArticleDetails from "@/pages/article-details";
import Admin from "@/pages/admin";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, LogOut } from "lucide-react";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "tahakhatip@1982") {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md shadow-xl border-primary/20">
          <CardHeader className="text-center space-y-1">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-bold font-display text-primary">دخول الإدارة</CardTitle>
            <p className="text-muted-foreground">يرجى إدخال كلمة المرور للمتابعة</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center text-lg h-12 border-primary/20 focus-visible:ring-primary"
                  autoFocus
                />
                {error && <p className="text-destructive text-sm text-center font-medium">{error}</p>}
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                تسجيل الدخول
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full" 
                onClick={() => window.location.href = "/"}
              >
                العودة للرئيسية
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">ر</div>
          <h1 className="text-xl font-bold font-display">لوحة تحكم ركائز البنيان</h1>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/5 hover:text-destructive">
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </Button>
      </header>
      {children}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Layout><Home /></Layout>
      </Route>
      <Route path="/about">
        <Layout><About /></Layout>
      </Route>
      <Route path="/contact">
        <Layout><Contact /></Layout>
      </Route>
      <Route path="/projects">
        <Layout><Projects /></Layout>
      </Route>
      <Route path="/projects/:id">
        <Layout><ProjectDetails /></Layout>
      </Route>
      <Route path="/services">
        <Layout><Services /></Layout>
      </Route>
      <Route path="/services/:id">
        <Layout><ServiceDetails /></Layout>
      </Route>
      <Route path="/blog">
        <Layout><Blog /></Layout>
      </Route>
      <Route path="/blog/:id">
        <Layout><ArticleDetails /></Layout>
      </Route>
      <Route path="/admin">
        <AdminGuard><Admin /></AdminGuard>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;