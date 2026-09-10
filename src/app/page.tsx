"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { homeContent } from "@/lib/content/home";
import { eventsContent, type EventCategory } from "@/lib/content/events";
import { corridorsContent } from "@/lib/content/corridors";
import { tradeStatesContent } from "@/lib/content/trade-states";
import { emptyCategoryMessage } from "@/lib/content/categories";
import { CategoryFilter } from "@/components/ui/kalslo/CategoryFilter";
import { EventCard } from "@/components/ui/kalslo/EventCard";
import { NetworkOverview } from "@/components/ui/kalslo/NetworkOverview";
import { SignalLog } from "@/components/ui/kalslo/SignalLog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const { locale } = useLocaleStore();
  const t = homeContent[locale];
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">("all");

  const events = Object.entries(eventsContent[locale]);
  const corridors = Object.entries(corridorsContent[locale]);
  const tradeStates = Object.entries(tradeStatesContent[locale]);

  const filteredEvents = events.filter(
    ([, event]) => activeCategory === "all" || event.category === activeCategory
  );

  const allPendingObligations = tradeStates.flatMap(([id, ts]) =>
    ts.obligations
      .filter((o) => o.status !== "settled")
      .map((o) => ({ ...o, tradeStateId: id }))
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-12">
        <p className="font-label text-xs text-muted-foreground">{t.pageEyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          {t.pageTitle}
        </h1>

        <div className="mt-6">
          <CategoryFilter
            locale={locale}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* EVENTS GRID */}
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
              {t.eventsGridTitle}
            </p>

            {filteredEvents.length === 0 && (
              <div className="mt-4 rounded-lg border border-border p-12 text-center">
                <p className="text-muted-foreground">{emptyCategoryMessage[locale]}</p>
              </div>
            )}

            {filteredEvents.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {filteredEvents.map(([slug, event]) => (
                  <EventCard
                    key={slug}
                    locale={locale}
                    slug={slug}
                    event={event}
                    corridorSlug={event.corridorSlug}
                  />
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div>
              <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                {t.sidebar.activeCorridorsLabel}
              </p>
              <div className="mt-3 space-y-3">
                {corridors.map(([slug, corridor]) => (
                  <Link
                    key={slug}
                    href={`/corridors/${slug}`}
                    className="group flex items-center justify-between gap-2 rounded-md border border-border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-kalslo-mint hover:shadow-md"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {corridor.name}
                    </p>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-kalslo-mint" />
                  </Link>
                ))}
                <p className="px-1 text-xs italic text-muted-foreground">
                  {t.sidebar.moreCorridorsSoon}
                </p>
              </div>
            </div>

            <NetworkOverview locale={locale} />
            <SignalLog locale={locale} />

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle className="font-label text-xs uppercase tracking-widest">
                {t.sidebar.observationModeTitle}
              </AlertTitle>
              <AlertDescription>{t.sidebar.observationModeText}</AlertDescription>
            </Alert>
          </div>
        </div>

        {/* BOTTOM SECTIONS */}
        <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
          <div>
            <Link
              href="/corridors/europe-gulf"
              className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-foreground hover:text-kalslo-mint"
            >
              {t.sections.corridorsUnderObservation} <ChevronRight className="h-3 w-3" />
            </Link>
            <div className="mt-3 space-y-2">
              {corridors.map(([slug, corridor]) => (
                <Link
                  key={slug}
                  href={`/corridors/${slug}`}
                  className="block text-sm text-muted-foreground hover:text-foreground"
                >
                  {corridor.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Link
              href="/trade-states/demo-0001"
              className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-foreground hover:text-kalslo-mint"
            >
              {t.sections.obligationsRequiringAttention} <ChevronRight className="h-3 w-3" />
            </Link>
            <div className="mt-3 space-y-2">
              {allPendingObligations.map((ob, i) => (
                <div key={`${ob.tradeStateId}-${i}`} className="text-sm text-muted-foreground">
                  {ob.label}
                  <span
                    className={`ml-1.5 ${
                      ob.status === "locked" ? "text-status-blocked" : "text-status-risk"
                    }`}
                  >
                    —{" "}
                    {ob.status === "locked"
                      ? locale === "en"
                        ? "Locked"
                        : "Verrouillé"
                      : locale === "en"
                      ? "Pending"
                      : "En attente"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Link
              href="/learn"
              className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-foreground hover:text-kalslo-mint"
            >
              {t.sections.learnTheSettlementLayer} <ChevronRight className="h-3 w-3" />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              {locale === "en"
                ? "Understand Trade States, Obligations and Settlement Pressure."
                : "Comprendre les Trade States, les Obligations et la Pression de règlement."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}