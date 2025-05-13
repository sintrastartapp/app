"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { onboardingFormAction } from "../actions";
import {
  OnboardingFormSchema,
  onboardingSchema,
} from "./onboarding.form-schema";

export function OnboardingForm() {
  const [state, formAction] = useFormState(onboardingFormAction, {
    message: undefined,
    errors: undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<OnboardingFormSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      website: "",
    },
  });

  function onSubmit() {
    formRef.current?.submit();
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Startup name</FormLabel>
              <FormControl>
                <Input placeholder="Your startup name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Startup website</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your startup website"
                  {...field}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (
                      value &&
                      (value.length > 7 || value.includes(".")) &&
                      !value.startsWith("http://") &&
                      !value.startsWith("https://")
                    ) {
                      value = `https://${value}`;
                    }
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>This field is optional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {state.errors && (
          <p className="text-destructive">{JSON.stringify(state)}</p>
        )}

        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
