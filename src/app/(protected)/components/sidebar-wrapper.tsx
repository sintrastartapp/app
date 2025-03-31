import { ProjectsService } from "@/services";
import { User } from "lucia";
import getConfig from "next/config";
import { PropsWithChildren } from "react";
import { SidebarProvider } from "../contexts/sidebar-context";
import { ProjectSelector } from "./project-selector";
import { SidebarContainer } from "./sidebar-container";
import { SidebarFeedbackLink } from "./sidebar-feedback-link";
import { SidebarHeader } from "./sidebar-header";
import { SidebarUser } from "./sidebar-user";

type Props = {
  user: User;
};

export async function SidebarWrapper({
  user,
  children,
}: PropsWithChildren<Props>) {
  const { version } = getConfig().publicRuntimeConfig;
  const projects = await ProjectsService.getProjects(user.id);

  const [major] = version.split(".").map(Number);
  const isBeta = major === 0;

  return (
    <SidebarProvider>
      <SidebarContainer>
        <section className="flex flex-1 flex-col">
          <SidebarHeader />
          <ProjectSelector projects={projects} />

          <div className="relative flex-1">
            <div className="absolute inset-0 overflow-auto">{children}</div>
          </div>
        </section>

        <div className="">
          <div className="p-1.5 px-4 text-center text-[10px] text-muted-foreground/35">
            <div
              data-beta={isBeta}
              className="group inline-flex items-center gap-1 overflow-hidden rounded-md bg-blue-200 text-blue-950 data-[beta=true]:bg-yellow-400 data-[beta=true]:text-yellow-950"
            >
              <span
                className="bg-blue-300/50 px-1 py-0.5 font-medium text-blue-950/70
              group-data-[beta=true]:bg-yellow-500/50 group-data-[beta=true]:text-yellow-950/60"
              >
                {isBeta ? "BETA" : "STABLE"}
              </span>
              <span className="py-0.5 pr-1.5">v{version}</span>
            </div>
          </div>

          <section className="flex flex-col gap-4 border-t p-4">
            <SidebarFeedbackLink />

            <SidebarUser user={user} />
          </section>
        </div>
      </SidebarContainer>
    </SidebarProvider>
  );
}
