"use client";

import { Button } from "@/components/ui/button";
import { revalidate } from "@/lib/utils";
import { CheckCircle2Icon, Loader2Icon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { markSectionCompleteAction } from "../[projectId]/actions";

type Props = {
  projectId: string;
  section: string;
  slug: string;
  feedbackLink: string;
  feedbackGiven?: boolean;
};

export function CompletedSectionFeedback({
  projectId,
  section,
  slug,
  feedbackLink,
  feedbackGiven: initialFeedbackGiven = false,
}: Props) {
  const [feedbackGiven, setFeedbackGiven] = useState(initialFeedbackGiven);
  const [isPending, startTransition] = useTransition();

  function handleFeedbackClick() {
    startTransition(async () => {
      await markSectionCompleteAction(
        projectId,
        `${slug}-feedback-given`,
        true
      );

      // Open blank window  with noopener,noreferrer
      window.open(feedbackLink, "_blank", "noopener,noreferrer");

      setFeedbackGiven(true);
    });
  }

  function handleFeedbackHideClick() {
    startTransition(async () => {
      await markSectionCompleteAction(
        projectId,
        `${slug}-feedback-hidden`,
        true
      );

      await revalidate("/", "layout");
    });
  }

  return (
    <div className="relative flex flex-col gap-2 rounded-md bg-muted p-6">
      {feedbackGiven && !isPending && (
        <Button
          variant="ghost"
          className="absolute right-2 top-2 size-7 rounded-full p-0"
          onClick={handleFeedbackHideClick}
        >
          <XIcon className="size-6 text-black/70" />
        </Button>
      )}
      <h2 className="flex items-center gap-2 font-heading text-xl font-semibold">
        <CheckCircle2Icon className="size-6 text-orange-500" />
        <span>Great job!</span>
      </h2>
      <p className="text-base text-black/70">
        You&apos;ve completed all {section} tasks.
      </p>
      <p className="my-4 text-black/70">
        With your great achievement, comes our curiosity! Please take a moment
        to share your feedback with us - we truly value your input and look
        forward to hearing from you.
      </p>

      <div className="text-center">
        <Button
          disabled={isPending}
          size="lg"
          onClick={handleFeedbackClick}
          className="gap-2"
        >
          {isPending && <Loader2Icon className="size-4 animate-spin" />}
          Sure, happy to help!
        </Button>
      </div>
    </div>
  );
}
