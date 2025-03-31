"use server";

import { env } from "@/config/env-config";
import { Links } from "@/config/links";
import {
  BoardTaskInsert,
  ChatSelect,
  LandingPageInsert,
} from "@/database/schema";
import { withAuthAction } from "@/lib/auth";
import { ValidationError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { BoardsService, DocumentsService, UserService } from "@/services";
import { ChatService, GetChatResponse } from "@/services/chats.service";
import { ProjectsService } from "@/services/projects.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sanitizeHtml, { Attributes, IOptions } from "sanitize-html";

const sanitizeOptions: IOptions = {
  // Allow only specific HTML tags
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "br",
    "hr",
    "ul",
    "ol",
    "li",
    "b",
    "i",
    "strong",
    "em",
    "strike",
    "code",
    "pre",
    "div",
    "span",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "a",
    "img",
  ],

  // Allow specific attributes
  allowedAttributes: {
    a: ["href", "title", "target"],
    img: ["src", "alt", "title", "width", "height"],
    div: ["class", "id"],
    span: ["class", "id"],
    table: ["class", "id"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan"],
    "*": ["class"], // Allow classes on all elements
  },

  // Additional security options
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: {
    img: ["http", "https", "data"],
  },

  // URL handling
  allowedSchemesAppliedToAttributes: ["href", "src"],

  // Force all URLs to be absolute
  transformTags: {
    a: (tagName: string, attribs: Attributes) => {
      return {
        tagName,
        attribs: {
          ...attribs,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      };
    },
  },

  // Strip comments
  exclusiveFilter: (frame) => {
    return frame.tag === "comment";
  },

  // Text content length limits
  textFilter: (text) => {
    return text.length > 10000 ? text.slice(0, 10000) + "..." : text;
  },

  // Prevent CSS attacks
  allowedStyles: {
    "*": {
      color: [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      "text-align": [/^left$/, /^right$/, /^center$/],
      "font-weight": [/^normal$/, /^bold$/, /^\d+$/],
    },
  },
};

export const saveDocumentAction = withAuthAction(
  async (authContext, projectId: string, slug: string, content: string) => {
    const { user } = authContext;

    await DocumentsService.saveDocument(projectId, slug, content);

    await UserService.track(user.id, "save-document", {
      projectId,
      slug,
    });
  }
);

export async function getDocumentAction(projectId: string, slug: string) {
  const documents = await DocumentsService.getDocument(projectId, slug);

  return documents;
}

export const resetChatAction = withAuthAction(
  async (authContext, chat: GetChatResponse) => {
    const { user } = authContext;

    const hasPermission = await ProjectsService.hasPermission(
      chat.projectId,
      user.id,
      ["owner", "admin"]
    );

    if (!hasPermission) {
      return {
        error: "You don't have permission to reset this chat",
      };
    }

    await ChatService.resetChat(chat.id);

    await UserService.track(user.id, "reset-chat", {
      chatId: chat.id,
    });

    return {
      message: "Chat reset successfully",
    };
  }
);

export const getChatMessagesAction = withAuthAction(
  async (authContext, chat: ChatSelect) => {
    const { user } = authContext;

    const messages = await ChatService.getChatMessages(chat.id);

    // if (messages.length === 0) {
    //   // Create initial messages
    //   const project = await ProjectsService.getProjectById(chat.projectId);
    //   await ChatService.startConversation(chat, project, user);

    //   messages = await ChatService.getChatMessages(chat.id);
    // }

    return messages.map((msg) => ({
      ...msg,
      userName: msg.userId === user.id ? null : msg.userName,
    }));
  }
);

export const markSectionCompleteAction = withAuthAction(
  async (
    authContext,
    projectId: string,
    section: string,
    state: boolean = true
  ) => {
    const { user } = authContext;

    const result = await ProjectsService.markSectionComplete(
      user,
      projectId,
      section,
      state
    );

    await UserService.track(user.id, "mark-section-complete", {
      projectId,
      section,
      state,
    });

    revalidatePath(Links.ProjectHome(projectId), "layout");

    return result;
  }
);

export const markDocumentCompleteAction = withAuthAction(
  async (
    authContext,
    projectId: string,
    slug: string,
    state: boolean = true
  ) => {
    await DocumentsService.markDocumentComplete(projectId, slug, state);
    await markSectionCompleteAction(projectId, slug, state);

    await UserService.track(authContext.user.id, "mark-document-complete", {
      projectId,
      slug,
      state,
    });
  }
);

export async function isSectionCompleteAction(
  projectId: string,
  section: string
) {
  return ProjectsService.isSectionComplete(projectId, section);
}

export async function getDocumentShareUrlAction(docId: string) {
  return env.PUBLIC_URL + Links.ShareDocumentLink(docId);
}

export const deleteBoardTaskAction = withAuthAction(
  async (authContext, data: { taskId: string; boardId: string }) => {
    const { user } = authContext;

    const hasPermission = await BoardsService.hasTaskPermission(
      data.taskId,
      user.id
    );

    if (!hasPermission) {
      throw new ValidationError(
        "You don't have permission to delete this task"
      );
    }

    await BoardsService.deleteTask(data.taskId);

    await UserService.track(user.id, "delete-board-task", {
      taskId: data.taskId,
      boardId: data.boardId,
    });
  }
);

export const updateBoardTaskAction = withAuthAction(
  async (
    authContext,
    taskId: string,
    data: Omit<Partial<BoardTaskInsert>, "id">
  ) => {
    const { user } = authContext;

    const hasPermission = await BoardsService.hasTaskPermission(
      taskId,
      user.id
    );

    if (!hasPermission) {
      throw new Error("You don't have permission to update this task");
    }

    await BoardsService.updateTask(taskId, data);

    await UserService.track(user.id, "update-board-task", {
      taskId,
      boardId: data.boardId,
      column: data.column,
      position: data.position,
      title: data.title,
      description: data.description,
    });
  }
);

export const createBoardTaskAction = withAuthAction(
  async (authContext, data: Omit<BoardTaskInsert, "id" | "createdBy">) => {
    const { user } = authContext;

    const hasPermission = await BoardsService.hasBoardPermission(
      data.boardId,
      user.id
    );

    if (!hasPermission) {
      throw new Error("You don't have permission to create this task");
    }

    const createdTask = await BoardsService.createTask({
      ...data,
      createdBy: user.id,
    });

    await UserService.track(user.id, "create-board-task", {
      boardId: data.boardId,
      column: data.column,
      position: data.position,
      title: data.title,
      description: data.description,
    });

    return createdTask;
  }
);

export const redirectToMainProjectAction = withAuthAction(async (authCtx) => {
  const { user } = authCtx;

  const projects = await ProjectsService.getProjects(user.id);
  const acceptedProjects = projects.filter((p) => !!p.acceptedAt);

  if (acceptedProjects.length === 0) {
    return;
  }

  const mainProject =
    acceptedProjects.filter((p) => p.isOwner)[0] || acceptedProjects[0];

  if (!mainProject) {
    return;
  }

  redirect(Links.Project(mainProject.id));
});

export const getProjectCompletenessAction = withAuthAction(
  async (authContext, projectId?: string) => {
    const { user } = authContext;

    if (!projectId) {
      return {
        projectDescription: false,
        theProblem: false,
        developmentPhase: false,
        gotoMarket: false,
        funding: false,
        inviteMembers: false,
        feedbackCompleted: false,
      };
    }

    const completeness = await ProjectsService.getProjectCompleteness(
      user,
      projectId
    );

    const projectDescription = await ProjectsService.hasDescription(projectId);
    const { feedbackCompleted } = await UserService.getUserById(user.id);

    return {
      ...completeness,
      feedbackCompleted: feedbackCompleted ?? false,
      projectDescription,
    };
  }
);

export const getLandingPageAction = withAuthAction(
  async (authContext, projectId: string) => {
    const { user } = authContext;

    const project = await ProjectsService.getProjectById(projectId);

    if (!project.description || !project.description.trim().length) {
      return {
        state: "no-description",
      };
    }

    const landingPage = await ProjectsService.getLandingPage(projectId);

    if (landingPage.state === "initial") {
      ProjectsService.generateLandingPageProps(projectId)
        .then(async () => {
          await ProjectsService.markSectionComplete(
            user,
            projectId,
            "landing-page",
            true
          );
        })
        .catch((error) => logger.error(error));
    }

    return landingPage;
  }
);

export const getLandingPageByPublicIdAction = withAuthAction(
  async (authContext, id: string) => {
    const landingPage = await ProjectsService.getLandingPageByPublicId(id);

    return landingPage;
  }
);

export const updateLandingPageAction = withAuthAction(
  async (authContext, publicId: string, data: Partial<LandingPageInsert>) => {
    const { user } = authContext;

    const lp = await ProjectsService.getLandingPageByPublicId(publicId);

    const hasPermission = await ProjectsService.hasPermission(
      lp.projectId,
      user.id,
      ["admin", "owner"]
    );

    if (!hasPermission) {
      return {
        error: "You don't have permission to update this landing page",
      };
    }

    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === "string"
          ? sanitizeHtml(value, sanitizeOptions)
          : value,
      ])
    );

    return ProjectsService.updateLandingPage(lp.id, sanitizedData);
  }
);
