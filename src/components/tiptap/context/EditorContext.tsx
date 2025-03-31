import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
// import { getThreadRT } from "@/backend/data-layer-types/ai"
import { Editor } from "@tiptap/core";

type EditorContext = {
  editor?: Editor;
  isChatOpen: boolean;
  setIsChatOpen: (isChatOpen: boolean) => void;
};

export const EditorContext = createContext<EditorContext>({
  editor: undefined,
  isChatOpen: true,
  setIsChatOpen: () => {},
});

export const EditorContextProvider = ({
  editor,
  children,
}: PropsWithChildren<{
  editor: Editor;
}>) => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const context = useMemo(() => {
    return {
      editor,
      isChatOpen,
      setIsChatOpen,
    } satisfies EditorContext;
  }, [editor, isChatOpen]);

  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error(
      "useEditorContext must be used within <EditorContextProvider>"
    );
  }

  return context;
};
