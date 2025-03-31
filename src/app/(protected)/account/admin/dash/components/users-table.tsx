// SELECT
// 	chats.id,
// 	chats.assistant_id
// FROM
// 	chats
// 	INNER JOIN projects ON projects.id = chats.project_id
// WHERE
// 	projects.owner_id = 'xui2ikorqe2xhn6o'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Links } from "@/config/links";
import { DashboardService, UserService } from "@/services";
import { format, formatDistanceToNow } from "date-fns";
import { EllipsisVerticalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function UsersTable() {
  const users = await UserService.getUsers();

  const usersWithChats = await Promise.all(
    users.map(async (user) => {
      const chats = await DashboardService.getUserChats(user.id);

      return {
        ...user,
        chats,
      };
    })
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">User</TableHead>
          <TableHead className="w-[30%]">Company</TableHead>
          <TableHead className="w-1/5">Registered at</TableHead>
          <TableHead className="w-1/5">Last login at</TableHead>
          <TableHead className="w-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersWithChats.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <div className="relative size-8 overflow-hidden rounded-md">
                  {user.photo && (
                    <Image
                      src={user.photo}
                      alt={user.name ?? ""}
                      fill
                      className="size-8 object-cover"
                      sizes="(min-width: 768px) 48px, 24px"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-left">
              <div className="flex flex-col">
                <span className="truncate font-medium">{user.companyName}</span>

                {user.companyWebsite && (
                  <Link
                    href={user.companyWebsite}
                    className="text-xs text-muted-foreground"
                    prefetch={false}
                  >
                    {user.companyWebsite}
                  </Link>
                )}
              </div>
            </TableCell>
            <TableCell className="">
              <div className="flex flex-col">
                <span>{format(user.createdAt, "PP - HH:mm")}</span>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(user.createdAt, {
                    includeSeconds: true,
                    addSuffix: true,
                  })}
                </span>
              </div>
            </TableCell>
            <TableCell className="">
              {user.lastSignInAt && (
                <div className="flex flex-col">
                  <span>{format(user.lastSignInAt, "PP - HH:mm")}</span>
                  <span className="text-muted-foreground">
                    {formatDistanceToNow(user.lastSignInAt, {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                  </span>
                </div>
              )}
            </TableCell>

            <TableCell>
              <UserOptionsMenu chats={user.chats} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type ChatEntry = {
  id: string;
  assistantId: string;
  name: string;
};

function UserOptionsMenu({ chats }: { chats: ChatEntry[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-6 items-center justify-center rounded-full p-0">
        <EllipsisVerticalIcon className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
        <DropdownMenuLabel>Chats</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {chats.map((chat) => (
          <DropdownMenuItem key={chat.id} asChild>
            <Link href={Links.AccountAdminChat(chat.id)}>{chat.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
