"use client";
import { useRef } from "react";
import { LiftButton } from "./LiftButton";

export default function Page() {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Ref as a prop — Lift Button</h2>
      <LiftButton ref={ref} onClick={() => alert("Ski ya later!")} />
      <p className="text-sm text-gray-600">Function components accept <code>ref</code> without forwardRef.</p>
    </section>
  );
}
