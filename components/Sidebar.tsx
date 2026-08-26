"use client";

import { useState } from "react";
import Link from "next/link";

import type { Folder } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/FolderContext";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import FolderList from "@/components/FolderList";

export default function Sidebar() {
  const { folders, deleteFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  const handleConfirmDelete = (folder: Folder) => {
    deleteFolder(folder.id);
    setFolderToDelete(null);
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-6 overflow-y-auto border-r border-[var(--divider)] p-4">
      <Link
        href="/"
        className="sidebar-active w-full rounded-lg px-3 py-2 text-left text-sm font-medium"
      >
        All
      </Link>
      <FolderList folders={folders} onDeleteClick={setFolderToDelete} />
      <DeleteFolderModal
        folder={folderToDelete}
        onClose={() => setFolderToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </aside>
  );
}
