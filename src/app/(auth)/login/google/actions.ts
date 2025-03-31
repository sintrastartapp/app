"use server";

import { google } from "@/lib/auth";
import { createCookie, getCookie } from "@/lib/utils/server";
import { generateCodeVerifier, generateState } from "arctic";

export async function loginWithGoogleAction() {
  const state = getCookie("google_oauth_state") ?? generateState();
  const codeVerifier =
    getCookie("google_oauth_code_verifier") ?? generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: [
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  createCookie("google_oauth_state", state);
  createCookie("google_oauth_code_verifier", codeVerifier);

  return url.toString();
}
