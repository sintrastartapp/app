import { PropsWithChildren } from "react";
import { PageHeader } from "../../components/page-header";
import { AccountSidebar } from "../components/account-sidebar";

export default function AccountLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full">
      <AccountSidebar />
      <div className="h-screen max-h-screen flex-1 overflow-auto">
        <div className="flex min-h-screen flex-col">
          <PageHeader>
            <PageHeader.Title>Admin</PageHeader.Title>
          </PageHeader>

          <main className="flex-1 px-8 py-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
