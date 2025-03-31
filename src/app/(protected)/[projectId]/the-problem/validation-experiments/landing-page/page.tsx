import { Links } from "@/config/links";
import { getUserOrRedirect } from "@/lib/auth";
import { ProjectsService } from "@/services";
import { redirect } from "next/navigation";
import { EditableLandingPageUI } from "./components/landing-page-ui";

type Props = {
  params: {
    projectId: string;
  };
};

export const dynamic = "force-dynamic";

export default async function LandingPagePage({ params }: Props) {
  const user = await getUserOrRedirect();

  const landingPage = await ProjectsService.getLandingPage(params.projectId);
  const hasPermission = await ProjectsService.hasPermission(
    params.projectId,
    user.id,
    ["admin", "owner"]
  );

  if (!landingPage || landingPage.state === "initial") {
    redirect(
      Links.ProjectTheProblemValidationExperiments(params.projectId, "")
    );
  }

  const { publicId } = landingPage;

  return (
    <div className="flex h-full flex-col gap-4">
      <EditableLandingPageUI editable={hasPermission} publicId={publicId} />
    </div>
  );
}
