import { Column } from "@/components/kanban/board-column";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { getUserOrRedirect, isProjectAdmin } from "@/lib/auth";
import { BoardsService, ProjectsService } from "@/services";
import { isSectionCompleteAction } from "../../actions";
import { MarkCompleteButton } from "../../components/mark-complete-button";

type Props = {
  params: {
    projectId: string;
  };
};

export default async function FundingPipelinePage({ params }: Props) {
  const section = "pipeline";

  const user = await getUserOrRedirect();
  const role = await ProjectsService.getProjectRole(params.projectId, user.id);

  const board = await BoardsService.getBoard(params.projectId, section);

  if (!board) {
    return null;
  }

  const isComplete = await isSectionCompleteAction(params.projectId, section);

  // To Contact - Meeting - Due Diligence -  Closed

  const columns = [
    {
      id: "to-contact" as const,
      title: "To Contact",
    },
    {
      id: "meeting" as const,
      title: "Meeting",
    },
    {
      id: "due-diligence" as const,
      title: "Due Diligence",
    },
    {
      id: "closed" as const,
      title: "Closed",
    },
  ] satisfies Column[];

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end  pb-4">
        {isProjectAdmin(role) && (
          <MarkCompleteButton
            projectId={params.projectId}
            section={section}
            state={isComplete}
          />
        )}
      </div>
      <div className="flex-1 ">
        <KanbanBoard columns={columns} board={board} />
      </div>
    </div>
  );
}
