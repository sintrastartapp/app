import { Links } from "@/config/links";
import { PropsWithChildren } from "react";
import { HeaderNavigation } from "../components/header-navigation";
import { headerSections } from "./constants";

type Props = {
  params: {
    projectId: string;
    section: string;
  };
};

export default function DevelopmentPhaseLayout({
  params,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-header items-center px-8">
        <HeaderNavigation
          page="Development Phase"
          sections={headerSections}
          projectId={params.projectId}
          linkFn={Links.ProjectDevelopmentPhase}
        />
      </div>
      <div className="h-full flex-1 px-8">{children}</div>
    </div>
  );
}
