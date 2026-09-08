"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { onboardingContent } from "@/lib/content/onboarding";
import { AnimatedTradeStateDemo } from "./AnimatedTradeStateDemo";

export function OnboardingModal() {
  const { locale } = useLocaleStore();
  const { hasSeenModal, hasHydrated, dismissModal } = useOnboardingStore();
  const t = onboardingContent[locale];

  if (!hasHydrated || hasSeenModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={dismissModal}
          className="absolute right-5 top-5 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="font-label text-xs font-semibold uppercase tracking-widest text-kalslo-mint">
          {t.kicker}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-snug tracking-tight text-foreground">
          {t.title}
        </h2>

        <div className="mt-6 border-t border-border pt-6">
          <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
            {t.whatKalsloTracksLabel}
          </p>
          <p className="mt-2 text-sm text-foreground">{t.whatKalsloTracks}</p>
        </div>

        <div className="mt-6 rounded-lg bg-muted p-5">
          <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
            {t.demoLabel}
          </p>
          <div className="mt-5">
            <AnimatedTradeStateDemo locale={locale} />
          </div>
          <p className="mt-4 text-xs italic text-muted-foreground">{t.demoCaption}</p>
        </div>

        <Link
          href="/state"
          onClick={dismissModal}
          className="mt-6 flex w-full items-center justify-center rounded-full bg-kalslo-mint py-3.5 text-sm font-semibold text-kalslo-deep transition-transform hover:scale-[1.01]"
        >
          {t.cta}
        </Link>

        <button
          onClick={dismissModal}
          className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {t.dismiss}
        </button>
      </div>
    </div>
  );
}