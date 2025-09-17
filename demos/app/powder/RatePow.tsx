"use client";

import { useOptimistic, useState } from "react";
import { submitRating } from "./actions";

type Rating = { user: string; score: number };

export default function RatePow() {
  const [ratings, setRatings] = useState<Rating[]>([{ user: "patroller", score: 8 }]);

  const [optimisticRatings, addOptimistic] = useOptimistic(
    ratings,
    (state, newRating: Rating) => [...state, newRating]
  );

  async function handleRate(score: number) {
    const me = { user: "you", score };
    addOptimistic(me);
    const saved = await submitRating(me);
    setRatings((r) => [...r, saved]);
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[6, 7, 8, 9, 10].map((s) => (
          <button key={s} onClick={() => handleRate(s)} className="px-2 py-1 border rounded">
            {s}/10 ❄️
          </button>
        ))}
      </div>

      <ul className="list-disc pl-6">
        {optimisticRatings.map((r, i) => (
          <li key={i}>
            {r.user}: {r.score}/10
          </li>
        ))}
      </ul>
    </div>
  );
}
