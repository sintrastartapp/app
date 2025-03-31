import {
  CirclePlayIcon,
  MessageCircleWarningIcon,
  SlackIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { site } from "@/config/constants";

export function WelcomeResources() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Watch 3 minutes video overview</h3>

        <div className="w-full overflow-hidden rounded-lg bg-muted">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="relative flex size-full items-center justify-center"
              >
                <CirclePlayIcon className="absolute z-10 size-10 cursor-pointer opacity-50" />
                <Image
                  src={`https://i.ytimg.com/vi/${site.links.youtubeOverview}/mqdefault.jpg`}
                  alt="YouTube video thumbnail"
                  width={1280}
                  height={720}
                  className="size-full object-cover"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="min-w-fit">
              <DialogHeader>
                <DialogTitle>
                  Learn how to use {site.name} in less than a minute
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <div className="">
                {/* Youtube iframe video with play/pause button only */}
                <iframe
                  width="1024"
                  height="576"
                  src={`https://www.youtube.com/embed/${site.links.youtubeOverview}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Resources</h3>

        <ul className="flex flex-col gap-4 text-sm">
          <li className="flex items-center gap-2">
            <Link
              href={site.links.youtubeDemos}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <YoutubeIcon className="size-5" />
              <span>Watch demos</span>
            </Link>
          </li>
          <li>
            <Link
              href={site.links.feedbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircleWarningIcon className="size-5" />
              <span>Give us feedback</span>
            </Link>
          </li>
          <li>
            <Link
              href={site.links.slackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <SlackIcon className="size-5" />
              <span>Join our Slack community</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
