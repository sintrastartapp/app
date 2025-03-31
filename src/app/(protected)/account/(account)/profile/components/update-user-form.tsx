"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { revalidate } from "@/lib/utils";
import { GetUserResponse } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateUserFormAction } from "../actions";
import { DeleteAccountDialog } from "./delete-account-dialog";
import {
  UpdateUserFormSchema,
  updateUserSchema,
} from "./update-user.form-schema";

type Props = {
  user: GetUserResponse;
};

export function UpdateUserForm({ user }: Props) {
  const [isPending, startTransaction] = useTransition();

  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      name: user.name ?? "",
      companyName: user.companyName ?? "",
      companyWebsite: user.companyWebsite ?? "",
    },
    mode: "onChange",
  });

  function onSubmit(data: UpdateUserFormSchema) {
    startTransaction(async () => {
      const result = await updateUserFormAction(data);

      if (result && "error" in result) {
        form.setError("root.serverError", {
          type: "manual",
          message: result.error,
        });
        return;
      }

      form.reset(data);
      toast.success("User updated successfully");
      await revalidate("/", "layout");
    });
  }

  const isSubmittable =
    form.formState.isDirty && !form.formState.isValid && !isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-lg flex-col gap-4"
      >
        <h2 className="font-heading text-sm font-bold uppercase text-muted-foreground/40">
          User profile
        </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input placeholder="Your user name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="mt-8 font-heading text-sm font-bold uppercase text-muted-foreground/40">
          Company profile
        </h2>

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company website</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Enter your company website"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root?.serverError && (
          <p className="mt-4 text-sm text-destructive">
            {form.formState.errors.root?.serverError.message}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Button type="submit" disabled={isSubmittable}>
            Update profile
            {isPending && <Loader2Icon className="size-4 animate-spin" />}
          </Button>

          <DeleteAccountDialog />
        </div>
      </form>
    </Form>
  );
}
