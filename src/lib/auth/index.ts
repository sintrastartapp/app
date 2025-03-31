import { env } from "@/config/env-config";
import { Lucia } from "lucia";
import { adapter } from "../../database/adapter";

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => ({
    id: attributes.id,
    email: attributes.email,
    name: attributes.name,
    photo: attributes.photo,
    emailVerified: attributes.emailVerified,
    onboardingCompleted: attributes.onboarding === -1,
    role: attributes.role,
  }),
  sessionCookie: {
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    // DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  email: string;
  name: string;
  photo: string;
  emailVerified: boolean;
  onboarding: number;
  role: "USER" | "ADMIN";
}

// interface DatabaseSessionAttributes {
//   userId: string;
//   email: string | null;
//   name: string | null;
//   photo: string | null;
// }

export * from "./is-admin";
export * from "./providers";
export * from "./sessions";
export * from "./users";
export * from "./with-auth-action";
