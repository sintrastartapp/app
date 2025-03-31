"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DeleteTaskDialog } from "./delete-task-dialog";
import { EditTaskDialog, UpdateTaskFormSchema } from "./edit-task-dialog";
import { Task } from "./task-card";

type Props = {
  task: Task;
  onUpdate: (data: UpdateTaskFormSchema) => void;
  onDelete: (taskId: string) => void;
};

export function TaskCardOptions({ task, onUpdate, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    await onDelete(task.id as string);

    setOpen(false);
  }

  async function handleUpdate(data: UpdateTaskFormSchema) {
    await onUpdate(data);

    setOpen(false);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="absolute right-5 top-5 size-6 items-center justify-center rounded-full p-0"
        >
          <EllipsisVerticalIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={0}>
        <DropdownMenuItem asChild>
          <EditTaskDialog task={task} onUpdate={handleUpdate} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteTaskDialog task={task} onDelete={handleDelete} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
