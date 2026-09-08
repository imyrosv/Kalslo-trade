"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useOnboardingStore, type OnboardingStep } from "@/store/useOnboardingStore";

function getStepFromPath(pathname: string): OnboardingStep | null {
  if (pathname.startsWith("/state")) return "state";
  if (pathname.startsWith("/corridors")) return "corridors";
  if (pathname.startsWith("/trade-states")) return "tradeStates";
  if (pathname.startsWith("/signals")) return "signals";
  return null;
}

export function OnboardingTracker() {
  const pathname = usePathname();
  const markVisited = useOnboardingStore((s) => s.markVisited);

  useEffect(() => {
    const step = getStepFromPath(pathname);
    if (step) markVisited(step);
  }, [pathname, markVisited]);

  return null;
}