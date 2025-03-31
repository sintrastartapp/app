import { LandingPageUI } from "@/app/(protected)/[projectId]/the-problem/validation-experiments/landing-page/components/landing-page-ui";
import { Button } from "@/components/ui/button";
import { site } from "@/config/constants";
import { Links } from "@/config/links";
import { ProjectsService } from "@/services";
import { of } from "await-of";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    publicId: string;
  };
};

export default async function LandingPagePage({ params }: Props) {
  const [landingPage, error] = await of(
    ProjectsService.getLandingPageByPublicId(params.publicId)
  );

  if (error || landingPage?.state !== "published") {
    notFound();
  }

  return (
    <div className="mx-auto flex w-screen max-w-4xl flex-col items-center justify-between gap-8 rounded-lg p-4">
      <LandingPageUI landingPage={landingPage} />

      <footer className="flex flex-wrap items-center justify-center p-4">
        <Button variant="link" className="text-muted-foreground" asChild>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={Links.TermsOfUse}
          >
            Terms of Use
          </Link>
        </Button>
        <Button variant="link" className="text-muted-foreground" asChild>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={Links.PrivacyPolicy}
          >
            Privacy Policy
          </Link>
        </Button>
        <Button variant="link" className="font-bold" asChild>
          <Link target="_blank" rel="noopener noreferrer" href={Links.Root}>
            Powered by {site.name}
          </Link>
        </Button>
      </footer>
    </div>
  );
}
