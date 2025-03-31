/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserOrRedirect } from "./users";

// Utility helper to get the type out of a Promise
type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export type AuthContext = {
  user: Awaited<ReturnType<typeof getUserOrRedirect>>;
};

export function withAuthAction<
  F extends (ctx: AuthContext, ...args: any[]) => any
>(action: F) {
  return async (
    ...args: Parameters<F> extends [AuthContext, ...infer Rest] ? Rest : never
  ): Promise<ReturnPromiseType<F>> => {
    const user = await getUserOrRedirect();

    const authContext: AuthContext = {
      user,
    };

    // Pass user through to the next action
    return action(authContext, ...args);
  };
}
