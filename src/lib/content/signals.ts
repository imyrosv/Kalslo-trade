export type PressureLevel = "low" | "moderate" | "elevated" | "severe";

export type CorridorSignal = {
  corridorSlug: string;
  corridorName: string;
  pressureLevel: PressureLevel;
  pressureLabel: string;
  summary: string;
  methodologyLabel: string;
  methodology: string;
  lastUpdated: string;
};

export const pressureLevelOrder: PressureLevel[] = ["low", "moderate", "elevated", "severe"];

export const pressureLevelLabels: Record<"en" | "fr", Record<PressureLevel, string>> = {
  en: { low: "Low", moderate: "Moderate", elevated: "Elevated", severe: "Severe" },
  fr: { low: "Faible", moderate: "Modérée", elevated: "Élevée", severe: "Sévère" },
};

export const signalsContent: Record<"en" | "fr", { pageTitle: string; pageIntro: string; signals: CorridorSignal[] }> = {
  en: {
    pageTitle: "Settlement pressure signals",
    pageIntro:
      "A qualitative read of how likely obligations on a corridor are to be delayed or disrupted right now — not a market price, not a probability.",
    signals: [
      {
        corridorSlug: "europe-gulf",
        corridorName: "Europe → Gulf",
        pressureLevel: "elevated",
        pressureLabel: "Settlement Pressure: Elevated",
        summary:
          "Shipping disruption in the Strait of Hormuz is extending delivery timelines on this corridor, putting conditional payments at risk of delay.",
        methodologyLabel: "Why this level",
        methodology:
          "This status reflects a verified route disruption, delivery uncertainty and extended conditional-payment risk. It is a qualitative assessment, not a calculated score — Kalslo does not publish a numeric index until a real methodology has been validated against transaction data.",
        lastUpdated: "6 Sep 2026",
      },
    ],
  },
  fr: {
    pageTitle: "Signaux de pression sur le règlement",
    pageIntro:
      "Une lecture qualitative de la probabilité que les obligations d'un corridor soient retardées ou perturbées en ce moment — ni un prix de marché, ni une probabilité.",
    signals: [
      {
        corridorSlug: "europe-gulf",
        corridorName: "Europe → Golfe",
        pressureLevel: "elevated",
        pressureLabel: "Pression sur le règlement : Élevée",
        summary:
          "La perturbation du transport maritime dans le détroit d'Ormuz prolonge les délais de livraison sur ce corridor, mettant les paiements conditionnels à risque de retard.",
        methodologyLabel: "Pourquoi ce niveau",
        methodology:
          "Ce statut reflète une perturbation de route vérifiée, une incertitude sur la livraison et un risque prolongé sur les paiements conditionnels. Il s'agit d'une évaluation qualitative, pas d'un score calculé — Kalslo ne publie pas d'indice numérique tant qu'une vraie méthodologie n'a pas été validée sur des données de transaction réelles.",
        lastUpdated: "6 sept. 2026",
      },
    ],
  },
};