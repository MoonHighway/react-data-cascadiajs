import LessonForm from "./Form";

export default function Page() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">useFormStatus — Lesson Appointment</h2>
      <LessonForm />
      <p className="text-sm text-gray-600">Button disables and label updates without lifting state.</p>
    </section>
  );
}
