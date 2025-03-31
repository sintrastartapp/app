import { site } from "@/config/constants";
import { CompletedSectionFeedback } from "../../components/completed-section-feedback";
import { PageTitle } from "../../components/page-title";
import { TaskItem, TaskList } from "../../components/task-list";
import { NeedHelpContainer } from "./need-help-container";

type Props = {
  projectId: string;
  tasks: TaskItem[];
  title: string;
  slug: string;
  feedbackGiven: boolean;
  feedbackLink: string;
  feedbackHidden: boolean;
};

export async function HomeContainer({
  projectId,
  tasks,
  slug,
  title,
  feedbackGiven,
  feedbackLink,
  feedbackHidden,
}: Props) {
  const showFeedback = tasks.every((t) => t.done) && !feedbackHidden;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 pt-4">
        <PageTitle className="mb-8">
          <PageTitle.Heading>{title}</PageTitle.Heading>
          <PageTitle.Description>
            Get started with {site.name} by completing the following tasks.
          </PageTitle.Description>
        </PageTitle>

        {showFeedback ? (
          <div className="w-1/2">
            <CompletedSectionFeedback
              projectId={projectId}
              slug={slug}
              feedbackGiven={feedbackGiven}
              feedbackLink={feedbackLink}
              section={title}
            />
          </div>
        ) : (
          <div className="max-w-3xl">
            <TaskList tasks={tasks} />
          </div>
        )}

        <NeedHelpContainer />
      </div>
    </div>
  );
}
