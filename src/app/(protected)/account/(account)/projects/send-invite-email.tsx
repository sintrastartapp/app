import { env } from "@/config/env-config";
import { Links } from "@/config/links";
import InviteUserEmail from "@/emails/invite-member";
import { ProjectsService } from "@/services";
import { User } from "lucia";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_KEY);

type Props = {
  id: string;
  email: string;
  projectId: string;
  user: User;
};

export async function sendInviteEmail({ id, email, user, projectId }: Props) {
  const project = await ProjectsService.getProjectById(projectId);

  return resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: `You've been invited to ${project.name}`,
    react: (
      <InviteUserEmail
        inviteEmail={email}
        invitedByUsername={user.name}
        invitedByEmail={user.email}
        projectName={project.name}
        inviteLink={`${env.PUBLIC_URL}${Links.InviteLink(id)}`}
      />
    ),
  });
}
