import { create } from "zustand";

export type Locale = "en" | "fr";

interface LocaleState {
  locale: Locale;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: "en",
  toggleLocale: () =>
    set((state) => ({ locale: state.locale === "en" ? "fr" : "en" })),
}));