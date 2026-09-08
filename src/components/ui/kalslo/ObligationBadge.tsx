type ObligationStatus = "settled" | "pending" | "locked";

const styles: Record<ObligationStatus, string> = {
  settled: "bg-status-settled/10 text-status-settled",
  pending: "bg-status-risk/10 text-status-risk",
  locked: "bg-status-blocked/10 text-status-blocked",
};

const labels: Record<ObligationStatus, string> = {
  settled: "Settled",
  pending: "Pending",
  locked: "Locked",
};

export function ObligationBadge({ status }: { status: ObligationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-label text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}