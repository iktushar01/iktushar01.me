"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUpload } from "@/lib/api/client";

export function ImageUploader({
  label,
  value,
  onChange,
  multiple = false,
}: {
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const values = Array.isArray(value) ? value : value ? [value] : [];

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    setUploading(true);
    try {
      const urls: string[] = [];

      for (const file of Array.from(files)) {
        const url = await apiUpload(file);
        urls.push(url);
      }

      if (multiple) {
        onChange([...values, ...urls]);
      } else {
        onChange(urls[0]);
      }

      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Input
        type="file"
        accept="image/*"
        multiple={multiple}
        disabled={uploading}
        onChange={(e) => handleUpload(e.target.files)}
      />
      <div className="space-y-2">
        {values.map((url) => (
          <div key={url} className="flex items-center gap-2 text-xs border border-border p-2">
            <span className="truncate flex-1">{url}</span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                if (multiple) {
                  onChange(values.filter((item) => item !== url));
                } else {
                  onChange("");
                }
              }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
