import { boolean, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { generateIdFromEntropySize } from "lucia";
import { projects } from "./projects";

export const documents = pgTable(
  "documents",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateIdFromEntropySize(10)),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),
    slug: text("slug").notNull(),
    isComplete: boolean("is_complete").notNull().default(false),
    content: text("content"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    un: unique().on(table.projectId, table.slug),
  })
);
