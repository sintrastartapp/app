"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { GetProjectsResponse } from "@/services/projects.service";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { deleteProject } from "../../actions";

type Props = {
  project: GetProjectsResponse[number];
};

export function DeleteProjectButton({ project }: Props) {
  const [pending, startTransition] = useTransition();
  // const router = useRouter();

  function handleDeleteClick() {
    startTransition(async () => {
      await deleteProject(project.id);

      // router.push(Links.Projects);
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="gap-2 text-destructive"
        >
          <Trash2Icon className="size-4" />
          Delete project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            project and all its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            variant="destructive"
            onClick={handleDeleteClick}
            className="gap-2"
          >
            {pending && <Loader2Icon className="size-4 animate-spin" />}
            Yes, delete the project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
