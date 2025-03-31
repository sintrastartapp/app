"use server";

import { Links } from "@/config/links";
import { ProjectRoleEnum } from "@/database/schema";
import { withAuthAction } from "@/lib/auth";
import { ValidationError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { UserService } from "@/services";
import { ProjectsService } from "@/services/projects.service";
import { WorkspacesService } from "@/services/workspaces.service";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { markSectionCompleteAction } from "../../../[projectId]/actions";
import {
  CreateProjectFormSchema,
  createProjectSchema,
} from "./components/create-project.form-schema";
import {
  UpdateProjectFormSchema,
  updateProjectSchema,
} from "./components/update-project.form-schema";
import { sendInviteEmail } from "./send-invite-email";

export type FormState = {
  message?: string;
  error?: string;
  code?: number;
};

export const createProjectFormAction = withAuthAction(
  async (
    authContext,
    data: CreateProjectFormSchema,
    redirectTo: "project" | "settings" = "settings"
  ): Promise<FormState> => {
    const { user } = authContext;

    const parsed = createProjectSchema.safeParse(data);

    if (!parsed.success) {
      return {
        error: parsed.error.toString(),
      };
    }

    const workspace = await WorkspacesService.getPersonalWorkspace(user.id);

    const project = await ProjectsService.createProject({
      userId: user.id,
      workspaceId: workspace.id,
      name: parsed.data.name,
      description: parsed.data.description,
    });

    await UserService.track(user.id, "create-project", {
      name: parsed.data.name,
      description: parsed.data.description,
    });

    revalidatePath("/");
    redirect(
      redirectTo === "project"
        ? Links.Project(project.id)
        : Links.AccountProjectSettings(project.id),
      RedirectType.push
    );
  }
);

export const updateProjectFormAction = withAuthAction(
  async (authContext, data: UpdateProjectFormSchema): Promise<FormState> => {
    const { user } = authContext;

    const parsed = updateProjectSchema.safeParse(data);

    if (!parsed.success) {
      return {
        error: parsed.error.toString(),
      };
    }

    try {
      await ProjectsService.updateProject({
        userId: user.id,
        id: parsed.data.id,
        name: parsed.data.name,
        description: parsed.data.description,
      });

      await UserService.track(user.id, "update-project", {
        projectId: parsed.data.id,
        name: parsed.data.name,
        description: parsed.data.description,
      });

      // redirectPath = Links.ProjectSettings(project.id);

      return {
        message: "Project updated successfully",
      };
    } catch (e) {
      if (!(e instanceof ValidationError)) {
        logger.error(e);
      }

      return {
        error: (e as Error).message,
      };
    }
  }
);

export const deleteProject = withAuthAction(
  async (authContext, projectId: string) => {
    const { user } = authContext;

    await ProjectsService.deleteProject({
      id: projectId,
      userId: user.id,
    });

    await UserService.track(user.id, "delete-project", {
      projectId,
    });

    revalidatePath(Links.AccountProjects, "layout");
    redirect(Links.AccountProjects, RedirectType.replace);
  }
);

export const leaveProject = withAuthAction(
  async (authContext, projectId: string) => {
    const { user } = authContext;

    await ProjectsService.leaveProject({
      id: projectId,
      userId: user.id,
    });

    await UserService.track(user.id, "leave-project", {
      projectId,
    });

    revalidatePath(Links.AccountProjects, "layout");
    redirect(Links.AccountProjects, RedirectType.replace);
  }
);

type InviteMembersToProjectData = {
  projectId: string;
  emails: string[];
  role: ProjectRoleEnum;
};

export const inviteMembersToProject = withAuthAction(
  async (authContext, data: InviteMembersToProjectData) => {
    const { user } = authContext;

    await markSectionCompleteAction(data.projectId, "invite-members", true);

    const invites = await ProjectsService.inviteMembersToProject({
      userId: user.id,
      ...data,
    });

    await UserService.track(user.id, "invite-members-to-project", {
      projectId: data.projectId,
      emails: data.emails,
    });

    await Promise.allSettled(
      invites.map((inv) =>
        sendInviteEmail({
          id: inv.id,
          email: inv.email,
          projectId: data.projectId,
          user,
        })
      )
    );

    await revalidatePath(Links.AccountProjectMembers(data.projectId), "layout");
  }
);

export const updateProjectMemberRole = withAuthAction(
  async (
    authContext,
    data: {
      userId?: string;
      email?: string;
      projectId: string;
      role: ProjectRoleEnum;
    }
  ): Promise<void> => {
    const { user } = authContext;

    if (data.userId) {
      await ProjectsService.updateProjectMemberRole({
        type: "member",
        userId: user.id,
        projectId: data.projectId,
        userToUpdateId: data.userId,
        role: data.role,
      });

      await UserService.track(user.id, "update-project-member", {
        projectId: data.projectId,
        userId: data.userId,
        role: data.role,
      });
    }

    if (data.email) {
      await ProjectsService.updateProjectMemberRole({
        type: "invitation",
        userId: user.id,
        projectId: data.projectId,
        email: data.email,
        role: data.role,
      });

      await UserService.track(user.id, "update-project-member", {
        projectId: data.projectId,
        email: data.email,
        role: data.role,
      });
    }

    revalidatePath(Links.AccountProjectMembers(data.projectId), "layout");
  }
);

export const removeProjectMember = withAuthAction(
  async (
    authContext,
    data: {
      userId?: string;
      email?: string;
      projectId: string;
    }
  ): Promise<void> => {
    const { user } = authContext;

    if (data.userId) {
      await ProjectsService.removeProjectMember({
        type: "member",
        userId: user.id,
        projectId: data.projectId,
        userToRemoveId: data.userId,
      });

      await UserService.track(user.id, "remove-project-member", {
        projectId: data.projectId,
        userId: data.userId,
      });
    }

    if (data.email) {
      await ProjectsService.removeProjectMember({
        type: "invitation",
        userId: user.id,
        projectId: data.projectId,
        email: data.email,
      });

      await UserService.track(user.id, "remove-project-member", {
        projectId: data.projectId,
        email: data.email,
      });
    }

    revalidatePath(Links.AccountProjectMembers(data.projectId), "layout");
  }
);

export const acceptProject = withAuthAction(
  async (authContext, projectId: string) => {
    const { user } = authContext;

    await ProjectsService.acceptProject(projectId, user.id);

    await UserService.track(user.id, "accept-project", {
      projectId,
    });

    revalidatePath(Links.AccountProjectSettings(projectId), "layout");
    redirect(Links.AccountProjectMembers(projectId), RedirectType.replace);
  }
);

export const declineProject = withAuthAction(
  async (authContext, projectId: string) => {
    const { user } = authContext;

    await ProjectsService.declineProject(projectId, user.id);

    await UserService.track(user.id, "decline-project", {
      projectId,
    });

    revalidatePath(Links.AccountProjectSettings(projectId), "layout");
    redirect(Links.AccountProjects, RedirectType.replace);
  }
);

export const improveProjectDescriptionAction = withAuthAction(
  async (authContext, projectId: string, description?: string) => {
    const { user } = authContext;

    const project = await ProjectsService.getProjectById(projectId);

    if (!project.description && !description) {
      throw new Error("Project description is missing");
    }

    const improved = await ProjectsService.improveProjectDescription(
      projectId,
      description || project.description!
    );

    await UserService.track(user.id, "improve-project-description", {
      projectId,
    });

    // revalidatePath(Links.AccountProjectSettings(projectId), "layout");
    // redirect(Links.AccountProjects, RedirectType.replace);
    return improved;
  }
);
