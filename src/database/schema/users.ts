import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  emailVerified: boolean("email_verified"),
  photo: text("photo"),
  onboarding: smallint("onboarding").default(0).notNull(),
  role: userRoleEnum("role").notNull().default("USER"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  lastSignInAt: timestamp("last_sign_in_at"),
});

export const usersProfile = pgTable("users_profile", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .unique(),
  companyName: text("company_name"),
  companyWebsite: text("company_website"),
  feedbackCompleted: boolean("feedback_completed").notNull().default(false),
});

export const usersTracker = pgTable("users_tracker", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  action: text("action").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
