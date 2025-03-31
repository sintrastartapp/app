"use client";

// import useDocStore from "@/store/docs-store";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import { PropsWithChildren, useRef } from "react";

import "@/components/tiptap/styles/index.css";
import { Loader2Icon } from "lucide-react";
import ExtensionKit from "../../extensions/extension-kit";

// import { GetDocumentsResult } from "@/backend/data-layer/document";

export const ReadEditor = ({
  content,
}: PropsWithChildren<{
  content: Content;
}>) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const editor = useEditor(
    {
      content,
      autofocus: true,
      immediatelyRender: false,
      editable: false,
      extensions: [...ExtensionKit({})],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full prose prose-slate max-w-none p-0",
          style: "padding: 0 !important;",
        },
      },
    },
    []
  );

  if (!editor) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2Icon className="size-8 animate-spin" />
      </div>
    );
  }

  return <EditorContent editor={editor} ref={editorRef} />;
};

export default ReadEditor;
