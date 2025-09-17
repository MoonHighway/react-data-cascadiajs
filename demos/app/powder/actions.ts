"use server";
import { unstable_noStore as noStore } from "next/cache";
export async function submitRating(rating: { user: string; score: number }) {
  noStore();
  await new Promise((r) => setTimeout(r, 700));
  return rating;
}
