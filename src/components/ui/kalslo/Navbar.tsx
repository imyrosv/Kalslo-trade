"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";

const navLabels = {
  en: {
    state: "State",
    corridors: "Corridors",
    tradeStates: "Trade States",
    signals: "Signals",
    learn: "Learn",
    searchPlaceholder: "Search commerce",
    signIn: "Sign in",
  },
  fr: {
    state: "State",
    corridors: "Corridors",
    tradeStates: "Trade States",
    signals: "Signals",
    learn: "Learn",
    searchPlaceholder: "Rechercher",
    signIn: "Se connecter",
  },
};

export function Navbar() {
  const { locale, toggleLocale } = useLocaleStore();
  const t = navLabels[locale];

  const links = [
    { href: "/state", label: t.state },
    { href: "/corridors/europe-gulf", label: t.corridors },
    { href: "/trade-states/demo-0001", label: t.tradeStates },
    { href: "/signals", label: t.signals },
    { href: "/learn", label: t.learn },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-foreground">
            Kalslo
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-nav text-sm font-semibold uppercase text-foreground transition-colors hover:text-kalslo-mint"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-muted px-4 py-2 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-40 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          <button
            onClick={toggleLocale}
            className="font-label text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {locale === "en" ? "FR" : "EN"}
          </button>

          <button className="hidden text-sm font-medium text-foreground hover:text-kalslo-mint sm:block">
            {t.signIn}
          </button>

          <button className="text-foreground" aria-label="Menu">
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
}