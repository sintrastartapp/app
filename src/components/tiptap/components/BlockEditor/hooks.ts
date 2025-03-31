import {
  getChatMessagesAction,
  resetChatAction,
} from "@/app/(protected)/[projectId]/actions";
import { useTawkContext } from "@/app/(protected)/contexts/tawk-context";
import { site } from "@/config/constants";
import { GetChatResponse } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAssistant } from "ai/react";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

type UseEditorChatOptions = {
  chat: GetChatResponse;
  isChatOpen: boolean;
};

export function useEditorChat({ chat, isChatOpen }: UseEditorChatOptions) {
  const {
    data: initialMessages = [],
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["chatMessages", chat.id],
    queryFn: () => getChatMessagesAction(chat),
    enabled: isChatOpen,
    // initialData: initialMessages,
  });

  const {
    status: assistantStatus,
    messages: assistantMessages,
    input: inputValue,
    submitMessage,
    handleInputChange,
    setMessages,
    append,
  } = useAssistant({
    api: "/api/assistant",
    body: {
      chat,
    },
    threadId: chat.threadId,
  });

  const { mutateAsync: resetConversation } = useMutation({
    mutationKey: ["resetChat", chat.id],
    mutationFn: async () => {
      const result = await resetChatAction(chat as GetChatResponse);

      if (result && "error" in result) {
        toast.error(result.error);
      }
    },
    onSuccess: async () => {
      setMessages([]);

      toast.success("AI Assistant reset successfully");
      // await revalidate("/", "layout");
      // router.refresh();
    },
    onError: (err) => {
      toast.error((err as Error)?.message ?? "Error resetting chat");
    },
  });

  const startConversation = useCallback(() => {
    append({
      content: site.projects.startingMessage,
      role: "user",
    });
  }, [append]);

  useEffect(() => {
    // Start conversation if not started yet.
    if (
      isFetched &&
      initialMessages.length === 0 &&
      assistantMessages.length === 0
    ) {
      startConversation();
    }
  }, [assistantMessages, initialMessages, isFetched, startConversation]);

  useEffect(() => {
    if (
      isFetched &&
      initialMessages.length > 0 &&
      assistantMessages.length === 0
    ) {
      setMessages(
        initialMessages.map((m) => ({
          id: m.id!,
          role: m.role,
          content: m.message,
          data: {
            userName: m.userName,
          },
        }))
      );
    }
  }, [isFetched, initialMessages, assistantMessages, setMessages]);

  return {
    isLoading,
    assistantStatus,
    assistantMessages,
    inputValue,
    submitMessage,
    handleInputChange,
    startConversation,
    resetConversation,
  };
}

export function useChatTawk(isChatOpen: boolean) {
  const { setTawkVisible } = useTawkContext();

  useEffect(() => {
    // On unmount, set tawk widget always visible.
    return () => {
      setTawkVisible(true);
    };
  }, [setTawkVisible]);

  useEffect(() => {
    setTawkVisible(!isChatOpen);
  }, [isChatOpen, setTawkVisible]);
}
