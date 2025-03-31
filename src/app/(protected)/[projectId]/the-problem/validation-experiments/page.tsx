import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getUserOrRedirect, isProjectAdmin } from "@/lib/auth";
import { ProjectsService } from "@/services";
import { CircleAlertIcon } from "lucide-react";
import { isSectionCompleteAction } from "../../actions";
import { MarkCompleteButton } from "../../components/mark-complete-button";
import { LandingPageButton } from "./components/landing-page-button";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    projectId: string;
  };
};

export default async function ValidationExperimentsPage({ params }: Props) {
  const section = "validation-experiments";

  const user = await getUserOrRedirect();
  const role = await ProjectsService.getProjectRole(params.projectId, user.id);

  const isComplete = await isSectionCompleteAction(params.projectId, section);

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end">
        {isProjectAdmin(role) && (
          <MarkCompleteButton
            projectId={params.projectId}
            section={section}
            state={isComplete}
          />
        )}
      </div>
      <div className="flex-1 pt-4">
        <div className="flex max-w-4xl flex-col gap-4">
          <Alert variant="muted">
            <CircleAlertIcon className="size-5" />
            <AlertTitle className="text-primary">
              Validation Experiments
            </AlertTitle>
            <AlertDescription className="">
              Design and execute strategic tests to validate or refute your
              startup&apos;s hypotheses, ensuring data-driven decisions in your
              entrepreneurial journey.
            </AlertDescription>
          </Alert>

          <div className="row-auto grid grid-cols-3 gap-4">
            <LandingPageButton projectId={params.projectId} />

            <Button
              variant="outline"
              className="flex h-auto min-h-32 flex-col items-start justify-start gap-4 p-4"
            >
              <h3 className="text-muted-foreground">
                Create new validation experiment
              </h3>
              <span className="text-sm font-normal text-muted-foreground">
                (coming soon)
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
