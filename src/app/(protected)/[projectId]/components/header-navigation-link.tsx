"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = {
  href: string;
};

export function HeaderNavigationLink({
  href,
  children,
}: PropsWithChildren<Props>) {
  const pathname = usePathname();

  const active = pathname.includes(href);

  return (
    <Link
      href={href}
      prefetch={false}
      className={cn({
        "font-medium underline underline-offset-8": active,
      })}
    >
      {children}
    </Link>
  );
}
