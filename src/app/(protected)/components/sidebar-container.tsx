"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftToLineIcon, ArrowRightToLineIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import { useSidebarContext } from "../contexts/sidebar-context";

export function SidebarContainer({ children }: PropsWithChildren) {
  const { isOpen, toggle } = useSidebarContext();

  return (
    <div
      data-open={isOpen}
      className={cn(
        "group z-50 inset-y-0 max-h-screen transition-all duration-150",
        // desktop
        "lg:relative lg:w-[300px] lg:data-[open=false]:w-0",
        // mobile
        "w-[80vw] data-[open=true]:translate-x-0  data-[open=false]:-translate-x-full max-lg:fixed"
      )}
    >
      <aside
        className={cn(
          "absolute inset-0 flex group-data-[open=true]:min-w-fit flex-col justify-between border-r border-border bg-background",
          // desktop
          "lg:group-data-[open=false]:-translate-x-[300px] lg:group-data-[open=true]:translate-x-0"
        )}
      >
        {children}
      </aside>

      <div className="absolute -right-2 bottom-2 z-50 translate-x-full">
        <Button
          variant="outline"
          className="size-8 rounded-full p-0"
          onClick={toggle}
        >
          {isOpen ? (
            <ArrowLeftToLineIcon className="size-4" />
          ) : (
            <ArrowRightToLineIcon className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
