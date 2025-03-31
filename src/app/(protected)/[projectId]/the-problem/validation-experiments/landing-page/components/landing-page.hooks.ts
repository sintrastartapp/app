import {
  getLandingPageByPublicIdAction,
  updateLandingPageAction,
} from "@/app/(protected)/[projectId]/actions";
import { LandingPageInsert } from "@/database/schema";
import { cn } from "@/lib/utils";
import { GetLandingPageResponse } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

type UseRegisterEditableOptions = {
  onChange?: (name: string, value: string) => void;
};

export function useRegisterEditable({
  onChange: onChangeInitial = () => {},
}: UseRegisterEditableOptions) {
  const onChange = useCallback(onChangeInitial, [onChangeInitial]);

  const hook = useCallback(
    (editable: boolean, id: string, className?: string) => {
      if (!editable) {
        return {
          className,
        };
      }

      function handleInput<T extends HTMLElement>(event: React.ChangeEvent<T>) {
        const target = event.target as HTMLElement;
        const value = target.innerHTML ?? "";

        onChange(id, value);
      }

      // function handlePaste<T extends HTMLElement>(
      //   event: React.ClipboardEvent<T>
      // ) {
      //   event.preventDefault();

      //   // Paste the clipboard data into the target element but in plain text only
      //   const text = event.clipboardData.getData("text/plain");

      //   // Set the text content of the target element to the pasted text
      //   const target = event.target as HTMLElement;

      //   // append text to the target element
      //   target.innerHTML += text;
      // }

      return {
        id,
        contentEditable: true,
        suppressContentEditableWarning: true,
        onInput: handleInput,
        // onPaste: handlePaste,
        className: cn(
          className,
          "outline-none hover:ring-2 hover:ring-yellow-300 focus:ring-2 focus:ring-yellow-500 min-w-10"
        ),
      };
    },
    [onChange]
  );

  return hook;
}

type UseLandingPageUIOptions = {
  publicId: string;
};

export function useLandingPageUI({ publicId }: UseLandingPageUIOptions) {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["landingPage", publicId],
    queryFn: () => getLandingPageByPublicIdAction(publicId),
  });

  const { mutateAsync, isPending: isUpdating } = useMutation({
    mutationKey: ["updateLandingPage", publicId],
    mutationFn: async (
      data: Partial<LandingPageInsert> & { sync?: boolean }
    ) => {
      const result = await updateLandingPageAction(publicId, data);

      if ("error" in result) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: (data, variables) => {
      const { sync } = variables;

      if (sync) {
        refetch();
        // queryClient.setQueryData(
        //   ["landingPage", publicId],
        //   (prevData: GetLandingPageResponse) => ({
        //     ...prevData,
        //     ...rest,
        //   })
        // );
      }
    },
    onError: (err) => {
      toast.error((err as Error)?.message ?? "Error updating landing page");
    },
  });

  const updateLandingPage = useDebouncedCallback(mutateAsync, 250);

  const updateLandingPageStore = useCallback(
    (data: Partial<GetLandingPageResponse>) => {
      queryClient.setQueryData(
        ["landingPage", publicId],
        (prevData: GetLandingPageResponse) => ({
          ...prevData,
          ...data,
        })
      );
    },
    [publicId, queryClient]
  );

  return {
    data,
    isLoading,
    isUpdating,
    updateLandingPage,
    updateLandingPageStore,
  };
}
