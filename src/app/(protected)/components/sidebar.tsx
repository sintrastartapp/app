import { Links } from "@/config/links";
import { getUserOrRedirect } from "@/lib/auth";
import {
  DatabaseIcon,
  FlameIcon,
  LightbulbIcon,
  RocketIcon,
  TrendingUpIcon,
} from "lucide-react";
import { SidebarNavLink } from "./sidebar-nav-link";
import { SidebarWrapper } from "./sidebar-wrapper";

export async function Sidebar() {
  const user = await getUserOrRedirect();

  return (
    <SidebarWrapper user={user}>
      <nav className="mt-2 flex flex-col gap-2 px-4 py-2">
        <SidebarNavLink
          href={Links.Project(":id:")}
          icon={<span>👋🏼</span>}
          className="flex w-full items-center justify-start gap-2 bg-muted"
          variant="ghost"
        >
          Getting started
        </SidebarNavLink>

        <SidebarNavLink
          href={Links.ProjectTheProblem(":id:")}
          icon={<LightbulbIcon className="size-4" />}
        >
          The problem
        </SidebarNavLink>
        <SidebarNavLink
          href={Links.ProjectDevelopmentPhase(":id:")}
          icon={<FlameIcon className="size-4" />}
        >
          Development phase
        </SidebarNavLink>
        <SidebarNavLink
          href={Links.ProjectGoToMarket(":id:")}
          icon={<RocketIcon className="size-4" />}
        >
          Go-to-market
        </SidebarNavLink>
        <SidebarNavLink
          href={Links.ProjectFunding(":id:")}
          icon={<TrendingUpIcon className="size-4" />}
        >
          Funding
        </SidebarNavLink>
        <SidebarNavLink
          href={Links.ProjectConnect(":id:")}
          icon={<DatabaseIcon className="size-4" />}
          disabled
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span>Connect</span>
            <span className="rounded-sm bg-muted-foreground px-1 text-xs text-muted">
              Coming soon
            </span>
          </div>
        </SidebarNavLink>
      </nav>
    </SidebarWrapper>
  );
}
