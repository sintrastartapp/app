"use client";

import { getSession } from "@/lib/auth";
import { createContext, PropsWithChildren, useContext } from "react";

type SessionContextValue = Awaited<ReturnType<typeof getSession>>;

const SessionContext = createContext<SessionContextValue>({
  session: null,
  user: null,
});

type SessionProviderProps = {
  session: SessionContextValue;
};

export const SessionProvider = ({
  children,
  session,
}: PropsWithChildren<SessionProviderProps>) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("useSession must be used within <SessionProvider>");
  }

  return session;
};
