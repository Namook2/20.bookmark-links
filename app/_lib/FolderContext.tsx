"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import type { Folder, FolderRow } from "@/app/_lib/types";
import { createClient } from "@/utils/supabase/client";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  initialFolders: Folder[];
  children: ReactNode;
};

export function FolderProvider({
  initialFolders,
  children,
}: FolderProviderProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const supabase = useMemo(() => createClient(), []);
  const knownUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const loadFolders = async (userId: string) => {
      const { data, error } = await supabase
        .from("folders")
        .select("id, name")
        .eq("user_id", userId)
        .order("name");

      if (error) {
        console.error("Failed to load folders:", error.message);
        return;
      }

      setFolders(
        ((data ?? []) as FolderRow[]).map((row) => ({
          id: String(row.id),
          name: row.name,
        })),
      );
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user?.id ?? null;

      if (knownUserIdRef.current === undefined) {
        // First callback reflects the session already used for the initial
        // server-rendered fetch, so there is nothing new to load yet.
        knownUserIdRef.current = userId;
        return;
      }

      if (userId === knownUserIdRef.current) return;
      knownUserIdRef.current = userId;

      if (userId) {
        loadFolders(userId);
      } else {
        setFolders([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const addFolder = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const { data, error } = await supabase
      .from("folders")
      .insert({ name: trimmed })
      .select("id, name")
      .single<FolderRow>();

    if (error || !data) {
      console.error("Failed to save folder:", error?.message);
      return;
    }

    const newFolder: Folder = { id: String(data.id), name: data.name };
    setFolders((prev) => [...prev, newFolder]);
  };

  const renameFolder = (id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder,
      ),
    );

    supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to rename folder:", error.message);
      });
  };

  const deleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));

    supabase
      .from("folders")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Failed to delete folder:", error.message);
      });
  };

  const value = useMemo(
    () => ({ folders, addFolder, renameFolder, deleteFolder }),
    [folders],
  );

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
