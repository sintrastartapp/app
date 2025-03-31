import { getSession } from "@/lib/auth";
import { PropsWithChildren } from "react";
import { QueryContext } from "./contexts/query-context";
import { SessionProvider } from "./contexts/session-context";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  return (
    <QueryContext>
      <SessionProvider session={session}>
        {/* <TawkProvider> */}
        {children}
        {/* <TawkSnippet /> */}
        {/* </TawkProvider> */}
      </SessionProvider>
    </QueryContext>
  );
}
