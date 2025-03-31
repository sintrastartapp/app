"use client";
import { Button } from "@/components/ui/button";
import { GetProjectsResponse } from "@/services/projects.service";
import { CheckIcon } from "lucide-react";
import { useTransition } from "react";
import { acceptProject } from "../../actions";

type Props = {
  project: GetProjectsResponse[number];
};

export function AcceptProjectButton({ project }: Props) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await acceptProject(project.id);
    });
  }

  return (
    <Button
      disabled={pending}
      variant="default"
      className="w-full justify-start gap-3 px-4 py-2"
      onClick={handleClick}
    >
      <CheckIcon className="size-4" />
      Accept invitation
    </Button>
  );
}
