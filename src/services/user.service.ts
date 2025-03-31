import "server-only";

import { db } from "@/database";
import {
  UserInsert,
  UserProfileInsert,
  users,
  usersProfile,
  usersTracker,
} from "@/database/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";

export class UserService {
  static async track(
    userId: string,
    action: string,
    metadata?: Record<string, unknown>
  ) {
    await db.insert(usersTracker).values({
      userId,
      action,
      metadata,
    });
  }

  static async updateUserLoginAt(userId: string) {
    await db
      .update(users)
      .set({ lastSignInAt: new Date() })
      .where(eq(users.id, userId));
  }

  static async deleteUser(id: string) {
    await db.delete(users).where(eq(users.id, id));
  }

  static async getUserByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    return user;
  }

  static async getUserById(id: string) {
    const [user] = await db
      .select({
        ...getTableColumns(users),
        ...getTableColumns(usersProfile),
      })
      .from(users)
      .leftJoin(usersProfile, eq(users.id, usersProfile.userId))
      .where(eq(users.id, id));

    return user;
  }

  static async createUser(user: Partial<Omit<UserInsert, "id">>) {
    const [createdUser] = await db
      .insert(users)
      .values({
        id: generateIdFromEntropySize(10),
        ...user,
      })
      .returning();

    return createdUser;
  }

  static updateUser(data: UserInsert) {
    return db.update(users).set(data).where(eq(users.id, data.id));
  }

  static async updateUserProfile(data: UserProfileInsert) {
    await db.transaction(async (trx) => {
      await trx.insert(usersProfile).values(data).onConflictDoUpdate({
        target: usersProfile.userId,
        set: data,
      });

      await trx
        .update(users)
        .set({
          onboarding: -1,
        })
        .where(eq(users.id, data.userId));
    });
  }

  static async getUsers() {
    const usersRows = await db
      .select({
        ...getTableColumns(users),
        ...getTableColumns(usersProfile),
      })
      .from(users)
      .leftJoin(usersProfile, eq(users.id, usersProfile.userId))
      .orderBy(desc(users.createdAt));

    return usersRows;
  }
}

export type GetUserResponse = Awaited<
  ReturnType<typeof UserService.getUserById>
>;
