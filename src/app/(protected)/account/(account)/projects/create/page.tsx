import { Button } from "@/components/ui/button";
import { getUserOrRedirect } from "@/lib/auth";
import { ProjectsService } from "@/services/projects.service";
import { Settings2Icon, UsersRoundIcon } from "lucide-react";
import { CreateProjectForm } from "../components/create-project-form";
import { ProjectList } from "../components/project-list";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const user = await getUserOrRedirect();
  const projects = await ProjectsService.getProjects(user.id);

  return (
    <div className="flex items-start gap-8">
      <ProjectList projects={projects} />

      <div className="flex min-h-full w-full flex-1 flex-col gap-6 border-l pl-8">
        <ul className="flex items-center gap-2">
          <li>
            <Button
              disabled
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-2"
            >
              <UsersRoundIcon className="size-4" />
              Members
            </Button>
          </li>
          <li>
            <Button
              disabled
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-2"
            >
              <Settings2Icon className="size-4" />
              Settings
            </Button>
          </li>
        </ul>

        <div className="w-full max-w-lg">
          <CreateProjectForm />
        </div>
      </div>
    </div>
  );
}
