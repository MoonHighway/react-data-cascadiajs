"use client";

import { useActionState } from "react";

type State = { message: string };

export default function AddSkiDay({ add }: { add: (f: FormData) => Promise<State> }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, form) => {
      const date = form.get("date") as string;
      const resort = form.get("resort") as string;
      const ok = await add(form);
      return ok
        ? { message: `✅ Logged ${resort} on ${date}` }
        : { message: "❌ Could not log day." };
    },
    { message: "" }
  );

  return (
    <form action={formAction} className="flex gap-2 items-end">
      <label className="flex flex-col">
        Date
        <input name="date" type="date" required className="border px-2 py-1 rounded" />
      </label>
      <label className="flex flex-col">
        Resort
        <input name="resort" placeholder="Alpine Meadows" required className="border px-2 py-1 rounded" />
      </label>
      <button disabled={pending} className="px-3 py-1 border rounded">
        {pending ? "Adding…" : "Add Ski Day"}
      </button>
      <p aria-live="polite">{state.message}</p>
    </form>
  );
}
