import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema",
  out: "./migrations",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
