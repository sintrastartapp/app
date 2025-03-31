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

export default async function DevelopmentPhaseRoadmapPage({ params }: Props) {
  const user = await getUserOrRedirect();
  const role = await ProjectsService.getProjectRole(params.projectId, user.id);

  const board = await BoardsService.getBoard(params.projectId, "roadmap");

  if (!board) {
    return null;
  }

  const isComplete = await isSectionCompleteAction(params.projectId, "roadmap");

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end pb-4">
        {isProjectAdmin(role) && (
          <MarkCompleteButton
            projectId={params.projectId}
            section="roadmap"
            state={isComplete}
          />
        )}
      </div>
      <div className="flex-1">
        <KanbanBoard board={board} />
      </div>
    </div>
  );
}
