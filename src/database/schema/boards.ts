import { ColumnId } from "@/components/kanban/kanban-board";
import { UniqueIdentifier } from "@dnd-kit/core";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { generateIdFromEntropySize } from "lucia";
import { projects } from "./projects";
import { users } from "./users";

export const boards = pgTable("boards", {
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
});

export const boardTasks = pgTable("board_tasks", {
  id: text("id")
    .$type<UniqueIdentifier>()
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  boardId: text("board_id")
    .notNull()
    .references(() => boards.id, {
      onDelete: "cascade",
    }),
  column: text("column").$type<ColumnId>().notNull(),
  position: integer("position").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  assignedTo: text("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
