import { boards, boardTasks } from "./boards";
import { chats, chatsMessages } from "./chats";
import { documents } from "./documents";
import { landingPages } from "./landing-pages";
import { projectRole, projects, projectsMembers } from "./projects";
import { users, usersProfile } from "./users";

export type UserInsert = typeof users.$inferInsert;
export type UserSelect = typeof users.$inferSelect;

export type UserProfileInsert = typeof usersProfile.$inferInsert;
export type UserProfileSelect = typeof usersProfile.$inferSelect;

export type ProjectInsert = typeof projects.$inferInsert;
export type ProjectSelect = typeof projects.$inferSelect;

export type ProjectRoleEnum = (typeof projectRole.enumValues)[number];

export type ProjectMembersInsert = typeof projectsMembers.$inferInsert;
export type ProjectMembersSelect = typeof projectsMembers.$inferSelect;

export type ChatInsert = typeof chats.$inferInsert;
export type ChatSelect = typeof chats.$inferSelect;

export type ChatMessagesInsert = typeof chatsMessages.$inferInsert;
export type ChatMessageSelect = typeof chatsMessages.$inferSelect;

export type DocumentInsert = typeof documents.$inferInsert;
export type DocumentSelect = typeof documents.$inferSelect;

export type BoardInsert = typeof boards.$inferInsert;
export type BoardSelect = typeof boards.$inferSelect;

export type BoardTaskInsert = typeof boardTasks.$inferInsert;
export type BoardTaskSelect = typeof boardTasks.$inferSelect;

export type LandingPageInsert = typeof landingPages.$inferInsert;
export type LandingPageSelect = typeof landingPages.$inferSelect;
