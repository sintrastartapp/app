import { ChatMessage } from "@/components/tiptap/components/BlockEditor/components/chat-message";
import { getAgentById } from "@/config/assistants";
import { ChatService } from "@/services";

type Props = {
  params: {
    chatId: string;
  };
};

export default async function ChatPage({ params }: Props) {
  const chat = await ChatService.getChatById(params.chatId);
  const assistant = getAgentById(chat.assistantId);
  const chatMessages = await ChatService.getChatMessages(params.chatId);

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold">{assistant?.name}</h2>

      <div className="mx-auto mt-16  flex max-w-[80ch] flex-col gap-4 rounded-lg border p-4">
        {chatMessages.map((message) => (
          <ChatMessage
            key={message.id}
            align={message.role === "assistant" ? "left" : "right"}
            content={message.message}
            userName={message.userName}
          >
            {/* <pre>{JSON.stringify(message, null, 2)}</pre> */}
          </ChatMessage>
        ))}
      </div>
    </div>
  );
}
