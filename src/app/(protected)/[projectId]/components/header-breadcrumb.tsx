"use client";

import { HouseIcon, SlashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type Section = {
  title: string;
  slug: string;
};

type BreadcrumbItem = {
  title: string;
  href: string;
};

type Props = {
  sections: Section[];
  items?: BreadcrumbItem[];
};

export function HeaderBreadcrumb({ sections, items }: Props) {
  const pathname = usePathname();
  const lastSection = pathname.split("/").pop();

  const lastSectionName = sections.find((s) => s.slug === lastSection)?.title;

  return (
    <nav className="inline-flex items-center gap-1.5 rounded-md py-2.5  text-xs text-muted-foreground">
      <span>
        <Link href="/">
          <HouseIcon className="size-3" />
        </Link>
      </span>
      {items?.map((item) => (
        <Fragment key={item.title}>
          <span className="text-xs text-muted-foreground">
            <SlashIcon className="size-2" />
          </span>
          <Link href={item.href}>{item.title}</Link>
        </Fragment>
      ))}

      <span className="text-xs text-muted-foreground">
        <SlashIcon className="size-2" />
      </span>
      <Link href={"#"}>{lastSectionName}</Link>
    </nav>
  );
}
