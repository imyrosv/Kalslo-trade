export type TradeStage =
  | "proposed" | "confirmed" | "funded"
  | "shipped" | "delivered" | "accepted" | "settled";

export type ObligationStatus = "settled" | "pending" | "locked";

export type SettlementState =
  | "not_started" | "ready" | "partially_locked" | "blocked"
  | "pending_proof" | "settling" | "settled" | "exception";

export type TradeState = {
  corridorName: string;
  contractValueLabel: string;
  contractValue: string;
  currenciesLabel: string;
  currencies: string;
  participantsLabel: string;
  participants: string[];
  currentStage: TradeStage;
  settlementStateLabel: string;
  settlementState: SettlementState;
  obligationsLabel: string;
  obligations: { label: string; trigger: string; status: ObligationStatus }[];
  illustrativeNote: string;
  backLink: string;
};

const stages: TradeStage[] = [
  "proposed", "confirmed", "funded", "shipped", "delivered", "accepted", "settled",
];

export const stageLabels: Record<"en" | "fr", Record<TradeStage, string>> = {
  en: {
    proposed: "Proposed",
    confirmed: "Confirmed",
    funded: "Funded",
    shipped: "Shipped",
    delivered: "Delivered",
    accepted: "Accepted",
    settled: "Settled",
  },
  fr: {
    proposed: "Proposé",
    confirmed: "Confirmé",
    funded: "Financé",
    shipped: "Expédié",
    delivered: "Livré",
    accepted: "Accepté",
    settled: "Réglé",
  },
};

export const settlementStateLabels: Record<"en" | "fr", Record<SettlementState, string>> = {
  en: {
    not_started: "Not started",
    ready: "Ready",
    partially_locked: "Partially locked",
    blocked: "Blocked",
    pending_proof: "Pending proof",
    settling: "Settling",
    settled: "Settled",
    exception: "Exception",
  },
  fr: {
    not_started: "Non démarré",
    ready: "Prêt",
    partially_locked: "Partiellement verrouillé",
    blocked: "Bloqué",
    pending_proof: "Preuve en attente",
    settling: "En cours de règlement",
    settled: "Réglé",
    exception: "Exception",
  },
};

export const stageOrder = stages;

// Point 17 du document : gris = proposed, bleu = in transit/active, mint = settled
export function getStageColorClass(stage: TradeStage): string {
  if (stage === "proposed") return "text-muted-foreground";
  if (stage === "settled") return "text-kalslo-mint";
  return "text-status-active";
}

// Couleurs pour les 8 états de règlement, alignées sur la palette du point 17
export function getSettlementColorClass(state: SettlementState): string {
  switch (state) {
    case "settled":
      return "text-kalslo-mint";
    case "ready":
    case "settling":
      return "text-status-active";
    case "partially_locked":
      return "text-status-risk";
    case "pending_proof":
      return "text-status-proof";
    case "blocked":
    case "exception":
      return "text-status-blocked";
    case "not_started":
    default:
      return "text-muted-foreground";
  }
}

export const tradeStatesContent: Record<"en" | "fr", Record<string, TradeState>> = {
  en: {
    "demo-0001": {
      corridorName: "Europe → Gulf",
      contractValueLabel: "Contract value",
      contractValue: "€250,000",
      currenciesLabel: "Currencies",
      currencies: "EUR / AED",
      participantsLabel: "Participants",
      participants: ["Buyer", "Seller", "Supplier", "Agent"],
      currentStage: "shipped",
      settlementStateLabel: "Settlement state",
      settlementState: "partially_locked",
      obligationsLabel: "Obligations",
      obligations: [
        { label: "30% deposit", trigger: "Order confirmed", status: "settled" },
        { label: "50% payment", trigger: "Shipment proven", status: "settled" },
        { label: "20% balance", trigger: "Delivery confirmed", status: "pending" },
        { label: "Agent commission", trigger: "Delivery accepted", status: "pending" },
        { label: "Guarantee reserve", trigger: "Contractual deadline", status: "locked" },
      ],
      illustrativeNote: "Illustrative contract flow — not a live transaction.",
      backLink: "Back to Kalslo State",
    },
  },
  fr: {
    "demo-0001": {
      corridorName: "Europe → Golfe",
      contractValueLabel: "Valeur du contrat",
      contractValue: "250 000 €",
      currenciesLabel: "Devises",
      currencies: "EUR / AED",
      participantsLabel: "Participants",
      participants: ["Acheteur", "Vendeur", "Fournisseur", "Agent"],
      currentStage: "shipped",
      settlementStateLabel: "État du règlement",
      settlementState: "partially_locked",
      obligationsLabel: "Obligations",
      obligations: [
        { label: "Acompte de 30%", trigger: "Commande confirmée", status: "settled" },
        { label: "Paiement de 50%", trigger: "Expédition prouvée", status: "settled" },
        { label: "Solde de 20%", trigger: "Livraison confirmée", status: "pending" },
        { label: "Commission de l'agent", trigger: "Livraison acceptée", status: "pending" },
        { label: "Réserve de garantie", trigger: "Délai contractuel", status: "locked" },
      ],
      illustrativeNote: "Flux contractuel illustratif — pas une transaction réelle.",
      backLink: "Retour à Kalslo State",
    },
  },
};