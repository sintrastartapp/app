import { cn } from "@/components/tiptap/lib/utils";
import { Editor } from "@tiptap/react";
import { memo, useCallback } from "react";

import { TableOfContents } from "../TableOfContents";

export const Sidebar = memo(
  ({
    editor,
    isOpen,
    onClose,
  }: {
    editor: Editor;
    isOpen?: boolean;
    onClose: () => void;
  }) => {
    const handlePotentialClose = useCallback(() => {
      if (window.innerWidth < 1024) {
        onClose();
      }
    }, [onClose]);

    const windowClassName = cn(
      "absolute top-0 left-0 bg-white lg:bg-white/30 lg:backdrop-blur-xl h-full lg:h-auto lg:relative z-[49] w-0 duration-300 transition-all",
      "dark:bg-black lg:dark:bg-black/30",
      !isOpen && "border-r-transparent",
      isOpen && "w-80 border-r border-r-gray-200 dark:border-r-gray-800"
    );

    return (
      <div className={windowClassName}>
        <div className="size-full overflow-hidden">
          <div className="size-full overflow-auto p-6">
            <TableOfContents
              onItemClick={handlePotentialClose}
              editor={editor}
            />
          </div>
        </div>
      </div>
    );
  }
);

Sidebar.displayName = "TableOfContentSidepanel";
