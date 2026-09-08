export type TrustBadgeVariant =
  | "verified_event"
  | "kalslo_analysis"
  | "illustrative_trade_flow"
  | "kalslo_network_data";

const variantStyles: Record<TrustBadgeVariant, string> = {
  verified_event: "border border-kalslo-mint/40 text-kalslo-deep",
  kalslo_analysis: "bg-kalslo-violet text-white",
  illustrative_trade_flow: "border border-dashed border-muted-foreground/40 text-muted-foreground",
  kalslo_network_data: "border border-kalslo-deep/30 bg-kalslo-deep/5 text-kalslo-deep",
};

const labels: Record<"en" | "fr", Record<TrustBadgeVariant, string>> = {
  en: {
    verified_event: "Verified event",
    kalslo_analysis: "Kalslo analysis",
    illustrative_trade_flow: "Illustrative trade flow",
    kalslo_network_data: "Kalslo network data",
  },
  fr: {
    verified_event: "Événement vérifié",
    kalslo_analysis: "Analyse Kalslo",
    illustrative_trade_flow: "Flux illustratif",
    kalslo_network_data: "Données réseau Kalslo",
  },
};

export function TrustBadge({
  variant,
  locale,
}: {
  variant: TrustBadgeVariant;
  locale: "en" | "fr";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-label text-xs ${variantStyles[variant]}`}
    >
      {labels[locale][variant]}
    </span>
  );
}