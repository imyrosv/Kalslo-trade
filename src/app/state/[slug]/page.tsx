"use client";

import { use } from "react";
import Link from "next/link";
import { useLocaleStore } from "@/store/useLocaleStore";
import { eventsContent, type TradeEvent } from "@/lib/content/events";
import { StatusPill } from "@/components/ui/kalslo/StatusPill";

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { locale } = useLocaleStore();
  const event: TradeEvent | undefined = eventsContent[locale][slug];

  if (!event) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-muted-foreground">Event not found.</p>
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
          ← {event.backLink}
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusPill status={event.status} />
          <span className="font-label text-xs text-muted-foreground">
            {event.type}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {event.title}
        </h1>

        <p className="mt-3 font-label text-xs text-muted-foreground">
          Last updated: {event.lastUpdated} · {event.sourceStatus}
        </p>

        <div className="mt-10 space-y-8 border-t border-border pt-10">
          <section>
            <p className="font-label text-xs text-muted-foreground">
              {event.whatHappenedLabel}
            </p>
            <p className="mt-2 text-foreground">{event.whatHappened}</p>
          </section>

          <section>
            <p className="font-label text-xs text-muted-foreground">
              {event.whatChangedLabel}
            </p>
            <p className="mt-2 text-foreground">{event.whatChanged}</p>
          </section>

          <section>
            <p className="font-label text-xs text-muted-foreground">
              {event.obligationsLabel}
            </p>
            <ul className="mt-3 space-y-2">
              {event.obligations.map((item: string) => (
                <li key={item} className="flex items-start gap-2 text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kalslo-mint" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border border-border p-6">
            <p className="font-label text-xs text-muted-foreground">
              {event.whatsNextLabel}
            </p>
            <p className="mt-2 text-foreground">{event.whatsNext}</p>
          </section>

          <section>
            <p className="font-label text-xs text-muted-foreground">
              {event.sourcesLabel}
            </p>
            <ul className="mt-2 space-y-1">
              {event.sources.map((source) => (
                <li key={source.label} className="text-sm text-muted-foreground">
                  {source.label} — {source.date}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}