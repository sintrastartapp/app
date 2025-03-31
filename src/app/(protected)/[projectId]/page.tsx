import { FlashBanner } from "@/components/flash-banner";
import { site } from "@/config/constants";
import { Links } from "@/config/links";
import { getUserOrRedirect } from "@/lib/auth";
import { getCookie } from "@/lib/utils/server";
import { ProjectsService } from "@/services/projects.service";
import { PageTitle } from "../components/page-title";
import { TaskList } from "../components/task-list";
import { WelcomeResources } from "../components/welcome-resources";
import {
  getProjectCompletenessAction,
  redirectToMainProjectAction,
} from "./actions";
import { CreateProjectDialog } from "./components/create-project-dialog";
import { FeedbackTaskItem } from "./components/feedback-task-item";

type Props = {
  params: {
    projectId?: string;
  };
};

export default async function GettingStartedPage({ params }: Props) {
  const user = await getUserOrRedirect();
  const projectsCount = await ProjectsService.userProjectsCount(user.id);

  if (
    projectsCount > 0 &&
    (!params.projectId || params.projectId === "getting-started")
  ) {
    await redirectToMainProjectAction();
    return;
  }

  const completeness = await getProjectCompletenessAction(params.projectId);

  const flashMessage = getCookie("flash");

  return (
    <div className="flex  flex-col">
      {projectsCount === 0 && <CreateProjectDialog />}

      <p className="m-8 flex items-center gap-4 text-2xl">
        <span>👋🏼</span>
        <span>Welcome, {user.name}</span>
      </p>

      {flashMessage && <FlashBanner message={flashMessage} />}

      <div className="mt-8 flex items-start gap-16 px-8">
        <div className="flex-1">
          <PageTitle className="mb-8">
            <PageTitle.Heading>Getting started</PageTitle.Heading>
            <PageTitle.Description>
              Get started with {site.name} by completing the following tasks.
            </PageTitle.Description>
          </PageTitle>

          <TaskList
            tasks={[
              {
                title: "Create your project",
                done: projectsCount !== 0,
              },
              {
                title: "Detailed project description",
                done: completeness.projectDescription,
                href: Links.AccountProjectSettings(params.projectId ?? "#"),
              },
              {
                title: "Start with the problem",
                done: completeness.theProblem,
                href: Links.ProjectTheProblem(params.projectId ?? "#"),
              },
              {
                title: "Development phase",
                done: completeness.developmentPhase,
                href: Links.ProjectDevelopmentPhase(params.projectId ?? "#"),
              },
              {
                title: "Go-to-market",
                done: completeness.gotoMarket,
                href: Links.ProjectGoToMarket(params.projectId ?? "#"),
              },
              {
                title: "Funding",
                done: completeness.funding,
                href: Links.ProjectFunding(params.projectId ?? "#"),
              },
              {
                title: "Invite co-founders  and team members for the project",
                done: completeness.inviteMembers,
                href: params.projectId
                  ? Links.AccountProjectMembers(params.projectId)
                  : "#",
              },
            ]}
          >
            <FeedbackTaskItem done={completeness.feedbackCompleted} />
          </TaskList>
        </div>
        <div className="min-w-96">
          <WelcomeResources />
        </div>
      </div>
    </div>
  );
}
