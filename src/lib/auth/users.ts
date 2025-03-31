import { Links } from "@/config/links";
import { redirect, RedirectType } from "next/navigation";
import { cache } from "react";
import { getSession } from "./sessions";

type GetUserOptions = {
  redirectToOnboarding?: boolean;
};

export const getUser = cache(
  async ({ redirectToOnboarding = true }: GetUserOptions = {}) => {
    const { user } = await getSession();

    if (!user) {
      return null;
    }

    if (!user?.onboardingCompleted && redirectToOnboarding) {
      redirect(Links.Onboarding, RedirectType.push);
    }

    return user;
  }
);

export const getUserOrRedirect = async (options?: GetUserOptions) => {
  const user = await getUser(options);

  if (!user) {
    redirect(Links.Login, RedirectType.push);
  }

  return user;
};
