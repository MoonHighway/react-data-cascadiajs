"use client";
import { useFormStatus } from "react-dom";
import { bookLesson } from "./actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="px-3 py-1 border rounded">
      {pending ? "Booking…" : "Book Lesson"}
    </button>
  );
}

export default function LessonForm() {
  return (
    <form action={bookLesson} className="flex gap-2 items-end">
      <input name="skis" placeholder="Length 178 ⛷️" required className="border px-2 py-1 rounded" />
      <select name="temp" className="border px-2 py-1 rounded">
        <option value="cold">Cold (-12° to -4°C)</option>
        <option value="all">All-Temp</option>
        <option value="warm">Warm (0° to +5°C)</option>
      </select>
      <Submit />
    </form>
  );
}
