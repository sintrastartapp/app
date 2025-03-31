import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserOrRedirect } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import {
  GetProjectsResponse,
  ProjectsService,
} from "@/services/projects.service";
import { format } from "date-fns";
import { CrownIcon } from "lucide-react";
import { ReactNode } from "react";
import { ChangeMemberRole } from "./change-member-role";
import { InviteMemberButton } from "./invite-member-button";
import { ProjectMemberActions } from "./project-member-actions";

type Props = {
  project: GetProjectsResponse[number];
};

const roleLabels: Record<string, ReactNode> = {
  owner: (
    <span className="flex items-center gap-1">
      <CrownIcon className="size-4" />
      Owner
    </span>
  ),
  member: "Member",
  admin: "Admin",
};

export async function ProjectMembers({ project }: Props) {
  const user = await getUserOrRedirect();
  const members = await ProjectsService.getProjectMembers(project.id);
  const invitedMembers = await ProjectsService.getProjectInvitedMembers(
    project.id
  );

  const isOwner = members.some(
    (m) => m.userId === user.id && m.role === "owner"
  );

  const isAdmin = members.some(
    (m) => m.userId === user.id && (m.role === "owner" || m.role === "admin")
  );

  for (const invite of invitedMembers) {
    members.push({
      createdAt: invite.createdAt,
      email: invite.email,
      role: invite.role,
      acceptedAt: null,
      name: null,
      photo: null,
      userId: "",
    });
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Member</TableHead>
            <TableHead className="min-w-40">Role</TableHead>
            <TableHead className="min-w-40">Joined on</TableHead>
            <TableHead className="min-w-fit text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow
              className="group"
              data-invitation={!member.acceptedAt}
              key={member.userId}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    {/* <img src={member.photo} alt={member.name} /> */}
                    <AvatarImage
                      src={member.photo ?? "/avatar-placeholder.gif"}
                      alt={member.name!}
                    />
                    <AvatarFallback>
                      {getInitials(member.name ?? "")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col group-data-[invitation=true]:text-muted-foreground">
                    <span>{member.name}</span>
                    <span className="text-xs">{member.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="group-data-[invitation=true]:text-muted-foreground">
                {member.role === "owner" || !isAdmin ? (
                  roleLabels[member.role]
                ) : (
                  <ChangeMemberRole project={project} member={member} />
                )}
              </TableCell>
              <TableCell>
                {member.acceptedAt ? (
                  format(member.acceptedAt, "PP")
                ) : (
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Invited on
                    </span>
                    <span className="">{format(member.createdAt, "PP")}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                {member.role !== "owner" && isAdmin && (
                  <ProjectMemberActions
                    isOwner={isOwner}
                    project={project}
                    member={member}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isAdmin && (
        <div className="mt-8 flex flex-col gap-4">
          <p className="text-xs text-muted-foreground">
            You can invite new users to your project by clicking on the button
            below. They will be sent an email with a link to accept the
            invitation. They will be able to access the project once they accept
            the invitation. If they don&pos;t accept the invitation, they will
            be able to remove themselves from the project.
          </p>

          <div className="">
            <InviteMemberButton project={project} />
          </div>
        </div>
      )}
    </div>
  );
}
