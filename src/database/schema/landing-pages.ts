import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { generateIdFromEntropySize } from "lucia";
import { projects } from "./projects";

export const landingPagesStates = pgEnum("landing_page_state", [
  "initial",
  "generating",
  "draft",
  "published",
]);

export const landingPages = pgTable("landing_pages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),
  state: landingPagesStates("state").notNull().default("initial"),
  publicId: text("public_id")
    .notNull()
    .$defaultFn(() => generateIdFromEntropySize(16)),
  startupLogo: text("startup_logo").notNull().default(""),
  startupLogoWidth: integer("startup_logo_width").notNull().default(325),
  startupLogoHeight: integer("startup_logo_height").notNull().default(105),
  startupName: text("startup_name").notNull(),
  heroTitle: text("hero_title").notNull(),
  oneLinerPitch: text("one_liner_pitch").notNull(),
  formName: text("form_name").notNull(),
  formLink: text("form_link").notNull(),
  demoVideoLink: text("demo_video_link").notNull(),
  photoLink: text("photo_link").notNull(),
  keyBenefitsHeader: text("key_benefits_header")
    .notNull()
    .default("Key Benefits"),
  keyBenefits1Title: text("key_benefits_1_title").notNull(),
  keyBenefits1Description: text("key_benefits_1_description").notNull(),
  keyBenefits2Title: text("key_benefits_2_title").notNull(),
  keyBenefits2Description: text("key_benefits_2_description").notNull(),
  keyBenefits3Title: text("key_benefits_3_title").notNull(),
  keyBenefits3Description: text("key_benefits_3_description").notNull(),
  featuresHeader: text("features_header").notNull().default("Features"),
  feature1Title: text("feature_1_title").notNull(),
  feature1Description: text("feature_1_description").notNull(),
  feature2Title: text("feature_2_title").notNull(),
  feature2Description: text("feature_2_description").notNull(),
  feature3Title: text("feature_3_title").notNull(),
  feature3Description: text("feature_3_description").notNull(),
});
