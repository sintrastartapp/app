import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import { getUserOrRedirect, isUserAdmin } from "@/lib/auth";
import {
  FolderKanban,
  LockKeyholeIcon,
  LogOutIcon,
  Receipt,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { SidebarWrapper } from "../../components/sidebar-wrapper";
import { NavLink } from "./nav-link";

export async function AccountSidebar() {
  const user = await getUserOrRedirect();

  const isAdmin = isUserAdmin(user.role);

  return (
    <SidebarWrapper user={user}>
      <nav className="mt-2 flex flex-col gap-2 px-4 py-2">
        <NavLink
          href={Links.AccountProfile}
          icon={<UserRoundCog className="size-4" />}
        >
          Profile
        </NavLink>
        <NavLink
          href={Links.AccountProjects}
          icon={<FolderKanban className="size-4" />}
        >
          Projects
        </NavLink>
        {/* <NavLink
          disabled
          href={Links.AccountTeams}
          icon={<Users className="size-4" />}
        >
          Teams
        </NavLink> */}
        <NavLink
          disabled
          href={Links.AccountBilling}
          icon={<Receipt className="size-4" />}
        >
          Billing
        </NavLink>
        {isAdmin && (
          <NavLink
            href={Links.AccountAdminDash}
            icon={<LockKeyholeIcon className="size-4" />}
          >
            Admin Dashboard
          </NavLink>
        )}

        <Button
          variant="link"
          className="flex h-10 items-center justify-start gap-2 text-xs text-destructive"
          asChild
        >
          <Link href={Links.LogOut} prefetch={false}>
            <LogOutIcon className="size-4" />
            Log out
          </Link>
        </Button>
      </nav>
    </SidebarWrapper>
  );
}
