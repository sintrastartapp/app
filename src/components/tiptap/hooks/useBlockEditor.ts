"use client";

// import { putDocument } from "@/backend/data-layer/document";
import { ExtensionKit } from "@/components/tiptap/extensions/extension-kit";
import { Editor, useEditor } from "@tiptap/react";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  getDocumentAction,
  saveDocumentAction,
} from "@/app/(protected)/[projectId]/actions";
import { GetDocumentsResponse } from "@/services";
import { EditorUser } from "../components/BlockEditor/types";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

type BlockEditorParams = {
  initialContent: string | null;
  document: GetDocumentsResponse;
};

export type BlockEditorState = "loading" | "saved" | "saving";

export const useBlockEditor = ({
  initialContent,
  document: doc,
}: BlockEditorParams) => {
  const [editorState, setSaveState] = useState<BlockEditorState>("loading");

  const editor = useEditor(
    {
      content: initialContent,
      autofocus: true,
      immediatelyRender: false,
      editable: !doc.isComplete,
      extensions: [...ExtensionKit({})],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full prose prose-slate max-w-none outline-none",
        },
      },
      async onUpdate({ editor, transaction }) {
        if (!transaction.docChanged) {
          return;
        }

        setSaveState("saving");
        const html = editor.getHTML();

        saveDocument(html);
      },
    },
    []
  );

  useEffect(() => {
    if (!editor) {
      return;
    }

    setSaveState("loading");
    // Set editor not editable
    editor.setEditable(false);

    getDocumentAction(doc.projectId, doc.slug).then((document) => {
      if (document) {
        editor?.commands.setContent(document.content);
        // Set editor editable
        editor.setEditable(true);

        // Focus editor
        editor.commands.focus();

        setSaveState("saved");
      }
    });

    // const exists = checkIfDocExists(threadId);
    // if (!exists && documentR) {
    //   addDocsStart([documentR]);
    // }
  }, [doc, editor]);

  const saveDocument = useDebouncedCallback(async (content: string) => {
    await saveDocumentAction(doc.projectId, doc.slug, content);

    setSaveState("saved");
  }, 1000);

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return [];
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(" ");
      const firstName = names?.[0];
      const lastName = names?.[names.length - 1];
      const initials = `${firstName?.[0] || "?"}${lastName?.[0] || "?"}`;

      return { ...user, initials: initials.length ? initials : "?" };
    });
  }, [editor?.storage.collaborationCursor?.users]);

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  // useEffect(() => {
  //   provider?.on("status", (event: { status: WebSocketStatus }) => {
  //     setCollabState(event.status)
  //   })
  // }, [provider])

  useLayoutEffect(() => {
    window.editor = editor;
  }, [editor]);

  return { editor, users, characterCount, editorState };
};
