"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
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
import { InfoIcon, Loader2Icon } from "lucide-react";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createProjectFormAction } from "../actions";
import {
  CreateProjectFormSchema,
  createProjectSchema,
} from "./create-project.form-schema";

export function CreateProjectForm() {
  const [isCreating, startCreating] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<CreateProjectFormSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: CreateProjectFormSchema) {
    startCreating(async () => {
      await createProjectFormAction(data);
    });
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="Your project name" {...field} />
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
                  minHeight={100}
                  maxHeight={200}
                  placeholder="Your project description"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please include a brief description of your project; this will
                assist our AI chats in gaining a better understanding of what
                you&apos;re working on.
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

        <Button type="submit" disabled={isCreating} className="gap-1">
          Create project
          {isCreating && <Loader2Icon className="size-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
