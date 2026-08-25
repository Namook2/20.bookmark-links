import type { BookmarkLink } from "@/app/_lib/types";

type LinkCardProps = {
  link: BookmarkLink;
};

export default function LinkCard({ link }: LinkCardProps) {
  const hostname = new URL(link.url).hostname.replace("www.", "");
  const initial = hostname.charAt(0).toUpperCase();

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-xl border border-black/[.08] p-4 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.24]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/[.06] text-sm font-semibold dark:bg-white/[.08]">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{link.title}</p>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
            {hostname}
          </p>
        </div>
      </div>
      {link.description && (
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {link.description}
        </p>
      )}
    </a>
  );
}
