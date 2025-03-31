import "server-only";

import { getAgentById } from "@/config/assistants";
import { db } from "@/database";
import {
  chats,
  chatsMessages,
  projects,
  users,
  usersTracker,
} from "@/database/schema";
import { asc, between, count, eq } from "drizzle-orm";

export class DashboardService {
  static async getRegisteredUsersCount(startDate: Date, endDate: Date) {
    const [row] = await db
      .select({
        count: count(),
      })
      .from(users)
      .where(between(users.createdAt, startDate, endDate));

    return row?.count ?? 0;
  }

  static async getActiveUsersCount(startDate: Date, endDate: Date) {
    const subQuery = db
      .select({
        userId: usersTracker.userId,
      })
      .from(usersTracker)
      .where(between(usersTracker.createdAt, startDate, endDate))
      .groupBy(usersTracker.userId);

    const query = db
      .select({
        count: count(),
      })
      .from(subQuery.as("t"));

    const [row] = await query;

    return row?.count ?? 0;
  }

  static async getUserChats(userId: string) {
    const rows = await db
      .select({
        id: chats.id,
        assistantId: chats.assistantId,
      })
      .from(chats)
      .innerJoin(chatsMessages, eq(chats.id, chatsMessages.chatId))
      .innerJoin(projects, eq(chats.projectId, projects.id))
      .where(eq(projects.ownerId, userId))
      .groupBy(chats.id, chats.assistantId);

    return rows.map((row) => ({
      id: row.id,
      assistantId: row.assistantId,
      name: getAgentById(row.assistantId)?.name,
    }));
  }

  static async getChatMessages(chatId: string) {
    const rows = await db
      .select({
        id: chatsMessages.id,
        role: chatsMessages.role,
        content: chatsMessages.message,
        createdAt: chatsMessages.createdAt,
        user: {
          id: users.id,
          name: users.name,
          photo: users.photo,
        },
      })
      .from(chatsMessages)
      .leftJoin(users, eq(chatsMessages.userId, users.id))
      .where(eq(chatsMessages.chatId, chatId))
      .orderBy(asc(chatsMessages.createdAt));

    return rows;
  }
}
