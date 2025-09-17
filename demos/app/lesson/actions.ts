"use server";
export async function bookLesson(formData: FormData) {
  await new Promise((r) => setTimeout(r, 800));
  return { ok: true };
}
