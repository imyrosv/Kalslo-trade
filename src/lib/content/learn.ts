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
      {
        slug: "payment-trigger",
        term: "Payment trigger",
        shortDefinition: "The specific event that unlocks a payment — for example, proof of shipment or delivery.",
        explanation:
          "Most commercial contracts don't release money automatically. Each payment is tied to a trigger: an order confirmation, a proof of shipment, a delivery acceptance. Until that trigger is met and verified, the corresponding payment stays pending or locked, even if the money is already set aside.",
      },
      {
        slug: "delivery-proof",
        term: "Delivery proof",
        shortDefinition: "Documented evidence that goods have arrived and been accepted by the buyer.",
        explanation:
          "Delivery proof is usually what unlocks the final balance of a contract. It can take the form of a signed delivery note, a customs clearance record, or a buyer confirmation. When shipping is disrupted, delivery proof is often the first thing delayed — which is why a logistics problem quickly becomes a payment problem.",
      },
      {
        slug: "settlement-pressure",
        term: "Settlement pressure",
        shortDefinition: "A qualitative read of how likely obligations on a corridor are to be delayed right now.",
        explanation:
          "Settlement pressure is not a market price or a probability — it's Kalslo's qualitative assessment of risk, based on verified events and their likely effect on delivery, payment triggers and FX exposure along a corridor. Levels range from Low to Severe.",
      },
      {
        slug: "shipment-delay-locks-payment",
        term: "Why can a shipment delay lock a payment?",
        shortDefinition: "Because most contracts release payment only after proof that goods have moved or arrived.",
        explanation:
          "If a payment is triggered by 'proof of shipment' or 'delivery confirmation', a shipping delay directly delays that proof — even though the goods, the buyer and the money are all still there. The payment isn't cancelled, it's simply stuck waiting for a condition that hasn't been met yet. This is the core mechanism Kalslo tracks across every corridor.",
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
      {
        slug: "payment-trigger",
        term: "Déclencheur de paiement",
        shortDefinition: "L'événement précis qui débloque un paiement — par exemple, une preuve d'expédition ou de livraison.",
        explanation:
          "La plupart des contrats commerciaux ne libèrent pas l'argent automatiquement. Chaque paiement est lié à un déclencheur : une confirmation de commande, une preuve d'expédition, une acceptation de livraison. Tant que ce déclencheur n'est pas atteint et vérifié, le paiement correspondant reste en attente ou verrouillé, même si l'argent est déjà mis de côté.",
      },
      {
        slug: "delivery-proof",
        term: "Preuve de livraison",
        shortDefinition: "Une preuve documentée que les biens sont arrivés et ont été acceptés par l'acheteur.",
        explanation:
          "La preuve de livraison est généralement ce qui débloque le solde final d'un contrat. Elle peut prendre la forme d'un bon de livraison signé, d'un dédouanement ou d'une confirmation de l'acheteur. Quand le transport est perturbé, la preuve de livraison est souvent la première chose retardée — ce qui explique pourquoi un problème logistique devient rapidement un problème de paiement.",
      },
      {
        slug: "settlement-pressure",
        term: "Pression sur le règlement",
        shortDefinition: "Une lecture qualitative de la probabilité que les obligations d'un corridor soient retardées en ce moment.",
        explanation:
          "La pression sur le règlement n'est ni un prix de marché ni une probabilité — c'est l'évaluation qualitative de Kalslo, fondée sur des événements vérifiés et leur effet probable sur la livraison, les déclencheurs de paiement et l'exposition au change d'un corridor. Les niveaux vont de Faible à Sévère.",
      },
      {
        slug: "shipment-delay-locks-payment",
        term: "Pourquoi un retard d'expédition peut-il verrouiller un paiement ?",
        shortDefinition: "Parce que la plupart des contrats ne libèrent le paiement qu'après preuve que les biens ont bougé ou sont arrivés.",
        explanation:
          "Si un paiement est déclenché par une 'preuve d'expédition' ou une 'confirmation de livraison', un retard de transport retarde directement cette preuve — même si les biens, l'acheteur et l'argent sont toujours là. Le paiement n'est pas annulé, il attend simplement une condition qui n'a pas encore été remplie. C'est le mécanisme central que Kalslo suit sur chaque corridor.",
      },
    ],
  },
};