"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Folder } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/FolderContext";
import { useLinks } from "@/app/_lib/LinkContext";
import { createClient } from "@/utils/supabase/client";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import EditFolderModal from "@/components/EditFolderModal";
import FolderList from "@/components/FolderList";

export default function Sidebar() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const { folders, renameFolder, deleteFolder } = useFolders();
  const { links, unassignLinksByFolder } = useLinks();
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmEdit = (id: string, name: string) => {
    renameFolder(id, name);
    setFolderToEdit(null);
  };

  const handleConfirmDelete = (folder: Folder) => {
    deleteFolder(folder.id);
    unassignLinksByFolder(folder.id);
    setFolderToDelete(null);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-6 overflow-y-auto border-r border-[var(--divider)] p-4">
      <Link
        href="/"
        className="sidebar-active w-full rounded-lg px-3 py-2 text-left text-sm font-medium"
      >
        All
      </Link>
      <FolderList
        folders={folders}
        links={links}
        onEditClick={setFolderToEdit}
        onDeleteClick={setFolderToDelete}
      />
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="sidebar-link mt-auto w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-sub)] disabled:opacity-30"
      >
        {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
      </button>
      <EditFolderModal
        key={folderToEdit?.id ?? "closed"}
        folder={folderToEdit}
        onClose={() => setFolderToEdit(null)}
        onSave={handleConfirmEdit}
      />
      <DeleteFolderModal
        folder={folderToDelete}
        onClose={() => setFolderToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </aside>
  );
}
