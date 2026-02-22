import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Edit, Plus } from "lucide-react";

import { useProjects, useCreateProject, useDeleteProject } from "@/hooks/use-projects";
import { useServices, useCreateService, useDeleteService } from "@/hooks/use-services";
import { useArticles, useCreateArticle, useDeleteArticle } from "@/hooks/use-articles";
import { useReviews, useCreateReview, useDeleteReview } from "@/hooks/use-reviews";
import { usePartners, useCreatePartner, useDeletePartner } from "@/hooks/use-partners";

// Schemas matching the backend exact requirements
const projectSchema = z.object({ title: z.string().min(1), description: z.string().min(1), image: z.string().url(), category: z.string().min(1) });
const serviceSchema = z.object({ title: z.string().min(1), description: z.string().min(1), image: z.string().url(), icon: z.string().optional() });
const articleSchema = z.object({ title: z.string().min(1), content: z.string().min(1), image: z.string().url() });
const reviewSchema = z.object({ customerName: z.string().min(1), content: z.string().min(1), rating: z.coerce.number().min(1).max(5) });
const partnerSchema = z.object({ name: z.string().min(1), logo: z.string().url() });

export default function Admin() {
  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-display mb-8">لوحة التحكم السريعة</h1>
        
        <Tabs defaultValue="projects" className="w-full bg-white p-6 rounded-2xl shadow-sm border border-border">
          <TabsList className="mb-8 w-full flex flex-wrap h-auto p-1 bg-muted">
            <TabsTrigger value="projects" className="flex-1 text-lg py-3">المشاريع</TabsTrigger>
            <TabsTrigger value="services" className="flex-1 text-lg py-3">الخدمات</TabsTrigger>
            <TabsTrigger value="articles" className="flex-1 text-lg py-3">المقالات</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1 text-lg py-3">الآراء</TabsTrigger>
            <TabsTrigger value="partners" className="flex-1 text-lg py-3">الشركاء</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects"><ProjectsAdmin /></TabsContent>
          <TabsContent value="services"><ServicesAdmin /></TabsContent>
          <TabsContent value="articles"><ArticlesAdmin /></TabsContent>
          <TabsContent value="reviews"><ReviewsAdmin /></TabsContent>
          <TabsContent value="partners"><PartnersAdmin /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProjectsAdmin() {
  const { data: items } = useProjects();
  const create = useCreateProject();
  const del = useDeleteProject();
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof projectSchema>>({ resolver: zodResolver(projectSchema) });

  const onSubmit = (data: z.infer<typeof projectSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); }});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المشاريع</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 ml-2"/> إضافة مشروع</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>إضافة مشروع جديد</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input {...form.register("title")} placeholder="العنوان" />
              <Input {...form.register("category")} placeholder="القسم (مثال: إنشاءات)" />
              <Input {...form.register("image")} placeholder="رابط الصورة (URL)" />
              <Textarea {...form.register("description")} placeholder="الوصف" rows={4} />
              <Button type="submit" disabled={create.isPending} className="w-full">حفظ</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4">
        {items?.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg bg-card">
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
            <Button variant="destructive" size="icon" onClick={() => {if(confirm('متأكد؟')) del.mutate(item.id)}}><Trash2 className="w-4 h-4"/></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesAdmin() {
  const { data: items } = useServices();
  const create = useCreateService();
  const del = useDeleteService();
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof serviceSchema>>({ resolver: zodResolver(serviceSchema) });

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); }});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 ml-2"/> إضافة خدمة</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>إضافة خدمة جديدة</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input {...form.register("title")} placeholder="العنوان" />
              <Input {...form.register("image")} placeholder="رابط الصورة (URL)" />
              <Input {...form.register("icon")} placeholder="الأيقونة (اختياري)" />
              <Textarea {...form.register("description")} placeholder="الوصف" rows={4} />
              <Button type="submit" disabled={create.isPending} className="w-full">حفظ</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {items?.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg bg-card">
            <p className="font-bold">{item.title}</p>
            <Button variant="destructive" size="icon" onClick={() => {if(confirm('متأكد؟')) del.mutate(item.id)}}><Trash2 className="w-4 h-4"/></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticlesAdmin() {
  const { data: items } = useArticles();
  const create = useCreateArticle();
  const del = useDeleteArticle();
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof articleSchema>>({ resolver: zodResolver(articleSchema) });

  const onSubmit = (data: z.infer<typeof articleSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); }});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المقالات</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 ml-2"/> إضافة مقال</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>إضافة مقال جديد</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input {...form.register("title")} placeholder="العنوان" />
              <Input {...form.register("image")} placeholder="رابط الصورة (URL)" />
              <Textarea {...form.register("content")} placeholder="المحتوى" rows={6} />
              <Button type="submit" disabled={create.isPending} className="w-full">حفظ</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {items?.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg bg-card">
            <p className="font-bold">{item.title}</p>
            <Button variant="destructive" size="icon" onClick={() => {if(confirm('متأكد؟')) del.mutate(item.id)}}><Trash2 className="w-4 h-4"/></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsAdmin() {
  const { data: items } = useReviews();
  const create = useCreateReview();
  const del = useDeleteReview();
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof reviewSchema>>({ resolver: zodResolver(reviewSchema), defaultValues: {rating: 5} });

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); }});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة التقييمات</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 ml-2"/> إضافة تقييم</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>إضافة تقييم جديد</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input {...form.register("customerName")} placeholder="اسم العميل" />
              <Input type="number" {...form.register("rating")} placeholder="التقييم (1-5)" min={1} max={5} />
              <Textarea {...form.register("content")} placeholder="الرأي" rows={4} />
              <Button type="submit" disabled={create.isPending} className="w-full">حفظ</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {items?.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg bg-card">
            <div>
              <p className="font-bold">{item.customerName}</p>
              <p className="text-sm">تقييم: {item.rating}/5</p>
            </div>
            <Button variant="destructive" size="icon" onClick={() => {if(confirm('متأكد؟')) del.mutate(item.id)}}><Trash2 className="w-4 h-4"/></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnersAdmin() {
  const { data: items } = usePartners();
  const create = useCreatePartner();
  const del = useDeletePartner();
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof partnerSchema>>({ resolver: zodResolver(partnerSchema) });

  const onSubmit = (data: z.infer<typeof partnerSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); }});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الشركاء</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 ml-2"/> إضافة شريك</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>إضافة شريك جديد</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input {...form.register("name")} placeholder="اسم الشركة" />
              <Input {...form.register("logo")} placeholder="رابط الشعار (URL)" />
              <Button type="submit" disabled={create.isPending} className="w-full">حفظ</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {items?.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-4">
              <img src={item.logo} alt={item.name} className="h-8 object-contain" />
              <p className="font-bold">{item.name}</p>
            </div>
            <Button variant="destructive" size="icon" onClick={() => {if(confirm('متأكد؟')) del.mutate(item.id)}}><Trash2 className="w-4 h-4"/></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
