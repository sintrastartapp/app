import { site } from "@/config/constants";
import { openai } from "@/lib/ai/openai";
import { getUser } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ProjectsService } from "@/services";
import { ChatService, GetChatResponse } from "@/services/chats.service";
import { AssistantResponse } from "ai";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;
export const dynamic = "force-dynamic";

type BodyInput = {
  threadId: string | null;
  message: string;
  chat: GetChatResponse;
};

export async function POST(req: Request) {
  const user = await getUser();

  if (!user) {
    return new Response(null, {
      status: 401,
    });
  }

  // Parse the request body
  const input: BodyInput = await req.json();

  // Create a thread if needed
  const { chat } = input;

  const { startingMessage } = site.projects;

  if (input.message.trim() === startingMessage) {
    // Get project description and add it to the thread
    const project = await ProjectsService.getProjectById(chat.projectId);

    if (project?.description?.trim().length) {
      await openai.beta.threads.messages.create(chat.threadId, {
        role: "user",
        content: `My project name is ${project.name}.
      And my project description is:
      ${project.description}
      Please start questions after my "${startingMessage}" message.`,
      });
    }
  }

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(
    chat.threadId,
    {
      role: "user",
      content: input.message,
    }
  );

  await ChatService.createChatMessage({
    chatId: chat.id,
    userId: user.id,
    role: "user",
    message: input.message,
  });

  return AssistantResponse(
    { threadId: chat.threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(chat.threadId, {
        assistant_id:
          chat.assistantId ??
          (() => {
            throw new Error("ASSISTANT_ID is not set");
          })(),
      });

      // runStream.on("messageDone", (data) => {
      //   const { content, role } = data;

      //   logger.info({ data }, "Chat message");

      //   const messages = content
      //     .map((m) =>
      //       m.type === "text"
      //         ? {
      //             message: m.text.value,
      //             role: role,
      //           }
      //         : null
      //     )
      //     .filter((m) => m !== null);

      //   for (const message of messages) {
      //     ChatService.createChatMessage({
      //       chatId: chat.id,
      //       role: message.role,
      //       message: message.message,
      //     })
      //       .then((message) => {
      //         logger.info({ role, message }, "Chat message saved");
      //       })
      //       .catch((err) => logger.error(err, "Error creating chat message"));
      //   }
      // });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === "requires_action" &&
        runResult.required_action?.type === "submit_tool_outputs"
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall) => {
              switch (toolCall.function.name) {
                // configure your tool calls here

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`
                  );
              }
            }
          );

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            chat.threadId,
            runResult.id,
            { tool_outputs }
          )
        );
      }

      await runStream.finalMessages().then((finalMessages) => {
        if (finalMessages.length > 0) {
          const lastMessage = finalMessages[finalMessages.length - 1];

          if (lastMessage.role === "assistant") {
            const assistantMessage = lastMessage.content
              .map((c) => (c.type === "text" ? c.text.value : ""))
              .join("");

            logger.info("saving assistant message");

            return ChatService.createChatMessage({
              chatId: chat.id,
              role: lastMessage.role,
              message: assistantMessage,
            })
              .then((message) =>
                logger.info("saved assistant message", {
                  id: message.id,
                  chatId: message.chatId,
                })
              )
              .catch((error) =>
                logger.error("error saving assistant message", {
                  error,
                  chatId: chat.id,
                })
              );
          }

          return Promise.resolve();
        }
      });
    }
  );
}
