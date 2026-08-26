"use client";

import type { Folder } from "@/app/_lib/types";
import FolderListItem from "@/components/FolderListItem";

type FolderListProps = {
  folders: Folder[];
  onEditClick: (folder: Folder) => void;
  onDeleteClick: (folder: Folder) => void;
};

export default function FolderList({
  folders,
  onEditClick,
  onDeleteClick,
}: FolderListProps) {
  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-sub)]">
        폴더
      </p>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => (
          <FolderListItem
            key={folder.id}
            folder={folder}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ul>
    </nav>
  );
}
