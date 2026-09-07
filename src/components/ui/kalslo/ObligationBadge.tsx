type ObligationStatus = "settled" | "pending" | "locked";

const styles: Record<ObligationStatus, string> = {
  settled: "bg-status-settled/10 text-status-settled border-status-settled/30",
  pending: "bg-status-risk/10 text-status-risk border-status-risk/30",
  locked: "bg-status-blocked/10 text-status-blocked border-status-blocked/30",
};

const labels: Record<ObligationStatus, string> = {
  settled: "Settled",
  pending: "Pending",
  locked: "Locked",
};

export function ObligationBadge({ status }: { status: ObligationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-label text-xs ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}