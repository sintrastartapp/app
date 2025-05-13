import { env } from "@/config/env-config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

// const pool = new Pool({
//   connectionString: env.DATABASE_URL,
//   min: 1,
//   max: 15,
// });

// export const db = drizzle(pool);
