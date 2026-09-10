"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useThemeStore } from "@/store/useThemeStore";
import { FlagIcon } from "./FlagIcon";
import { GlobalSearch } from "./GlobalSearch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLabels = {
  en: {
    state: "State",
    corridors: "Corridors",
    tradeStates: "Trade States",
    signals: "Signals",
    learn: "Learn",
    signIn: "Sign in",
    menuTitle: "Menu",
    toggleTheme: "Toggle theme",
  },
  fr: {
    state: "State",
    corridors: "Corridors",
    tradeStates: "Trade States",
    signals: "Signals",
    learn: "Learn",
    signIn: "Se connecter",
    menuTitle: "Menu",
    toggleTheme: "Changer de thème",
  },
};

export function Navbar() {
  const { locale, toggleLocale } = useLocaleStore();
  const { theme, toggleTheme } = useThemeStore();
  const [mobileOpen, setMobileOpen] = useState(false);
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
            onClick={toggleTheme}
            className="text-foreground transition-opacity hover:opacity-70"
            aria-label={t.toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>

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

          <button
            onClick={() => setMobileOpen(true)}
            className="text-foreground lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{t.menuTitle}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 font-nav text-base font-semibold uppercase text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-4">
              <button
                onClick={toggleTheme}
                className="flex w-full items-center gap-2 rounded-md px-3 py-3 text-left text-base font-medium text-foreground hover:bg-muted"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" strokeWidth={1.75} />
                ) : (
                  <Moon className="h-4 w-4" strokeWidth={1.75} />
                )}
                {t.toggleTheme}
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-md px-3 py-3 text-left text-base font-medium text-foreground hover:bg-muted"
              >
                {t.signIn}
              </button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}