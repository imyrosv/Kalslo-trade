import type { EventCategory } from "./events";

export const categoryLabels: Record<"en" | "fr", Record<EventCategory | "all", string>> = {
  en: {
    all: "Active Now",
    logistics: "Logistics",
    "trade-finance": "Trade Finance",
    fx: "FX",
    payments: "Payments",
    energy: "Energy",
  },
  fr: {
    all: "Actif maintenant",
    logistics: "Logistique",
    "trade-finance": "Financement commercial",
    fx: "Change (FX)",
    payments: "Paiements",
    energy: "Énergie",
  },
};

export const categoryOrder: (EventCategory | "all")[] = [
  "all",
  "logistics",
  "trade-finance",
  "fx",
  "payments",
  "energy",
];

export const emptyCategoryMessage: Record<"en" | "fr", string> = {
  en: "No active events in this category yet.",
  fr: "Aucun événement actif dans cette catégorie pour l'instant.",
};