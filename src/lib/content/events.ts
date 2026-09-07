export type TradeEvent = {
  title: string;
  status: "elevated" | "normal" | "resolved";
  type: string;
  lastUpdated: string;
  sourceStatus: string;
  whatHappenedLabel: string;
  whatHappened: string;
  whatChangedLabel: string;
  whatChanged: string;
  obligationsLabel: string;
  obligations: string[];
  whatsNextLabel: string;
  whatsNext: string;
  sourcesLabel: string;
  sources: { label: string; date: string }[];
  backLink: string;
};

export const eventsContent: Record<"en" | "fr", Record<string, TradeEvent>> = {
  en: {
    "strait-of-hormuz": {
      title: "Strait of Hormuz: Route Disruption State",
      status: "elevated",
      type: "Shipping / Settlement",
      lastUpdated: "6 Sep 2026",
      sourceStatus: "Verified event",
      whatHappenedLabel: "What happened",
      whatHappened:
        "Commercial shipping through the Strait of Hormuz remains severely disrupted. Only 4 commodity vessels transited on September 4, well below the recent 10-day daily average of around 15.",
      whatChangedLabel: "What changed",
      whatChanged:
        "Vessel traffic has remained below the recent average for several consecutive days, extending the disruption window.",
      obligationsLabel: "Obligations affected",
      obligations: [
        "Buyer's delivery deadline",
        "Supplier's working capital",
        "Agent commission",
        "FX rate certainty",
        "Reserve-release date",
        "Financing availability",
      ],
      whatsNextLabel: "What settles next",
      whatsNext:
        "Delivery confirmation is the next required proof before conditional payments can be released.",
      sourcesLabel: "Sources",
      sources: [{ label: "Reuters — Gulf shipping data", date: "4 Sep 2026" }],
      backLink: "Back to Kalslo State",
    },
  },
  fr: {
    "strait-of-hormuz": {
      title: "Détroit d'Ormuz : état de perturbation de la route",
      status: "elevated",
      type: "Transport maritime / Règlement",
      lastUpdated: "6 sept. 2026",
      sourceStatus: "Événement vérifié",
      whatHappenedLabel: "Ce qui s'est passé",
      whatHappened:
        "Le transport maritime commercial dans le détroit d'Ormuz reste fortement perturbé. Seulement 4 navires de matières premières ont transité le 4 septembre, bien en dessous de la moyenne des 10 derniers jours, d'environ 15.",
      whatChangedLabel: "Ce qui a changé",
      whatChanged:
        "Le trafic de navires est resté sous la moyenne pendant plusieurs jours consécutifs, prolongeant la fenêtre de perturbation.",
      obligationsLabel: "Obligations concernées",
      obligations: [
        "Délai de livraison de l'acheteur",
        "Fonds de roulement du fournisseur",
        "Commission de l'agent",
        "Certitude du taux de change",
        "Date de libération de réserve",
        "Disponibilité du financement",
      ],
      whatsNextLabel: "Ce qui se règle ensuite",
      whatsNext:
        "La confirmation de livraison est la prochaine preuve requise avant que les paiements conditionnels puissent être débloqués.",
      sourcesLabel: "Sources",
      sources: [{ label: "Reuters — Données de transport maritime dans le Golfe", date: "4 sept. 2026" }],
      backLink: "Retour à Kalslo State",
    },
  },
};