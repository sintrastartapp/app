import { env } from "@/config/env-config";
import { Links } from "@/config/links";
import { getUser } from "@/lib/auth";
import { createCookie, deleteCookie } from "@/lib/utils/server";
import { ProjectsService, UserService } from "@/services";
import { redirect } from "next/navigation";

type Props = {
  params: {
    inviteId: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  const user = await getUser({ redirectToOnboarding: false });

  if (!user) {
    const redirectUrl = new URL(env.PUBLIC_URL);
    redirectUrl.pathname = Links.InviteLink(params.inviteId);

    // Create cookie to store redirect_url
    createCookie("redirect_url", redirectUrl.toString());

    // return Response.json({ redirectUrl: redirectUrl.toString() });

    redirect(Links.Login);
  }

  const { inviteId } = params;
  const invite = await ProjectsService.getProjectInviteById(inviteId);

  if (!invite) {
    redirect(Links.InviteErrorNotFound);
  }

  if (invite.email !== user.email) {
    redirect(Links.InviteErrorNotYourInvite);
  }

  // Accept invite and set user o onboarding as done.
  await ProjectsService.acceptProject(invite.projectId, user.id);
  await UserService.updateUser({
    id: user.id,
    onboarding: -1,
  });

  // Create flash cookie to show success message
  createCookie("flash", `You've accepted the project invite.`);
  deleteCookie("redirect_url");

  // Redirect to project
  redirect(Links.Project(invite.projectId));
}
