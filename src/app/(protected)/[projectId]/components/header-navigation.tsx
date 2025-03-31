import { Links } from "@/config/links";
import { ProjectsService } from "@/services";
import { HeaderBreadcrumb } from "./header-breadcrumb";
import { HeaderNavigationLink } from "./header-navigation-link";

type Section = {
  title: string;
  slug: string;
  visible?: boolean;
};

type Props = {
  page: string;
  sections: Section[];
  projectId: string;
  linkFn: (projectId: string, section: string) => string;
};

export async function HeaderNavigation({
  page,
  sections,
  projectId,
  linkFn,
}: Props) {
  const project = await ProjectsService.getProjectById(projectId);

  return (
    <header className="flex min-h-header flex-col justify-center">
      <nav className="flex items-center gap-8 font-heading">
        {sections
          .filter((section) => section.visible !== false)
          .map(({ title: section, slug }) => {
            return (
              <HeaderNavigationLink
                key={section}
                href={linkFn(project.id, slug)}
              >
                {section}
              </HeaderNavigationLink>
            );
          })}
      </nav>

      <HeaderBreadcrumb
        sections={sections}
        items={[
          { title: project.name, href: Links.Project(project.id) },
          { title: page, href: linkFn(project.id, "home") },
        ]}
      />
    </header>
  );
}
