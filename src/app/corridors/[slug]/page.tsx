"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useLocaleStore } from "@/store/useLocaleStore";
import { fetchCorridorBySlug, fetchEvents } from "@/lib/queries";
import { StatusPill } from "@/components/ui/kalslo/StatusPill";

export default function CorridorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { locale } = useLocaleStore();

  const { data: corridor, isLoading, error } = useQuery({
    queryKey: ["corridor", slug],
    queryFn: () => fetchCorridorBySlug(slug),
  });

  const { data: allEvents } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const activeEvents = allEvents?.filter((e) => e.corridors?.slug === slug) ?? [];

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center text-muted-foreground">
        Loading...
      </main>
    );
  }

  if (error || !corridor) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-muted-foreground">Corridor not found.</p>
        <Link href="/" className="mt-4 inline-block underline">
          ← Back home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-2xl px-6 py-12 md:px-0">
        <Link
          href="/"
          className="font-label text-xs text-muted-foreground hover:text-foreground"
        >
          ← {locale === "en" ? "Back to Kalslo State" : "Retour à Kalslo State"}
        </Link>

        <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {locale === "en" ? corridor.name_en : corridor.name_fr}
        </h1>

        <div className="mt-10 space-y-8 border-t border-border pt-10">
          <section>
            <p className="font-label text-xs text-muted-foreground">
              {locale === "en" ? "About this corridor" : "À propos de ce corridor"}
            </p>
            <p className="mt-2 text-foreground">
              {locale === "en" ? corridor.description_en : corridor.description_fr}
            </p>
          </section>

          <section>
            <p className="font-label text-xs text-muted-foreground">
              {locale === "en" ? "Typical participants" : "Participants typiques"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(locale === "en" ? corridor.participants_en : corridor.participants_fr).map(
                (p: string) => (
                  <span
                    key={p}
                    className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
                  >
                    {p}
                  </span>
                )
              )}
            </div>
          </section>

          <section>
            <p className="font-label text-xs text-muted-foreground">
              {locale === "en" ? "Active events on this corridor" : "Événements actifs sur ce corridor"}
            </p>
            <div className="mt-3 space-y-3">
              {activeEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/state/${event.slug}`}
                  className="flex items-center justify-between rounded-md border border-border p-4 transition-colors hover:border-kalslo-mint"
                >
                  <span className="text-foreground">
                    {locale === "en" ? event.title_en : event.title_fr}
                  </span>
                  <StatusPill status={event.status} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}