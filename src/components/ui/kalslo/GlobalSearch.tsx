"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { eventsContent } from "@/lib/content/events";
import { corridorsContent } from "@/lib/content/corridors";
import { tradeStatesContent } from "@/lib/content/trade-states";
import { learnContent } from "@/lib/content/learn";

const uiLabels = {
  en: {
    placeholder: "Search events, corridors, trade states...",
    empty: "No results found.",
    events: "Events",
    corridors: "Corridors",
    tradeStates: "Trade States",
    learn: "Learn",
    searchButton: "Search commerce",
  },
  fr: {
    placeholder: "Rechercher événements, corridors, trade states...",
    empty: "Aucun résultat.",
    events: "Événements",
    corridors: "Corridors",
    tradeStates: "Trade States",
    learn: "Apprendre",
    searchButton: "Rechercher",
  },
};

export function GlobalSearch({ locale }: { locale: "en" | "fr" }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = uiLabels[locale];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const goTo = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const events = Object.entries(eventsContent[locale]);
  const corridors = Object.entries(corridorsContent[locale]);
  const tradeStates = Object.entries(tradeStatesContent[locale]);
  const learnEntries = learnContent[locale].entries;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
      >
        <Search className="h-4 w-4" strokeWidth={2} />
        <span>{t.searchButton}</span>
        <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-label text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t.placeholder} />
        <CommandList>
          <CommandEmpty>{t.empty}</CommandEmpty>

          <CommandGroup heading={t.events}>
            {events.map(([slug, event]) => (
              <CommandItem
                key={slug}
                value={event.title}
                onSelect={() => goTo(`/state/${slug}`)}
              >
                {event.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading={t.corridors}>
            {corridors.map(([slug, corridor]) => (
              <CommandItem
                key={slug}
                value={corridor.name}
                onSelect={() => goTo(`/corridors/${slug}`)}
              >
                {corridor.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading={t.tradeStates}>
            {tradeStates.map(([id, ts]) => (
              <CommandItem
                key={id}
                value={`${ts.corridorName} ${id}`}
                onSelect={() => goTo(`/trade-states/${id}`)}
              >
                {ts.corridorName} — {id.toUpperCase()}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading={t.learn}>
            {learnEntries.map((entry) => (
              <CommandItem
                key={entry.slug}
                value={entry.term}
                onSelect={() => goTo("/learn")}
              >
                {entry.term}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}