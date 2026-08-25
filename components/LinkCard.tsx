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
      className="link-card flex flex-col gap-3 rounded-xl p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--divider)] text-sm font-semibold text-[var(--text)]">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--text)]">
            {link.title}
          </p>
          <p className="truncate text-xs text-[var(--text-sub)]">
            {hostname}
          </p>
        </div>
      </div>
      {link.description && (
        <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
          {link.description}
        </p>
      )}
    </a>
  );
}
