import RatePow from "./RatePow";

export default function Page() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">useOptimistic — Powder Ratings</h2>
      <RatePow />
      <p className="text-sm text-gray-600">Optimistic UI while the server response settles.</p>
    </section>
  );
}
