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
  adminDeleteProject,
  adminFetchProject,
  adminFetchProjects,
  adminSaveProject,
} from "@/lib/api/admin";
import type { Project } from "@/types/portfolio";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    adminFetchProjects()
      .then((res) => setProjects(res.data || []))
      .catch(() => toast.error("Failed to load projects"));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;

    try {
      await adminDeleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Manage</p>
          <h2 className="text-2xl font-semibold">Projects</h2>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">New Project</Link>
        </Button>
      </div>

      <div className="border border-border divide-y divide-border">
        {projects.map((project) => (
          <div key={project.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-xs text-muted-foreground">{project.tag}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/projects/${project.id}`}>Edit</Link>
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function emptyProject(): Partial<Project> {
  return {
    title: "",
    tag: "",
    description: "",
    images: [],
    technologies: [],
    liveLink: "",
    frontendLink: "",
    backendLink: "",
    demoVideoLink: "",
    challenges: [],
    improvements: [],
    isPublished: true,
  };
}

export function ProjectFormPage({ id }: { id?: string }) {
  const [form, setForm] = useState<Partial<Project>>(emptyProject());
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    adminFetchProject(id)
      .then((res) => {
        if (res.data) setForm(res.data);
      })
      .catch(() => toast.error("Failed to load project"))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (key: keyof Project, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await adminSaveProject(id || null, form);
      toast.success(id ? "Project updated" : "Project created");
      window.location.href = "/admin/projects";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold">{id ? "Edit Project" : "New Project"}</h2>

      <Input placeholder="Title" value={form.title || ""} onChange={(e) => update("title", e.target.value)} required />
      <Input placeholder="Tag" value={form.tag || ""} onChange={(e) => update("tag", e.target.value)} required />
      <Textarea placeholder="Description" value={form.description || ""} onChange={(e) => update("description", e.target.value)} required rows={4} />
      <Input placeholder="Live link" value={form.liveLink || ""} onChange={(e) => update("liveLink", e.target.value)} />
      <Input placeholder="Frontend repo" value={form.frontendLink || ""} onChange={(e) => update("frontendLink", e.target.value)} />
      <Input placeholder="Backend repo" value={form.backendLink || ""} onChange={(e) => update("backendLink", e.target.value)} />
      <Input placeholder="Demo video URL (YouTube, Loom, etc.)" value={form.demoVideoLink || ""} onChange={(e) => update("demoVideoLink", e.target.value)} />

      <TagInput label="Technologies" value={form.technologies || []} onChange={(v) => update("technologies", v)} />
      <TagInput label="Challenges" value={form.challenges || []} onChange={(v) => update("challenges", v)} />
      <TagInput label="Improvements" value={form.improvements || []} onChange={(v) => update("improvements", v)} />
      <ImageUploader label="Images" value={form.images || []} onChange={(v) => update("images", v)} multiple />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.isPublished ?? true} onChange={(e) => update("isPublished", e.target.checked)} />
        Published
      </label>

      <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Project"}</Button>
    </form>
  );
}
