"use client";

import { ProjectRoleEnum } from "@/database/schema";
import {
  GetProjectMembersResponse,
  GetProjectsResponse,
} from "@/services/projects.service";
import { useTransition } from "react";
import { updateProjectMemberRole } from "../../actions";
import { RoleSelector } from "./role-selector";

type Props = {
  project: GetProjectsResponse[number];
  member: GetProjectMembersResponse[number];
};

export function ChangeMemberRole({ project, member }: Props) {
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

  return <RoleSelector value={member.role} onChange={handleUpdateRole} />;
}
