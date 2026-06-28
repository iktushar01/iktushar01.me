"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/admin/date-picker";
import { ImageUploader } from "@/components/admin/image-uploader";
import { TagInput } from "@/components/admin/tag-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  adminDeleteActivity,
  adminFetchActivities,
  adminFetchActivity,
  adminSaveActivity,
} from "@/lib/api/admin";
import { ACTIVITY_TYPE_LABELS, type Activity, type ActivityType } from "@/types/portfolio";

export default function AdminActivitiesPage() {
  const [items, setItems] = useState<Activity[]>([]);

  useEffect(() => {
    adminFetchActivities()
      .then((res) => setItems(res.data || []))
      .catch(() => toast.error("Failed to load activities"));
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this activity?")) return;
    try {
      await adminDeleteActivity(slug);
      setItems((prev) => prev.filter((item) => item.slug !== slug));
      toast.success("Activity deleted");
    } catch {
      toast.error("Failed to delete activity");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Activities</h2>
        <Button asChild><Link href="/admin/activities/new">New Activity</Link></Button>
      </div>

      <div className="border border-border divide-y divide-border">
        {items.map((item) => (
          <div key={item.slug} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{ACTIVITY_TYPE_LABELS[item.type]} · {item.date}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm"><Link href={`/admin/activities/${item.slug}`}>Edit</Link></Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(item.slug)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function emptyActivity(): Partial<Activity> {
  return {
    slug: "",
    title: "",
    type: "hackathon",
    organizer: "",
    date: "",
    shortDescription: "",
    fullDescription: "",
    coverImage: "",
    gallery: [],
    techStack: [],
    teamMembers: [],
    outcomes: [],
    certificateImages: [],
    awards: [],
    isPublished: true,
  };
}

export function ActivityFormPage({ slug }: { slug?: string }) {
  const [form, setForm] = useState<Partial<Activity>>(emptyActivity());
  const [loading, setLoading] = useState(Boolean(slug));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug) return;
    adminFetchActivity(slug)
      .then((res) => res.data && setForm(res.data))
      .catch(() => toast.error("Failed to load activity"))
      .finally(() => setLoading(false));
  }, [slug]);

  const update = (key: keyof Activity, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminSaveActivity(slug || null, form);
      toast.success(slug ? "Activity updated" : "Activity created");
      window.location.href = "/admin/activities";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold">{slug ? "Edit Activity" : "New Activity"}</h2>

      <Input placeholder="Title" value={form.title || ""} onChange={(e) => update("title", e.target.value)} required />
      <Input placeholder="Slug (optional)" value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} />
      <select
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        value={form.type || "hackathon"}
        onChange={(e) => update("type", e.target.value as ActivityType)}
      >
        {Object.entries(ACTIVITY_TYPE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <Input placeholder="Organizer" value={form.organizer || ""} onChange={(e) => update("organizer", e.target.value)} required />
      <DatePicker label="Date" value={form.date} onChange={(v) => update("date", v)} required />
      <Input placeholder="Location" value={form.location || ""} onChange={(e) => update("location", e.target.value)} />
      <Input placeholder="Achievement" value={form.achievement || ""} onChange={(e) => update("achievement", e.target.value)} />
      <Textarea placeholder="Short description" value={form.shortDescription || ""} onChange={(e) => update("shortDescription", e.target.value)} required rows={3} />
      <Textarea placeholder="Full description" value={form.fullDescription || ""} onChange={(e) => update("fullDescription", e.target.value)} required rows={5} />

      <TagInput label="Tech stack" value={form.techStack || []} onChange={(v) => update("techStack", v)} />
      <TagInput label="Team members" value={form.teamMembers || []} onChange={(v) => update("teamMembers", v)} />
      <TagInput label="Outcomes" value={form.outcomes || []} onChange={(v) => update("outcomes", v)} />
      <TagInput label="Awards" value={form.awards || []} onChange={(v) => update("awards", v)} />

      <Input placeholder="GitHub link" value={form.githubLink || ""} onChange={(e) => update("githubLink", e.target.value)} />
      <Input placeholder="Demo link" value={form.demoLink || ""} onChange={(e) => update("demoLink", e.target.value)} />
      <Input placeholder="Event website" value={form.eventWebsite || ""} onChange={(e) => update("eventWebsite", e.target.value)} />

      <ImageUploader label="Cover image" value={form.coverImage || ""} onChange={(v) => update("coverImage", v)} />
      <ImageUploader label="Gallery" value={form.gallery || []} onChange={(v) => update("gallery", v)} multiple />
      <ImageUploader label="Certificate images" value={form.certificateImages || []} onChange={(v) => update("certificateImages", v)} multiple />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.isPublished ?? true} onChange={(e) => update("isPublished", e.target.checked)} />
        Published
      </label>

      <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Activity"}</Button>
    </form>
  );
}
