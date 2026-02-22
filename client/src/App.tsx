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

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/projects" component={Projects}/>
        <Route path="/projects/:id" component={ProjectDetails}/>
        <Route path="/services" component={Services}/>
        <Route path="/services/:id" component={ServiceDetails}/>
        <Route path="/blog" component={Blog}/>
        <Route path="/blog/:id" component={ArticleDetails}/>
        <Route path="/admin" component={Admin}/>
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
