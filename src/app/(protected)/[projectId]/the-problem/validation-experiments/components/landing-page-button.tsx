"use client";

import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { getLandingPageAction } from "../../../actions";

const states: Record<string, ReactNode> = {
  "no-description": "Project is missing a description",
  initial: (
    <span className="flex items-center gap-2">
      <Loader2Icon className="size-3 animate-spin" />
      Generating
    </span>
  ),
  generating: (
    <span className="flex items-center gap-2">
      <Loader2Icon className="size-3 animate-spin" />
      Generating
    </span>
  ),
  draft: "Draft",
  published: "Published",
};

type Props = {
  hasDescription?: boolean;
  projectId: string;
};

export function LandingPageButton({ projectId }: Props) {
  const { data: landingPage } = useQuery({
    queryKey: ["landingPage", projectId],
    queryFn: () => getLandingPageAction(projectId),
    refetchInterval(query) {
      if (["initial", "generating"].includes(query.state.data?.state ?? ""))
        return 1000;

      return false;
    },
  });

  const state = landingPage?.state ?? "";
  const isReady = state === "draft" || state === "published";

  return (
    <Button
      variant="outline"
      className="flex h-auto min-h-fit flex-col items-start justify-start gap-4 p-4 text-left"
      asChild
    >
      <Link
        href={
          isReady
            ? Links.ProjectTheProblemValidationExperiments(
                projectId,
                "landing-page"
              )
            : "#"
        }
      >
        <h3 className="flex items-center gap-2 text-wrap">🌍 Landing Page</h3>
        <span className="text-wrap text-sm font-normal">
          Develop a simple webpage to illustrate your value proposition.
        </span>
        <span
          className={cn("rounded-md px-1.5 py-0.5 text-xs font-medium", {
            "bg-red-500 text-white": state === "no-description",
            "bg-yellow-500 text-black":
              state === "generating" || state === "initial",
            "bg-green-500 text-white": state === "published",
            "bg-blue-500 text-white": state === "draft",
          })}
        >
          {states[state] ?? <Loader2Icon className="size-4 animate-spin" />}
        </span>
      </Link>
    </Button>
  );
}
