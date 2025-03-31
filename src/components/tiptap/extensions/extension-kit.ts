"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { History } from "@tiptap/extension-history";
import { createLowlight } from "lowlight";
import { Markdown } from "tiptap-markdown";

const lowlight = createLowlight();

import {
  BlockquoteFigure,
  CharacterCount,
  Color,
  Column,
  Columns,
  Document,
  Dropcursor,
  Figcaption,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableOfContents,
  TableRow,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
} from ".";
import { TableOfContentsNode } from "./TableOfContentsNode";

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null;
  userId?: string;
  userName?: string;
  userColor?: string;
}

export const ExtensionKit = ({}: // provider,
// userId,
// userName = "Maxi",
ExtensionKitProps) => [
  Document,
  History.configure({}),
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: null,
  }),
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  TableOfContents,
  TableOfContentsNode,
  ImageBlock,
  // FileHandler.configure({
  //   allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach(async () => {
  //       const url = await API.uploadImage()

  //       currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
  //     })
  //   },
  //   onPaste: (currentEditor, files) => {
  //     files.forEach(async () => {
  //       const url = await API.uploadImage()

  //       return currentEditor
  //         .chain()
  //         .setImageBlockAt({
  //           pos: currentEditor.state.selection.anchor,
  //           src: url,
  //         })
  //         .focus()
  //         .run()
  //     })
  //   },
  // }),
  // Emoji.configure({
  //   enableEmoticons: true,
  //   suggestion: emojiSuggestion,
  // }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => "",
  }),
  SlashCommand,
  // ChatNode,
  // ChatsCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
  Markdown.configure({}),
];

export default ExtensionKit;
