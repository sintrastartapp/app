import { memo } from "react";

import { BlockEditorState } from "@/components/tiptap/hooks/useBlockEditor";
import { Loader2Icon } from "lucide-react";

export type EditorInfoProps = {
  characters: number;
  words: number;
  saveState: BlockEditorState;
};

const saveStateText = {
  loading: "Loading",
  saving: "Saving",
  saved: "Saved",
};

export const EditorInfo = memo(
  ({ characters, saveState, words }: EditorInfoProps) => {
    return (
      <div className="flex items-center text-xs">
        <div className="mr-4 flex flex-col justify-center border-r border-gray-200 pr-4 text-right dark:border-gray-800">
          <div className="font-semibold text-gray-500 dark:text-gray-400">
            {words} {words === 1 ? "word" : "words"}
          </div>
          <div className="font-semibold text-gray-500 dark:text-gray-400">
            {characters} {characters === 1 ? "character" : "characters"}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          {saveState === "saved" ? (
            <div className="size-2 rounded-full bg-green-500 dark:bg-green-400" />
          ) : (
            <Loader2Icon className="size-4 animate-spin text-yellow-500" />
          )}

          <span className="max-w-16 font-semibold text-gray-500 dark:text-gray-400">
            {saveStateText[saveState]}
          </span>
        </div>
      </div>
    );
  }
);

EditorInfo.displayName = "EditorInfo";
