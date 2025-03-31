import { Editor } from "@tiptap/core";
import { icons } from "lucide-react";

// import { AssistantsByCategory } from "@/config/assistants"
type AssistantsByCategory = {
  assistantCategory: {
    name: string;
    colorHex: string;
    iconName: keyof typeof icons;
  };
  assistants: {
    name: string;
    description: string;
    suggestions: string[];
    initials: string;
    category: {
      colorHex: string;
      name: string;
      iconName: keyof typeof icons;
    };
    iconName: keyof typeof icons;
    id: string;
  }[];
}[];

export interface Group {
  name: string;
  title: string;
  commands: Command[];
}

export interface Command {
  name: string;
  label: string;
  description: string;
  aliases?: string[];
  iconName: keyof typeof icons;
  action: (editor: Editor) => void;
  shouldBeHidden?: (editor: Editor) => boolean;
}

export interface MenuListProps {
  editor: Editor;
  items: AssistantsByCategory;
  query?: string;
  command: (command: Command) => void;
}
