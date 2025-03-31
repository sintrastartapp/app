import "server-only";

import { db } from "@/database";
import { documents, projects, users } from "@/database/schema";
import { and, eq } from "drizzle-orm";

export class DocumentsService {
  static async getDocumentById(id: string) {
    const rows = await db
      .select({
        id: documents.id,
        projectId: projects.id,
        slug: documents.slug,
        content: documents.content,
        createdAt: documents.createdAt,
        updatedAt: documents.updatedAt,
        owner: {
          id: users.id,
          name: users.name,
          photo: users.photo,
        },
      })
      .from(documents)
      .innerJoin(projects, eq(documents.projectId, projects.id))
      .innerJoin(users, eq(users.id, projects.ownerId))
      .where(eq(documents.id, id));

    if (!rows.length) {
      return null;
    }

    return rows[0];
  }

  static async getDocument(projectId: string, slug: string) {
    const [document] = await db
      .select()
      .from(documents)
      .where(and(eq(documents.projectId, projectId), eq(documents.slug, slug)));

    if (!document) {
      // Create document if it doesn't exist
      const [doc] = await db
        .insert(documents)
        .values({
          projectId,
          slug,
        })
        .onConflictDoNothing()
        .returning();

      return doc;
    }

    return document;
  }

  static async saveDocument(projectId: string, slug: string, content: string) {
    await db
      .update(documents)
      .set({ content })
      .where(and(eq(documents.projectId, projectId), eq(documents.slug, slug)));
  }

  static async markDocumentComplete(
    projectId: string,
    slug: string,
    state: boolean = true
  ) {
    await db
      .update(documents)
      .set({ isComplete: state })
      .where(and(eq(documents.projectId, projectId), eq(documents.slug, slug)));
  }
}

export type GetDocumentsResponse = Awaited<
  ReturnType<typeof DocumentsService.getDocument>
>;
