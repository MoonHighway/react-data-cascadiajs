import AddSkiDay from "./AddSkiDay";
import { addSkiDay } from "./actions";

export default function Page() {
  async function add(form: FormData) {
    const date = String(form.get("date"));
    const resort = String(form.get("resort"));
    // call server action (wrapped) — could validate here
    const ok = await addSkiDay({ date, resort });
    return ok ? { message: "ok" } : { message: "error" };
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">useActionState + Server Actions — Add a Ski Day</h2>
      <AddSkiDay add={add} />
      <p className="text-sm text-gray-600">Shows pending state and message reset after submit.</p>
    </section>
  );
}
