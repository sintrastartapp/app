"use client";

import { Button } from "@/components/ui/button";
import { Message } from "ai/react";
import { useEffect, useRef } from "react";

import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";
import { cn, copyToClipboard } from "@/lib/utils";
import { GetDocumentsResponse } from "@/services";
import { AssistantStatus } from "ai";
import { CopyIcon, ListPlusIcon, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage } from "./chat-message";

type Props = {
  isLoading?: boolean;
  document: GetDocumentsResponse;
  status: AssistantStatus;
  messages: Message[];
  onInsert: (text: string) => void;

  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInputSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  onStartConversation: () => void;
};

export default function Chat({
  isLoading,
  status,
  document: doc,
  messages = [],
  onInsert,
  inputValue,
  onInputChange,
  onInputSubmit,
  onStartConversation,
}: Props) {
  async function copyMessageToClipboard(text: string) {
    await copyToClipboard(text);

    toast.success("Message copied to clipboard");
  }

  function insertIntoDocument(text: string) {
    onInsert(text);

    toast.success("Message inserted into the document");
  }

  const isInputDisabled =
    isLoading ||
    status !== "awaiting_message" ||
    messages.length === 0 ||
    doc.isComplete;

  return (
    <>
      <div
        data-empty={messages.length === 0}
        className="relative flex flex-1 data-[empty=true]:items-center data-[empty=true]:justify-center"
      >
        {isLoading && (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-center">
            <p className="animate-bounce text-muted-foreground">
              Initializing AI assistant...
            </p>
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Button disabled={doc.isComplete} onClick={onStartConversation}>
              Start a conversation
            </Button>
            {doc.isComplete && (
              <p className="text-xs text-muted-foreground">
                This document is marked as completed.
              </p>
            )}
          </div>
        )}

        {!isLoading && messages.length > 0 && (
          <div className="absolute inset-0 flex flex-col-reverse items-start gap-2 overflow-auto  pr-2 text-sm">
            <div className="flex h-10 items-end self-center">
              <div className="animate-bounce p-2 text-xs text-muted-foreground">
                {status === "in_progress" && "Assistant is typing..."}
              </div>
            </div>

            {messages.toReversed().map((m: Message) => (
              <ChatMessage
                key={m.id}
                align={m.role === "user" ? "right" : "left"}
                content={m.content}
                userName={(m.data as { userName: string })?.userName}
              >
                {m.role !== "user" && status !== "in_progress" && (
                  <div className="flex w-full items-center justify-between px-2 py-4">
                    <Button
                      variant="ghost"
                      className="size-6 items-center justify-center rounded-full p-0"
                      onClick={() => copyMessageToClipboard(m.content)}
                    >
                      <CopyIcon className="size-4" />
                    </Button>
                    {!doc.isComplete && (
                      <Button
                        variant="outline"
                        onClick={() => insertIntoDocument(m.content)}
                        className="h-8 items-center gap-2 px-2 py-3 text-xs"
                      >
                        <ListPlusIcon className="size-4" />
                        Insert response into the document
                      </Button>
                    )}
                  </div>
                )}
              </ChatMessage>
            ))}
          </div>
        )}
      </div>

      <ChatInput
        disabled={isInputDisabled}
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onInputSubmit}
      />
    </>
  );
}

function ChatInput({
  disabled,
  value,
  onChange,
  onSubmit,
  className,
}: {
  disabled: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();

      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={cn(
        "mb-2 flex items-center mt-1 rounded-md bg-muted p-2 gap-2",
        className
      )}
    >
      <AutosizeTextarea
        ref={inputRef as React.RefObject<AutosizeTextAreaRef>}
        placeholder="Type a message..."
        autoFocus
        disabled={disabled}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        className="bg-white"
        minHeight={58}
        maxHeight={98}
      />

      <Button
        type="submit"
        variant="ghost"
        disabled={disabled}
        className="size-6 items-center justify-center p-0"
      >
        <SendIcon className="size-5" />
      </Button>
    </form>
  );
}
