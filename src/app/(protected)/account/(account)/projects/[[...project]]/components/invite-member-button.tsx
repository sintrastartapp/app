"use client";

import { Loader2Icon, SendIcon, UserRoundPlusIcon } from "lucide-react";
import { useMemo, useState, useTransition } from "react";

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
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { ProjectRoleEnum } from "@/database/schema";
import { revalidate } from "@/lib/utils";
import { GetProjectsResponse } from "@/services/projects.service";
import { toast } from "sonner";
import { inviteMembersToProject } from "../../actions";
import { RoleSelector } from "./role-selector";

type Props = {
  project: GetProjectsResponse[number];
};

function validateEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function InviteMemberButton({ project }: Props) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isInviting, startInviting] = useTransition();
  const [role, setRole] = useState<ProjectRoleEnum>("member");

  const emails = useMemo(
    () =>
      Array.from(
        new Set(
          input
            .split(/[,\s\n]+/)
            .map((v) => v.trim())
            .filter(validateEmail)
        )
      ),
    [input]
  );

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value);
  }

  function handleInviteUser(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    startInviting(async () => {
      try {
        if (emails.length === 0) {
          throw new Error("No valid emails");
        }

        await inviteMembersToProject({
          emails: emails.map((v) => v.trim().toLowerCase()),
          projectId: project.id,
          role,
        });

        toast.success("Invitation sent successfully");

        setOpen(false);

        revalidate("/projects", "layout");
      } catch (error) {
        toast.error((error as Error)?.message ?? "Error sending invitation");
        // toast({
        //   description: (error as Error)?.message ?? "Error sending invitation",
        //   variant: "destructive",
        // });
      }
    });
  }

  const emailsCount = emails.length;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="gap-2" asChild>
        <Button size="sm">
          <UserRoundPlusIcon className="size-4" />
          Invite new member
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Invite new members</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Invite users to join your project by entering their email address
            separated by spaces or commas.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 flex flex-col gap-4">
          <AutosizeTextarea
            placeholder="Enter email addresses separated by spaces or commas"
            value={input}
            onChange={handleInputChange}
            maxHeight={120}
          />

          <div className="flex max-w-[200px] flex-col gap-2">
            <label
              htmlFor="role-select"
              className="text-sm font-semibold uppercase"
            >
              Role
            </label>

            <RoleSelector
              value={role}
              onChange={(v) => setRole(v as ProjectRoleEnum)}
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isInviting}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isInviting} asChild>
            <Button
              disabled={isInviting || emails.length === 0}
              className="gap-2"
              onClick={handleInviteUser}
            >
              {isInviting ? (
                <Loader2Icon className="mr-2 animate-spin" />
              ) : (
                <SendIcon className="size-4" />
              )}
              Send{" "}
              {emailsCount > 1 ? `invitations (${emailsCount})` : "invitation"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
