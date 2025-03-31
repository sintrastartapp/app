"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  onChange: (url: string) => void;
};

export function EditableImage({ src: initialSrc, onChange }: Props) {
  const [src, setSrc] = useState(initialSrc);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const url = event.target.value;

    setSrc(url);

    onChange(url);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <div className="relative h-[328px] w-[604px] overflow-hidden rounded-lg bg-gray-100">
            <Image
              fill
              src={src || "/landing-image.png"}
              alt="photo"
              className="object-cover"
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[604px]">
        <div className="flex flex-col items-start gap-4">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            type="url"
            id="image_url"
            className="h-8"
            placeholder="Insert a valid URL"
            defaultValue={src}
            onChange={handleImageChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
