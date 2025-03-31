import { env } from "@/config/env-config";
import pino from "pino";

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
});
