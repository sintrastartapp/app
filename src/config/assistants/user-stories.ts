import { env } from "../env-config";
import { Assistant } from "./types";

export const UserStoriesAssistant: Assistant = {
  id: env.ASSISTANT_ID_USER_STORIES,
  name: "User Stories",
  slug: "user-stories",
};
