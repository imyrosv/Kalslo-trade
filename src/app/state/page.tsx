"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useLocaleStore } from "@/store/useLocaleStore";
import { fetchEvents } from "@/lib/queries";
import type { EventCategory } from "@/lib/content/events";
import { emptyCategoryMessage } from "@/lib/content/categories";
import { StatusPill } from "@/components/ui/kalslo/StatusPill";
import { CategoryFilter } from "@/components/ui/kalslo/CategoryFilter";
import { CategoryIcon } from "@/components/ui/kalslo/CategoryIcon";

export default function StateFeedPage() {
  const { locale } = useLocaleStore();
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">("all");

  const { data: events, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const filteredEvents =
    events?.filter(
      (event) => activeCategory === "all" || event.category === activeCategory
    ) ?? [];

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center text-muted-foreground">
        Loading...
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center text-destructive">
        Error loading events: {(error as Error).message}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-2xl px-6 py-12 md:px-0">
        <p className="font-label text-xs text-muted-foreground">Kalslo State</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          {locale === "en"
            ? "What is moving, what is blocked"
            : "Ce qui bouge, ce qui bloque"}
        </h1>

        <div className="mt-8">
          <CategoryFilter
            locale={locale}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="mt-8 space-y-4">
          {filteredEvents.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              {emptyCategoryMessage[locale]}
            </p>
          )}

          {filteredEvents.map((event) => (
            <Link
              key={event.slug}
              href={`/state/${event.slug}`}
              className="group block rounded-md border border-border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-kalslo-mint hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <CategoryIcon
                    category={event.category as EventCategory}
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                  />
                  <div>
                    <p className="font-label text-xs text-muted-foreground">
                      {locale === "en" ? event.type_en : event.type_fr}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight">
                      {locale === "en" ? event.title_en : event.title_fr}
                    </h2>
                  </div>
                </div>
                <StatusPill status={event.status} />
              </div>

              <p className="mt-3 flex items-center gap-1 font-label text-xs font-semibold uppercase tracking-widest text-kalslo-mint opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {locale === "en" ? "View state" : "Voir l'état"} →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}