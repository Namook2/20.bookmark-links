"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { BookmarkLink } from "@/app/_lib/types";

type NewLink = Omit<BookmarkLink, "id">;

type LinkContextValue = {
  links: BookmarkLink[];
  addLink: (link: NewLink) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

type LinkProviderProps = {
  initialLinks: BookmarkLink[];
  children: ReactNode;
};

export function LinkProvider({ initialLinks, children }: LinkProviderProps) {
  const [links, setLinks] = useState<BookmarkLink[]>(initialLinks);

  const addLink = (link: NewLink) => {
    const newLink: BookmarkLink = { id: `link-${Date.now()}`, ...link };
    setLinks((prev) => [newLink, ...prev]);
  };

  const value = useMemo(() => ({ links, addLink }), [links]);

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
}

export function useLinks() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}
