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
    <div className="flex items-center">
      {stageOrder.map((stage, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === stageOrder.length - 1;

        return (
          <div key={stage} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <span
                className={`flex h-3 w-3 items-center justify-center rounded-full ${
                  isDone || isCurrent ? "bg-kalslo-mint" : "border border-border bg-background"
                }`}
              />
              <span
                className={`whitespace-nowrap font-label text-[10px] ${
                  isCurrent ? "text-kalslo-deep" : "text-muted-foreground"
                }`}
              >
                {stageLabels[locale][stage]}
              </span>
            </div>
            {!isLast && (
              <div
                className={`mx-1 mb-4 h-px flex-1 ${
                  isDone ? "bg-kalslo-mint" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}