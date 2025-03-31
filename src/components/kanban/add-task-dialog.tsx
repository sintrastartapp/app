"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Loader2, PlusIcon } from "lucide-react";
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
import { Column } from "./board-column";

const createTaskSchema = z.object({
  column: z.string(),
  title: z.string().min(3, "Too short"),
  description: z.string().optional(),
});

export type CreateTaskFormSchema = z.infer<typeof createTaskSchema>;

type Props = {
  column: Column;
  onCreate: (data: CreateTaskFormSchema) => Promise<void>;
};

export function AddTaskDialog({ column, onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      column: column.id as string,
      title: "",
      description: "",
    },
  });

  const [pending, startTransition] = useTransition();

  function onSubmit(data: CreateTaskFormSchema) {
    startTransition(async () => {
      await onCreate(data);

      form.reset();
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-6 items-center justify-start gap-2 text-left text-sm text-slate-500"
        >
          <PlusIcon className="size-4" />
          <span>Add card</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create new {column.title} task</DialogTitle>
              <DialogDescription>
                Create a new task for the {column.title} column.
              </DialogDescription>
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
                  <PlusIcon className="size-4" />
                )}
                Create task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
