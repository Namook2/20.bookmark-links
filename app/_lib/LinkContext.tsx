"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { BookmarkLink } from "@/app/_lib/types";

type NewLink = Omit<BookmarkLink, "id">;
type LinkEdits = Pick<BookmarkLink, "folderId" | "title" | "description">;

type LinkContextValue = {
  links: BookmarkLink[];
  addLink: (link: NewLink) => void;
  updateLink: (id: string, edits: LinkEdits) => void;
  deleteLink: (id: string) => void;
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

  const updateLink = (id: string, edits: LinkEdits) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...edits } : link)),
    );
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const value = useMemo(
    () => ({ links, addLink, updateLink, deleteLink }),
    [links],
  );

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
}

export function useLinks() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}
