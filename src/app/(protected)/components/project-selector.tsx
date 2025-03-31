"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Links } from "@/config/links";
import { GetProjectsResponse } from "@/services/projects.service";
import { ChevronDownIcon, Loader2Icon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebarContext } from "../contexts/sidebar-context";

type Props = {
  projects: GetProjectsResponse;
};

export function ProjectSelector({ projects }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const { selectedProjectId, setSelectedProjectId } = useSidebarContext();
  const pathname = usePathname();

  useEffect(() => {
    const idFromUrl = pathname.split("/")[1];

    if (idFromUrl && projects.find((p) => p.id === idFromUrl)) {
      setSelectedProjectId(pathname.split("/")[1]);
    }

    setIsLoading(false);
  }, [pathname, projects, setSelectedProjectId]);

  const myProjects = projects.filter((p) => p.isOwner);
  const sharedProjects = projects.filter((p) => !p.isOwner);
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between border-y p-4 text-sm outline-none focus:bg-muted active:bg-muted">
        {isLoading && (
          <span className="flex h-6 w-full items-center justify-start">
            <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
          </span>
        )}
        {!isLoading && (
          <>
            <span className="flex h-6 items-center">
              {selectedProject ? selectedProject.name : "Select a project"}
            </span>
            <span className="flex size-6 items-center justify-center">
              <ChevronDownIcon className="size-4" />
            </span>
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full"
        align="start"
        alignOffset={0}
        style={{
          width: "calc(var(--radix-dropdown-menu-trigger-width) - 1rem)",
          marginLeft: "0.5rem",
        }}
      >
        {myProjects.length !== 0 && (
          <>
            <DropdownMenuLabel>My projects</DropdownMenuLabel>
            {myProjects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                asChild
                className="flex items-center gap-2 text-sm"
              >
                <Link
                  onClick={() => setSelectedProjectId(project.id)}
                  href={Links.Project(project.id)}
                >
                  {project.name}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}

        {sharedProjects.length !== 0 && (
          <>
            <DropdownMenuLabel>Shared with me</DropdownMenuLabel>
            {sharedProjects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                asChild
                className="flex items-center justify-between gap-2 text-sm"
              >
                <Link
                  onClick={() => setSelectedProjectId(project.id)}
                  href={
                    project.acceptedAt
                      ? Links.Project(project.id)
                      : Links.AccountProjectInvite(project.id)
                  }
                >
                  {project.name}

                  {!project.acceptedAt && (
                    <span className="rounded-md bg-primary px-1.5 py-0.5 text-xs font-medium uppercase text-primary-foreground">
                      invited
                    </span>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>
          <Link
            href={Links.AccountCreateProject}
            className="flex w-full items-center gap-2 text-sm"
          >
            <PlusIcon className="size-4" />
            <span>Create new project</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
