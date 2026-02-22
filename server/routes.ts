import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    const defaultServices = [
      { title: 'الإنشاءات', description: 'خدمات بناء وإنشاءات متكاملة بجودة عالية للمشاريع السكنية والتجارية.', image: 'https://images.unsplash.com/photo-1541888081622-1db3cc1bc6e6?w=800&auto=format&fit=crop', icon: 'Hammer' },
      { title: 'الدهانات', description: 'أحدث أنواع الدهانات والألوان العصرية للمنازل والمكاتب بأعلى معايير الجودة.', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop', icon: 'Paintbrush' },
      { title: 'السباكة', description: 'تركيب وصيانة شبكات المياه والصرف الصحي بدقة واحترافية.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop', icon: 'Wrench' },
      { title: 'الكهرباء', description: 'تمديدات كهربائية آمنة وذكية للمباني وفق المعايير العالمية.', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop', icon: 'Zap' },
      { title: 'التبليط', description: 'تركيب كافة أنواع البلاط والرخام والسيراميك بدقة متناهية.', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&auto=format&fit=crop', icon: 'LayoutGrid' },
      { title: 'النجارة', description: 'أعمال نجارة خشبية مخصصة للأبواب والديكورات العصرية.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop', icon: 'Ruler' },
      { title: 'العزل والإيبوكسي', description: 'عزل مائي وحراري وأرضيات الإيبوكسي المقاومة للتآكل.', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop', icon: 'Shield' },
      { title: 'الترميم والصيانة', description: 'صيانة وتجديد المباني القديمة والمرافق لاستعادة رونقها.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop', icon: 'Tool' },
      { title: 'الديكور والجبس', description: 'تصاميم ديكور داخلية وجبس بورد راقية تناسب كافة الأذواق.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop', icon: 'Home' },
    ];
    for (const s of defaultServices) {
      await storage.createService(s);
    }
  }

  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    const defaultProjects = [
      { title: 'فيلا سكنية فاخرة', description: 'تنفيذ أعمال التشطيبات والديكور لفيلا في الرياض بمواصفات عالية الجودة.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop', category: 'سكني' },
      { title: 'مجمع مكاتب تجارية', description: 'تجهيز مكاتب إدارية متكاملة بأحدث المواصفات وأنظمة الشبكات الذكية.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop', category: 'تجاري' },
      { title: 'تجديد فندق بوتيك', description: 'أعمال الترميم وتحديث الدهانات والأرضيات بالكامل ليتناسب مع الهوية الجديدة.', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d12328?w=800&auto=format&fit=crop', category: 'ضيافة' }
    ];
    for (const p of defaultProjects) {
      await storage.createProject(p);
    }
  }

  const existingReviews = await storage.getReviews();
  if (existingReviews.length === 0) {
    await storage.createReview({ customerName: 'أحمد عبدالله', content: 'عمل احترافي والتزام تام بالمواعيد، أنصح بالتعامل مع شركة ركائز البنيان.', rating: 5 });
    await storage.createReview({ customerName: 'مؤسسة الأفق', content: 'جودة في التنفيذ ومهنية عالية في إدارة مشاريع المقاولات التجارية.', rating: 5 });
  }

  const existingPartners = await storage.getPartners();
  if (existingPartners.length === 0) {
    await storage.createPartner({ name: 'مورد مواد البناء الأولى', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&auto=format&fit=crop' });
    await storage.createPartner({ name: 'شركة الحديد الصلب الوطنية', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&auto=format&fit=crop' });
  }

  const existingArticles = await storage.getArticles();
  if (existingArticles.length === 0) {
    await storage.createArticle({ title: 'أهمية العزل المائي للمباني', content: 'يعتبر العزل المائي من أهم خطوات البناء لحماية المبنى من التسربات والتآكل بمرور الزمن. في شركة ركائز البنيان نقدم حلول عزل متطورة.', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop' });
    await storage.createArticle({ title: 'أحدث اتجاهات الديكور والدهانات في 2025', content: 'تعرف على أحدث الألوان وتصاميم الجبس بورد التي ستعطي لمنزلك مظهراً عصرياً وجذاباً.', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop' });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed initial data
  seedDatabase().catch(console.error);

  // --- Projects ---
  app.get(api.projects.list.path, async (req, res) => {
    const items = await storage.getProjects();
    res.json(items);
  });
  app.get(api.projects.get.path, async (req, res) => {
    const item = await storage.getProject(Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Project not found' });
    res.json(item);
  });
  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const item = await storage.createProject(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app.put(api.projects.update.path, async (req, res) => {
    try {
      const input = api.projects.update.input.parse(req.body);
      const item = await storage.updateProject(Number(req.params.id), input);
      res.json(item);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app.delete(api.projects.delete.path, async (req, res) => {
    await storage.deleteProject(Number(req.params.id));
    res.status(204).send();
  });

  // --- Services ---
  app.get(api.services.list.path, async (req, res) => {
    const items = await storage.getServices();
    res.json(items);
  });
  app.get(api.services.get.path, async (req, res) => {
    const item = await storage.getService(Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Service not found' });
    res.json(item);
  });
  app.post(api.services.create.path, async (req, res) => {
    try {
      const input = api.services.create.input.parse(req.body);
      const item = await storage.createService(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app.put(api.services.update.path, async (req, res) => {
    try {
      const input = api.services.update.input.parse(req.body);
      const item = await storage.updateService(Number(req.params.id), input);
      res.json(item);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app.delete(api.services.delete.path, async (req, res) => {
    await storage.deleteService(Number(req.params.id));
    res.status(204).send();
  });

  // --- Articles ---
  app.get(api.articles.list.path, async (req, res) => {
    const items = await storage.getArticles();
    res.json(items);
  });
  app.get(api.articles.get.path, async (req, res) => {
    const item = await storage.getArticle(Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Article not found' });
    res.json(item);
  });
  app.post(api.articles.create.path, async (req, res) => {
    try {
      const input = api.articles.create.input.parse(req.body);
      const item = await storage.createArticle(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app.put(api.articles.update.path, async (req, res) => {
    try {
      const input = api.articles.update.input.parse(req.body);
      const item = await storage.updateArticle(Number(req.params.id), input);
      res.json(item);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app.delete(api.articles.delete.path, async (req, res) => {
    await storage.deleteArticle(Number(req.params.id));
    res.status(204).send();
  });

  // --- Reviews ---
  app.get(api.reviews.list.path, async (req, res) => {
    const items = await storage.getReviews();
    res.json(items);
  });
  app.post(api.reviews.create.path, async (req, res) => {
    try {
      const input = api.reviews.create.input.parse(req.body);
      const item = await storage.createReview(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app.delete(api.reviews.delete.path, async (req, res) => {
    await storage.deleteReview(Number(req.params.id));
    res.status(204).send();
  });

  // --- Partners ---
  app.get(api.partners.list.path, async (req, res) => {
    const items = await storage.getPartners();
    res.json(items);
  });
  app.post(api.partners.create.path, async (req, res) => {
    try {
      const input = api.partners.create.input.parse(req.body);
      const item = await storage.createPartner(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });
  app.delete(api.partners.delete.path, async (req, res) => {
    await storage.deletePartner(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}