"use client";

import { site } from "@/config/constants";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { markFeedbackCompleteAction } from "../../actions";

type Props = {
  done?: boolean;
};

export function FeedbackTaskItem({ done }: Props) {
  return (
    <li data-done={done} className="group">
      <Link
        href={site.links.feedbackUrl}
        onClick={() => markFeedbackCompleteAction()}
        prefetch={false}
        className="flex items-center gap-3 rounded-lg bg-muted p-2 font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="">
          <CheckCircle2Icon className="size-8 text-orange-200 group-data-[done=true]:text-orange-500" />
        </div>
        <span className="group-data-[done=true]:line-through">
          Please help us improve {site.name} by providing your feedback
          directly.
        </span>
      </Link>
    </li>
  );
}
