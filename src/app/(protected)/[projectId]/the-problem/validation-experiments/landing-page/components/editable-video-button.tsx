import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { YoutubeIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  editable?: boolean;
  href?: string;
  onChange?: (name: string, value: string) => void;
};

export function VideoButton({ onChange, editable, href = "" }: Props) {
  if (editable) {
    return <EditableVideoButton onChange={onChange} href={href} />;
  }

  if (!href.trim().length) {
    return null;
  }

  return (
    <Button variant="link" asChild className="gap-2">
      <Link href={href || "#"} target="_blank" rel="noopener noreferrer">
        <YoutubeIcon />
        Watch Demo Video
      </Link>
    </Button>
  );
}

function EditableVideoButton({ href, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="gap-2">
          <YoutubeIcon />
          Watch Demo Video
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[640px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Demo video</h4>
            <p className="text-sm text-muted-foreground">
              Configure your demo video link. (Example, Youtube link)
            </p>
          </div>
          <div className="grid gap-2">
            <Input
              type="url"
              id="demoVideoLink"
              placeholder="Type your demo video link here"
              defaultValue={href}
              className="col-span-2 h-8"
              onChange={(event) => {
                onChange?.("demoVideoLink", event.target.value);
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
