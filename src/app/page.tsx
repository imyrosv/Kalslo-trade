"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, ChevronRight, Info } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { homeContent } from "@/lib/content/home";
import { eventsContent, type EventCategory } from "@/lib/content/events";
import { corridorsContent } from "@/lib/content/corridors";
import {
  tradeStatesContent,
  stageLabels,
  getStageColorClass,
  settlementStateLabels,
  getSettlementColorClass,
} from "@/lib/content/trade-states";
import { signalsContent } from "@/lib/content/signals";
import { learnContent } from "@/lib/content/learn";
import { emptyCategoryMessage } from "@/lib/content/categories";
import { TrustBadge } from "@/components/ui/kalslo/TrustBadge";
import { StatusPill } from "@/components/ui/kalslo/StatusPill";
import { CategoryFilter } from "@/components/ui/kalslo/CategoryFilter";
import { CategoryIcon } from "@/components/ui/kalslo/CategoryIcon";
import { TradeStateProgress } from "@/components/ui/kalslo/TradeStateProgress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const { locale } = useLocaleStore();
  const t = homeContent[locale];
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">("all");

  const events = Object.entries(eventsContent[locale]);
  const [primarySlug, primaryEvent] = events[0];

  const corridors = Object.entries(corridorsContent[locale]);
  const [primaryCorridorSlug, primaryCorridor] = corridors[0];

  const tradeStates = Object.entries(tradeStatesContent[locale]);
  const [primaryTradeStateId, primaryTradeState] = tradeStates[0];

  const signals = signalsContent[locale].signals;

  const pendingObligations = primaryTradeState.obligations.filter(
    (o) => o.status !== "settled"
  );
  const nextProof = pendingObligations[0]?.trigger ?? "—";

  const filteredEvents = events.filter(
    ([, event]) => activeCategory === "all" || event.category === activeCategory
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

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
          {/* MAIN CARD */}
          <div>
            {filteredEvents.length === 0 && (
              <div className="rounded-lg border border-border p-12 text-center">
                <p className="text-muted-foreground">
                  {emptyCategoryMessage[locale]}
                </p>
              </div>
            )}

            {filteredEvents.length > 0 && (
              <div className="rounded-lg border border-border p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <TrustBadge variant="verified_event" locale={locale} />
                  <StatusPill status={primaryEvent.status} />
                </div>

                <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
                  {primaryEvent.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-xs text-muted-foreground">
                  <Link href={`/corridors/${primaryCorridorSlug}`} className="hover:text-foreground">
                    {primaryCorridor.name}
                  </Link>
                  <span>·</span>
                  <span>{primaryEvent.lastUpdated}</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5">
                  <div>
                    <p className="font-label text-xs text-muted-foreground">
                      {t.tradeFlowLabel}
                    </p>
                    <p className={`mt-1 font-semibold ${getStageColorClass(primaryTradeState.currentStage)}`}>
                      {stageLabels[locale][primaryTradeState.currentStage]}
                    </p>
                  </div>
                  <div>
                    <p className="font-label text-xs text-muted-foreground">
                      {t.settlementLabel}
                    </p>
                    <p className={`mt-1 font-semibold ${getSettlementColorClass(primaryTradeState.settlementState)}`}>
                      {settlementStateLabels[locale][primaryTradeState.settlementState]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-b border-border pb-6">
                  <TradeStateProgress
                    currentStage={primaryTradeState.currentStage}
                    locale={locale}
                  />
                </div>

                <Link
                  href={`/trade-states/${primaryTradeStateId}`}
                  className="mt-6 flex items-center justify-between gap-4 border-t border-b border-border py-4 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                      TRADE STATE — {primaryTradeStateId.toUpperCase()}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      {locale === "en" ? "Next required proof: " : "Prochaine preuve requise : "}
                      <span className="font-semibold">{nextProof}</span>
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>

                <div className="mt-6">
                  <TrustBadge variant="kalslo_analysis" locale={locale} />
                  <p className="mt-3 font-label text-xs uppercase tracking-widest text-muted-foreground">
                    {t.stateExplanationLabel}
                  </p>
                  <p className="mt-2 text-foreground">{primaryEvent.whatHappened}</p>
                  <p className="mt-3 text-foreground">{primaryEvent.whatsNext}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/corridors/${primaryCorridorSlug}`}
                    className="inline-flex items-center rounded-md bg-kalslo-deep px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {t.viewCorridor}
                  </Link>
                  <Link
                    href={`/trade-states/${primaryTradeStateId}`}
                    className="inline-flex items-center rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-kalslo-deep"
                  >
                    {t.viewAffectedStates}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            <div>
              <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                {t.sidebar.activeCorridorsLabel}
              </p>
              <div className="mt-3 space-y-3">
                {corridors.map(([slug, corridor]) => {
                  const signal = signals.find((s) => s.corridorSlug === slug);
                  return (
                    <Link
                      key={slug}
                      href={`/corridors/${slug}`}
                      className="group flex items-center justify-between gap-2 rounded-md border border-border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-kalslo-mint hover:shadow-md"
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {corridor.name}
                        </p>
                        {signal && (
                          <p className="mt-0.5 text-xs text-status-risk">
                            {signal.pressureLabel}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-kalslo-mint" />
                    </Link>
                  );
                })}
                <p className="px-1 text-xs italic text-muted-foreground">
                  {t.sidebar.moreCorridorsSoon}
                </p>
              </div>
            </div>

            <div>
              <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                {t.sidebar.obligationWatchLabel}
              </p>
              <Link
                href={`/trade-states/${primaryTradeStateId}`}
                className="mt-3 flex items-center gap-3 rounded-md bg-muted p-4 transition-colors hover:bg-status-risk/5"
              >
                <Lock className="h-4 w-4 shrink-0 text-status-risk" strokeWidth={1.75} />
                <p className="text-sm text-foreground">
                  {locale === "en"
                    ? `${pendingObligations.length} obligations awaiting settlement`
                    : `${pendingObligations.length} obligations en attente de règlement`}
                </p>
              </Link>
            </div>

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
        <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-5">
          <div>
            <Link href="/state" className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-foreground hover:text-kalslo-mint">
              {t.sections.activeStateChanges} <ChevronRight className="h-3 w-3" />
            </Link>
            <div className="mt-3 space-y-2">
              {events.map(([slug, event]) => (
                <Link key={slug} href={`/state/${slug}`} className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <CategoryIcon category={event.category} className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {event.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Link href="/corridors/europe-gulf" className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-foreground hover:text-kalslo-mint">
              {t.sections.corridorsUnderObservation} <ChevronRight className="h-3 w-3" />
            </Link>
            <div className="mt-3 space-y-2">
              {corridors.map(([slug, corridor]) => (
                <Link key={slug} href={`/corridors/${slug}`} className="block text-sm text-muted-foreground hover:text-foreground">
                  {corridor.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Link href="/trade-states/demo-0001" className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-foreground hover:text-kalslo-mint">
              {t.sections.tradeStatesInMotion} <ChevronRight className="h-3 w-3" />
            </Link>
            <div className="mt-3 space-y-2">
              {tradeStates.map(([id, ts]) => (
                <Link key={id} href={`/trade-states/${id}`} className="block text-sm text-muted-foreground hover:text-foreground">
                  {ts.corridorName} — {stageLabels[locale][ts.currentStage]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Link href={`/trade-states/${primaryTradeStateId}`} className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-foreground hover:text-kalslo-mint">
              {t.sections.obligationsRequiringAttention} <ChevronRight className="h-3 w-3" />
            </Link>
            <div className="mt-3 space-y-2">
              {pendingObligations.map((ob) => (
                <div key={ob.label} className="text-sm text-muted-foreground">
                  {ob.label}
                  <span
                    className={`ml-1.5 ${
                      ob.status === "locked" ? "text-status-blocked" : "text-status-risk"
                    }`}
                  >
                    — {ob.status === "locked" ? (locale === "en" ? "Locked" : "Verrouillé") : (locale === "en" ? "Pending" : "En attente")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Link href="/learn" className="flex items-center gap-1 font-label text-xs uppercase tracking-widest text-foreground hover:text-kalslo-mint">
              {t.sections.learnTheSettlementLayer} <ChevronRight className="h-3 w-3" />
            </Link>
            <div className="mt-3 space-y-2">
              {learnContent[locale].entries.slice(0, 4).map((entry) => (
                <Link key={entry.slug} href="/learn" className="block text-sm text-muted-foreground hover:text-foreground">
                  {entry.term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}