import { env } from "@/config/env-config";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function createThreadId() {
  const { id } = await openai.beta.threads.create({});

  return id;
}
