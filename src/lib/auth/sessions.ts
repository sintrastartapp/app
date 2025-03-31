import { UserService } from "@/services";
import { cache } from "react";
import { lucia } from ".";
import { createCookie, getCookie } from "../utils/server";

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  // Update user login at
  await UserService.updateUserLoginAt(userId);

  createCookie(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });
};

export const getSession = cache(async () => {
  const sessionId = getCookie(lucia.sessionCookieName, null);

  if (!sessionId) {
    return {
      session: null,
      user: null,
    };
  }

  const { session, user } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);

      createCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();

      createCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
    // return null;
  }

  return { session, user };
});

export const deleteSession = async () => {
  const { session } = await getSession();

  if (!session) {
    return;
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  createCookie(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return sessionCookie;
};
