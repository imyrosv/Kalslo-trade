"use client";

import { use } from "react";
import Link from "next/link";
import { useLocaleStore } from "@/store/useLocaleStore";
import { tradeStatesContent, type TradeState } from "@/lib/content/trade-states";
import { TradeStateProgress } from "@/components/ui/kalslo/TradeStateProgress";
import { ObligationBadge } from "@/components/ui/kalslo/ObligationBadge";

export default function TradeStatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { locale } = useLocaleStore();
  const tradeState: TradeState | undefined = tradeStatesContent[locale][id];

  if (!tradeState) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-muted-foreground">Trade state not found.</p>
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
          ← {tradeState.backLink}
        </Link>

        <p className="mt-6 font-label text-xs text-muted-foreground">
          TRADE STATE — {id.toUpperCase()}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          {tradeState.corridorName}
        </h1>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="font-label text-xs text-muted-foreground">
              {tradeState.contractValueLabel}
            </p>
            <p className="mt-1 font-semibold text-foreground">
              {tradeState.contractValue}
            </p>
          </div>
          <div>
            <p className="font-label text-xs text-muted-foreground">
              {tradeState.currenciesLabel}
            </p>
            <p className="mt-1 font-semibold text-foreground">
              {tradeState.currencies}
            </p>
          </div>
          <div>
            <p className="font-label text-xs text-muted-foreground">
              {tradeState.settlementStateLabel}
            </p>
            <p className="mt-1 font-semibold text-status-risk">
              {tradeState.settlementState}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tradeState.participants.map((p: string) => (
            <span
              key={p}
              className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-10">
          <TradeStateProgress currentStage={tradeState.currentStage} locale={locale} />
        </div>

        <div className="mt-12">
          <p className="font-label text-xs text-muted-foreground">
            {tradeState.obligationsLabel}
          </p>
          <div className="mt-3 divide-y divide-border rounded-md border border-border">
            {tradeState.obligations.map((ob) => (
              <div
                key={ob.label}
                className="flex items-center justify-between gap-4 p-4"
              >
                <div>
                  <p className="text-foreground">{ob.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {ob.trigger}
                  </p>
                </div>
                <ObligationBadge status={ob.status} />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 font-label text-xs italic text-muted-foreground">
          {tradeState.illustrativeNote}
        </p>
      </article>
    </main>
  );
}