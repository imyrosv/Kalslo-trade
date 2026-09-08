export function FlagIcon({
  countryCode,
  className,
}: {
  countryCode: string;
  className?: string;
}) {
  return (
    <span
      className={`fi fi-${countryCode} inline-block rounded-sm ${className ?? ""}`}
    />
  );
}