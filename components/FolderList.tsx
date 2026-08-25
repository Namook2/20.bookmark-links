import Link from "next/link";

import type { Folder } from "@/app/_lib/types";

type FolderListProps = {
  folders: Folder[];
};

export default function FolderList({ folders }: FolderListProps) {
  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        폴더
      </p>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-black/[.04] dark:text-zinc-300 dark:hover:bg-white/[.08]"
            >
              <span>{folder.name}</span>
              <span className="text-xs text-zinc-400">{folder.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
