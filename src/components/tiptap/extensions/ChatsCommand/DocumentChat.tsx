// import { getThreadRT } from "@/backend/data-layer-types/ai";
// import {
//   postMessagePairAndDoc,
//   postThreadAndMessagePair,
// } from "@/backend/data-layer/ai";
// import { isTouchScreen } from "@/utils/is-touch-screen";
import { Message, useAssistant } from "ai/react";
import { Loader2Icon, SendIcon } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

// import { ButtonScrollToBottom } from "@/components/atoms/button-scroll-to-bottom";
// import { MessageBox } from "@/components/molecules/message-box";
import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { site } from "@/config/constants";
import { toast } from "sonner";
import { useScrollAnchor } from "../../hooks/useScrollAnchor";
import { isTouchScreen } from "../../lib/utils/isTouchScreen";
import { removeSources } from "../../lib/utils/removeSources";
// import { useToast } from "@/components/ui/use-toast";
// import { siteConfig } from "@/config/site";
// import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
// import { removeSources } from "@/lib/remove-sources";
// import { Assistant } from "@/lib/types";
type getThreadRT = {
  threadId: string;
  title: string;
  messages: Message[];
};
type Assistant = {
  name: string;
  description: string;
  suggestions: string[];
  initials: string;
  category: {
    colorHex: string;
    name: string;
    iconName: string;
  };
  iconName: string;
  id: string;
};

type Props = {
  threadId?: string;
  thread?: getThreadRT;
  assistant: Assistant;
  userId: string;
  projectId: string;
  prompt?: string | null;
  onThreadIdChange?: (threadId: string) => void;
  onInsert?: (text: string) => void;
  onPending?: (state: boolean) => void;
};

const PAIR = 2 as const;

type UseSaveMessagesProps = {
  thread?: getThreadRT;
  messages: Message[];
  status: "awaiting_message" | "in_progress" | "can-be-saved";
  userId: string;
  assistantId: string;
  projectId: string;
  threadId?: string;
  onThreadCreated?: (threadId: string) => void;
};

function useSaveMessages({
  messages,
  status,
  userId,
  projectId,
  assistantId,
  thread,
  threadId: defaultThreadId,
  onThreadCreated,
}: UseSaveMessagesProps) {
  const lastMessagesCount = useRef(thread?.messages.length ?? 0);
  const [isPending, startTransition] = useTransition();
  const [
    canBeSaved,
    //  setCanBeSaved
  ] = useState(false);
  const [
    docText,
    // setDocText
  ] = useState<string | undefined>(undefined);

  const threadId = thread?.threadId ?? defaultThreadId;

  useEffect(() => {
    if (status === "in_progress" || !threadId) {
      return;
    }

    const messagesCount = messages.length;

    if (
      messagesCount > lastMessagesCount.current &&
      messagesCount % PAIR === 0
    ) {
      if (lastMessagesCount.current === 0 && messagesCount === PAIR) {
        // Initial messages
        startTransition(async () => {
          // await postThreadAndMessagePair({
          //   userId: userId,
          //   assistantId: assistantId,
          //   threadId: threadId,
          //   userMessage: messages[0].content,
          //   assistantMessage: messages[1].content,
          //   projectId,
          //   hideThread: true,
          // });
        });

        lastMessagesCount.current = messagesCount;

        onThreadCreated?.(threadId);
        return;
      }

      // Save the other messages
      if (
        lastMessagesCount.current !== 0 &&
        lastMessagesCount.current !== messagesCount
      ) {
        startTransition(async () => {
          // const assistantMessage = messages[messagesCount - 1].content;

          // const { status, docText: newDocText } = await postMessagePairAndDoc({
          //   threadId: threadId,
          //   userMessage: messages[messagesCount - 2].content,
          //   assistantMessage,
          //   threadTitle: thread?.title ?? "",
          // });

          if (status === "can-be-saved") {
            // Promise.resolve().then(() => {
            //   setDocText(newDocText || removeSources(assistantMessage));
            //   setCanBeSaved(true);
            // });
          }

          lastMessagesCount.current = messagesCount;
        });
      }
    }
  }, [
    assistantId,
    messages,
    onThreadCreated,
    projectId,
    status,
    thread,
    thread?.threadId,
    thread?.title,
    threadId,
    userId,
  ]);

  return { isPending, canBeSaved, docText };
}

export function DocumentChat({
  projectId,
  userId,
  assistant,
  onThreadIdChange,
  threadId: defaultThreadId,
  thread,
  prompt,
  // onInsert,
  onPending,
}: Props) {
  const [tid, setTid] = useState(thread?.threadId ?? defaultThreadId);

  const {
    status,
    messages,
    setMessages,
    threadId,
    input,
    submitMessage,
    handleInputChange,
    append,
  } = useAssistant({
    api: "/api/assistant",
    threadId: tid,
  });

  useEffect(() => {
    if (threadId === undefined) {
      return;
    }

    setTid(threadId);
  }, [threadId]);

  useEffect(() => {
    if (thread) {
      setMessages(thread.messages);
    }
  }, [setMessages, thread]);

  const {
    scrollRef,
    visibilityRef,
    // isVisible,
    //  scrollToBottom
  } = useScrollAnchor();

  const waitingForPair = useRef(false);
  const createThreadRequested = useRef(false);

  const {
    isPending,
    // canBeSaved,
    //  docText
  } = useSaveMessages({
    messages,
    status,
    userId,
    assistantId: assistant.id,
    projectId,
    thread,
    threadId: tid,
    onThreadCreated: onThreadIdChange,
  });

  useEffect(() => {
    onPending?.(isPending);
  }, [isPending, onPending]);

  useEffect(() => {
    if (createThreadRequested.current || !!thread) return;

    createThreadRequested.current = true;

    append(
      {
        content: prompt || site.projects.startingMessage,
        role: "user",
      },
      {
        data: {
          assistantId: assistant.id,
        },
      }
    );
  }, [append, assistant.id, defaultThreadId, prompt, thread, threadId]);

  const isInProgress = useMemo(() => status === "in_progress", [status]);

  const handleInputSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      waitingForPair.current = true;

      if (!tid) {
        toast.error("No thread id");
        return;
      }

      submitMessage(e, {
        data: {
          assistantId: assistant.id,
          threadId: tid,
        },
      });
    },
    [assistant.id, submitMessage, tid]
  );

  return (
    <div className="relative mx-auto flex size-full max-w-4xl flex-1 flex-col justify-between overflow-y-auto">
      <div className="flex flex-1 flex-col">
        <div className="relative min-h-[30vh] flex-1">
          <div
            ref={scrollRef}
            className="absolute inset-0 flex flex-col-reverse gap-4 overflow-auto"
          >
            <div className="my-2 h-px w-full" ref={visibilityRef} />

            <ChatLoading show={isInProgress} />

            {messages.toReversed().map((m: Message, index) => {
              const content = removeSources(m.content);

              return (
                <div key={m.id || index}>
                  <p>{content}</p>
                </div>
                // <MessageBox
                //   mode={m.role}
                //   content={content}
                //   key={m.id || index}
                //   id={m.id}
                //   showIcons={status === "awaiting_message" && !isPending}
                //   onInsertClick={() => onInsert?.(content)}
                // />
              );
            })}
          </div>

          {/* <ButtonScrollToBottom
            isAtBottom={isVisible}
            scrollToBottom={scrollToBottom}
          /> */}
        </div>

        <AssistantChatInput
          onSubmit={handleInputSubmit}
          disabled={status !== "awaiting_message" || isPending}
          status={status}
          value={input}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

function ChatLoading({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <span>
      <Loader2Icon className="animate-spin" width={25} />
    </span>
  );
}

type AssistantChatInputProps = {
  disabled?: boolean;
  value: string;
  status: "awaiting_message" | "in_progress" | "can-be-saved";
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

function AssistantChatInput({
  disabled,
  value,
  onSubmit,
  onChange,
}: AssistantChatInputProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<AutosizeTextAreaRef | null>(null);
  const [chatInputHeight, setChatInputHeight] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current) {
      // Schedule the update using useEffect
      Promise.resolve().then(() => {
        setChatInputHeight(
          containerRef.current!.getBoundingClientRect().height
        );
      });
    }
  }, []);

  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);

    if (textAreaRef.current) {
      textAreaRef.current.textArea.focus();
    }
  };

  const containerStyle = {
    "--chat-input-height": `${chatInputHeight}px`,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className="sticky inset-x-0 bottom-0 z-50 w-full flex-col items-center justify-center bg-white"
      style={containerStyle}
    >
      <form
        ref={formRef}
        className="m-auto max-w-4xl"
        onSubmit={handleInputSubmit}
      >
        <div className="px-1 pb-2 md:pb-4 lg:p-4">
          <div className="relative flex flex-row flex-nowrap items-center gap-4">
            <AutosizeTextarea
              ref={textAreaRef}
              maxHeight={200}
              autoFocus
              className="min-h-[10px] resize-none pr-8"
              // disabled={disabled}
              value={value}
              // ref={textareaRef}
              placeholder={`Type a message...`}
              onChange={onChange}
              onKeyDown={(event) => {
                const isTouch = isTouchScreen();

                if (
                  !disabled &&
                  event.key === "Enter" &&
                  ((isTouch && event.shiftKey) || (!isTouch && !event.shiftKey))
                ) {
                  event.preventDefault();

                  // Submit form
                  formRef?.current?.requestSubmit();
                }
              }}
            />
            <Button
              size="icon"
              variant="ghost"
              disabled={disabled}
              className="absolute right-2 z-50"
            >
              <SendIcon />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-gray-500 lg:pr-14">
            {site.name} is powered by an awesome LLM, but it can make mistakes.
            Check important info. 🧐
          </p>
        </div>
      </form>
    </div>
  );
}
