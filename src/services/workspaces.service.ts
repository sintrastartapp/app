import "server-only";

import { db } from "@/database";
import { workspaces, workspacesMembers } from "@/database/schema";
import { and, eq } from "drizzle-orm";

type CreateWorkspaceData = {
  userId: string;
  name: string;
  description?: string;
};

export class WorkspacesService {
  static async getPersonalWorkspace(userId: string) {
    const [workspace] = await db
      .select()
      .from(workspaces)
      .where(
        and(eq(workspaces.ownerId, userId), eq(workspaces.name, "Personal"))
      );

    if (workspace) return workspace;

    // Create personal workspace if it doesn't exist
    const createdWorkspace = await this.createWorkspace({
      userId,
      name: "Personal",
      description: "Your personal workspace",
    });

    return createdWorkspace;
  }

  static async createWorkspace(data: CreateWorkspaceData) {
    return db.transaction(async (trx) => {
      const [createdWorkspace] = await trx
        .insert(workspaces)
        .values({
          ownerId: data.userId,
          name: data.name,
          description: data.description,
        })
        .onConflictDoNothing()
        .returning({ id: workspaces.id });

      // Insert user into personal workspace
      await trx
        .insert(workspacesMembers)
        .values({
          workspaceId: createdWorkspace.id,
          userId: data.userId,
          role: "owner",
          acceptedAt: new Date(),
        })
        .onConflictDoNothing();

      return createdWorkspace;
    });
  }
}
