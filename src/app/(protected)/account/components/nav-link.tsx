"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
  icon,
  disabled,
}: {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const url = usePathname();

  return (
    <Button
      asChild={!disabled}
      disabled={disabled}
      variant="outline"
      data-active={url.includes(href)}
      className="flex h-10 items-center justify-start gap-2 data-[active=true]:bg-muted"
    >
      {disabled ? (
        <>
          {icon}
          {children}
        </>
      ) : (
        <Link href={href}>
          {icon}
          {children}
        </Link>
      )}
    </Button>
  );
}
