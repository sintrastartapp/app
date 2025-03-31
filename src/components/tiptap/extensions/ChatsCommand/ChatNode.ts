import { mergeAttributes, Node } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { ChatNodeView } from "./ChatNodeView";

export const CHAT_NODE_NAME = "chatNode";

export const ChatNode = Node.create({
  name: CHAT_NODE_NAME,

  content: "text*",

  group: "block",

  selectable: false,

  draggable: false,

  atom: true,

  addAttributes() {
    return {
      assistantId: {
        default: null,
        parseHTML: (element) => element.getAttribute("assistantId"),
        renderHTML: (attributes) => ({
          assistantId: attributes.assistantId,
        }),
      },
      threadId: {
        default: null,
        parseHTML: (element) => element.getAttribute("threadId"),
        renderHTML: (attributes) => ({
          threadId: attributes.threadId,
        }),
      },
      prompt: {
        default: null,
        parseHTML: (element) => element.getAttribute("prompt"),
        renderHTML: (attributes) => ({
          prompt: attributes.prompt,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "chat-node",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "chat-node",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ChatNodeView);
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        // Prevent node from being deleted if it has a chatId and a threadId when backspace or delete is pressed
        props: {
          handleKeyDown: (view, event) => {
            if (event.key === "Backspace" || event.key === "Delete") {
              (view.state as unknown as { deleting: boolean }).deleting = true;
            }

            return false;
          },
        },

        filterTransaction(tr, state) {
          const { deleting } = state as unknown as { deleting: boolean };

          if (!deleting) {
            return true;
          }

          let result = true;

          tr.mapping.maps.forEach((mapping) => {
            mapping.forEach((oldStart, oldEnd) => {
              state.doc.nodesBetween(oldStart, oldEnd, (node) => {
                if (
                  node.type.name === CHAT_NODE_NAME &&
                  node.attrs.assistantId &&
                  node.attrs.threadId
                ) {
                  result = false;
                }
              });
            });
          });

          return result;
        },
      }),
    ] as unknown as Plugin[];
  },
});
