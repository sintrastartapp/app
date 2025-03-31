import { BlockEditor } from "@/components/tiptap/components/BlockEditor";
import { getAgentBySlug } from "@/config/assistants";
import { getUserOrRedirect } from "@/lib/auth";
import { DocumentsService, ProjectsService } from "@/services";
import { ChatService } from "@/services/chats.service";
import { headerSections } from "../constants";

type Props = {
  params: {
    projectId: string;
    section: string;
  };
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: Props) {
  const user = await getUserOrRedirect();
  const role = await ProjectsService.getProjectRole(params.projectId, user.id);

  const document = await DocumentsService.getDocument(
    params.projectId,
    params.section
  );

  const assistant = getAgentBySlug(params.section);

  if (!assistant) {
    return <div />;
  }

  const chat = await ChatService.getOrCreateChat({
    projectId: params.projectId,
    assistantId: assistant.id,
  });

  // const messages = await getChatMessagesAction(chat.id);

  // if (messages.length === 0) {
  //   const project = await ProjectsService.getProjectById(params.projectId);
  //   await ChatService.startConversation(chat, project, user);
  // }

  const { title } = headerSections.find((s) => s.slug === params.section) || {
    title: "Home",
  };

  return (
    <BlockEditor
      key={`${document.projectId}/${document.slug}`}
      title={title}
      document={document}
      // messages={messages}
      chat={chat}
      assistant={assistant}
      role={role}
    />
  );
}
