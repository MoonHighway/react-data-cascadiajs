import TrailStatusCard from "./TrailStatus";

export default function Page() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">use(promise) — Trail Status</h2>
      <TrailStatusCard />
      <p className="text-sm text-gray-600">Read a promise directly in a server component.</p>
    </section>
  );
}
