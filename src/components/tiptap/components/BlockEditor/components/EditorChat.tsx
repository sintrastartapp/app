"use client";

import { useSession } from "@/app/(protected)/contexts/session-context";
import { useEditorContext } from "@/components/tiptap/context/EditorContext";
import { Button } from "@/components/ui/button";
import { Assistant } from "@/config/assistants";
import { GetDocumentsResponse } from "@/services";
import { GetChatResponse } from "@/services/chats.service";
import { Editor } from "@tiptap/react";
import { ChevronRightIcon } from "lucide-react";
import {
  // useChatTawk,
  useEditorChat,
} from "../hooks";
import Chat from "./Chat";
import { ResetChatDialog } from "./reset-chat-dialog";

type Props = {
  document: GetDocumentsResponse;
  editor: Editor;
  assistant: Assistant;
  chat: GetChatResponse;
  // messages: GetChatMessagesResponse;
};

export function EditorChat({
  document: doc,
  editor,
  assistant,
  chat,
}: // messages: initialMessages,
Props) {
  const session = useSession();
  const { isChatOpen, setIsChatOpen } = useEditorContext();

  // useChatTawk(isChatOpen);

  const {
    isLoading,
    assistantStatus,
    assistantMessages,
    inputValue,
    handleInputChange,
    submitMessage,
    startConversation,
    resetConversation,
  } = useEditorChat({
    chat,
    isChatOpen,
  });

  if (!session.user?.id) {
    return null;
  }

  async function handleChatReset() {
    resetConversation();
  }

  function handleStartChat() {
    startConversation();
  }

  function handleInsert(text: string) {
    // editor.chain().focus().insertContentAt(editor.state.selection.from, text);

    // Get the end position of the document
    const endPosition = editor.state.doc.content.size;

    // Insert content at the end position of the document
    editor.chain().focus().insertContentAt(endPosition, text).run();
  }

  if (!isChatOpen) {
    return null;
  }

  return (
    <div className="relative flex w-full max-w-xl flex-col border-l">
      <div className="sticky inset-y-0 flex h-full flex-col px-4 pr-0">
        <div className="my-4 flex items-center justify-between gap-2 font-semibold">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              disabled={assistantStatus === "in_progress"}
              className="group flex size-7 items-center justify-center rounded-full p-0"
              onClick={() => setIsChatOpen(false)}
            >
              <ChevronRightIcon className="size-6" />
            </Button>
            <span>AI Assistant for {assistant?.name}</span>
          </div>

          <ResetChatDialog
            disabled={
              assistantMessages.length === 0 ||
              assistantStatus === "in_progress"
            }
            onReset={handleChatReset}
          />
        </div>

        <Chat
          isLoading={isLoading}
          status={assistantStatus}
          document={doc}
          onInsert={handleInsert}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onInputSubmit={submitMessage}
          messages={assistantMessages}
          onStartConversation={handleStartChat}
        />
      </div>
    </div>
  );
}
