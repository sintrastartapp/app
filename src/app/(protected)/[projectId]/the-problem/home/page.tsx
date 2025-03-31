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

export default async function TheProblemHomePage({ params }: Props) {
  const title = "The Problem";
  const slug = slugify(title);

  const tasks = await Promise.all(
    headerSections
      .filter((hs) => hs.slug !== "home")
      .map(async (hs) => ({
        title: hs.title,
        done: await isSectionCompleteAction(params.projectId, hs.slug),
        href:
          hs.slug === "landing-page"
            ? Links.ProjectTheProblemValidationExperiments(
                params.projectId,
                hs.slug
              )
            : Links.ProjectTheProblem(params.projectId, hs.slug),
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
      feedbackLink={site.feedbackLinks.theProblem}
    />
  );
}
