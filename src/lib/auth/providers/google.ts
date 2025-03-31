import { env } from "@/config/env-config";
import { Google } from "arctic";

export const google = new Google(
  env.OAUTH_GOOGLE_CLIENT_ID,
  env.OAUTH_GOOGLE_CLIENT_SECRET,
  env.OAUTH_GOOGLE_CALLBACK_URL
);
