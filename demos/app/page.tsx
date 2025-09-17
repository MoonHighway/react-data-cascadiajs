import Link from "next/link";

export default function Home() {
  const links = [
    { href: "/ski-days", title: "useActionState + Server Actions — Add a Ski Day" },
    { href: "/lesson", title: "useFormStatus — Ski Lesson Appointment" },
    { href: "/powder", title: "useOptimistic — Powder Ratings" },
    { href: "/trails", title: "use(promise) — Trail Status" },
    { href: "/lifts", title: "Ref as a prop — Lift Button" },
  ];
  return (
    <div className="space-y-4">
      <p>Pick a demo:</p>
      <ul className="list-disc pl-6 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.title}</Link>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-600">
        Each route is self-contained for easy copy/paste into slides or workshops.
      </p>
    </div>
  );
}
