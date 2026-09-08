"use client";

import { stageOrder, stageLabels, type TradeStage } from "@/lib/content/trade-states";

export function TradeStateProgress({
  currentStage,
  locale,
}: {
  currentStage: TradeStage;
  locale: "en" | "fr";
}) {
  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <div className="flex">
      {stageOrder.map((stage, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === stageOrder.length - 1;

        return (
          <div key={stage} className="relative flex flex-1 flex-col items-center">
            {!isLast && (
              <div
                className={`absolute left-1/2 top-1.5 h-px w-full ${
                  isDone ? "bg-kalslo-mint" : "bg-border"
                }`}
              />
            )}
            <span
              className={`relative z-10 h-3 w-3 rounded-full ${
                isDone || isCurrent ? "bg-kalslo-mint" : "border border-border bg-background"
              }`}
            />
            <span
              className={`mt-2 whitespace-nowrap font-label text-[10px] ${
                isCurrent ? "font-semibold text-kalslo-deep" : "text-muted-foreground"
              }`}
            >
              {stageLabels[locale][stage]}
            </span>
          </div>
        );
      })}
    </div>
  );
}