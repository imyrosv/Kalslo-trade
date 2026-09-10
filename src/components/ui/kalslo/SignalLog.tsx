"use client";

import Link from "next/link";
import { eventsContent } from "@/lib/content/events";
import { signalsContent } from "@/lib/content/signals";
import { homeContent } from "@/lib/content/home";
import { TrustBadge } from "./TrustBadge";

type Props = {
  locale: "en" | "fr";
};

export function SignalLog({ locale }: Props) {
  const t = homeContent[locale].signalLog;
  const events = Object.entries(eventsContent[locale]);
  const signals = signalsContent[locale].signals;

  const entries = [
    ...events.map(([slug, event]) => ({
      key: `event-${slug}`,
      href: `/state/${slug}`,
      dotClass:
        event.status === "elevated"
          ? "bg-status-blocked"
          : event.status === "resolved"
          ? "bg-kalslo-mint"
          : "bg-status-active",
      title: event.title,
      subtitle: event.lastUpdated,
    })),
    ...signals.map((signal) => ({
      key: `signal-${signal.corridorSlug}`,
      href: "/signals",
      dotClass:
        signal.pressureLevel === "severe" || signal.pressureLevel === "elevated"
          ? "bg-status-risk"
          : "bg-kalslo-mint",
      title: `${signal.corridorName} — ${signal.pressureLabel}`,
      subtitle: signal.lastUpdated,
    })),
  ];

  return (
    <div className="rounded-md border border-border p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
          {t.title}
        </p>
        <TrustBadge variant="verified_event" locale={locale} />
      </div>

      <div className="mt-3 space-y-3">
        {entries.map((entry) => (
          <Link
            key={entry.key}
            href={entry.href}
            className="flex items-start gap-2.5 text-sm hover:text-kalslo-mint"
          >
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${entry.dotClass}`}
            />
            <span>
              <span className="block text-foreground">{entry.title}</span>
              <span className="block text-xs text-muted-foreground">
                {entry.subtitle}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/signals"
        className="mt-4 inline-block font-label text-xs font-semibold uppercase tracking-widest text-kalslo-mint hover:opacity-80"
      >
        {t.viewAll}
      </Link>
    </div>
  );
}