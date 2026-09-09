"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { FlagIcon } from "./FlagIcon";
import { GlobalSearch } from "./GlobalSearch";

const navLabels = {
  en: {
    state: "State",
    corridors: "Corridors",
    tradeStates: "Trade States",
    signals: "Signals",
    learn: "Learn",
    signIn: "Sign in",
  },
  fr: {
    state: "State",
    corridors: "Corridors",
    tradeStates: "Trade States",
    signals: "Signals",
    learn: "Learn",
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
          <GlobalSearch locale={locale} />

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
            aria-label="Toggle language"
          >
            <FlagIcon
              countryCode={locale === "en" ? "fr" : "gb"}
              className="h-3.5 w-5"
            />
            <span className="font-label text-xs font-semibold text-muted-foreground">
              {locale === "en" ? "FR" : "EN"}
            </span>
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