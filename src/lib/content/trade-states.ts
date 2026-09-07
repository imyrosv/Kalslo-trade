export type TradeStage =
  | "proposed" | "confirmed" | "funded"
  | "shipped" | "delivered" | "accepted" | "settled";

export type ObligationStatus = "settled" | "pending" | "locked";

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
  settlementState: string;
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

export const stageOrder = stages;

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
      settlementState: "Partially locked",
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
      settlementState: "Partiellement verrouillé",
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