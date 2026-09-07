"use client";

import Link from "next/link";
import { useLocaleStore } from "@/store/useLocaleStore";
import { signalsContent } from "@/lib/content/signals";
import { PressureGauge } from "@/components/ui/kalslo/PressureGauge";

export default function SignalsPage() {
  const { locale } = useLocaleStore();
  const { pageTitle, pageIntro, signals } = signalsContent[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-2xl px-6 py-12 md:px-0">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {pageTitle}
        </h1>
        <p className="mt-4 text-muted-foreground">{pageIntro}</p>

        <div className="mt-10 space-y-6 border-t border-border pt-10">
          {signals.map((signal) => (
            <div
              key={signal.corridorSlug}
              className="rounded-lg border border-border p-6 md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={`/corridors/${signal.corridorSlug}`}
                  className="text-lg font-semibold tracking-tight hover:text-kalslo-mint"
                >
                  {signal.corridorName}
                </Link>
                <span className="font-label text-xs text-muted-foreground">
                  {signal.lastUpdated}
                </span>
              </div>

              <div className="mt-5">
                <PressureGauge level={signal.pressureLevel} label={signal.pressureLabel} />
              </div>

              <p className="mt-5 text-foreground">{signal.summary}</p>

              <div className="mt-6 rounded-md bg-muted p-5">
                <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                  {signal.methodologyLabel}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {signal.methodology}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}