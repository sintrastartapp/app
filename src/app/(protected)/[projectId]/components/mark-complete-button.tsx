"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, CircleDotDashedIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { markSectionCompleteAction } from "../actions";

type Props = {
  projectId: string;
  section: string;
  state: boolean;
};

export function MarkCompleteButton({
  projectId,
  section,
  state: initialState,
}: Props) {
  const {
    data: isComplete = initialState,
    mutateAsync: markComplete,
    isPending,
  } = useMutation({
    mutationKey: ["markSectionComplete", projectId, section],
    mutationFn: (state: boolean) =>
      markSectionCompleteAction(projectId, section, state),
    onSuccess: (_, variables) => {
      toast.success(
        variables === true ? "Marked as complete" : "Marked as in progress"
      );
    },
    onError: (err) => {
      toast.error((err as Error)?.message ?? "Error marking section complete");
    },
  });

  return (
    <Button
      variant={isComplete ? "outline" : "default"}
      className="items-center gap-2 text-xs"
      onClick={() => markComplete(!isComplete)}
    >
      {isComplete ? (
        <>
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <CircleDotDashedIcon className="size-4" />
          )}
          Mark as in progress
        </>
      ) : (
        <>
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <CheckIcon className="size-4" />
          )}
          Mark as complete
        </>
      )}
    </Button>
  );
}
