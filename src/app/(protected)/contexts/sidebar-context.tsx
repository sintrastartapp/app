"use client";

import React from "react";

const SidebarContext = React.createContext<SidebarContextValue>({
  isOpen: false,
  selectedProjectId: null,
  toggle: () => {},
  setSelectedProjectId: () => {},
});

type SidebarContextValue = {
  isOpen: boolean;
  toggle: () => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (projectId: string) => void;
};

export function useSidebarContext() {
  return React.useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [selectedProjectId, setSelectedProjectId] = React.useState<
    string | null
  >(null);

  const toggle = () => {
    setIsOpen((v) => !v);
  };

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle,
        selectedProjectId,
        setSelectedProjectId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
