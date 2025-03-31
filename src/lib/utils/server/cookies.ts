import "server-only";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const defaultOptions = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  maxAge: 60 * 10,
  sameSite: "lax",
};

export function createCookie(
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
) {
  const cookie = Object.assign({}, defaultOptions, options);

  cookies().set(key, value, cookie);
}

export function getCookie<T = undefined>(
  key: string,
  defaultValue?: T
): T extends undefined ? string | undefined : string | T {
  return (cookies().get(key)?.value ?? defaultValue) as T extends undefined
    ? string | undefined
    : string | T;
}

export function getCookieAndDelete(key: string) {
  const value = getCookie(key);

  deleteCookie(key);

  return value;
}

export function deleteCookie(key: string) {
  cookies().delete(key);
}
