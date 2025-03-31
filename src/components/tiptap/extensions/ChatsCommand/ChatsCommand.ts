import { Editor, Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import Suggestion, {
  SuggestionKeyDownProps,
  SuggestionProps,
} from "@tiptap/suggestion";
import tippy from "tippy.js";

// import { assistantsByCategory } from "@/config/assistants";
const assistantsByCategory = [
  {
    assistantCategory: {
      name: "Category 1",
      colorHex: "#000000",
      iconName: "Icon",
    },
    assistants: [
      {
        name: "Assistant 1",
        description: "Assistant 1 description",
        suggestions: ["Suggestion 1", "Suggestion 2"],
        initials: "AA",
        category: {
          colorHex: "#000000",
          name: "Category 1",
          iconName: "Icon",
        },
        iconName: "Icon",
        id: "1",
      },
      {
        name: "Assistant 2",
        description: "Assistant 2 description",
        suggestions: ["Suggestion 1", "Suggestion 2"],
        initials: "AA",
        category: {
          colorHex: "#000000",
          name: "Category 1",
          iconName: "Icon",
        },
        iconName: "Icon",
        id: "2",
      },
    ],
  },
];

import { ChatMenuList } from "./ChatMenuList";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    chatsCommand: {
      createChat: (assistantId: string) => ReturnType;
    };
  }
}

const extensionName = "chatsCommand";

let popup: ReturnType<typeof tippy>;

export const ChatsCommand = Extension.create({
  name: extensionName,

  priority: 200,

  onCreate() {
    popup = tippy("body", {
      interactive: true,
      trigger: "manual",
      placement: "bottom-start",
      theme: "chats-command",
      maxWidth: "var(--document-width, 16rem)",
      offset: [16, 8],
      popperOptions: {
        strategy: "fixed",
        modifiers: [
          {
            name: "flip",
            enabled: false,
          },
        ],
      },
    });
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: "@",
        allowSpaces: true,
        startOfLine: true,
        pluginKey: new PluginKey(extensionName),
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const isRootDepth = $from.depth === 1;
          const isParagraph = $from.parent.type.name === "paragraph";
          const isStartOfNode = $from.parent.textContent?.charAt(0) === "@";
          // TODO
          const isInColumn = this.editor.isActive("column");

          const afterContent = $from.parent.textContent?.substring(
            $from.parent.textContent?.indexOf("@")
          );
          const isValidAfterContent = !afterContent?.endsWith("  ");

          const allow =
            ((isRootDepth && isParagraph && isStartOfNode) ||
              (isInColumn && isParagraph && isStartOfNode)) &&
            isValidAfterContent;

          return allow;
        },
        command: ({
          editor,
          props,
        }: {
          editor: Editor;
          props: {
            action: (editor: Editor) => void;
          };
        }) => {
          const { view, state } = editor;
          const { $head, $from } = view.state.selection;

          const end = $from.pos;
          const from = $head?.nodeBefore
            ? end -
              ($head.nodeBefore.text?.substring(
                $head.nodeBefore.text?.indexOf("@")
              ).length ?? 0)
            : $from.start();

          const tr = state.tr.deleteRange(from, end);
          view.dispatch(tr);

          props.action(editor);
          view.focus();
        },
        items: ({ query }: { query: string }) => {
          return assistantsByCategory
            .filter((category) =>
              category.assistants.some((assistant) =>
                assistant.initials.toLowerCase().includes(query.toLowerCase())
              )
            )
            .map((category) => ({
              ...category,
              assistants: category.assistants.filter((assistant) =>
                assistant.initials.toLowerCase().includes(query.toLowerCase())
              ),
            }));
        },
        render: () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let component: any;

          const scrollHandler: (() => void) | null = null;

          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(ChatMenuList, {
                props,
                editor: props.editor,
              });

              const { view } = props.editor;

              // const editorNode = view.dom as HTMLElement;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[extensionName].rect;
                }

                let yPos = rect.y;

                if (
                  rect.top + component.element.offsetHeight + 40 >
                  window.innerHeight
                ) {
                  const diff =
                    rect.top +
                    component.element.offsetHeight -
                    window.innerHeight +
                    40;
                  yPos = rect.y - diff;
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                // const editorXOffset = editorNode.getBoundingClientRect().x;
                return new DOMRect(rect.x, yPos, rect.width, rect.height);
              };

              const scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener("scroll", scrollHandler);

              popup?.[0].setProps({
                getReferenceClientRect,
                appendTo: () => document.body,
                content: component.element,
              });

              popup?.[0].show();
            },

            onUpdate(props: SuggestionProps) {
              component.updateProps(props);

              const { view } = props.editor;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[extensionName].rect;
                }

                return new DOMRect(rect.x, rect.y, rect.width, rect.height);
              };

              const scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener("scroll", scrollHandler);

              // eslint-disable-next-line no-param-reassign
              props.editor.storage[extensionName].rect = props.clientRect
                ? getReferenceClientRect()
                : {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  };

              popup?.[0].setProps({
                getReferenceClientRect,
              });
            },

            onKeyDown(props: SuggestionKeyDownProps) {
              if (props.event.key === "Escape") {
                popup?.[0].hide();

                return true;
              }

              if (!popup?.[0].state.isShown) {
                popup?.[0].show();
              }

              return component.ref?.onKeyDown(props);
            },

            onExit(props) {
              popup?.[0].hide();

              if (scrollHandler) {
                const { view } = props.editor;
                view.dom.parentElement?.removeEventListener(
                  "scroll",
                  scrollHandler
                );
              }
            },
          };
        },
      }),
    ];
  },

  addCommands() {
    return {
      createChat:
        (assistantId: string) =>
        ({ commands }) => {
          return commands.insertContent({
            name: this.name,
            type: "chatNode",
            attrs: {
              assistantId,
            },
          });
        },
    };
  },

  addStorage() {
    return {
      rect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  },
});

export default ChatsCommand;
