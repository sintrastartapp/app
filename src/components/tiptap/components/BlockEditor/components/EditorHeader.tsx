import { markDocumentCompleteAction } from "@/app/(protected)/[projectId]/actions";
import { useEditorContext } from "@/components/tiptap/context/EditorContext";
import { BlockEditorState } from "@/components/tiptap/hooks/useBlockEditor";
import { Button } from "@/components/ui/button";
import { Assistant } from "@/config/assistants";
import { Links } from "@/config/links";
import { isProjectAdmin } from "@/lib/auth/is-admin";
import { GetDocumentsResponse, GetProjectRoleResponse } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CheckIcon,
  CircleDotDashedIcon,
  Loader2Icon,
  MessageSquareTextIcon,
} from "lucide-react";
import { toast } from "sonner";
import { EditorInfo } from "./EditorInfo";
import { DocumentExamples } from "./document-examples";
import { ShareButton } from "./share-button";

export type EditorHeaderProps = {
  characters: number;
  words: number;
  saveState: BlockEditorState;
  document: GetDocumentsResponse;
  assistant: Assistant;
  title: string;
  role: GetProjectRoleResponse;
};

export const EditorHeader = ({
  title,
  characters,
  words,
  saveState,
  document: doc,
  assistant,
  role,
}: EditorHeaderProps) => {
  const { isChatOpen, setIsChatOpen } = useEditorContext();

  const queryClient = useQueryClient();
  const { mutateAsync: markComplete, isPending } = useMutation({
    mutationKey: ["markDocumentComplete", doc.id],
    mutationFn: (state: boolean) =>
      markDocumentCompleteAction(doc.projectId, doc.slug, state),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["document", doc.id],
        (prevData: GetDocumentsResponse) => {
          return {
            ...prevData,
            isComplete: variables,
          } satisfies GetDocumentsResponse;
        }
      );
      toast.success(
        variables === true
          ? "Document marked as complete"
          : "Document marked as in progress"
      );
    },
  });

  return (
    <div className="flex flex-none flex-row items-center justify-between border-b border-gray-200 bg-white py-2 pr-3 text-black dark:border-gray-800 dark:bg-black dark:text-white">
      <div className="flex flex-row items-center">
        <EditorInfo
          characters={characters}
          words={words}
          saveState={saveState}
        />
      </div>
      <div className="flex items-center gap-1">
        {isProjectAdmin(role) && (
          <Button
            variant={doc.isComplete ? "outline" : "default"}
            className="items-center gap-2 text-xs"
            onClick={() => markComplete(!doc.isComplete)}
          >
            {doc.isComplete ? (
              <>
                {isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <CircleDotDashedIcon className="size-4" />
                )}
                Mark as in progress
              </>
            ) : (
              <>
                {isPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <CheckIcon className="size-4" />
                )}
                Mark as complete
              </>
            )}
          </Button>
        )}

        {assistant.examples && (
          <DocumentExamples
            title={assistant.examples.title || assistant.name || title}
            tabs={assistant.examples.tabs.map((tab) => ({
              title: tab.name || title,
              embeddedId: tab.embeddedId,
              content: tab.description,
            }))}
          />
        )}

        <ShareButton docId={doc.id} link={Links.ShareDocumentLink(doc.id)} />

        {!isChatOpen && (
          <div className="ml-4 border-l border-gray-200 pl-5">
            <Button
              variant="default"
              className="items-center gap-2 text-xs"
              onClick={() => setIsChatOpen(true)}
              disabled={saveState === "loading"}
            >
              <MessageSquareTextIcon className="size-4" />
              Open AI Assistant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
