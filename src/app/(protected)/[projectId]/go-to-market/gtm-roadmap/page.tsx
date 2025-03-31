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

const gtmCols = [
  {
    id: "todo" as const,
    title: "Todo",
  },
  {
    id: "in-progress" as const,
    title: "In progress",
  },
  {
    id: "ready-for-launch" as const,
    title: "Ready for Launch",
  },
  {
    id: "done" as const,
    title: "Launched",
  },
];

export default async function DevelopmentPhaseRoadmapPage({ params }: Props) {
  const section = "gtm-roadmap";

  const user = await getUserOrRedirect();
  const role = await ProjectsService.getProjectRole(params.projectId, user.id);

  const board = await BoardsService.getBoard(params.projectId, section);

  if (!board) {
    return null;
  }

  const isComplete = await isSectionCompleteAction(params.projectId, section);

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end pb-4">
        {isProjectAdmin(role) && (
          <MarkCompleteButton
            projectId={params.projectId}
            section={section}
            state={isComplete}
          />
        )}
      </div>
      <div className="flex-1">
        <KanbanBoard board={board} columns={gtmCols} />
      </div>
    </div>
  );
}
