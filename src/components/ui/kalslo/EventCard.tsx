"use client";

import Link from "next/link";
import { ArrowRight, FileCheck, Lock, ShieldAlert } from "lucide-react";
import { TrustBadge } from "./TrustBadge";
import { StatusPill } from "./StatusPill";
import { CategoryIcon } from "./CategoryIcon";
import type { TradeEvent } from "@/lib/content/events";
import { homeContent } from "@/lib/content/home";

type Props = {
  locale: "en" | "fr";
  slug: string;
  event: TradeEvent;
  corridorSlug: string;
};

export function EventCard({ locale, slug, event, corridorSlug }: Props) {
  const t = homeContent[locale];
  const chain = t.impactChain;

  return (
    <div className="flex flex-col rounded-md border border-border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-kalslo-mint hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <TrustBadge variant="verified_event" locale={locale} />
        <StatusPill status={event.status} />
      </div>

      <Link href={`/state/${slug}`} className="mt-3 hover:text-kalslo-mint">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {event.title}
        </h3>
      </Link>

      <p className="mt-1 font-label text-xs text-muted-foreground">
        {event.lastUpdated}
      </p>

      {/* Chaîne d'impact : le principe central de Kalslo — un événement visible crée une chaîne de conséquences sur le règlement */}
      <div className="mt-4 flex items-center justify-between text-muted-foreground">
        <CategoryIcon category={event.category} className="h-4 w-4 shrink-0" />
        <ArrowRight className="h-3 w-3 shrink-0" />
        <FileCheck className="h-4 w-4 shrink-0" />
        <ArrowRight className="h-3 w-3 shrink-0" />
        <ShieldAlert className="h-4 w-4 shrink-0" />
        <ArrowRight className="h-3 w-3 shrink-0" />
        <Lock className="h-4 w-4 shrink-0" />
      </div>
      <div className="mt-1.5 grid grid-cols-4 gap-1 text-center font-label text-[10px] leading-tight text-muted-foreground">
        <span>{chain.step1}</span>
        <span>{chain.step2}</span>
        <span>{chain.step3}</span>
        <span>{chain.step4}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/trade-states/demo-0001"
          className="rounded-md border border-border px-3 py-1.5 font-label text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-kalslo-deep"
        >
          {t.affectedObligations}
        </Link>
        <Link
          href={`/corridors/${corridorSlug}`}
          className="rounded-md border border-border px-3 py-1.5 font-label text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-kalslo-deep"
        >
          {t.corridorImpact}
        </Link>
      </div>
    </div>
  );
}