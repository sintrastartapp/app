import { pgEnum, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { generateIdFromEntropySize } from "lucia";
import { users } from "./users";
import { workspaces } from "./workspaces";

export const projectRole = pgEnum("role", ["owner", "admin", "member"]);

export const projects = pgTable(
  "projects",
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
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    un: unique().on(table.name, table.ownerId),
  })
);

export const projectsMembers = pgTable("projects_members", {
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  role: projectRole("role").notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  acceptedAt: timestamp("accepted_at"),
});

export const projectsInvitedMembers = pgTable(
  "projects_invited_members",

  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateIdFromEntropySize(10)),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),
    email: text("email").notNull(),
    role: projectRole("role").notNull().default("member"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    un2: unique().on(table.projectId, table.email),
  })
);

export const projectCompleteness = pgTable("project_completeness", {
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),
  section: text("section").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});
