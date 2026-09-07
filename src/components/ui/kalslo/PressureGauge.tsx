import { pressureLevelOrder, type PressureLevel } from "@/lib/content/signals";

const levelColors: Record<PressureLevel, string> = {
  low: "bg-status-settled",
  moderate: "bg-kalslo-mint",
  elevated: "bg-status-risk",
  severe: "bg-status-blocked",
};

export function PressureGauge({
  level,
  label,
}: {
  level: PressureLevel;
  label: string;
}) {
  const activeIndex = pressureLevelOrder.indexOf(level);

  return (
    <div>
      <p className={`font-label text-sm font-semibold ${
        level === "elevated" || level === "severe" ? "text-status-risk" : "text-kalslo-deep"
      }`}>
        {label}
      </p>
      <div className="mt-3 flex gap-1.5">
        {pressureLevelOrder.map((lvl, index) => (
          <div
            key={lvl}
            className={`h-2 flex-1 rounded-full ${
              index <= activeIndex ? levelColors[level] : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}