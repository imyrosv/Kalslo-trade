"use client";

import { useLocaleStore } from "@/store/useLocaleStore";
import { learnContent } from "@/lib/content/learn";

export default function LearnPage() {
  const { locale } = useLocaleStore();
  const { pageTitle, pageIntro, entries } = learnContent[locale];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-2xl px-6 py-12 md:px-0">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {pageTitle}
        </h1>
        <p className="mt-4 text-muted-foreground">{pageIntro}</p>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {entries.map((entry) => (
            <details key={entry.slug} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {entry.term}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.shortDefinition}
                  </p>
                </div>
                <span className="mt-1 shrink-0 font-label text-xs text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-foreground">{entry.explanation}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}