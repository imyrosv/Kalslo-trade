export type Corridor = {
  name: string;
  descriptionLabel: string;
  description: string;
  participantsLabel: string;
  participants: string[];
  activeEventsLabel: string;
  activeEvents: { slug: string; title: string; status: "elevated" | "normal" | "resolved" }[];
  backLink: string;
};

export const corridorsContent: Record<"en" | "fr", Record<string, Corridor>> = {
  en: {
    "europe-gulf": {
      name: "Europe → Gulf",
      descriptionLabel: "About this corridor",
      description:
        "A major commercial route for goods, energy and equipment moving between European exporters and Gulf buyers. Shipments typically transit through the Strait of Hormuz.",
      participantsLabel: "Typical participants",
      participants: ["Buyer", "Seller", "Supplier", "Freight agent", "Financing partner"],
      activeEventsLabel: "Active events on this corridor",
      activeEvents: [
        {
          slug: "strait-of-hormuz",
          title: "Strait of Hormuz — Shipping pressure remains elevated",
          status: "elevated",
        },
      ],
      backLink: "Back to Kalslo State",
    },
  },
  fr: {
    "europe-gulf": {
      name: "Europe → Golfe",
      descriptionLabel: "À propos de ce corridor",
      description:
        "Une route commerciale majeure pour les biens, l'énergie et les équipements circulant entre les exportateurs européens et les acheteurs du Golfe. Les expéditions transitent généralement par le détroit d'Ormuz.",
      participantsLabel: "Participants typiques",
      participants: ["Acheteur", "Vendeur", "Fournisseur", "Agent de fret", "Partenaire de financement"],
      activeEventsLabel: "Événements actifs sur ce corridor",
      activeEvents: [
        {
          slug: "strait-of-hormuz",
          title: "Détroit d'Ormuz — La pression sur le transport maritime reste élevée",
          status: "elevated",
        },
      ],
      backLink: "Retour à Kalslo State",
    },
  },
};