type Status = "elevated" | "normal" | "resolved";

const statusStyles: Record<Status, string> = {
  elevated: "bg-status-risk text-white",
  normal: "bg-status-settled text-white",
  resolved: "bg-muted-foreground text-white",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-label text-xs font-semibold uppercase tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}