import "server-only";

import { db } from "@/database";
import {
  boards,
  BoardTaskInsert,
  boardTasks,
  projects,
  projectsMembers,
  users,
} from "@/database/schema";
import { jsonAggBuildObject } from "@/database/utils";
import { and, count, eq } from "drizzle-orm";

export class BoardsService {
  static deleteTask(taskId: string) {
    return db.delete(boardTasks).where(eq(boardTasks.id, taskId));
  }

  static async getBoardById(id: string) {
    const query = db
      .select({
        id: boards.id,
        projectId: projects.id,
        slug: boards.slug,
        owner: {
          id: users.id,
          name: users.name,
          photo: users.photo,
        },
        tasks: jsonAggBuildObject(
          {
            id: boardTasks.id,
            column: boardTasks.column,
            position: boardTasks.position,
            title: boardTasks.title,
            description: boardTasks.description,
            createdBy: boardTasks.createdBy,
            assignedTo: boardTasks.assignedTo,
            createdAt: boardTasks.createdAt,
            updatedAt: boardTasks.updatedAt,
          },
          {
            orderBy: {
              colName: boardTasks.position,
              direction: "ASC",
            },
            nullable: {
              description: boardTasks.description,
              assignedTo: boardTasks.assignedTo,
            },
          }
        ),
      })
      .from(boards)
      .leftJoin(boardTasks, eq(boards.id, boardTasks.boardId))
      .innerJoin(projects, eq(boards.projectId, projects.id))
      .innerJoin(users, eq(users.id, projects.ownerId))
      .where(eq(boards.id, id))
      .groupBy(boards.id, projects.id, users.id);

    const rows = await query;

    if (!rows.length) {
      throw new Error("Board not found");
    }

    return rows[0];
  }

  static async getBoard(projectId: string, slug: string) {
    const [board] = await db
      .select()
      .from(boards)
      .where(and(eq(boards.projectId, projectId), eq(boards.slug, slug)));

    if (!board) {
      // Create board if it doesn't exist
      const [createdBoard] = await db
        .insert(boards)
        .values({
          projectId,
          slug,
        })
        .onConflictDoNothing()
        .returning();

      return this.getBoardById(createdBoard.id);
    }

    return this.getBoardById(board.id);
  }

  static async createTask(data: Omit<BoardTaskInsert, "id">) {
    const [createdTask] = await db.insert(boardTasks).values(data).returning();

    return createdTask;
  }

  static async updateTask(
    taskId: string,
    data: Partial<Omit<Partial<BoardTaskInsert>, "id">>
  ) {
    await db.update(boardTasks).set(data).where(eq(boardTasks.id, taskId));
  }

  static async hasBoardPermission(boardId: string, userId: string) {
    const [row] = await db
      .select({
        count: count(),
      })
      .from(boards)
      .innerJoin(projects, eq(boards.projectId, projects.id))
      .innerJoin(projectsMembers, eq(projects.id, projectsMembers.projectId))
      .where(and(eq(boards.id, boardId), eq(projectsMembers.userId, userId)));

    return row?.count > 0;
  }

  static async hasTaskPermission(taskId: string, userId: string) {
    const [row] = await db
      .select({
        count: count(),
      })
      .from(boardTasks)
      .innerJoin(boards, eq(boardTasks.boardId, boards.id))
      .innerJoin(projects, eq(boards.projectId, projects.id))
      .innerJoin(projectsMembers, eq(projects.id, projectsMembers.projectId))
      .where(
        and(eq(boardTasks.id, taskId), eq(projectsMembers.userId, userId))
      );

    return row?.count > 0;
  }
}

export type GetBoardResponse = Awaited<
  ReturnType<typeof BoardsService.getBoard>
>;
