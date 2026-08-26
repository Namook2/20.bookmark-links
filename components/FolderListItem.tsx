"use client";

import Link from "next/link";

import type { Folder } from "@/app/_lib/types";

type FolderListItemProps = {
  folder: Folder;
  onDeleteClick: (folder: Folder) => void;
};

export default function FolderListItem({
  folder,
  onDeleteClick,
}: FolderListItemProps) {
  return (
    <li className="folder-row relative">
      <Link
        href={`/folder/${folder.id}`}
        className="folder-item flex w-full items-center justify-between rounded-lg px-3 py-2 pr-9 text-left text-sm text-[var(--text)]"
      >
        <span>{folder.name}</span>
        <span className="folder-count text-xs text-[var(--text-sub)]">
          {folder.count}
        </span>
      </Link>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDeleteClick(folder);
        }}
        aria-label={`${folder.name} 폴더 삭제`}
        className="folder-delete-btn absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[var(--text-sub)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M4 7h16" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
    </li>
  );
}
