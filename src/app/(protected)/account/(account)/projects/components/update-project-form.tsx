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
import { revalidate } from "@/lib/utils";
import { GetProjectsResponse } from "@/services/projects.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  improveProjectDescriptionAction,
  updateProjectFormAction,
} from "../actions";
import {
  UpdateProjectFormSchema,
  updateProjectSchema,
} from "./update-project.form-schema";

type Props = {
  project: GetProjectsResponse[number];
};

export function UpdateProjectForm({ project }: Props) {
  const [isPending, startTransaction] = useTransition();
  const [isDescriptionPending, startDescriptionTransaction] = useTransition();

  const form = useForm<UpdateProjectFormSchema>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      id: project.id,
      name: project.name,
      description: project.description || "",
    },
    mode: "onChange",
  });

  function onSubmit(data: UpdateProjectFormSchema) {
    startTransaction(async () => {
      const result = await updateProjectFormAction(data);

      if (result && "error" in result) {
        form.setError("name", { type: "manual", message: result.error });
        return;
      }

      form.reset(data);
      toast.success("Project updated successfully");
      await revalidate("/", "layout");
    });
  }

  function handleImproveDescriptionClick() {
    startDescriptionTransaction(async () => {
      const description = form.getValues("description");
      const result = await improveProjectDescriptionAction(
        project.id,
        description
      );

      if (result && "description" in result) {
        form.setValue("description", result.description);
      }
    });
  }

  const isSubmittable = !isPending && !isDescriptionPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-8"
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
              <div className="flex items-center justify-end">
                <Button
                  disabled={isDescriptionPending}
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={handleImproveDescriptionClick}
                  className="gap-2"
                >
                  {isDescriptionPending && (
                    <Loader2Icon className="size-4 animate-spin" />
                  )}
                  Improve description using AI
                </Button>
              </div>
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

        <Button type="submit" disabled={!isSubmittable}>
          Update project
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
        </Button>

        <input type="hidden" {...form.register("id")} value={project.id} />
      </form>
    </Form>
  );
}
