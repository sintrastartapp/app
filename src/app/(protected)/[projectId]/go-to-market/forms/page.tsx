import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getUserOrRedirect, isProjectAdmin } from "@/lib/auth";
import { ProjectsService } from "@/services";
import { CircleAlertIcon } from "lucide-react";
import { isSectionCompleteAction } from "../../actions";
import { MarkCompleteButton } from "../../components/mark-complete-button";

type Props = {
  params: {
    projectId: string;
  };
};

export default async function ValidationExperimentsPage({ params }: Props) {
  const section = "forms";

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
              Simplify your work intake with forms
            </AlertTitle>
            <AlertDescription className="">
              Share a form, collect info, and track work requests from
              stakeholders.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex h-32 flex-col items-start justify-start gap-2 text-left"
            >
              <h3 className="text-wrap text-muted-foreground">
                Create and share
              </h3>
              <span className="text-wrap text-xs font-normal text-muted-foreground">
                Customize forms to get the details you need
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                (coming soon)
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex h-32 flex-col items-start justify-start gap-2 text-left"
            >
              <h3 className="text-muted-foreground">Form templates</h3>
              <span className="text-wrap text-xs font-normal text-muted-foreground">
                From marketing campaign, content creation, event planning,
                social media post, email marketing.
              </span>
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
