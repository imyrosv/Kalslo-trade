"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocaleStore } from "@/store/useLocaleStore";
import { fetchSignals } from "@/lib/queries";
import { PressureGauge } from "@/components/ui/kalslo/PressureGauge";
import type { PressureLevel } from "@/lib/content/signals";

export default function SignalsPage() {
  const { locale } = useLocaleStore();

  const { data: signals, isLoading, error } = useQuery({
    queryKey: ["signals"],
    queryFn: fetchSignals,
  });

  const pageTitle = locale === "en" ? "Settlement pressure signals" : "Signaux de pression sur le règlement";
  const pageIntro =
    locale === "en"
      ? "A qualitative read of how likely obligations on a corridor are to be delayed or disrupted right now — not a market price, not a probability."
      : "Une lecture qualitative de la probabilité que les obligations d'un corridor soient retardées ou perturbées en ce moment — ni un prix de marché, ni une probabilité.";

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center text-muted-foreground">
        Loading...
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center text-destructive">
        Error loading signals: {(error as Error).message}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-2xl px-6 py-12 md:px-0">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {pageTitle}
        </h1>
        <p className="mt-4 text-muted-foreground">{pageIntro}</p>

        <div className="mt-10 space-y-6 border-t border-border pt-10">
          {signals?.map((signal) => (
            <div
              key={signal.id}
              className="rounded-lg border border-border p-6 md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-semibold tracking-tight">
                  {locale === "en" ? signal.corridors.name_en : signal.corridors.name_fr}
                </span>
                <span className="font-label text-xs text-muted-foreground">
                  {new Date(signal.updated_at).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-5">
                <PressureGauge
                  level={signal.pressure_level as PressureLevel}
                                    label={`Settlement Pressure: ${signal.pressure_level.charAt(0).toUpperCase() + signal.pressure_level.slice(1)}`}
                />
              </div>

              <p className="mt-5 text-foreground">
                {locale === "en" ? signal.summary_en : signal.summary_fr}
              </p>

              <div className="mt-6 rounded-md bg-muted p-5">
                <p className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                  {locale === "en" ? "Why this level" : "Pourquoi ce niveau"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {locale === "en" ? signal.methodology_en : signal.methodology_fr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}