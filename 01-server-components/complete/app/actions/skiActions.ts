"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// React 19 Server Action for adding ski runs
export async function addSkiRun(formData: FormData) {
  // Extract form data
  const runName = formData.get("runName") as string;
  const mountain = formData.get("mountain") as string;
  const difficulty = formData.get("difficulty") as
    | "green"
    | "blue"
    | "black"
    | "double-black";
  const conditions = formData.get("conditions") as
    | "powder"
    | "groomed"
    | "moguls"
    | "icy"
    | "perfect";
  const vertical =
    parseInt(formData.get("vertical") as string) || 0;
  const notes = formData.get("notes") as string;

  // Validate required fields
  if (!runName || !mountain) {
    throw new Error("Run name and mountain are required");
  }

  // Simulate API call to save ski run
  console.log("🎿 Adding new ski run:", {
    runName,
    mountain,
    difficulty,
    conditions,
    vertical,
    notes,
    timestamp: new Date().toISOString(),
  });

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, you'd save to database here
  // await db.skiRuns.create({ ... })

  // Revalidate the page to show the new data
  revalidatePath("/");

  // Could redirect or return success
  // For this demo, we'll just return success
  return {
    success: true,
    message: "Ski run logged successfully! 🎿",
  };
}

// Server Action for toggling run completion
