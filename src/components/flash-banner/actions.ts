"use server";

import { deleteCookie } from "@/lib/utils/server";

export async function removeFlash() {
  deleteCookie("flash");
}
