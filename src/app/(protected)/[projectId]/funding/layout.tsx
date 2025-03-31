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

export default function FundingLayout({
  params,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-header items-center px-8">
        <HeaderNavigation
          page="Funding"
          sections={headerSections}
          projectId={params.projectId}
          linkFn={Links.ProjectFunding}
        />
      </div>
      <div className="h-full flex-1 px-8">{children}</div>
    </div>
  );
}
