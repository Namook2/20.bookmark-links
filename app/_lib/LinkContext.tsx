"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { BookmarkLink, LinkRow } from "@/app/_lib/types";
import { createClient } from "@/utils/supabase/client";

type NewLink = Omit<BookmarkLink, "id">;
type LinkEdits = Pick<BookmarkLink, "folderId" | "title" | "description">;

type LinkContextValue = {
  links: BookmarkLink[];
  addLink: (link: NewLink) => Promise<void>;
  updateLink: (id: string, edits: LinkEdits) => void;
  deleteLink: (id: string) => void;
  unassignLinksByFolder: (folderId: string) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

type LinkProviderProps = {
  initialLinks: BookmarkLink[];
  children: ReactNode;
};

export function LinkProvider({ initialLinks, children }: LinkProviderProps) {
  const [links, setLinks] = useState<BookmarkLink[]>(initialLinks);
  const supabase = useMemo(() => createClient(), []);

  const addLink = async (link: NewLink) => {
    const { data, error } = await supabase
      .from("links")
      .insert({
        title: link.title,
        url: link.url,
        folder_id: link.folderId === null ? null : Number(link.folderId),
        description: link.description ?? null,
        thumbnail: link.thumbnail ?? null,
      })
      .select("id, title, url, folder_id, description, thumbnail")
      .single<LinkRow>();

    if (error || !data) {
      throw error ?? new Error("Failed to save link");
    }

    const newLink: BookmarkLink = {
      id: data.id,
      title: data.title,
      url: data.url,
      folderId: data.folder_id === null ? null : String(data.folder_id),
      description: data.description ?? undefined,
      thumbnail: data.thumbnail ?? undefined,
    };
    setLinks((prev) => [newLink, ...prev]);
  };

  const updateLink = (id: string, edits: LinkEdits) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...edits } : link)),
    );

    supabase
      .from("links")
      .update({
        folder_id: edits.folderId === null ? null : Number(edits.folderId),
        title: edits.title,
        description: edits.description,
      })
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to update link:", error.message);
      });
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));

    supabase
      .from("links")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to delete link:", error.message);
      });
  };

  const unassignLinksByFolder = (folderId: string) => {
    // The folder row's ON DELETE SET NULL already clears folder_id on the
    // server; this only keeps local state in sync without a round trip.
    setLinks((prev) =>
      prev.map((link) =>
        link.folderId === folderId ? { ...link, folderId: null } : link,
      ),
    );
  };

  const value = useMemo(
    () => ({ links, addLink, updateLink, deleteLink, unassignLinksByFolder }),
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
