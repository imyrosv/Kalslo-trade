"use client";

import { use } from "react";
import Link from "next/link";
import { useLocaleStore } from "@/store/useLocaleStore";
import { corridorsContent, type Corridor } from "@/lib/content/corridors";
import { StatusPill } from "@/components/ui/kalslo/StatusPill";

export default function CorridorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { locale } = useLocaleStore();
  const corridor: Corridor | undefined = corridorsContent[locale][slug];

  if (!corridor) {
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
          ← {corridor.backLink}
        </Link>

        <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {corridor.name}
        </h1>

        <div className="mt-10 space-y-8 border-t border-border pt-10">
          <section>
            <p className="font-label text-xs text-muted-foreground">
              {corridor.descriptionLabel}
            </p>
            <p className="mt-2 text-foreground">{corridor.description}</p>
          </section>

          <section>
            <p className="font-label text-xs text-muted-foreground">
              {corridor.participantsLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {corridor.participants.map((p: string) => (
                <span
                  key={p}
                  className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
          </section>

          <section>
            <p className="font-label text-xs text-muted-foreground">
              {corridor.activeEventsLabel}
            </p>
            <div className="mt-3 space-y-3">
              {corridor.activeEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/state/${event.slug}`}
                  className="flex items-center justify-between rounded-md border border-border p-4 transition-colors hover:border-kalslo-mint"
                >
                  <span className="text-foreground">{event.title}</span>
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