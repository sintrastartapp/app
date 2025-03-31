"use client";
import { Button } from "@/components/ui/button";
import { GetProjectsResponse } from "@/services/projects.service";
import { LogOutIcon } from "lucide-react";
import { useTransition } from "react";
import { leaveProject } from "../../actions";

type Props = {
  project: GetProjectsResponse[number];
};

export function LeaveProjectButton({ project }: Props) {
  const [pending, startTransition] = useTransition();

  function handleDeleteClick() {
    startTransition(async () => {
      await leaveProject(project.id);
    });
  }

  return (
    <Button
      disabled={pending}
      variant="ghost"
      className="w-full justify-start gap-3 px-4 py-2 text-destructive"
      onClick={handleDeleteClick}
    >
      <LogOutIcon className="size-4" />
      Leave project
    </Button>
  );
}
