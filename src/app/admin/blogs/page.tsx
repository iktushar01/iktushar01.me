"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";
import { TagInput } from "@/components/admin/tag-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  adminDeleteBlog,
  adminFetchBlog,
  adminFetchBlogs,
  adminSaveBlog,
} from "@/lib/api/admin";
import type { BlogPost } from "@/types/portfolio";

export default function AdminBlogsPage() {
  const [items, setItems] = useState<BlogPost[]>([]);

  useEffect(() => {
    adminFetchBlogs()
      .then((res) => setItems(res.data || []))
      .catch(() => toast.error("Failed to load blogs"));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await adminDeleteBlog(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Blog deleted");
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <Button asChild><Link href="/admin/blogs/new">New Blog</Link></Button>
      </div>

      <div className="border border-border divide-y divide-border">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.status || "PUBLISHED"} · {item.category}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm"><Link href={`/admin/blogs/${item.id}`}>Edit</Link></Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function emptyBlog(): Partial<BlogPost> {
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    tags: [],
    author: "Tushar Islam",
    featured: false,
    status: "DRAFT",
    readingTime: 5,
  };
}

export function BlogFormPage({ id }: { id?: string }) {
  const [form, setForm] = useState<Partial<BlogPost>>(emptyBlog());
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    adminFetchBlog(id)
      .then((res) => res.data && setForm(res.data))
      .catch(() => toast.error("Failed to load blog"))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (key: keyof BlogPost, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminSaveBlog(id || null, form);
      toast.success(id ? "Blog updated" : "Blog created");
      window.location.href = "/admin/blogs";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold">{id ? "Edit Blog" : "New Blog"}</h2>

      <Input placeholder="Title" value={form.title || ""} onChange={(e) => update("title", e.target.value)} required />
      <Input placeholder="Slug (optional)" value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} />
      <Input placeholder="Category" value={form.category || ""} onChange={(e) => update("category", e.target.value)} required />
      <Input placeholder="Author" value={form.author || ""} onChange={(e) => update("author", e.target.value)} required />
      <Textarea placeholder="Excerpt" value={form.excerpt || ""} onChange={(e) => update("excerpt", e.target.value)} required rows={3} />
      <Textarea placeholder="Markdown content" value={form.content || ""} onChange={(e) => update("content", e.target.value)} required rows={16} />

      <TagInput label="Tags" value={form.tags || []} onChange={(v) => update("tags", v)} />
      <ImageUploader label="Cover image" value={form.coverImage || ""} onChange={(v) => update("coverImage", v)} />

      <select
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        value={form.status || "DRAFT"}
        onChange={(e) => update("status", e.target.value)}
      >
        <option value="DRAFT">Draft</option>
        <option value="PUBLISHED">Published</option>
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.featured ?? false} onChange={(e) => update("featured", e.target.checked)} />
        Featured post
      </label>

      <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Blog"}</Button>
    </form>
  );
}
