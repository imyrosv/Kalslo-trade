"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  tradeStatesContent,
  type ObligationStatus,
} from "@/lib/content/trade-states";
import {
  signalsContent,
  pressureLevelOrder,
  pressureLevelLabels,
  type PressureLevel,
} from "@/lib/content/signals";
import { homeContent } from "@/lib/content/home";
import { TrustBadge } from "./TrustBadge";

type Props = {
  locale: "en" | "fr";
};

const statusColor: Record<ObligationStatus, string> = {
  settled: "#00CE8E",
  pending: "#EAB308",
  locked: "#E5484D",
};

export function NetworkOverview({ locale }: Props) {
  const t = homeContent[locale].networkOverview;
  const tradeStates = Object.values(tradeStatesContent[locale]);
  const signals = signalsContent[locale].signals;

  const allObligations = tradeStates.flatMap((ts) => ts.obligations);
  const totalObligations = allObligations.length;

  // Parse le montant depuis le format "€250,000" / "250 000 €" — pas de champ montant séparé pour l'instant
  const totalVolume = tradeStates.reduce((sum, ts) => {
    const numeric = Number(ts.contractValue.replace(/[^0-9]/g, ""));
    return sum + (Number.isFinite(numeric) ? numeric : 0);
  }, 0);

  const worstPressure = signals.reduce<PressureLevel>((worst, s) => {
    return pressureLevelOrder.indexOf(s.pressureLevel) > pressureLevelOrder.indexOf(worst)
      ? s.pressureLevel
      : worst;
  }, "low");

  const statusCounts: Record<ObligationStatus, number> = {
    settled: 0,
    pending: 0,
    locked: 0,
  };
  allObligations.forEach((o) => {
    statusCounts[o.status] += 1;
  });

  const statusLabel: Record<ObligationStatus, string> =
    locale === "en"
      ? { settled: "Settled", pending: "Pending", locked: "Locked" }
      : { settled: "Réglé", pending: "En attente", locked: "Verrouillé" };

  const chartData = (["settled", "pending", "locked"] as ObligationStatus[]).map(
    (status) => ({ status, count: statusCounts[status] })
  );

  const formattedVolume = totalVolume.toLocaleString(
    locale === "en" ? "en-US" : "fr-FR"
  );

  return (
    <div className="rounded-md border border-border p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
          {t.title}
        </p>
        <TrustBadge variant="illustrative_trade_flow" locale={locale} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="font-label text-[11px] text-muted-foreground">
            {t.totalObligationsLabel}
          </p>
          <p className="mt-0.5 text-lg font-semibold text-foreground">
            {totalObligations}
          </p>
        </div>
        <div>
          <p className="font-label text-[11px] text-muted-foreground">
            {t.totalVolumeLabel}
          </p>
          <p className="mt-0.5 text-lg font-semibold text-foreground">
            €{formattedVolume}
          </p>
        </div>
        <div>
          <p className="font-label text-[11px] text-muted-foreground">
            {t.currentPressureLabel}
          </p>
          <p className="mt-0.5 text-lg font-semibold text-status-risk">
            {pressureLevelLabels[locale][worstPressure]}
          </p>
        </div>
      </div>

      <div className="mt-5 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 0, right: 8, top: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="status"
              tickFormatter={(value: ObligationStatus) => statusLabel[value]}
              width={72}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={statusColor[entry.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-xs italic text-muted-foreground">
        {t.illustrativeNote}
      </p>
    </div>
  );
}