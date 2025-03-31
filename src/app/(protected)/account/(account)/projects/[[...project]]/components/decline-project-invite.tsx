"use client";
import { Button } from "@/components/ui/button";
import { GetProjectsResponse } from "@/services/projects.service";
import { BanIcon } from "lucide-react";
import { useTransition } from "react";
import { declineProject } from "../../actions";

type Props = {
  project: GetProjectsResponse[number];
};

export function DeclineProjectButton({ project }: Props) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await declineProject(project.id);
    });
  }

  return (
    <Button
      disabled={pending}
      variant="ghost"
      className="w-full justify-start gap-3 px-4 py-2"
      onClick={handleClick}
    >
      <BanIcon className="size-4" />
      Decline invitation
    </Button>
  );
}
