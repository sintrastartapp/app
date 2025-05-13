import { Links } from "@/config/links";
import { google } from "@/lib/auth";
import { createSession } from "@/lib/auth/sessions";
import { logger } from "@/lib/logger";
import { deleteCookie, getCookie } from "@/lib/utils/server";
import { AuthService, ProjectsService, UserService } from "@/services";
import { GoogleRefreshedTokens, OAuth2RequestError } from "arctic";

type GoogleUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  const storedState = getCookie("google_oauth_state", null);
  const storedCode = getCookie("google_oauth_code_verifier", null);
  let redirectUrl = getCookie("redirect_url", "/");

  if (error) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: Links.Login,
      },
    });
  }

  if (!code || !state || !storedState || !storedCode || state !== storedState) {
    logger.error(
      {
        code,
        state,
        storedState,
        storedCode,
      },
      "Invalid OAuth callback"
    );

    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedCode);

    let googleRefreshToken: GoogleRefreshedTokens | undefined = undefined;

    if (tokens.refreshToken) {
      googleRefreshToken = await google.refreshAccessToken(tokens.refreshToken);
    }

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const googleUser = (await googleUserResponse.json()) as GoogleUser;

    let user = await UserService.getUserByEmail(googleUser.email);

    if (!user) {
      user = await UserService.createUser({
        email: googleUser.email,
        name: googleUser.name,
        photo: googleUser.picture,
        emailVerified: googleUser.email_verified,
      });
    }

    await AuthService.createProviderAccount({
      providerId: "google",
      providerUserId: googleUser.sub,
      userId: user.id,
      refreshToken: googleRefreshToken?.accessToken,
      refreshTokenExpiresAt: googleRefreshToken?.accessTokenExpiresAt,
    });

    await createSession(user.id);

    const projects = await ProjectsService.getProjects(user.id);
    const acceptedProjects = projects.filter((p) => !!p.acceptedAt);

    const mainProject =
      acceptedProjects.filter((p) => p.isOwner)[0] || acceptedProjects[0];

    if (mainProject) {
      redirectUrl = Links.Project(mainProject.id);
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
      },
    });
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      logger.error(
        {
          error: e,
          code,
          state,
          storedState,
          storedCode,
        },
        "Invalid OAuth callback: bad_verification_code"
      );

      // invalid code
      return new Response(null, {
        status: 400,
      });
    }

    logger.error(e);

    return new Response(null, {
      status: 500,
    });
  } finally {
    // Remove the stored code and state
    deleteCookie("google_oauth_code_verifier");
    deleteCookie("google_oauth_state");
  }
}
