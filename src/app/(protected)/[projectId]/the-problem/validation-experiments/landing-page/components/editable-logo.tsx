import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { forwardRef, useState } from "react";

type Props = {
  editable?: boolean;
  src: string;
  width: number;
  height: number;
  onChange: (name: string, value: string) => void;
};

export function EditableLogo({
  editable,
  src: initialSrc,
  width: initialWidth,
  height: initialHeight,
  onChange,
}: Props) {
  const [src, setSrc] = useState(initialSrc);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  if (!editable) {
    if (src.trim().length === 0) {
      return null;
    }

    return (
      <StartupLogo
        editable={editable}
        src={src}
        width={width}
        height={height}
      />
    );
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const url = event.target.value;

    setSrc(url);

    onChange("startupLogo", url);
  }

  function handleWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const width = event.target.value;

    setWidth(parseInt(width.replace(/\D/g, ""), 10));

    onChange("startupLogoWidth", width);
  }

  function handleHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    const height = event.target.value;

    setHeight(parseInt(height.replace(/\D/g, ""), 10));

    onChange("startupLogoHeight", height);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0" style={{ width, height }}>
          <StartupLogo
            editable={true}
            height={height}
            width={width}
            src={src}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="startupLogo">URL</Label>
              <Input
                type="url"
                id="startupLogo"
                defaultValue={src}
                className="col-span-2 h-8"
                onChange={handleImageChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width (px)</Label>
              <Input
                type="number"
                id="width"
                defaultValue={width}
                className="col-span-2 h-8"
                onChange={handleWidthChange}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height (px)</Label>
              <Input
                type="number"
                id="height"
                defaultValue={height}
                className="col-span-2 h-8"
                onChange={handleHeightChange}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const StartupLogo = forwardRef<HTMLDivElement, Omit<Props, "onChange">>(
  ({ src, width, height, editable }, ref) => {
    const isLink = src.startsWith("http");

    return (
      <div
        ref={ref}
        data-editable={editable}
        data-empty={isLink === false}
        className={
          "relative flex select-none items-center justify-center overflow-hidden rounded-lg data-[editable=true]:border data-[editable=true]:border-border data-[empty=true]:bg-gray-100"
        }
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {!isLink ? (
          <span className="font-heading font-bold">{src || "No image"}</span>
        ) : (
          <Image fill src={src} alt="photo" className="object-contain" />
        )}
      </div>
    );
  }
);

StartupLogo.displayName = "StartupLogo";
