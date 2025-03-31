import { env } from "@/config/env-config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  min: 1,
  max: 10,
});

export const db = drizzle(pool);
