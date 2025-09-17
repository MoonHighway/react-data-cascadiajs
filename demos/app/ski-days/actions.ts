"use server";

export async function addSkiDay(input: { date: string; resort: string }) {
  // fake latency & pretend DB write
  await new Promise((r) => setTimeout(r, 600));
  return true;
}
