"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { UpdateTaskFormSchema } from "./edit-task-dialog";
import { ColumnId } from "./kanban-board";
import { TaskCardOptions } from "./task-card-options";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  title: string;
  content: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  onUpdate: (data: UpdateTaskFormSchema) => void;
  onDelete: (taskId: string) => void;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({
  task,
  isOverlay,
  onUpdate,
  onDelete,
}: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("relative border-none shadow-sm", {
    variants: {
      dragging: {
        over: "opacity-30 ring-2",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <TaskCardOptions task={task} onUpdate={onUpdate} onDelete={onDelete} />
      <CardContent
        {...attributes}
        {...listeners}
        className="whitespace-pre-wrap p-4 text-left text-sm"
      >
        <span className="font-medium">{task.title}</span>
        <p className="mt-1.5 text-xs text-primary/80">{task.content}</p>
      </CardContent>
    </Card>
  );
}
