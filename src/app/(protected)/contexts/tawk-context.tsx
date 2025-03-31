"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

const TawkContext = createContext<TawkContextValue>({
  tawkVisible: false,
  setTawkVisible: () => {},
});

type TawkContextValue = {
  tawkVisible: boolean;
  setTawkVisible: (isVisible: boolean) => void;
};

export function useTawkContext() {
  return useContext(TawkContext);
}

export function TawkProvider({ children }: PropsWithChildren) {
  const [tawkVisible, setTawkVisible] = useState(true);

  const context = {
    tawkVisible,
    setTawkVisible,
  };

  return (
    <TawkContext.Provider value={context}>{children}</TawkContext.Provider>
  );
}
