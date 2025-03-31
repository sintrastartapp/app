"use server";

import { withAuthAction } from "@/lib/auth";
import { UserService } from "@/services";

export const markFeedbackCompleteAction = withAuthAction(
  async (authContext, state: boolean = true) => {
    const { user } = authContext;

    await UserService.updateUserProfile({
      userId: user.id,
      feedbackCompleted: state,
    });
  }
);
