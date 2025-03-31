import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import { Surface } from "../../components/ui/Surface";
import { MenuListProps } from "./types";

export const ChatMenuList = forwardRef((props: MenuListProps, ref) => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop = 0;
    }
  }, [props.items]);

  useImperativeHandle(ref, () => {
    return {
      onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          return true;
        }

        if (event.key === "ArrowDown") {
          return true;
        }

        if (event.key === "Enter") {
          return true;
        }

        return false;
      },
    };
  });

  if (!props.items.length) {
    return null;
  }

  return (
    <Surface
      ref={scrollContainer}
      className="mb-8 max-h-[min(80vh,24rem)] flex-wrap overflow-y-auto overflow-x-hidden p-2"
    >
      <div className="grid w-[56rem] gap-2">
        {props.items.map((category) => (
          <div key={category.assistantCategory.name} className="w-[95%]">
            <h2 className="my-4 text-xl font-bold">
              {category.assistantCategory.name}
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {category.assistants.map((assistant) => (
                <button
                  key={assistant.id}
                  style={
                    {
                      "--border-color": assistant.category.colorHex,
                    } as React.CSSProperties
                  }
                  className="flex w-full flex-col items-start rounded-md border border-l-4 border-gray-300 border-l-[var(--border-color)] p-2 text-left outline-black hover:bg-gray-50 hover:text-black dark:border-gray-600 dark:border-l-[var(--border-color)] dark:bg-white dark:text-black"
                  onClick={() => {
                    props.command({
                      name: "createChat",
                      label: "Create Chat",
                      iconName: "MessageCircle",
                      description: "Create a new chat",
                      action: (editor) => {
                        editor.chain().focus().createChat(assistant.id).run();
                      },
                    });
                  }}
                >
                  <span className="my-2 text-sm font-semibold">
                    {assistant.name}
                  </span>

                  <span className="text-xs text-gray-500">
                    @{assistant.initials} - {assistant.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
});

ChatMenuList.displayName = "MenuList";
