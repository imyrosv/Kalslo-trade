export const onboardingContent = {
  en: {
    title: "Get to know Kalslo",
    subtitle: "A few things to explore before you're fully up to speed.",
    steps: {
      state: { label: "Explore Kalslo State", description: "See what's moving, blocked or settling right now" },
      corridors: { label: "Check a corridor", description: "Understand a real trade route between two regions" },
      tradeStates: { label: "Follow a Trade State", description: "See how a contract moves from proposal to settlement" },
      signals: { label: "Read a settlement signal", description: "Understand how Kalslo reads risk on a corridor" },
    },
    cta: "Start exploring",
    dismiss: "Maybe later",
  },
  fr: {
    title: "Découvrir Kalslo",
    subtitle: "Quelques pages à explorer pour bien comprendre le système.",
    steps: {
      state: { label: "Explorer Kalslo State", description: "Voir ce qui bouge, bloque ou se règle en ce moment" },
      corridors: { label: "Consulter un corridor", description: "Comprendre une route commerciale réelle entre deux régions" },
      tradeStates: { label: "Suivre un Trade State", description: "Voir comment un contrat évolue de la proposition au règlement" },
      signals: { label: "Lire un signal de règlement", description: "Comprendre comment Kalslo évalue le risque sur un corridor" },
    },
    cta: "Commencer l'exploration",
    dismiss: "Plus tard",
  },
} as const;