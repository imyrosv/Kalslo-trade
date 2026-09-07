export type LearnEntry = {
  slug: string;
  term: string;
  shortDefinition: string;
  explanation: string;
};

export const learnContent: Record<"en" | "fr", { pageTitle: string; pageIntro: string; entries: LearnEntry[] }> = {
  en: {
    pageTitle: "Learn",
    pageIntro:
      "Short, plain-language explanations of the terms Kalslo uses — no financial jargon required.",
    entries: [
      {
        slug: "trade-state",
        term: "Trade State",
        shortDefinition: "The current stage of a commercial contract, from proposal to final settlement.",
        explanation:
          "A Trade State tracks a contract through seven stages: Proposed, Confirmed, Funded, Shipped, Delivered, Accepted, Settled. Each stage unlocks specific obligations — for example, a partial payment due once shipment is proven. Kalslo's Trade State pages are illustrative examples, not live transactions, unless explicitly marked otherwise.",
      },
      {
        slug: "settlement",
        term: "Settlement",
        shortDefinition: "The point where money actually changes hands and an obligation is considered complete.",
        explanation:
          "Settlement is the last step in a trade: once goods are delivered, accepted, and payment is released, the obligation is settled. Delays anywhere earlier in the chain — shipping, proof of delivery, approvals — can push settlement back, even if the underlying goods have already moved.",
      },
      {
        slug: "obligation",
        term: "Obligation",
        shortDefinition: "A specific commitment tied to a trigger — a payment, a delivery, a guarantee.",
        explanation:
          "Every commercial contract is really a bundle of obligations: a deposit due at order, a balance due at delivery, a commission due on acceptance. Kalslo tracks which obligations are settled, pending, or locked at any given moment.",
      },
      {
        slug: "corridor",
        term: "Corridor",
        shortDefinition: "A commercial route between two regions, such as Europe and the Gulf.",
        explanation:
          "A corridor groups together the typical participants, risks, and settlement patterns of trade flowing between two regions. Events — like a shipping disruption — are linked to the corridors they affect, so you can see the bigger picture beyond a single contract.",
      },
    ],
  },
  fr: {
    pageTitle: "Apprendre",
    pageIntro:
      "Des explications courtes et sans jargon des termes utilisés par Kalslo.",
    entries: [
      {
        slug: "trade-state",
        term: "Trade State",
        shortDefinition: "L'étape actuelle d'un contrat commercial, de la proposition au règlement final.",
        explanation:
          "Un Trade State suit un contrat à travers sept étapes : Proposé, Confirmé, Financé, Expédié, Livré, Accepté, Réglé. Chaque étape débloque des obligations spécifiques — par exemple, un paiement partiel dû une fois l'expédition prouvée. Les pages Trade State de Kalslo sont des exemples illustratifs, pas des transactions réelles, sauf mention contraire explicite.",
      },
      {
        slug: "settlement",
        term: "Règlement (Settlement)",
        shortDefinition: "Le moment où l'argent change réellement de mains et où une obligation est considérée comme terminée.",
        explanation:
          "Le règlement est la dernière étape d'un échange commercial : une fois les biens livrés, acceptés et le paiement débloqué, l'obligation est réglée. Des retards plus tôt dans la chaîne — transport, preuve de livraison, approbations — peuvent repousser le règlement, même si les biens concernés ont déjà été déplacés.",
      },
      {
        slug: "obligation",
        term: "Obligation",
        shortDefinition: "Un engagement précis lié à un déclencheur — un paiement, une livraison, une garantie.",
        explanation:
          "Chaque contrat commercial est en réalité un ensemble d'obligations : un acompte dû à la commande, un solde dû à la livraison, une commission due à l'acceptation. Kalslo suit quelles obligations sont réglées, en attente ou verrouillées à un moment donné.",
      },
      {
        slug: "corridor",
        term: "Corridor",
        shortDefinition: "Une route commerciale entre deux régions, comme l'Europe et le Golfe.",
        explanation:
          "Un corridor regroupe les participants typiques, les risques et les schémas de règlement du commerce circulant entre deux régions. Les événements — comme une perturbation de transport — sont liés aux corridors qu'ils affectent, pour donner une vue d'ensemble au-delà d'un seul contrat.",
      },
    ],
  },
};