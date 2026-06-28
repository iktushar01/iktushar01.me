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
  adminDeleteCertificate,
  adminFetchCertificate,
  adminFetchCertificates,
  adminSaveCertificate,
} from "@/lib/api/admin";
import type { Certificate } from "@/types/portfolio";

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([]);

  useEffect(() => {
    adminFetchCertificates()
      .then((res) => setItems(res.data || []))
      .catch(() => toast.error("Failed to load certificates"));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    try {
      await adminDeleteCertificate(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Certificate deleted");
    } catch {
      toast.error("Failed to delete certificate");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Certificates</h2>
        <Button asChild><Link href="/admin/certificates/new">New Certificate</Link></Button>
      </div>

      <div className="border border-border divide-y divide-border">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.issuer}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm"><Link href={`/admin/certificates/${item.id}`}>Edit</Link></Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function emptyCertificate(): Partial<Certificate> {
  return {
    title: "",
    issuer: "",
    date: "",
    description: "",
    image: "",
    skills: [],
    credentialUrl: "",
    isPublished: true,
  };
}

export function CertificateFormPage({ id }: { id?: string }) {
  const [form, setForm] = useState<Partial<Certificate>>(emptyCertificate());
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    adminFetchCertificate(id)
      .then((res) => res.data && setForm(res.data))
      .catch(() => toast.error("Failed to load certificate"))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (key: keyof Certificate, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminSaveCertificate(id || null, form);
      toast.success(id ? "Certificate updated" : "Certificate created");
      window.location.href = "/admin/certificates";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold">{id ? "Edit Certificate" : "New Certificate"}</h2>
      <Input placeholder="Title" value={form.title || ""} onChange={(e) => update("title", e.target.value)} required />
      <Input placeholder="Issuer" value={form.issuer || ""} onChange={(e) => update("issuer", e.target.value)} required />
      <DatePicker label="Date" value={form.date} onChange={(v) => update("date", v)} required />
      <Textarea placeholder="Description" value={form.description || ""} onChange={(e) => update("description", e.target.value)} required rows={4} />
      <Input placeholder="Credential URL" value={form.credentialUrl || ""} onChange={(e) => update("credentialUrl", e.target.value)} />
      <TagInput label="Skills" value={form.skills || []} onChange={(v) => update("skills", v)} />
      <ImageUploader label="Certificate Image" value={form.image || ""} onChange={(v) => update("image", v)} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.isPublished ?? true} onChange={(e) => update("isPublished", e.target.checked)} />
        Published
      </label>
      <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Certificate"}</Button>
    </form>
  );
}
