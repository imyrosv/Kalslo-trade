"use client";

import { Link2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

const labels = {
  en: { button: "Copy link", success: "Link copied to clipboard." },
  fr: { button: "Copier le lien", success: "Lien copié dans le presse-papiers." },
};

export function CopyLinkButton({ locale }: { locale: "en" | "fr" }) {
  const t = labels[locale];

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.add({ type: "success", description: t.success });
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-kalslo-deep"
    >
      <Link2 className="h-3.5 w-3.5" strokeWidth={1.75} />
      {t.button}
    </button>
  );
}