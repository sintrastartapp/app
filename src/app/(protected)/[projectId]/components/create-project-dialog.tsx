"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { site } from "@/config/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, Loader2, PlusIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createProjectFormAction } from "../../account/(account)/projects/actions";
import {
  CreateProjectFormSchema,
  createProjectSchema,
} from "../../account/(account)/projects/components/create-project.form-schema";

export function CreateProjectDialog() {
  const [isCreating, startCreating] = useTransition();

  const form = useForm<CreateProjectFormSchema>({
    resolver: zodResolver(createProjectSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: CreateProjectFormSchema) {
    startCreating(async () => {
      await createProjectFormAction(data, "project");
    });
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Welcome to {site.name}!</DialogTitle>
              <DialogDescription>
                Let&apos;s get started by creating your first project.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Your project name"
                          {...field}
                        />
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
                      <FormLabel>Project description</FormLabel>
                      <FormControl>
                        <AutosizeTextarea
                          // minHeight={100}
                          maxHeight={200}
                          placeholder="Your project description"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please include a brief description of your project; this
                        will assist our AI chats in gaining a better
                        understanding of what you&apos;re working on.
                        <span className="block">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                variant="link"
                                className="mt-0.5 gap-1 p-0 text-xs "
                              >
                                <InfoIcon className="inline-block size-4 text-muted-foreground" />
                                <span>View example</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              align="start"
                              className="w-[40ch] max-w-lg text-sm"
                            >
                              {site.projects.exampleDescription}
                            </PopoverContent>
                          </Popover>
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isCreating || !form.formState.isValid}
                className="gap-2"
              >
                {isCreating ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <PlusIcon className="size-4" />
                )}
                Create project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
