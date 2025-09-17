"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Task } from "../types/task";

// Simple in-memory storage for the workshop (in production, use a database)
let skiRunsDatabase: Task[] = [
  {
    id: '1',
    name: 'Steep & Deep',
    mountain: 'Jackson Hole',
    title: 'Steep & Deep',
    description: 'Epic double black diamond run with fresh powder',
    completed: false,
    difficulty: 'double-black',
    priority: 'high',
    conditions: 'powder',
    vertical: 2500,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    notes: 'Fresh 12" overnight! Expert terrain only. 🎿⚫⚫'
  },
  {
    id: '2',
    name: 'Whistler Village Run',
    mountain: 'Whistler Blackcomb',
    title: 'Whistler Village Run',
    description: 'Perfect intermediate cruiser with stunning views',
    completed: false,
    difficulty: 'blue',
    priority: 'medium',
    conditions: 'groomed',
    vertical: 1800,
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-14'),
    notes: 'Perfectly groomed corduroy. Great for carving! 🔵'
  },
  {
    id: '3',
    name: 'Bunny Slope Warmup',
    mountain: 'Local Resort',
    title: 'Bunny Slope Warmup',
    description: 'Easy warm-up run to start the day',
    completed: true,
    difficulty: 'green',
    priority: 'low',
    conditions: 'perfect',
    vertical: 150,
    createdAt: new Date('2025-01-13'),
    updatedAt: new Date('2025-01-16'),
    completedAt: new Date('2025-01-16'),
    notes: 'Perfect warm-up! Legs feeling good for harder runs. 🟢'
  },
  {
    id: '4',
    name: 'Mogul Madness',
    mountain: 'Aspen Mountain',
    title: 'Mogul Madness',
    description: 'Challenging mogul field for advanced skiers',
    completed: false,
    difficulty: 'black',
    priority: 'high',
    conditions: 'moguls',
    vertical: 1200,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    notes: 'Huge moguls! Need to work on technique. ⛰️⚫'
  }
];

// Export function to get ski runs (used by TaskList component)
export async function getSkiRuns(): Promise<Task[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...skiRunsDatabase]; // Return a copy
}

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

  // Create new ski run
  const newRun: Task = {
    id: Date.now().toString(), // Simple ID generation for demo
    name: runName,
    title: runName,
    description: `${difficulty} run at ${mountain}`,
    mountain,
    difficulty,
    conditions,
    vertical,
    notes: notes || '',
    completed: false,
    priority: difficulty === 'double-black' || difficulty === 'black' ? 'high' :
             difficulty === 'blue' ? 'medium' : 'low',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Add to our in-memory database
  skiRunsDatabase.unshift(newRun); // Add to beginning of array

  console.log("🎿 Added new ski run:", newRun);

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Revalidate the page to show the new data
  revalidatePath("/");

  return {
    success: true,
    message: `Ski run "${runName}" logged successfully! 🎿`,
  };
}

// Server Action for toggling run completion
export async function toggleSkiRun(runId: string) {
  const run = skiRunsDatabase.find(r => r.id === runId);
  if (run) {
    run.completed = !run.completed;
    run.updatedAt = new Date();
    if (run.completed) {
      run.completedAt = new Date();
    } else {
      delete run.completedAt;
    }

    // Revalidate the page
    revalidatePath("/");

    return {
      success: true,
      message: run.completed ? "Run marked as completed! 🎉" : "Run marked as incomplete"
    };
  }

  throw new Error("Ski run not found");
}