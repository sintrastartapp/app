import { site } from "@/config/constants";
import { Links } from "@/config/links";
import { slugify } from "@/lib/utils";
import { isSectionCompleteAction } from "../../actions";
import { HomeContainer } from "../../components/home-container";
import { headerSections } from "../constants";

type Props = {
  params: {
    projectId: string;
  };
};

export default async function DevelopmentPhasePage({ params }: Props) {
  const title = "Development Phase";
  const slug = slugify(title);

  const tasks = await Promise.all(
    headerSections
      .filter((hs) => hs.slug !== "home")
      .map(async (hs) => ({
        title: hs.title,
        done: await isSectionCompleteAction(params.projectId, hs.slug),
        href: Links.ProjectDevelopmentPhase(params.projectId, hs.slug),
      }))
  );

  const feedbackHidden = await isSectionCompleteAction(
    params.projectId,
    `${slug}-feedback-hidden`
  );

  const feedbackGiven = await isSectionCompleteAction(
    params.projectId,
    `${slug}-feedback-given`
  );

  return (
    <HomeContainer
      projectId={params.projectId}
      title={title}
      slug={slug}
      tasks={tasks}
      feedbackGiven={feedbackGiven}
      feedbackHidden={feedbackHidden}
      feedbackLink={site.feedbackLinks.developmentPhase}
    />
  );
}
