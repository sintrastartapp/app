"use client";

// import { getThreadRT } from "@/backend/data-layer-types/ai";
// import { getThread } from "@/backend/data-layer/ai";
import { useEditorContext } from "@/components/tiptap/context/EditorContext";
import { Editor } from "@tiptap/core";
import { NodeViewWrapper } from "@tiptap/react";
import { Loader2Icon } from "lucide-react";
// import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState, useTransition } from "react";

// import { SuggestionButton } from "@/components/atoms/suggestion-button";
import { Button } from "@/components/ui/button";
import { Node } from "@tiptap/pm/model";
// import { getAssistantById } from "@/config/assistants";

type ChatNodeAttrs = "threadId" | "assistantId" | "prompt";

type Props = {
  node: Node;
  updateAttributes: (attrs: Record<ChatNodeAttrs, string>) => void;
  getPos: () => number;
  editor: Editor;
};

type getThreadRT = unknown;

export function ChatNodeView({ node, ...props }: Props) {
  const [isPending, startTransition] = useTransition();
  const [thread, setThread] = useState<getThreadRT | undefined>(undefined);
  // const { data: session } = useSession();
  const session = {
    user: {
      id: "1",
      selectedProjectId: "1",
    },
  };
  const context = useEditorContext();
  // const assistant = getAssistantById({ assistantId: node.attrs.assistantId });
  const assistant = {
    name: "Assistant",
    description: "Assistant description",
    suggestions: ["Suggestion 1", "Suggestion 2"],
    initials: "AA",
    category: {
      colorHex: "#000000",
      name: "Category",
      iconName: "Icon",
    },
    iconName: "Icon",
    id: "1",
  };

  // Get initial threadId messages
  useEffect(() => {
    if (thread !== undefined) {
      return;
    }

    startTransition(async () => {
      const { threadId } = node.attrs;

      if (!session?.user.id || !threadId) {
        return;
      }

      // const thread = await getThread({
      //   threadId,
      //   userId: session?.user.id,
      //   redirect: false,
      // });

      if (thread && "error" in thread) {
        return;
      }

      setThread(thread);
      // context.setAiChat({ assistant, thread, prompt: node.attrs.prompt })
    });
  }, [context, node.attrs, node.attrs.threadId, session?.user.id, thread]);

  // const handleThreadIdChange = useCallback(
  //   (threadId: string) => {
  //     if (!threadId) {
  //       return;
  //     }

  //     props.updateAttributes({
  //       threadId,
  //       assistantId: node.attrs.assistantId,
  //       prompt: node.attrs.prompt,
  //     });
  //   },
  //   [node.attrs.assistantId, node.attrs.prompt, props]
  // );

  const handlePromptStart = useCallback(
    (prompt: string) => {
      props.updateAttributes({
        prompt,
        assistantId: node.attrs.assistantId,
        threadId: node.attrs.threadId,
      });
    },
    [node.attrs.assistantId, node.attrs.threadId, props]
  );

  // const handleInsert = useCallback(
  //   (text: string) => {
  //     const { editor } = props;

  //     // Insert content at current cursor position
  //     editor.chain().focus().insertContent(text).run();

  //     // Insert after current node
  //     // editor
  //     //   .chain()
  //     //   .focus()
  //     //   .insertContentAt(getPos() + node.nodeSize, text)
  //     //   .run()
  //   },
  //   [props]
  // );

  const handleOpenAssistantChat = useCallback(() => {
    // context.setAiChat({
    //   assistant,
    //   thread,
    //   prompt: node.attrs.prompt,
    //   threadIdChangedHandler: handleThreadIdChange,
    //   onInsert: handleInsert,
    // });
  }, []);

  if (!assistant || !session?.user.id || !session?.user.selectedProjectId) {
    return null;
  }

  const hasPlaceholders =
    (assistant.suggestions ?? []).length > 0 &&
    assistant.suggestions?.some((s) => s.includes("[")) &&
    !node.attrs.prompt;

  return (
    <NodeViewWrapper className="chat-node my-4">
      <div
        contentEditable={false}
        className="flex select-none flex-col gap-2 rounded-lg border border-gray-300 p-2 text-black"
        data-chat-id={node.attrs.assistantId}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{assistant.name}</span>
            {node.attrs.prompt && (
              <span className="text-sm text-muted-foreground">
                {node.attrs.prompt}
              </span>
            )}
          </div>

          {isPending ? (
            <div>
              <Loader2Icon className="animate-spin" width={32} />
            </div>
          ) : hasPlaceholders ? (
            <span className="pr-2">Click a prompt below to start</span>
          ) : (
            <Button onClick={handleOpenAssistantChat}>
              Open assistant chat
            </Button>
          )}
        </div>

        {hasPlaceholders && (
          <div className="grid grid-cols-3 place-items-center p-2">
            {assistant.suggestions?.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handlePromptStart(suggestion)}
              ></button>
              // <SuggestionButton
              //   key={suggestion}
              //   suggestion={suggestion}
              //   onClick={handlePromptStart}
              //   disabled={isPending}
              // />
            ))}
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}
