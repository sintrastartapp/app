import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import { getUserOrRedirect } from "@/lib/auth";
import { ProjectsService } from "@/services/projects.service";
import { Settings2Icon, UsersRoundIcon } from "lucide-react";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { ProjectList } from "../components/project-list";
import { UpdateProjectForm } from "../components/update-project-form";
import { AcceptProjectButton } from "./components/accept-project-invite";
import { DeclineProjectButton } from "./components/decline-project-invite";
import { DeleteProjectButton } from "./components/delete-project-button";
import { LeaveProjectButton } from "./components/leave-project-button";
import { ProjectMembers } from "./components/project-members";

type Props = {
  params: {
    project?: [string, "settings" | "members" | "invite"];
  };
};

export default async function ProjectSettingsPage({ params }: Props) {
  const user = await getUserOrRedirect();
  const projects = await ProjectsService.getProjects(user.id);

  const [projectId, projectSection = "settings"] = params.project ?? [];

  if (!["settings", "members", "invite"].includes(projectSection)) {
    redirect(Links.AccountProjects, RedirectType.replace);
  }

  const project = projects.find((p) => p.id === projectId);

  const isOwner = project?.isOwner;
  const isInvite = project?.acceptedAt === null;

  if (isInvite && projectId && projectSection !== "invite") {
    redirect(Links.AccountProjectInvite(projectId), RedirectType.replace);
  }

  if (!isOwner && project && projectSection == "settings") {
    redirect(Links.AccountProjectMembers(project.id), RedirectType.replace);
  }

  return (
    <div className="flex items-stretch gap-8">
      <ProjectList projects={projects} activeProjectId={projectId} />

      <div className="w-px bg-border"></div>

      {project && (
        <div className="flex min-h-full w-full flex-1 flex-col gap-6 pb-8">
          <ul className="flex items-center gap-2">
            <li data-active={projectSection === "members"} className="group">
              <Button
                asChild={!isInvite}
                disabled={isInvite}
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-2 group-data-[active=true]:bg-muted"
              >
                {isInvite ? (
                  <>
                    <UsersRoundIcon className="size-4" />
                    Members
                  </>
                ) : (
                  <Link href={Links.AccountProjectMembers(project.id)}>
                    <UsersRoundIcon className="size-4" />
                    Members
                  </Link>
                )}
              </Button>
            </li>
            <li data-active={projectSection === "settings"} className="group">
              <Button
                asChild={isOwner}
                disabled={!isOwner}
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-2 disabled:text-muted-foreground group-data-[active=true]:bg-muted"
              >
                {isOwner ? (
                  <Link href={Links.AccountProjectSettings(project.id)}>
                    <Settings2Icon className="size-4" />
                    Settings
                  </Link>
                ) : (
                  <>
                    <Settings2Icon className="size-4" />
                    Settings
                  </>
                )}
              </Button>
            </li>
            {isOwner && (
              <li>
                <DeleteProjectButton project={project} />
              </li>
            )}

            {!isOwner && !isInvite && (
              <li>
                <LeaveProjectButton project={project} />
              </li>
            )}

            {isInvite && (
              <>
                <li>
                  <AcceptProjectButton project={project} />
                </li>
                <li>
                  <DeclineProjectButton project={project} />
                </li>
              </>
            )}
          </ul>

          <div className="w-full">
            {projectSection === "members" && (
              <ProjectMembers project={project} />
            )}
            {projectSection === "settings" && (
              <UpdateProjectForm project={project} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
