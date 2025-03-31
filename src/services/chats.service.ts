import "server-only";

import { site } from "@/config/constants";
import { db } from "@/database";
import {
  ChatInsert,
  ChatMessagesInsert,
  chats,
  ChatSelect,
  chatsMessages,
  ProjectSelect,
  users,
} from "@/database/schema";
import { createThreadId, openai } from "@/lib/ai/openai";
import { logger } from "@/lib/logger";
import { and, asc, eq, getTableColumns } from "drizzle-orm";
import { User } from "lucia";

export class ChatService {
  static async startConversation(
    chat: ChatSelect,
    project: ProjectSelect,
    user: User
  ) {
    const { startingMessage: startingText } = site.projects;

    if (project.description?.trim().length) {
      await openai.beta.threads.messages.create(chat.threadId, {
        role: "user",
        content: `My project name is ${project.name}.
      And my project description/idea is the following:
      \`\`\`
      ${project.description}
      \`\`\`
      Please if this description/idea is not enough feel free to ask me any questions.
      Please start questions after my "${startingText}" message.`,
      });
    }

    const startingMessage = await openai.beta.threads.messages.create(
      chat.threadId,
      {
        role: "user",
        content: startingText,
      }
    );

    await ChatService.createChatMessage({
      chatId: chat.id,
      userId: user.id,
      role: "user",
      message: startingText,
    });

    const run = await openai.beta.threads.runs.createAndPoll(chat.threadId, {
      assistant_id: chat.assistantId,
      // instructions: `Please address the user as ${user.name}.`,
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(chat.threadId, {
        before: startingMessage.id,
      });

      await Promise.all(
        messages.data.map(({ content, role }) => {
          const messages = content
            .map((m) =>
              m.type === "text"
                ? {
                    message: m.text.value,
                    role: role,
                  }
                : null
            )
            .filter((m) => m !== null);

          for (const message of messages) {
            ChatService.createChatMessage({
              chatId: chat.id,
              role: message.role,
              message: message.message,
            }).then((message) => {
              logger.info({ role, message }, "Chat message saved");
            });
          }
        })
      );
    }
  }

  static async resetChat(chatId: string) {
    await db.delete(chats).where(eq(chats.id, chatId));
  }

  static async getChatById(chatId: string) {
    const [chat] = await db.select().from(chats).where(eq(chats.id, chatId));

    return chat;
  }

  static async getChat(projectId: string, assistantId: string) {
    const [chat] = await db
      .select()
      .from(chats)
      .where(
        and(eq(chats.assistantId, assistantId), eq(chats.projectId, projectId))
      );

    return chat;
  }

  static async getChatMessages(chatId: string) {
    const messages = await db
      .select({
        ...getTableColumns(chatsMessages),
        userName: users.name,
      })
      .from(chatsMessages)
      .leftJoin(users, eq(users.id, chatsMessages.userId))
      .where(eq(chatsMessages.chatId, chatId))
      .orderBy(asc(chatsMessages.createdAt));

    return messages;
  }

  static async createChat(chat: Omit<ChatInsert, "id" | "createdAt">) {
    const [createdChat] = await db
      .insert(chats)
      .values({
        assistantId: chat.assistantId,
        projectId: chat.projectId,
        threadId: chat.threadId,
      })
      .returning();

    return createdChat;
  }

  static async createChatMessage(message: Omit<ChatMessagesInsert, "id">) {
    const [createdMessage] = await db
      .insert(chatsMessages)
      .values({
        chatId: message.chatId,
        userId: message.userId,
        role: message.role,
        message: message.message,
      })
      .returning();

    return createdMessage;
  }

  static async getOrCreateChat(
    data: Omit<ChatInsert, "id" | "createdAt" | "threadId">
  ) {
    const chat = await this.getChat(data.projectId, data.assistantId);

    if (chat) {
      return chat;
    }

    const threadId = await createThreadId();

    return this.createChat({ ...data, threadId });
  }
}

export type GetChatResponse = Awaited<ReturnType<typeof ChatService.getChat>>;

export type GetChatMessagesResponse = Awaited<
  ReturnType<typeof ChatService.getChatMessages>
>;
