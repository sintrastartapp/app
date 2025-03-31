import { PropsWithChildren } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props<TData> = {
  align?: "left" | "right";
  content?: string | null;
  data?: TData;
  userName?: string | null;
};

export function ChatMessage<TData>({
  content,
  align = "left",
  children,
  data,
  userName,
}: PropsWithChildren<Props<TData>>) {
  return (
    <div
      data-align={align}
      data-username={!!userName}
      className="group flex w-full flex-col rounded-md hover:bg-muted/70 data-[align=left]:justify-start data-[align=right]:justify-end"
    >
      <div
        className="inline-flex flex-col
      gap-2 rounded-md p-2
      group-data-[align=left]:mr-8
      group-data-[align=right]:ml-8 group-data-[align=left]:self-start
      group-data-[align=right]:self-end group-data-[align=right]:border-muted
      group-data-[align=right]:group-data-[username=false]:bg-slate-200
      group-data-[align=right]:group-data-[username=true]:bg-muted group-data-[align=right]:text-slate-900
      group-data-[align=right]:shadow"
      >
        <Markdown remarkPlugins={[remarkGfm]} className="prose-sm prose-slate">
          {content}
        </Markdown>
      </div>

      {userName && (
        <div className="my-1 px-2 text-right text-xs text-muted-foreground/60">
          sent by <span className="font-semibold">{userName}</span>
        </div>
      )}

      {children}
      {data && (
        <pre className="rounded-md bg-gray-200 p-2">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
