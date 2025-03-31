import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

export function PageTitle({ className, children }: PropsWithChildren<Props>) {
  return <div className={cn("", className)}>{children}</div>;
}

function PageTitleHeading({ className, children }: PropsWithChildren<Props>) {
  return (
    <h2 className={cn("font-heading text-2xl font-extrabold", className)}>
      {children}
    </h2>
  );
}

function PageTitleDescription({
  className,
  children,
}: PropsWithChildren<Props>) {
  return <p className={cn("text-sm text-primary/80", className)}>{children}</p>;
}

PageTitle.Heading = PageTitleHeading;
PageTitle.Description = PageTitleDescription;
