export type TrustBadgeVariant =
  | "verified_event"
  | "kalslo_analysis"
  | "illustrative_trade_flow"
  | "kalslo_network_data";

const variantStyles: Record<TrustBadgeVariant, string> = {
  verified_event: "bg-kalslo-mint/10 text-kalslo-deep",
  kalslo_analysis: "bg-kalslo-violet/10 text-kalslo-violet",
  illustrative_trade_flow: "bg-muted text-muted-foreground",
  kalslo_network_data: "bg-kalslo-deep/10 text-kalslo-deep",
};

const dotColors: Record<TrustBadgeVariant, string> = {
  verified_event: "bg-kalslo-mint",
  kalslo_analysis: "bg-kalslo-violet",
  illustrative_trade_flow: "bg-muted-foreground",
  kalslo_network_data: "bg-kalslo-deep",
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
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-label text-xs font-semibold ${variantStyles[variant]}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColors[variant]}`} />
      {labels[locale][variant]}
    </span>
  );
}