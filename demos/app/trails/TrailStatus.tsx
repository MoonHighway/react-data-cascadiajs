type Status = {
  trail: string;
  open: boolean;
  reason?: string;
};

function getTrailStatus(): Promise<Status> {
  return new Promise((r) =>
    setTimeout(
      () =>
        r({
          trail: "North Bowl Trees",
          open: false,
          reason: "Avalanche control",
        }),
      500
    )
  );
}

export default function TrailStatusCard() {
  // React 19's `use` in Server Components allows reading a promise directly.
  // In a client component, you'd call this in an effect, but here we stream it.
  // @ts-expect-error React 19 `use` is a global in server components via JSX transform
  const status = (use as any)(getTrailStatus());
  return (
    <div className="border p-3 rounded">
      <h3 className="font-semibold">
        Trail: {status.trail}
      </h3>
      <p>
        {status.open ? "✅ Open" : "🚫 Closed"}
        {status.reason ? ` — ${status.reason}` : ""}
      </p>
    </div>
  );
}
