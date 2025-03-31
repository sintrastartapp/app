import Link from "next/link";
import { PropsWithChildren } from "react";

export function PageHeader({ children }: PropsWithChildren) {
  return (
    <header className="flex h-header min-h-header items-center gap-16 px-8">
      {children}
    </header>
  );
}

function PageHeaderTitle({ children }: PropsWithChildren) {
  return <h1 className="font-heading text-3xl font-semibold">{children}</h1>;
}

PageHeader.Title = PageHeaderTitle;

function PageHeaderNavigation({ children }: PropsWithChildren) {
  return <nav className="flex gap-2">{children}</nav>;
}

PageHeader.Navigation = PageHeaderNavigation;

type NavigationItemProps = {
  href: string;
  active?: boolean;
};

function PageHeaderNavigationItem({
  href,
  children,
  active,
}: PropsWithChildren<NavigationItemProps>) {
  return (
    <Link
      href={href}
      data-active={active}
      className="inline-flex items-center p-4 text-sm underline-offset-8 data-[active=true]:font-medium data-[active=true]:underline"
    >
      {children}
    </Link>
  );
}

PageHeader.NavigationItem = PageHeaderNavigationItem;
