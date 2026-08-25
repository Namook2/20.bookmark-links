import Link from "next/link";

import type { Folder } from "@/app/_lib/types";
import FolderList from "@/components/FolderList";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
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
