import "server-only";

import { db } from "@/database";
import {
  chats,
  documents,
  LandingPageInsert,
  projectCompleteness,
  ProjectRoleEnum,
  projects,
  projectsInvitedMembers,
  projectsMembers,
  users,
} from "@/database/schema";
import { landingPages } from "@/database/schema/landing-pages";
import { generateLandingPage } from "@/lib/ai/generate-landing-page";
import { improveDescription } from "@/lib/ai/improve-description";
import { ValidationError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { of } from "await-of";
import {
  and,
  asc,
  count,
  eq,
  getTableColumns,
  inArray,
  not,
  sql,
} from "drizzle-orm";
import { generateIdFromEntropySize, User } from "lucia";
import { cache } from "react";

type CreateProjectData = {
  name: string;
  userId: string;
  workspaceId: string;
  description?: string;
};

type UpdateProjectData = {
  id: string;
  userId: string;
  name: string;
  description?: string;
};

type DeleteProjectData = {
  id: string;
  userId: string;
};

type InviteMembersToProjectData = {
  projectId: string;
  userId: string;
  emails: string[];
  role: ProjectRoleEnum;
};

type UpdateProjectMemberRole = {
  type: "member";
  userId: string;
  projectId: string;
  userToUpdateId: string;
  role: ProjectRoleEnum;
};

type UpdateProjectMemberInvitationRole = {
  type: "invitation";
  userId: string;
  projectId: string;
  email: string;
  role: ProjectRoleEnum;
};

export type UpdateProjectMemberRoleData =
  | UpdateProjectMemberInvitationRole
  | UpdateProjectMemberRole;

export type RemoveProjectMemberData =
  | {
      userId: string;
      type: "member";
      projectId: string;
      userToRemoveId: string;
    }
  | {
      userId: string;
      type: "invitation";
      projectId: string;
      email: string;
    };

async function assertOwnerOrAdmin(projectId: string, userId: string) {
  const role = await ProjectsService.getProjectRole(projectId, userId);

  const roles = ["owner", "admin"] as ProjectRoleEnum[];

  if (!role || !roles.includes(role)) {
    throw new ValidationError("You don't have permission to update members");
  }
}

export class ProjectsService {
  static async improveProjectDescription(
    projectId: string,
    description: string
  ) {
    const improved = await improveDescription(description);

    return improved;
  }

  static async updateLandingPage(id: string, data: Partial<LandingPageInsert>) {
    const [result] = await db
      .update(landingPages)
      .set(data)
      .where(eq(landingPages.id, id))
      .returning();

    return result;
  }

  static async getLandingPageByPublicId(id: string) {
    const [row] = await db
      .select({
        ...getTableColumns(landingPages),
      })
      .from(landingPages)
      .where(eq(landingPages.publicId, id))
      .limit(1);

    if (!row) {
      throw new Error("Landing page not found");
    }

    return row;
  }

  static async generateLandingPageProps(projectId: string) {
    const project = await ProjectsService.getProjectById(projectId);

    if (!project.description) {
      throw new Error("Project description is missing");
    }

    await db
      .update(landingPages)
      .set({ state: "generating" })
      .where(eq(landingPages.projectId, projectId));

    generateLandingPage(project.description)
      .then((data) => {
        return db
          .update(landingPages)
          .set({
            state: "draft",
            startupName: data?.startupName ?? "",
            heroTitle: data?.heroTitle ?? "",
            oneLinerPitch: data?.oneLinerPitch ?? "",
            keyBenefits1Title: data?.keyBenefits1Title ?? "",
            keyBenefits1Description: data?.keyBenefits1Description ?? "",
            keyBenefits2Title: data?.keyBenefits2Title ?? "",
            keyBenefits2Description: data?.keyBenefits2Description ?? "",
            keyBenefits3Title: data?.keyBenefits3Title ?? "",
            keyBenefits3Description: data?.keyBenefits3Description ?? "",
            feature1Title: data?.feature1Title ?? "",
            feature1Description: data?.feature1Description ?? "",
            feature2Title: data?.feature2Title ?? "",
            feature2Description: data?.feature2Description ?? "",
            feature3Title: data?.feature3Title ?? "",
            feature3Description: data?.feature3Description ?? "",
          })
          .where(eq(landingPages.projectId, projectId));
      })
      .catch((error) => {
        logger.error(error);

        return db
          .update(landingPages)
          .set({ state: "initial" })
          .where(eq(landingPages.projectId, projectId));
      });
  }

  static async hasDescription(projectId: string) {
    const [row] = await db
      .select({
        count: count(),
      })
      .from(projects)
      .where(
        and(
          eq(projects.id, projectId),
          sql`length(${projects.description}) > 1`
        )
      )
      .limit(1);

    return row?.count > 0;
  }

  static hasPermission = cache(
    async (
      projectId: string,
      userId: string,
      role: ProjectRoleEnum[] = ["admin", "owner", "member"]
    ) => {
      const [row] = await db
        .select({
          count: count(),
        })
        .from(projectsMembers)
        .innerJoin(projects, eq(projectsMembers.projectId, projects.id))
        .where(
          and(
            eq(projectsMembers.projectId, projectId),
            eq(projectsMembers.userId, userId),
            inArray(projectsMembers.role, role)
          )
        );

      return row?.count > 0;
    }
  );

  static async getProjectCompleteness(user: User, projectId: string) {
    const [, err] = await of(this.getProjectById(projectId));

    if (err) {
      return {
        theProblem: false,
        developmentPhase: false,
        gotoMarket: false,
        funding: false,
        inviteMembers: false,
      };
    }

    if (!(await this.hasPermission(projectId, user.id))) {
      throw new ValidationError(
        "You don't have permission to get completeness"
      );
    }

    const completed = await db
      .select({
        section: projectCompleteness.section,
      })
      .from(projectCompleteness)
      .where(eq(projectCompleteness.projectId, projectId));

    const completedSections = completed.map((row) => row.section);

    const theProblemSections = [
      "lean-canvas",
      "swot-analysis",
      "critical-hypothesis",
      "validation-experiments",
      "customer-interview",
      "elevator-pitch",
    ];

    const developmentPhaseSections = [
      "roadmap",
      "product-discovery",
      "prd",
      "product-okrs",
    ];

    const goToMarketSections = [
      "gtm-roadmap",
      "goto-market-framework",
      "ideal-customer-profile",
      "pirate-metrics",
      "forms",
    ];

    const fundingSections = [
      "pipeline",
      "email-blurb",
      "one-pager",
      "pitch-story",
      "investment-deck",
      "financial-model",
    ];

    return {
      theProblem: theProblemSections.every((section) =>
        completedSections.includes(section)
      ),
      developmentPhase: developmentPhaseSections.every((section) =>
        completedSections.includes(section)
      ),
      gotoMarket: goToMarketSections.every((section) =>
        completedSections.includes(section)
      ),
      funding: fundingSections.every((section) =>
        completedSections.includes(section)
      ),
      inviteMembers: completedSections.includes("invite-members"),
    };
  }

  static async getProjectById(projectId: string) {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!rows.length) {
      throw new ValidationError("Project not found");
    }

    return rows[0];
  }

  static async markSectionComplete(
    user: User,
    projectId: string,
    section: string,
    state: boolean = true
  ): Promise<boolean> {
    if (!(await this.hasPermission(projectId, user.id, ["owner", "admin"]))) {
      throw new ValidationError("You don't have permission to mark sections");
    }

    await db
      .delete(projectCompleteness)
      .where(
        and(
          eq(projectCompleteness.projectId, projectId),
          eq(projectCompleteness.section, section)
        )
      );

    // If section exists, delete it, else create it
    if (!state) {
      return false;
    }

    await db.insert(projectCompleteness).values({
      projectId,
      section,
      completedAt: new Date(),
    });

    return true;
  }

  static async userProjectsCount(userId: string) {
    const [row] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(projectsMembers)
      .where(eq(projectsMembers.userId, userId));

    return Number(row?.count ?? "0");
  }

  static async getProjectInviteById(inviteId: string) {
    const [row] = await db
      .select({
        projectId: projectsInvitedMembers.projectId,
        email: projectsInvitedMembers.email,
        role: projectsInvitedMembers.role,
      })
      .from(projectsInvitedMembers)
      .where(eq(projectsInvitedMembers.id, inviteId));

    return row;
  }

  static async acceptProject(projectId: string, userId: string) {
    const [invite] = await db
      .select({
        email: projectsInvitedMembers.email,
        role: projectsInvitedMembers.role,
      })
      .from(projectsInvitedMembers)
      .innerJoin(
        users,
        sql`lower(${users.email}) = lower(${projectsInvitedMembers.email})`
      )
      .where(
        and(
          eq(projectsInvitedMembers.projectId, projectId),
          eq(users.id, userId)
        )
      )
      .limit(1);

    if (!invite) {
      throw new ValidationError("Invitation not found");
    }

    await db.transaction(async (trx) => {
      await trx.insert(projectsMembers).values({
        projectId: projectId,
        userId: userId,
        role: invite.role,
        acceptedAt: new Date(),
      });

      await trx
        .delete(projectsInvitedMembers)
        .where(
          and(
            eq(projectsInvitedMembers.projectId, projectId),
            eq(projectsInvitedMembers.email, invite.email)
          )
        );
    });
  }

  static async declineProject(projectId: string, userId: string) {
    const [invite] = await db
      .select({
        email: projectsInvitedMembers.email,
        role: projectsInvitedMembers.role,
      })
      .from(projectsInvitedMembers)
      .innerJoin(
        users,
        sql`lower(${users.email}) = lower(${projectsInvitedMembers.email})`
      )
      .where(
        and(
          eq(projectsInvitedMembers.projectId, projectId),
          eq(users.id, userId)
        )
      )
      .limit(1);

    if (!invite) {
      throw new ValidationError("Invitation not found");
    }

    await db
      .delete(projectsInvitedMembers)
      .where(
        and(
          eq(projectsInvitedMembers.projectId, projectId),
          eq(projectsInvitedMembers.email, invite.email)
        )
      );
  }

  static async leaveProject(data: DeleteProjectData) {
    await db
      .delete(projectsMembers)
      .where(
        and(
          eq(projectsMembers.projectId, data.id),
          eq(projectsMembers.userId, data.userId)
        )
      );
  }

  static async inviteMembersToProject(data: InviteMembersToProjectData) {
    // Check for invitation permission (only owner or admin can invite members)
    await assertOwnerOrAdmin(data.projectId, data.userId);

    const result = await Promise.allSettled(
      data.emails.map((email) =>
        db
          .insert(projectsInvitedMembers)
          .values({
            projectId: data.projectId,
            role: data.role,
            email,
          })
          .onConflictDoUpdate({
            target: [
              projectsInvitedMembers.projectId,
              projectsInvitedMembers.email,
            ],
            set: {
              role: data.role,
            },
          })
          .returning()
      )
    );

    // Return only successful inserts
    const successfulInserts = result.filter((r) => r.status === "fulfilled");

    return successfulInserts.map((r) => r.value).flat();
  }

  static async deleteProject(data: DeleteProjectData) {
    await db.transaction(async (trx) => {
      await trx.delete(documents).where(eq(documents.projectId, data.id));

      await trx.delete(chats).where(eq(chats.projectId, data.id));

      await trx
        .delete(projectsInvitedMembers)
        .where(eq(projectsInvitedMembers.projectId, data.id));

      await trx
        .delete(projectsMembers)
        .where(and(eq(projectsMembers.projectId, data.id)));

      await trx
        .delete(projects)
        .where(
          and(eq(projects.id, data.id), eq(projects.ownerId, data.userId))
        );
    });
  }

  static async updateProject(data: UpdateProjectData) {
    // Check if name already exists
    const [exists] = await db
      .select()
      .from(projects)
      .where(
        and(
          not(eq(projects.id, data.id)),
          eq(projects.name, data.name),
          eq(projects.ownerId, data.userId)
        )
      );

    if (exists) {
      throw new ValidationError("Project name already exists");
    }

    const [project] = await db
      .update(projects)
      .set({
        name: data.name,
        description: data.description,
      })
      .where(and(eq(projects.id, data.id), eq(projects.ownerId, data.userId)))
      .returning();

    if (!project) {
      throw new ValidationError("Only the project owner can update the name");
    }

    return project;
  }

  static async createProject(data: CreateProjectData) {
    const project = await db.transaction(async (trx) => {
      const [createdProject] = await trx
        .insert(projects)
        .values({
          ownerId: data.userId,
          name: data.name,
          description: data.description,
          workspaceId: data.workspaceId,
        })
        .onConflictDoUpdate({
          target: [projects.name, projects.ownerId],
          set: {
            name: data.name,
            description: data.description,
            workspaceId: data.workspaceId,
          },
        })
        .returning({ id: projects.id });

      if (!createdProject) {
        throw new Error("Unable to create project");
      }

      // Insert user into personal workspace
      await trx
        .insert(projectsMembers)
        .values({
          projectId: createdProject.id,
          userId: data.userId,
          role: "owner",
          acceptedAt: new Date(),
        })
        .onConflictDoNothing();

      return createdProject;
    });

    return project;
  }

  static async getProjects(userId: string) {
    const invitesQuery = db
      .select({
        projectId: projectsInvitedMembers.projectId,
        userId: users.id,
      })
      .from(projectsInvitedMembers)
      .innerJoin(
        users,
        and(sql`lower(${users.email}) = lower(${projectsInvitedMembers.email})`)
      )
      .where(eq(users.id, userId))
      .as("invites");

    const projectsQuery = db
      .selectDistinctOn([projects.id], {
        id: projects.id,
        name: projects.name,
        description: projects.description,
        workspaceId: projects.workspaceId,
        ownerId: projects.ownerId,
        acceptedAt: projectsMembers.acceptedAt,
        userId:
          sql<string>`COALESCE(${invitesQuery.userId}, ${projectsMembers.userId})`.as(
            "user_id"
          ),
      })
      .from(projects)
      .leftJoin(
        projectsMembers,
        and(
          eq(projects.id, projectsMembers.projectId),
          eq(projectsMembers.userId, userId)
        )
      )
      .leftJoin(invitesQuery, eq(projects.id, invitesQuery.projectId))
      .as("projects");

    const query = db
      .select()
      .from(projectsQuery)
      .orderBy(asc(projects.name))
      .where(eq(projectsQuery.userId, userId));

    const result = await query;

    return result.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      workspaceId: row.workspaceId,
      isOwner: row.ownerId === userId,
      acceptedAt: row.acceptedAt,
    }));
  }

  static async getProjectMembers(projectId: string) {
    const query = db
      .select({
        userId: users.id,
        name: users.name,
        email: users.email,
        photo: users.photo,
        role: projectsMembers.role,
        acceptedAt: projectsMembers.acceptedAt,
        createdAt: projectsMembers.createdAt,
      })
      .from(projectsMembers)
      .innerJoin(users, eq(projectsMembers.userId, users.id))
      .where(eq(projectsMembers.projectId, projectId))
      .orderBy(
        sql`
        CASE
          WHEN ${projectsMembers.role} = 'owner' THEN 1
          WHEN ${projectsMembers.role} = 'admin' THEN 2
          ELSE 3
        END
        `,
        asc(users.name)
      );

    return query;
  }

  static async getProjectInvitedMembers(projectId: string) {
    const query = db
      .select({
        email: projectsInvitedMembers.email,
        createdAt: projectsInvitedMembers.createdAt,
        role: projectsInvitedMembers.role,
      })
      .from(projectsInvitedMembers)
      .where(eq(projectsInvitedMembers.projectId, projectId))
      .orderBy(
        sql`
        CASE
          WHEN ${projectsInvitedMembers.role} = 'owner' THEN 1
          WHEN ${projectsInvitedMembers.role} = 'admin' THEN 2
          ELSE 3
        END
        `,
        asc(projectsInvitedMembers.email)
      );

    return await query;
  }

  static async getProjectRole(projectId: string, userId: string) {
    const [row] = await db
      .select({
        role: projectsMembers.role,
      })
      .from(projectsMembers)
      .where(
        and(
          eq(projectsMembers.projectId, projectId),
          eq(projectsMembers.userId, userId)
        )
      )
      .limit(1);

    if (!row) return null;

    return row.role;
  }

  static async updateProjectMemberRole(
    data: UpdateProjectMemberRoleData
  ): Promise<void>;
  static async updateProjectMemberRole(
    data: UpdateProjectMemberInvitationRole
  ): Promise<void>;
  static async updateProjectMemberRole(data: UpdateProjectMemberRoleData) {
    // Check if user is owner/admin
    await assertOwnerOrAdmin(data.projectId, data.userId);

    if (data.type === "invitation") {
      await db
        .update(projectsInvitedMembers)
        .set({
          role: data.role,
        })
        .where(eq(projectsInvitedMembers.email, data.email));

      return;
    }

    await db.transaction(async (trx) => {
      if (data.role === "owner") {
        // Change current owner to admin
        await trx
          .update(projectsMembers)
          .set({
            role: "admin",
          })
          .where(
            and(
              eq(projectsMembers.projectId, data.projectId),
              eq(projectsMembers.role, "owner")
            )
          )
          .returning({
            userId: projectsMembers.userId,
          });

        await trx
          .update(projects)
          .set({ ownerId: data.userToUpdateId })
          .where(eq(projects.id, data.projectId));
      }

      await trx
        .update(projectsMembers)
        .set({
          role: data.role,
        })
        .where(
          and(
            eq(projectsMembers.projectId, data.projectId),
            eq(projectsMembers.userId, data.userToUpdateId)
          )
        );
    });
  }

  static async removeProjectMember(data: RemoveProjectMemberData) {
    await assertOwnerOrAdmin(data.projectId, data.userId);

    if (data.type === "invitation") {
      await db
        .delete(projectsInvitedMembers)
        .where(
          and(
            eq(projectsInvitedMembers.email, data.email),
            eq(projectsInvitedMembers.projectId, data.projectId)
          )
        );

      return;
    }

    await db
      .delete(projectsMembers)
      .where(
        and(
          eq(projectsMembers.projectId, data.projectId),
          eq(projectsMembers.userId, data.userToRemoveId)
        )
      );
  }

  static async isSectionComplete(projectId: string, section: string) {
    const [sectionDoc] = await db
      .select({
        count: count(),
      })
      .from(projectCompleteness)
      .where(
        and(
          eq(projectCompleteness.projectId, projectId),
          eq(projectCompleteness.section, section)
        )
      )
      .limit(1);

    return sectionDoc?.count > 0;
  }

  static async getLandingPage(projectId: string) {
    const [row] = await db
      .select({
        ...getTableColumns(landingPages),
      })
      .from(landingPages)
      .where(eq(landingPages.projectId, projectId))
      .limit(1);

    if (row) {
      return row;
    }

    // Create landing page if it doesn't exist
    const [createdLandingPage] = await db
      .insert(landingPages)
      .values({
        projectId,
        publicId: generateIdFromEntropySize(16),
        state: "initial",
        startupName: "",
        heroTitle: "",
        oneLinerPitch: "",
        photoLink: "",
        demoVideoLink: "",
        formName: "",
        formLink: "",
        keyBenefits1Title: "",
        keyBenefits1Description: "",
        keyBenefits2Title: "",
        keyBenefits2Description: "",
        keyBenefits3Title: "",
        keyBenefits3Description: "",
        feature1Title: "",
        feature1Description: "",
        feature2Title: "",
        feature2Description: "",
        feature3Title: "",
        feature3Description: "",
      })
      .returning();

    return createdLandingPage;
  }
}

export type GetProjectsResponse = Awaited<
  ReturnType<typeof ProjectsService.getProjects>
>;

export type GetProjectMembersResponse = Awaited<
  ReturnType<typeof ProjectsService.getProjectMembers>
>;

export type GetProjectInvitedMembersResponse = Awaited<
  ReturnType<typeof ProjectsService.getProjectInvitedMembers>
>;

export type GetProjectRoleResponse = Awaited<
  ReturnType<typeof ProjectsService.getProjectRole>
>;

export type GetProjectResponse = Awaited<
  ReturnType<typeof ProjectsService.getProjectById>
>;

export type GetLandingPageResponse = Awaited<
  ReturnType<typeof ProjectsService.getLandingPage>
>;
