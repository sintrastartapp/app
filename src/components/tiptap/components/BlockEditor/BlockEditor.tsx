"use client";

import { LinkMenu } from "@/components/tiptap/components/menus";
import { useBlockEditor } from "@/components/tiptap/hooks/useBlockEditor";
// import useDocStore from "@/store/docs-store";
import { EditorContent } from "@tiptap/react";
import { PropsWithChildren, useLayoutEffect, useRef } from "react";

import "@/components/tiptap/styles/index.css";

// import { GetDocumentsResult } from "@/backend/data-layer/document";
import { EditorContextProvider } from "@/components/tiptap/context/EditorContext";
import ImageBlockMenu from "@/components/tiptap/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/components/tiptap/extensions/MultiColumn/menus";
import {
  TableColumnMenu,
  TableRowMenu,
} from "@/components/tiptap/extensions/Table/menus";

import { getDocumentAction } from "@/app/(protected)/[projectId]/actions";
import { Assistant } from "@/config/assistants";
import { GetDocumentsResponse, GetProjectRoleResponse } from "@/services";
import { GetChatResponse } from "@/services/chats.service";
import { useQuery } from "@tanstack/react-query";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import { TextMenu } from "../menus/TextMenu";
import { EditorChat } from "./components/EditorChat";
import { EditorHeader } from "./components/EditorHeader";

export const BlockEditor = ({
  document: initialDoc,
  title,
  chat,
  // messages,
  assistant,
  role,
}: PropsWithChildren<{
  title: string;
  document: GetDocumentsResponse;
  // messages: GetChatMessagesResponse;
  role: GetProjectRoleResponse;
  chat: GetChatResponse;
  assistant: Assistant;
}>) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { data: doc } = useQuery({
    queryKey: ["document", initialDoc.id],
    queryFn: () => getDocumentAction(initialDoc.projectId, initialDoc.slug),
    enabled: true,
    initialData: initialDoc,
  });

  const { editor, characterCount, editorState } = useBlockEditor({
    initialContent: doc.content,
    document: doc,
  });

  useLayoutEffect(() => {
    // Get first .ProseMirror child element width
    const firstProseMirrorChild = document.querySelector(".ProseMirror > *");

    if (firstProseMirrorChild) {
      const { width } = firstProseMirrorChild.getBoundingClientRect();

      // Set body css variable --document-width
      document.documentElement.style.setProperty(
        "--document-width",
        `${width}px`
      );
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <EditorContextProvider editor={editor}>
      <div className="flex size-full" ref={menuContainerRef}>
        <div className="relative flex h-full flex-1 flex-col">
          <div className="flex h-full flex-1">
            <div className="flex w-full flex-col">
              <EditorHeader
                title={title}
                characters={characterCount.characters()}
                saveState={editorState}
                words={characterCount.words()}
                document={doc}
                assistant={assistant}
                role={role}
              />
              <div className="relative h-full">
                <div className="absolute inset-0 overflow-y-auto">
                  <EditorContent
                    editor={editor}
                    ref={editorRef}
                    className="min-h-full flex-1 pl-14 outline-none"
                  />
                </div>
              </div>
            </div>

            <EditorChat
              document={doc}
              editor={editor}
              assistant={assistant}
              chat={chat}
              // messages={messages}
            />
          </div>
          {
            <>
              <ContentItemMenu editor={editor} />
              <LinkMenu editor={editor} appendTo={menuContainerRef} />
              <TextMenu editor={editor} />
              <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
              <TableRowMenu editor={editor} appendTo={menuContainerRef} />
              <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
              <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
            </>
          }
        </div>
      </div>
    </EditorContextProvider>
  );
};

export default BlockEditor;
