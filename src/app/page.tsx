"use client";

import Link from "next/link";
import { Ship, TriangleAlert, ArrowRight } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { homeContent } from "@/lib/content/home";
import { TrustBadge } from "@/components/ui/kalslo/TrustBadge";

export default function Home() {
  const { locale } = useLocaleStore();
  const t = homeContent[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="bg-kalslo-deep px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-2 font-label text-xs text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kalslo-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-kalslo-mint" />
            </span>
            {t.statusLine}
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl">
            {t.heroTitle}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            {t.heroSubtitle}
          </p>

          <Link
            href="/state"
            className="mt-10 inline-flex items-center rounded-md bg-kalslo-mint px-6 py-3.5 text-sm font-semibold text-kalslo-deep shadow-lg shadow-black/10 transition-transform hover:scale-[1.02]"
          >
            {t.heroCta}
          </Link>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 font-label text-xs uppercase tracking-widest text-muted-foreground">
            {t.whatChangedLabel}
          </p>

          <div className="rounded-lg border border-border p-6 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-kalslo-deep/5">
                <Ship className="h-5 w-5 text-kalslo-deep" strokeWidth={1.75} />
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <TrustBadge variant="verified_event" locale={locale} />
                <TrustBadge variant="kalslo_analysis" locale={locale} />
              </div>
            </div>

            <h2 className="mt-6 text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
              {t.event.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{t.event.description}</p>

            <div className="mt-8 flex items-start gap-3 rounded-md bg-status-risk/5 p-5">
              <TriangleAlert
                className="mt-0.5 h-4 w-4 shrink-0 text-status-risk"
                strokeWidth={1.75}
              />
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-status-risk">
                  {t.event.impactLabel}
                </p>
                <p className="mt-1.5 text-foreground">{t.event.impact}</p>
              </div>
            </div>

            <Link
              href="/state/strait-of-hormuz"
              className="mt-8 inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-kalslo-deep hover:bg-kalslo-deep/5"
            >
              {t.event.cta}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}