"use client";

import type { EventCategory } from "@/lib/content/events";
import { categoryLabels, categoryOrder } from "@/lib/content/categories";

export function CategoryFilter({
  locale,
  active,
  onChange,
}: {
  locale: "en" | "fr";
  active: EventCategory | "all";
  onChange: (category: EventCategory | "all") => void;
}) {
  const labels = categoryLabels[locale];

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border">
      {categoryOrder.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`relative pb-3 font-label text-xs uppercase tracking-widest transition-colors ${
            active === cat
              ? "text-kalslo-deep font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {labels[cat]}
          {active === cat && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-kalslo-mint" />
          )}
        </button>
      ))}
    </div>
  );
}