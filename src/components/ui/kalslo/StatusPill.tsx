type Status = "elevated" | "normal" | "resolved";

const statusStyles: Record<Status, string> = {
  elevated: "bg-status-risk/10 text-status-risk border-status-risk/30",
  normal: "bg-status-settled/10 text-status-settled border-status-settled/30",
  resolved: "bg-muted text-muted-foreground border-border",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-label text-xs uppercase tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}