import { site } from "@/config/constants";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { PageTitle } from "../../components/page-title";

export function NeedHelpContainer(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <PageTitle className="my-8">
        <PageTitle.Heading>Need help?</PageTitle.Heading>
        <PageTitle.Description>
          Choose any of the following options, and unlock your startup’s
          potential
        </PageTitle.Description>
      </PageTitle>

      <div className="grid grid-cols-4 gap-4">
        <Link
          href={site.links.learningHubUrl}
          target="_blank"
          className="flex h-40 items-center justify-center gap-2 rounded-md bg-muted font-heading text-lg font-semibold text-muted-foreground"
        >
          <ExternalLinkIcon className="size-6" />
          <span>Learning Hub</span>
        </Link>

        <Link
          href={site.links.slackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-40 items-center justify-center gap-2 rounded-md bg-muted font-heading text-lg font-semibold text-muted-foreground"
        >
          <span className="inline-flex size-6">
            <svg
              enableBackground="new 0 0 2447.6 2452.5"
              viewBox="0 0 2447.6 2452.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipRule="evenodd" fillRule="evenodd">
                <path
                  d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
                  fill="#36c5f0"
                />
                <path
                  d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
                  fill="#2eb67d"
                />
                <path
                  d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
                  fill="#ecb22e"
                />
                <path
                  d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
                  fill="#e01e5a"
                />
              </g>
            </svg>
          </span>

          <span>Community</span>
        </Link>
      </div>
    </div>
  );
}
