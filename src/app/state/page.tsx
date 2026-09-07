"use client";

import Link from "next/link";
import { useLocaleStore } from "@/store/useLocaleStore";
import { eventsContent } from "@/lib/content/events";
import { StatusPill } from "@/components/ui/kalslo/StatusPill";

export default function StateFeedPage() {
  const { locale } = useLocaleStore();
  const events = eventsContent[locale];
  const eventList = Object.entries(events);

  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="mx-auto max-w-2xl px-6 py-12 md:px-0">
        <p className="font-label text-xs text-muted-foreground">
          {locale === "en" ? "Kalslo State" : "Kalslo State"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          {locale === "en"
            ? "What is moving, what is blocked"
            : "Ce qui bouge, ce qui bloque"}
        </h1>

        <div className="mt-10 space-y-4 border-t border-border pt-10">
          {eventList.map(([slug, event]) => (
            <Link
              key={slug}
              href={`/state/${slug}`}
              className="block rounded-md border border-border p-6 transition-colors hover:border-kalslo-mint"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-label text-xs text-muted-foreground">
                    {event.type}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight">
                    {event.title}
                  </h2>
                </div>
                <StatusPill status={event.status} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}