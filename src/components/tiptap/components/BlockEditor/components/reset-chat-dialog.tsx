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
import { ListRestartIcon, Loader2Icon } from "lucide-react";
import { useTransition } from "react";

type Props = {
  onReset: () => void;
  disabled?: boolean;
};

export function ResetChatDialog({ disabled, onReset }: Props) {
  const [pending, startTransition] = useTransition();

  async function handleDeleteClick() {
    if (pending) return;

    startTransition(async () => {
      await onReset();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="gap-2" disabled={disabled}>
          {pending ? (
            <Loader2Icon className="size-5 animate-spin" />
          ) : (
            <ListRestartIcon className="size-5" />
          )}
          Reset chat
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your chat
            and reset the conversation.
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
            Yes, reset chat
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
