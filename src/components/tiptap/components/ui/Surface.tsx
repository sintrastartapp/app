import { cn } from "@/components/tiptap/lib/utils";
import { forwardRef, HTMLProps } from "react";

export type SurfaceProps = HTMLProps<HTMLDivElement> & {
  withShadow?: boolean;
  withBorder?: boolean;
};

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    { children, className, withShadow = true, withBorder = true, ...props },
    ref
  ) => {
    const surfaceClass = cn(
      className,
      "bg-white rounded-lg dark:bg-black",
      withShadow ? "shadow-sm" : "",
      withBorder ? "border border-gray-200 dark:border-gray-800" : ""
    );

    return (
      <div className={surfaceClass} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

Surface.displayName = "Surface";
