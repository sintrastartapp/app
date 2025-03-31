"use client";
import { site } from "@/config/constants";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { markFeedbackCompleteAction } from "../actions";
// import { markFeedbackCompleteAction } from "../actions";

export function SidebarFeedbackLink() {
  async function handleFeedbackClick() {
    await markFeedbackCompleteAction();
  }

  return (
    <Link
      href={site.links.feedbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleFeedbackClick}
      className="inline-flex items-center justify-start gap-1 px-2 text-xs"
    >
      <ExternalLinkIcon className="size-3" />
      <span>Got feedback?</span>
      <span className="text-muted-foreground">We want it!</span>
    </Link>
  );
}
