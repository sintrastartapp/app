"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../contexts/sidebar-context";

export function SidebarNavLink({
  href,
  children,
  icon,
  disabled,
  className,
  variant = "outline",
}: {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "ghost" | "outline";
}) {
  const { selectedProjectId: projectId } = useSidebarContext();
  const pathname = usePathname();

  const isDisabled = disabled || !projectId;
  const link = href.replace(":id:", projectId ?? "");
  const isActive = pathname.includes(link.replace("/home", ""));

  return (
    <Button
      asChild={!isDisabled}
      disabled={isDisabled}
      variant={variant}
      data-active={isActive}
      className={cn(
        "flex h-10 items-center justify-start gap-2 data-[active=true]:bg-muted",
        className
      )}
    >
      {!isDisabled ? (
        <Link href={link}>
          {icon}
          {children}
        </Link>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Button>
  );
}
