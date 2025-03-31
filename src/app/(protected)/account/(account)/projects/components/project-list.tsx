import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import { GetProjectsResponse } from "@/services/projects.service";
import { PlusIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  projects: GetProjectsResponse;
  activeProjectId?: string;
};

export function ProjectList({ projects, activeProjectId }: Props) {
  const myProjects = projects.filter((p) => p.isOwner);
  const sharedProjects = projects.filter((p) => !p.isOwner);

  return (
    <div className="w-full max-w-xs pb-8">
      <div className="flex items-center justify-end">
        <Button asChild variant="ghost" className="flex items-center gap-2">
          <Link href={Links.AccountCreateProject}>
            <PlusIcon className="size-4" />
            Create new project
          </Link>
        </Button>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {projects.length === 0 && (
          <li>
            <p className="py-4 text-center text-sm text-muted-foreground">
              You don&apos;t have any projects yet.
            </p>
          </li>
        )}

        <li className="pt-4 text-sm text-muted-foreground">My projects</li>
        {myProjects.map((project) => (
          <li key={project.id}>
            <Button
              asChild
              variant="outline"
              data-active={project.id === activeProjectId}
              className="w-full justify-between data-[active=true]:bg-muted"
            >
              <Link href={Links.AccountProjectSettings(project.id)}>
                {project.name}
                <SettingsIcon className="size-4" />
              </Link>
            </Button>
          </li>
        ))}

        <li className="pt-4 text-sm text-muted-foreground">Shared with me</li>

        {sharedProjects.length === 0 && (
          <li>
            <p className="py-4 text-center text-xs text-muted-foreground">
              You don&apos;t have any projects shared with you.
            </p>
          </li>
        )}

        {sharedProjects.map((project) => (
          <li key={project.id}>
            <Button
              asChild
              variant="outline"
              data-active={project.id === activeProjectId}
              className="w-full justify-between data-[active=true]:bg-muted"
            >
              <Link
                href={
                  project.acceptedAt
                    ? Links.AccountProjectSettings(project.id)
                    : Links.AccountProjectInvite(project.id)
                }
              >
                {project.name}
                {project.acceptedAt ? (
                  <SettingsIcon className="size-4" />
                ) : (
                  <span className="rounded-md bg-primary px-1.5 py-0.5 text-xs font-medium uppercase text-primary-foreground">
                    invited
                  </span>
                )}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
