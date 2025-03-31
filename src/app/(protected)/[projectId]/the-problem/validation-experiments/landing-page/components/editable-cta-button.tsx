import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

type Props = {
  editable?: boolean;
  size?: "sm" | "lg";
  href?: string;
  children?: string;
  onChange?: (name: string, value: string) => void;
};

export function CTAButton({ editable, onChange, size, href, children }: Props) {
  if (editable) {
    return (
      <EditableCtaButton onChange={onChange} href={href} size={size}>
        {children || "Join Waitlist"}
      </EditableCtaButton>
    );
  }

  return (
    <Button asChild size={size}>
      <Link href={href || "#"} target="_blank" rel="noopener noreferrer">
        {children || "Join Waitlist"}
      </Link>
    </Button>
  );
}

export function EditableCtaButton({ size, href, children, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={size}>{children || "Join Waitlist"}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">CTA Settings</h4>
            <p className="text-sm text-muted-foreground">
              Configure your click-to-action button.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="formName">Label</Label>
              <Input
                id="formName"
                defaultValue={children}
                className="col-span-2 h-8"
                onChange={(event) => {
                  onChange?.("formName", event.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="formLink">Link for action</Label>
              <Input
                id="formLink"
                defaultValue={href || "#"}
                className="col-span-2 h-8"
                onChange={(event) => {
                  onChange?.("formLink", event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
