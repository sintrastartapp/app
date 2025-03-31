import { pgEnum, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { generateIdFromEntropySize } from "lucia";
import { users } from "./users";

export const workspaceRole = pgEnum("role", ["owner", "admin", "member"]);

export const workspaces = pgTable(
  "workspaces",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateIdFromEntropySize(10)),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    un: unique().on(table.name, table.ownerId),
  })
);

export const workspacesMembers = pgTable("workspaces_members", {
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, {
      onDelete: "cascade",
    }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  role: workspaceRole("role").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  acceptedAt: timestamp("accepted_at"),
});
