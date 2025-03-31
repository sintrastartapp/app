"use server";

import { Links } from "@/config/links";
import { withAuthAction } from "@/lib/auth";
import { UserService } from "@/services";
import { redirect } from "next/navigation";
import { UpdateUserFormSchema } from "./components/update-user.form-schema";

export const updateUserFormAction = withAuthAction(
  async (authContext, data: UpdateUserFormSchema) => {
    const { user } = authContext;

    try {
      await UserService.updateUser({
        id: user.id,
        name: data.name,
      });

      await UserService.updateUserProfile({
        userId: user.id,
        companyName: data.companyName,
        companyWebsite: data.companyWebsite,
      });

      await UserService.track(user.id, "update-user", {
        name: data.name,
        companyName: data.companyName,
        companyWebsite: data.companyWebsite,
      });
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  }
);

export const deleteUserAction = withAuthAction(async (authContext) => {
  const { user } = authContext;

  await UserService.deleteUser(user.id);

  redirect(Links.Login);
});
