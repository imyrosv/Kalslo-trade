"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { stageOrder, stageLabels } from "@/lib/content/trade-states";

export function AnimatedTradeStateDemo({ locale }: { locale: "en" | "fr" }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => (prev + 1) % (stageOrder.length + 2));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const currentIndex = Math.min(tick, stageOrder.length - 1);

  return (
    <div className="flex items-center">
      {stageOrder.map((stage, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === stageOrder.length - 1;

        return (
          <div key={stage} className="relative flex flex-1 flex-col items-center">
            {!isLast && (
              <div className="absolute left-1/2 top-1.5 h-px w-full overflow-hidden bg-border">
                <motion.div
                  className="h-full bg-kalslo-mint"
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            )}
            <motion.span
              animate={{ scale: isCurrent ? 1.4 : 1 }}
              transition={{ duration: 0.3 }}
              className={`relative z-10 h-3 w-3 rounded-full border ${
                isDone || isCurrent
                  ? "border-kalslo-mint bg-kalslo-mint"
                  : "border-border bg-background"
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