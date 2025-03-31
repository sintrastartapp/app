"use server";

import { revalidatePath } from "next/cache";

export async function revalidate(path: string, cacheKey?: "layout" | "page") {
  revalidatePath(path, cacheKey);
}
