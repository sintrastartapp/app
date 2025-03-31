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

export default async function TheProblemLayout({
  params,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full items-center px-8">
        <HeaderNavigation
          page="The Problem"
          sections={headerSections}
          projectId={params.projectId}
          linkFn={Links.ProjectTheProblem}
        />
      </div>
      <div className="h-full flex-1 px-8">{children}</div>
    </div>
  );
}
