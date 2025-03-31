import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export type TaskItem = {
  title: string;
  description?: string;
  done?: boolean;
  href?: string;
  onClick?: () => void;
};

type Props = {
  tasks: TaskItem[];
};

export function TaskList({ tasks, children }: PropsWithChildren<Props>) {
  return (
    <ol className="flex flex-col gap-2 text-sm">
      {tasks.map((task) => {
        return (
          <li key={task.title} data-done={task.done} className="group">
            <Link
              href={task.href ?? "#"}
              onClick={task.onClick}
              prefetch={false}
              className="flex items-center gap-3 rounded-lg bg-muted p-2 font-medium"
            >
              <div className="">
                <CheckCircle2Icon className="size-8 text-orange-200 group-data-[done=true]:text-orange-500" />
              </div>
              <span className="group-data-[done=true]:line-through">
                {task.title}
              </span>
            </Link>
          </li>
        );
      })}
      {children}
    </ol>
  );
}
