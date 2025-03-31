"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectRoleEnum } from "@/database/schema";
import {
  GetProjectMembersResponse,
  GetProjectsResponse,
} from "@/services/projects.service";
import { CrownIcon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { removeProjectMember, updateProjectMemberRole } from "../../actions";

type Props = {
  project: GetProjectsResponse[number];
  member: GetProjectMembersResponse[number];
  isOwner?: boolean;
};

export function ProjectMemberActions({ project, member, isOwner }: Props) {
  const [, startTransition] = useTransition();

  function handleUpdateRole(role: ProjectRoleEnum) {
    startTransition(async () => {
      await updateProjectMemberRole({
        userId: member.userId || undefined,
        email: member.email && !member.userId ? member.email : undefined,
        projectId: project.id,
        role,
      });
    });
  }

  function handleRemoveMember() {
    startTransition(async () => {
      await removeProjectMember({
        userId: member.userId,
        projectId: project.id,
        email: member.userId || !member.email ? undefined : member.email,
      });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="m-0 size-6 rounded-full p-0">
        <Button className="m-0 size-6 rounded-full p-0" variant="ghost">
          <EllipsisVerticalIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" alignOffset={0}>
        {isOwner && member.acceptedAt && (
          <>
            <DropdownMenuItem
              className="gap-1"
              onClick={() => handleUpdateRole("owner")}
            >
              <CrownIcon className="size-4 text-muted-foreground" />
              Make owner
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          className="gap-1 text-destructive"
          onClick={handleRemoveMember}
        >
          <Trash2Icon className="size-4 text-destructive/60" />
          {member.acceptedAt ? "Remove member" : "Cancel invitation"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
