import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import { User } from "lucia";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  user: User;
};

export function SidebarUser({ user }: Props) {
  return (
    <Button
      asChild
      variant="outline"
      className="flex h-12 items-center justify-between gap-2 px-2"
    >
      <Link href={Links.AccountProfile}>
        <div className="flex items-center gap-2">
          <div className="relative size-8 overflow-hidden rounded-md">
            <Image
              src={user.photo}
              alt={user.name}
              fill
              className="size-8 object-cover"
              sizes="(min-width: 768px) 48px, 24px"
            />
          </div>
          <span className="max-w-[180px] truncate font-normal">
            {user.name}
          </span>
        </div>
        <ChevronRightIcon className="size-5" />
      </Link>
    </Button>
  );
}
