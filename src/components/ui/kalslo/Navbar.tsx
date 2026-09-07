"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Asterisk } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";

const navLabels = {
  en: {
    state: "State",
    corridors: "Corridors",
    tradeStates: "Trade States",
    signals: "Signals",
    learn: "Learn",
  },
  fr: {
    state: "State",
    corridors: "Corridors",
    tradeStates: "Trade States",
    signals: "Signals",
    learn: "Learn",
  },
};

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
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
    <header
      className={
        isHome
          ? "absolute inset-x-0 top-0 z-10"
          : "sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          className={`flex items-center gap-2 ${
            isHome ? "text-white" : "text-foreground"
          }`}
        >
          <Asterisk className="h-4 w-4" strokeWidth={2.5} />
          <span className="text-sm font-semibold tracking-tight">Kalslo</span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-label text-[11px] uppercase tracking-widest transition-colors ${
                  isHome
                    ? "text-white/60 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={toggleLocale}
            className={`font-label text-[11px] uppercase tracking-widest transition-colors ${
              isHome
                ? "text-white/60 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {locale === "en" ? "FR" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}