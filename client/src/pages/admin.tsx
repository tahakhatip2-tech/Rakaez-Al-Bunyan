import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus, LayoutGrid, Construction, FileText, MessageSquare, Users } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";

import { useProjects, useCreateProject, useDeleteProject } from "@/hooks/use-projects";
import { useServices, useCreateService, useDeleteService } from "@/hooks/use-services";
import { useArticles, useCreateArticle, useDeleteArticle } from "@/hooks/use-articles";
import { useReviews, useCreateReview, useDeleteReview } from "@/hooks/use-reviews";
import { usePartners, useCreatePartner, useDeletePartner } from "@/hooks/use-partners";

const projectSchema = z.object({ title: z.string().min(1), description: z.string().min(1), image: z.string().min(1, "الصورة مطلوبة"), category: z.string().min(1) });
const serviceSchema = z.object({ title: z.string().min(1), description: z.string().min(1), image: z.string().min(1, "الصورة مطلوبة"), icon: z.string().optional() });
const articleSchema = z.object({ title: z.string().min(1), content: z.string().min(1), image: z.string().min(1, "الصورة مطلوبة") });
const reviewSchema = z.object({ customerName: z.string().min(1), content: z.string().min(1), rating: z.coerce.number().min(1).max(5) });
const partnerSchema = z.object({ name: z.string().min(1), logo: z.string().min(1, "الشعار مطلوب") });

export default function Admin() {
  return (
    <div className="py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold font-display text-slate-900 mb-2">إدارة محتوى الموقع</h2>
          <p className="text-muted-foreground">تحكم في جميع أقسام الموقع من مكان واحد بكل سهولة</p>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-8 w-full flex flex-wrap h-auto p-1 bg-white border shadow-sm rounded-xl overflow-hidden">
            <TabsTrigger value="projects" className="flex-1 text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Construction className="w-4 h-4 ml-2" />
              المشاريع
            </TabsTrigger>
            <TabsTrigger value="services" className="flex-1 text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
              <LayoutGrid className="w-4 h-4 ml-2" />
              الخدمات
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex-1 text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
              <FileText className="w-4 h-4 ml-2" />
              المقالات
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1 text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 ml-2" />
              الآراء
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex-1 text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="w-4 h-4 ml-2" />
              الشركاء
            </TabsTrigger>
          </TabsList>

          <div className="grid gap-8">
            <TabsContent value="projects" className="mt-0 focus-visible:outline-none"><ProjectsAdmin /></TabsContent>
            <TabsContent value="services" className="mt-0 focus-visible:outline-none"><ServicesAdmin /></TabsContent>
            <TabsContent value="articles" className="mt-0 focus-visible:outline-none"><ArticlesAdmin /></TabsContent>
            <TabsContent value="reviews" className="mt-0 focus-visible:outline-none"><ReviewsAdmin /></TabsContent>
            <TabsContent value="partners" className="mt-0 focus-visible:outline-none"><PartnersAdmin /></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

function AdminSectionHeader({ title, icon: Icon, onAdd }: { title: string, icon: any, onAdd: () => void }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <Button onClick={onAdd} className="rounded-xl shadow-md shadow-primary/20 bg-primary hover:bg-primary/90">
        <Plus className="w-4 h-4 ml-2" />
        إضافة جديد
      </Button>
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
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); } });
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="bg-white border-b pb-4">
        <AdminSectionHeader title="إدارة المشاريع" icon={Construction} onAdd={() => setOpen(true)} />
      </CardHeader>
      <CardContent className="p-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg" dir="rtl">
            <DialogHeader><DialogTitle className="text-2xl font-bold text-center">إضافة مشروع جديد</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان المشروع</label>
                <Input {...form.register("title")} placeholder="مثال: فيلا سكنية" className="h-11" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">القسم</label>
                <Input {...form.register("category")} placeholder="مثال: سكني / تجاري" className="h-11" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">صورة المشروع</label>
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <ImageUpload value={field.value || ""} onChange={field.onChange} />
                  )}
                />
                {form.formState.errors.image && <p className="text-sm text-destructive">{form.formState.errors.image.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الوصف</label>
                <Textarea {...form.register("description")} placeholder="اكتب تفاصيل المشروع..." rows={4} className="resize-none" />
              </div>
              <Button type="submit" disabled={create.isPending} className="w-full h-11 text-lg font-bold rounded-xl mt-4">حفظ المشروع</Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map(item => (
            <div key={item.id} className="group relative bg-white border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <p className="font-bold text-lg mb-1">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => { if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) del.mutate(item.id) }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ServicesAdmin() {
  const { data: items } = useServices();
  const create = useCreateService();
  const del = useDeleteService();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof serviceSchema>>({ resolver: zodResolver(serviceSchema) });

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); } });
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="bg-white border-b pb-4">
        <AdminSectionHeader title="إدارة الخدمات" icon={LayoutGrid} onAdd={() => setOpen(true)} />
      </CardHeader>
      <CardContent className="p-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg" dir="rtl">
            <DialogHeader><DialogTitle className="text-2xl font-bold text-center">إضافة خدمة جديدة</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <Input {...form.register("title")} placeholder="عنوان الخدمة" className="h-11" />
              <Input {...form.register("icon")} placeholder="اسم الأيقونة (اختياري)" className="h-11" />
              <div className="space-y-2">
                <label className="text-sm font-medium">صورة الخدمة</label>
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <ImageUpload value={field.value || ""} onChange={field.onChange} />
                  )}
                />
                {form.formState.errors.image && <p className="text-sm text-destructive">{form.formState.errors.image.message}</p>}
              </div>
              <Textarea {...form.register("description")} placeholder="وصف الخدمة..." rows={4} className="resize-none" />
              <Button type="submit" disabled={create.isPending} className="w-full h-11 text-lg font-bold rounded-xl mt-4">حفظ الخدمة</Button>
            </form>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map(item => (
            <div key={item.id} className="group flex justify-between items-center p-4 border rounded-xl bg-white hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="font-bold">{item.title}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => { if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) del.mutate(item.id) }}><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ArticlesAdmin() {
  const { data: items } = useArticles();
  const create = useCreateArticle();
  const del = useDeleteArticle();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof articleSchema>>({ resolver: zodResolver(articleSchema) });

  const onSubmit = (data: z.infer<typeof articleSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); } });
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="bg-white border-b pb-4">
        <AdminSectionHeader title="إدارة المقالات" icon={FileText} onAdd={() => setOpen(true)} />
      </CardHeader>
      <CardContent className="p-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg" dir="rtl">
            <DialogHeader><DialogTitle className="text-2xl font-bold text-center">إضافة مقال جديد</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <Input {...form.register("title")} placeholder="عنوان المقال" className="h-11" />
              <div className="space-y-2">
                <label className="text-sm font-medium">صورة المقال</label>
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <ImageUpload value={field.value || ""} onChange={field.onChange} />
                  )}
                />
                {form.formState.errors.image && <p className="text-sm text-destructive">{form.formState.errors.image.message}</p>}
              </div>
              <Textarea {...form.register("content")} placeholder="محتوى المقال..." rows={6} className="resize-none" />
              <Button type="submit" disabled={create.isPending} className="w-full h-11 text-lg font-bold rounded-xl mt-4">نشر المقال</Button>
            </form>
          </DialogContent>
        </Dialog>
        <div className="grid gap-4">
          {items?.map(item => (
            <div key={item.id} className="group flex justify-between items-center p-5 border rounded-xl bg-white hover:border-primary/30 transition-colors">
              <p className="font-bold text-lg">{item.title}</p>
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => { if (confirm('متأكد؟')) del.mutate(item.id) }}><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewsAdmin() {
  const { data: items } = useReviews();
  const create = useCreateReview();
  const del = useDeleteReview();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof reviewSchema>>({ resolver: zodResolver(reviewSchema), defaultValues: { rating: 5 } });

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); } });
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="bg-white border-b pb-4">
        <AdminSectionHeader title="إدارة التقييمات" icon={MessageSquare} onAdd={() => setOpen(true)} />
      </CardHeader>
      <CardContent className="p-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg" dir="rtl">
            <DialogHeader><DialogTitle className="text-2xl font-bold text-center">إضافة تقييم جديد</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <Input {...form.register("customerName")} placeholder="اسم العميل" className="h-11" />
              <Input type="number" {...form.register("rating")} placeholder="التقييم (1-5)" min={1} max={5} className="h-11" />
              <Textarea {...form.register("content")} placeholder="محتوى التقييم..." rows={4} className="resize-none" />
              <Button type="submit" disabled={create.isPending} className="w-full h-11 text-lg font-bold rounded-xl mt-4">حفظ التقييم</Button>
            </form>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items?.map(item => (
            <div key={item.id} className="p-5 border rounded-xl bg-white flex justify-between items-start">
              <div>
                <p className="font-bold mb-1">{item.customerName}</p>
                <div className="flex gap-1 mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">"{item.content}"</p>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => { if (confirm('متأكد؟')) del.mutate(item.id) }}><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PartnersAdmin() {
  const { data: items } = usePartners();
  const create = useCreatePartner();
  const del = useDeletePartner();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof partnerSchema>>({ resolver: zodResolver(partnerSchema) });

  const onSubmit = (data: z.infer<typeof partnerSchema>) => {
    create.mutate(data, { onSuccess: () => { setOpen(false); form.reset(); } });
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="bg-white border-b pb-4">
        <AdminSectionHeader title="إدارة الشركاء" icon={Users} onAdd={() => setOpen(true)} />
      </CardHeader>
      <CardContent className="p-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg" dir="rtl">
            <DialogHeader><DialogTitle className="text-2xl font-bold text-center">إضافة شريك جديد</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <Input {...form.register("name")} placeholder="اسم الشركة الشريكة" className="h-11" />
              <div className="space-y-2">
                <label className="text-sm font-medium">شعار الشركة</label>
                <Controller
                  name="logo"
                  control={form.control}
                  render={({ field }) => (
                    <ImageUpload value={field.value || ""} onChange={field.onChange} />
                  )}
                />
                {form.formState.errors.logo && <p className="text-sm text-destructive">{form.formState.errors.logo.message}</p>}
              </div>
              <Button type="submit" disabled={create.isPending} className="w-full h-11 text-lg font-bold rounded-xl mt-4">حفظ الشريك</Button>
            </form>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items?.map(item => (
            <div key={item.id} className="group relative p-6 border rounded-2xl bg-white flex flex-col items-center justify-center hover:border-primary/30 transition-all">
              <img src={item.logo} alt={item.name} className="h-16 object-contain mb-4" />
              <p className="font-bold text-center">{item.name}</p>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => { if (confirm('متأكد؟')) del.mutate(item.id) }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}