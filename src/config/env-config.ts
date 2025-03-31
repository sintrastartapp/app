import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("production"),
    DATABASE_URL: z.string().url(),
    OAUTH_GOOGLE_CLIENT_ID: z.string(),
    OAUTH_GOOGLE_CLIENT_SECRET: z.string(),
    OAUTH_GOOGLE_CALLBACK_URL: z.string(),
    OPENAI_API_KEY: z.string(),
    PUBLIC_URL: z.string(),
    RESEND_KEY: z.string(),
    EMAIL_PUBLIC_URL: z.string().optional(),
    EMAIL_FROM: z.string(),
    ASSISTANT_ID_CRITICAL_HYPOTHESIS: z.string(),
    ASSISTANT_ID_CUSTOMER_INTERVIEW: z.string(),
    ASSISTANT_ID_ELEVATOR_PITCH: z.string(),
    ASSISTANT_ID_EMAIL_BLURB: z.string(),
    ASSISTANT_ID_FINANCIAL_MODEL: z.string(),
    ASSISTANT_ID_GO_TO_MARKET: z.string(),
    ASSISTANT_ID_CUSTOMER_PROFILE: z.string(),
    ASSISTANT_ID_INVESTMENT_DECK: z.string(),
    ASSISTANT_ID_KPI_TREE: z.string(),
    ASSISTANT_ID_LEAN_CANVAS: z.string(),
    ASSISTANT_ID_ONE_PAGER: z.string(),
    ASSISTANT_ID_PIRATE_METRICS: z.string(),
    ASSISTANT_ID_PITCH_STORY: z.string(),
    ASSISTANT_ID_PRD: z.string(),
    ASSISTANT_ID_PRODUCT_DISCOVERY: z.string(),
    ASSISTANT_ID_PRODUCT_OKRS: z.string(),
    ASSISTANT_ID_SWOT_ANALYSIS: z.string(),
    ASSISTANT_ID_USER_STORIES: z.string(),
    ASSISTANT_ID_IDEAL_CUSTOMER_PROFILE: z.string(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().default("https://app.app.vc"),
    NEXT_PUBLIC_HOTJAR_ID: z.string(),
    NEXT_PUBLIC_TAWK_ACCOUNT_ID: z.string(),
    NEXT_PUBLIC_TAWK_WIDGET_ID: z.string(),
    NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email(),
  },
  runtimeEnv: {
    ASSISTANT_ID_CRITICAL_HYPOTHESIS:
      process.env.ASSISTANT_ID_CRITICAL_HYPOTHESIS,
    ASSISTANT_ID_CUSTOMER_INTERVIEW:
      process.env.ASSISTANT_ID_CUSTOMER_INTERVIEW,
    ASSISTANT_ID_ELEVATOR_PITCH: process.env.ASSISTANT_ID_ELEVATOR_PITCH,
    ASSISTANT_ID_EMAIL_BLURB: process.env.ASSISTANT_ID_EMAIL_BLURB,
    ASSISTANT_ID_FINANCIAL_MODEL: process.env.ASSISTANT_ID_FINANCIAL_MODEL,
    ASSISTANT_ID_GO_TO_MARKET: process.env.ASSISTANT_ID_GO_TO_MARKET,
    ASSISTANT_ID_CUSTOMER_PROFILE: process.env.ASSISTANT_ID_CUSTOMER_PROFILE,
    ASSISTANT_ID_INVESTMENT_DECK: process.env.ASSISTANT_ID_INVESTMENT_DECK,
    ASSISTANT_ID_KPI_TREE: process.env.ASSISTANT_ID_KPI_TREE,
    ASSISTANT_ID_LEAN_CANVAS: process.env.ASSISTANT_ID_LEAN_CANVAS,
    ASSISTANT_ID_ONE_PAGER: process.env.ASSISTANT_ID_ONE_PAGER,
    ASSISTANT_ID_PIRATE_METRICS: process.env.ASSISTANT_ID_PIRATE_METRICS,
    ASSISTANT_ID_PITCH_STORY: process.env.ASSISTANT_ID_PITCH_STORY,
    ASSISTANT_ID_PRD: process.env.ASSISTANT_ID_PRD,
    ASSISTANT_ID_PRODUCT_DISCOVERY: process.env.ASSISTANT_ID_PRODUCT_DISCOVERY,
    ASSISTANT_ID_PRODUCT_OKRS: process.env.ASSISTANT_ID_PRODUCT_OKRS,
    ASSISTANT_ID_SWOT_ANALYSIS: process.env.ASSISTANT_ID_SWOT_ANALYSIS,
    ASSISTANT_ID_USER_STORIES: process.env.ASSISTANT_ID_USER_STORIES,
    ASSISTANT_ID_IDEAL_CUSTOMER_PROFILE:
      process.env.ASSISTANT_ID_IDEAL_CUSTOMER_PROFILE,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    NEXT_PUBLIC_TAWK_ACCOUNT_ID: process.env.NEXT_PUBLIC_TAWK_ACCOUNT_ID,
    NEXT_PUBLIC_TAWK_WIDGET_ID: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,
    EMAIL_PUBLIC_URL: process.env.EMAIL_PUBLIC_URL,
    RESEND_KEY: process.env.RESEND_KEY,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    OAUTH_GOOGLE_CLIENT_ID: process.env.OAUTH_GOOGLE_CLIENT_ID,
    OAUTH_GOOGLE_CLIENT_SECRET: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
    OAUTH_GOOGLE_CALLBACK_URL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PUBLIC_URL: process.env.PUBLIC_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
});
