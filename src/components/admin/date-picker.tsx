"use client";

import { useMemo, useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, toISODate } from "@/lib/utils";

/** Human-readable date stored in the portfolio API, e.g. "March 15, 2025". */
export function formatPortfolioDate(value?: string | Date | null): string {
  if (!value) return "";

  if (value instanceof Date) {
    return isValid(value) ? format(value, "MMMM d, yyyy") : "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const parsed = parseISO(value);
    return isValid(parsed) ? format(parsed, "MMMM d, yyyy") : "";
  }

  const parsed = new Date(value);
  return isValid(parsed) ? format(parsed, "MMMM d, yyyy") : value;
}

export function DatePicker({
  label,
  value,
  onChange,
  required,
  placeholder = "Pick a date",
}: {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const selectedDate = useMemo(() => {
    const iso = toISODate(value);
    if (!iso) return undefined;
    const parsed = parseISO(iso);
    return isValid(parsed) ? parsed : undefined;
  }, [value]);

  const displayValue = value ? formatPortfolioDate(value) || value : "";

  return (
    <div className="space-y-2">
      {label ? <label className="text-sm font-medium">{label}</label> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "h-9 w-full justify-start px-3 text-left font-normal",
              !displayValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4 shrink-0" />
            {displayValue || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;
              onChange(formatPortfolioDate(date));
              setOpen(false);
            }}
            defaultMonth={selectedDate ?? new Date()}
          />
        </PopoverContent>
      </Popover>
      {required ? (
        <input
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          value={displayValue}
          required
          readOnly
          onChange={() => {}}
        />
      ) : null}
    </div>
  );
}
