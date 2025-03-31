import { LogoTagline } from "@/components/logo-tagline";
import ReadEditor from "@/components/tiptap/components/BlockEditor/ReadEditor";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { site } from "@/config/constants";
import { Links } from "@/config/links";
import { getInitials } from "@/lib/utils";
import { DocumentsService } from "@/services";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

type Props = {
  params: {
    docId: string;
  };
};

export default async function SharedDocumentPage({ params }: Props) {
  const doc = await DocumentsService.getDocumentById(params.docId);

  if (!doc || !doc.content) {
    return null;
  }

  const { owner, content } = doc;

  return (
    <div className="container mx-auto">
      <header className="my-8 flex w-full items-center justify-between gap-4 border-b pb-8">
        <LogoTagline />

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src={owner.photo ?? "/avatar-placeholder.gif"}
                alt={owner.name!}
              />
              <AvatarFallback>{getInitials(owner.name ?? "")}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-0.5 group-data-[invitation=true]:text-muted-foreground">
              <span className="leading-none">{owner.name}</span>
              <span className="text-xs leading-none text-muted-foreground">
                Owner
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="pb-8">
        <ReadEditor content={content.trim()} />
      </div>

      <div className="h-20"></div>

      <footer className="fixed inset-x-0 bottom-0 flex h-20 w-full items-center justify-center gap-4 border-t bg-white">
        <Button asChild>
          <Link href={Links.Login}>Try {site.name}!</Link>
        </Button>
      </footer>
    </div>
  );
}
