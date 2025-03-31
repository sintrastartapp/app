import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { AddTaskDialog, CreateTaskFormSchema } from "./add-task-dialog";
import { UpdateTaskFormSchema } from "./edit-task-dialog";
import { Task, TaskCard } from "./task-card";

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
  onTaskCreate: (data: CreateTaskFormSchema) => Promise<void>;
  onTaskUpdate: (data: UpdateTaskFormSchema) => void;
  onTaskDelete: (taskId: string) => void;
}

export function BoardColumn({
  column,
  tasks,
  isOverlay,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    // attributes,
    // listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "flex h-full max-w-full flex-1 snap-center flex-col border-0 bg-slate-100 shadow-none",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "opacity-30 ring-2",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  return (
    <div className="relative h-full flex-1">
      <div className="absolute inset-0">
        <Card
          ref={setNodeRef}
          style={style}
          className={variants({
            dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
          })}
        >
          <CardHeader className="flex flex-row items-center justify-start border-none p-4 pb-2 text-left font-heading text-sm font-bold uppercase text-slate-400">
            {/* <Button
              variant={"ghost"}
              {...attributes}
              {...listeners}
              className=" relative -ml-2 h-auto cursor-grab p-1 text-primary/50"
            >
              <span className="sr-only">{`Move column: ${column.title}`}</span>
              <GripVertical />
            </Button> */}
            <span className=""> {column.title}</span>
          </CardHeader>

          <ScrollArea>
            <CardContent className="flex grow flex-col gap-2 p-2">
              <SortableContext
                items={tasksIds}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={onTaskUpdate}
                    onDelete={onTaskDelete}
                  />
                ))}
              </SortableContext>

              <AddTaskDialog onCreate={onTaskCreate} column={column} />
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("flex size-full pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex h-full flex-row items-start justify-center gap-4">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
