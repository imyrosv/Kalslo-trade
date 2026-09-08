import { Ship, Landmark, ArrowLeftRight, CreditCard, Zap, type LucideIcon } from "lucide-react";
import type { EventCategory } from "@/lib/content/events";

const categoryIcons: Record<EventCategory, LucideIcon> = {
  logistics: Ship,
  "trade-finance": Landmark,
  fx: ArrowLeftRight,
  payments: CreditCard,
  energy: Zap,
};

export function CategoryIcon({
  category,
  className,
}: {
  category: EventCategory;
  className?: string;
}) {
  const Icon = categoryIcons[category];
  return <Icon className={className} strokeWidth={1.75} />;
}