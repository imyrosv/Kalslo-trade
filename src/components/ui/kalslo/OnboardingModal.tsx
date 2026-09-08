"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useOnboardingStore, type OnboardingStep } from "@/store/useOnboardingStore";
import { onboardingContent } from "@/lib/content/onboarding";

const stepOrder: { key: OnboardingStep; href: string }[] = [
  { key: "state", href: "/state" },
  { key: "corridors", href: "/corridors/europe-gulf" },
  { key: "tradeStates", href: "/trade-states/demo-0001" },
  { key: "signals", href: "/signals" },
];

export function OnboardingModal() {
  const { locale } = useLocaleStore();
  const { completed, hasSeenModal, dismissModal } = useOnboardingStore();
  const t = onboardingContent[locale];

  if (hasSeenModal) return null;

  const firstIncomplete = stepOrder.find((s) => !completed[s.key]) ?? stepOrder[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={dismissModal}
          className="absolute right-5 top-5 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {t.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.subtitle}</p>

        <div className="mt-8 space-y-0">
          {stepOrder.map((step, index) => {
            const isDone = completed[step.key];
            const isCurrent = step.key === firstIncomplete.key && !isDone;
            const isLast = index === stepOrder.length - 1;

            return (
              <div key={step.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      isDone
                        ? "bg-kalslo-mint"
                        : isCurrent
                        ? "border-2 border-kalslo-mint bg-white"
                        : "border-2 border-border bg-white"
                    }`}
                  >
                    {isDone && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                    {isCurrent && !isDone && (
                      <div className="h-2 w-2 rounded-full bg-kalslo-mint" />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={`w-px flex-1 ${
                        isDone ? "bg-kalslo-mint" : "bg-border"
                      }`}
                      style={{ minHeight: "2rem" }}
                    />
                  )}
                </div>

                <div className="pb-8">
                  <p
                    className={`text-sm font-semibold ${
                      isDone
                        ? "text-foreground"
                        : isCurrent
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t.steps[step.key].label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t.steps[step.key].description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href={firstIncomplete.href}
          onClick={dismissModal}
          className="mt-2 flex w-full items-center justify-center rounded-full bg-kalslo-mint py-3.5 text-sm font-semibold text-kalslo-deep transition-transform hover:scale-[1.01]"
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