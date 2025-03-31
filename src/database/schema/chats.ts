import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { generateIdFromEntropySize } from "lucia";
import { projects } from "./projects";
import { users } from "./users";

export const chats = pgTable("chats", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),
  assistantId: text("assistant_id").notNull(),
  threadId: text("thread_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatsMessages = pgTable("chats_messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  chatId: text("chat_id")
    .notNull()
    .references(() => chats.id, {
      onDelete: "cascade",
    }),
  userId: text("users_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  role: text("role")
    .$type<"system" | "user" | "assistant" | "function" | "data" | "tool">()
    .notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
