"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TagInput({
  label,
  value,
  onChange,
  placeholder = "Add item and press Enter",
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput("");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <Button type="button" variant="outline" onClick={addTag}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <button
            key={tag}
            type="button"
            className="text-xs border border-border px-2 py-1 hover:bg-muted"
            onClick={() => onChange(value.filter((item) => item !== tag))}
          >
            {tag} ×
          </button>
        ))}
      </div>
    </div>
  );
}
