import { DropdownButton } from "@/components/tiptap/components/ui/Dropdown";
import { Icon } from "@/components/tiptap/components/ui/Icon";
import { Surface } from "@/components/tiptap/components/ui/Surface";
import { Toolbar } from "@/components/tiptap/components/ui/Toolbar";
import * as Popover from "@radix-ui/react-popover";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import useContentItemActions from "./hooks/useContentItemActions";
import { useData } from "./hooks/useData";

export type ContentItemMenuProps = {
  editor: Editor;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos
  );

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta("lockDragHandle", true);
    } else {
      editor.commands.setMeta("lockDragHandle", false);
    }
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      className={cn({
        hidden: !editor.isEditable,
      })}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center gap-0.5">
        <Toolbar.Button onClick={actions.handleAdd}>
          <Icon name="Plus" />
        </Toolbar.Button>
        <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <Toolbar.Button>
              <Icon name="GripVertical" />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="bottom" align="start" sideOffset={8}>
            <Surface className="flex min-w-64 flex-col p-2">
              <Popover.Close>
                <DropdownButton onClick={actions.resetTextFormatting}>
                  <Icon name="RemoveFormatting" />
                  Clear formatting
                </DropdownButton>
              </Popover.Close>
              <Popover.Close>
                <DropdownButton onClick={actions.copyNodeToClipboard}>
                  <Icon name="Clipboard" />
                  Copy to clipboard
                </DropdownButton>
              </Popover.Close>
              <Popover.Close>
                <DropdownButton onClick={actions.duplicateNode}>
                  <Icon name="Copy" />
                  Duplicate
                </DropdownButton>
              </Popover.Close>
              <Toolbar.Divider horizontal />
              <Popover.Close>
                <DropdownButton
                  onClick={actions.deleteNode}
                  className="bg-red-500/10 text-red-500 hover:bg-red-500/20 dark:text-red-500 dark:hover:bg-red-500/20 dark:hover:text-red-500"
                >
                  <Icon name="Trash2" />
                  Delete
                </DropdownButton>
              </Popover.Close>
            </Surface>
          </Popover.Content>
        </Popover.Root>
      </div>
    </DragHandle>
  );
};
