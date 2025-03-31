import { getDocumentShareUrlAction } from "@/app/(protected)/[projectId]/actions";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { copyToClipboard } from "@/lib/utils";
import { Share2Icon } from "lucide-react";
import { toast } from "sonner";

export function ShareButton({ docId, link }: { docId: string; link: string }) {
  async function handleCopyLink() {
    const url = await getDocumentShareUrlAction(docId);
    // await copyToClipboard(site.url + link);

    copyToClipboard(url || link);

    toast.success("Link copied to clipboard");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="items-center gap-2  text-xs">
          <Share2Icon className="size-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 text-sm">
        <h2 className="font-bold">Share with Link</h2>
        <p className="text-xs">
          Anyone with the URL will be able to view the shared document.
        </p>

        <Button className="mt-4 h-8 text-xs" onClick={handleCopyLink}>
          Copy share link
        </Button>
      </PopoverContent>
    </Popover>
  );
}
