"use client";

import Link from "next/link";

import { useFolders } from "@/app/_lib/FolderContext";
import FolderList from "@/components/FolderList";

export default function Sidebar() {
  const { folders } = useFolders();

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-6 overflow-y-auto border-r border-[var(--divider)] p-4">
      <Link
        href="/"
        className="sidebar-active w-full rounded-lg px-3 py-2 text-left text-sm font-medium"
      >
        All
      </Link>
      <FolderList folders={folders} />
    </aside>
  );
}
