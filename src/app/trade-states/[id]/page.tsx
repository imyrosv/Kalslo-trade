"use client";

import { use } from "react";
import Link from "next/link";
import { useLocaleStore } from "@/store/useLocaleStore";
import {
  tradeStatesContent,
  stageLabels,
  settlementStateLabels,
  getSettlementColorClass,
  type TradeState,
} from "@/lib/content/trade-states";
import { TradeStateProgress } from "@/components/ui/kalslo/TradeStateProgress";
import { TrustBadge } from "@/components/ui/kalslo/TrustBadge";
import { FlagIcon } from "@/components/ui/kalslo/FlagIcon";
import { ObligationsTable } from "@/components/ui/kalslo/ObligationsTable";

const tableLabels = {
  en: { obligation: "Obligation", trigger: "Trigger", status: "Status" },
  fr: { obligation: "Obligation", trigger: "Déclencheur", status: "Statut" },
};

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

        <div className="mt-6">
          <TrustBadge variant="illustrative_trade_flow" locale={locale} />
        </div>

        <p className="mt-4 font-label text-xs text-muted-foreground">
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
            <div className="mt-1 flex items-center gap-1.5">
              {tradeState.currencyCodes.map((code) => (
                <FlagIcon key={code} countryCode={code} className="h-3.5 w-5" />
              ))}
              <p className="font-semibold text-foreground">
                {tradeState.currencies}
              </p>
            </div>
          </div>
          <div>
            <p className="font-label text-xs text-muted-foreground">
              {tradeState.settlementStateLabel}
            </p>
            <p className={`mt-1 font-semibold ${getSettlementColorClass(tradeState.settlementState)}`}>
              {settlementStateLabels[locale][tradeState.settlementState]}
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
          <p className="mb-3 font-label text-xs text-muted-foreground">
            {tradeState.obligationsLabel}
          </p>
          <ObligationsTable
            obligations={tradeState.obligations}
            labels={tableLabels[locale]}
          />
        </div>
      </article>
    </main>
  );
}