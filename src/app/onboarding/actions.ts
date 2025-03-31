"use server";

import { getUser } from "@/lib/auth";
import { UserService } from "@/services";
import { redirect, RedirectType } from "next/navigation";
import { onboardingSchema } from "./components/onboarding.form-schema";

export type FormState = {
  message?: string;
  errors?: ReturnType<typeof onboardingSchema.safeParse>["error"];
  error?: string;
  code?: number;
};

export async function onboardingFormAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await getUser({ redirectToOnboarding: false });

  if (!user) {
    return redirect("/login");
  }

  const data = Object.fromEntries(formData);
  const parsed = onboardingSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: parsed.error,
    };
  }

  await UserService.updateUserProfile({
    userId: user.id,
    companyName: parsed.data.name,
    companyWebsite: parsed.data.website,
  });

  redirect("/", RedirectType.replace);
}
