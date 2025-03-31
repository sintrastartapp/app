"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Edit2Icon, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Task } from "./task-card";

const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Too short"),
  description: z.string().optional(),
});

export type UpdateTaskFormSchema = z.infer<typeof updateTaskSchema>;

type Props = {
  task: Task;
  onUpdate: (data: UpdateTaskFormSchema) => void;
};

export function EditTaskDialog({ task, onUpdate }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<UpdateTaskFormSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: task.id as string,
      title: task.title,
      description: task.content,
    },
  });

  const [pending, startTransition] = useTransition();

  function onSubmit(data: UpdateTaskFormSchema) {
    startTransition(async () => {
      await onUpdate(data);

      form.reset();
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-2 py-1.5 text-sm"
        >
          <Edit2Icon className="size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update {task.title} task</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <AutosizeTextarea maxHeight={80} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="gap-2"
              >
                {pending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Edit2Icon className="size-4" />
                )}
                Update task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
