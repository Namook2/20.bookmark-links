"use client";

import type { BookmarkLink } from "@/app/_lib/types";

type LinkCardProps = {
  link: BookmarkLink;
  onEditClick: (link: BookmarkLink) => void;
  onDeleteClick: (link: BookmarkLink) => void;
};

export default function LinkCard({
  link,
  onEditClick,
  onDeleteClick,
}: LinkCardProps) {
  const hostname = new URL(link.url).hostname.replace("www.", "");
  const initial = hostname.charAt(0).toUpperCase();

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card relative flex flex-col gap-3 overflow-hidden rounded-xl p-6"
    >
      <div className="link-actions absolute right-3 top-3 z-10 flex items-center gap-1">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onEditClick(link);
          }}
          aria-label={`${link.title} 링크 수정`}
          className="link-action-btn rounded-full bg-white/90 p-1.5 text-[var(--text-sub)] shadow-sm"
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
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onDeleteClick(link);
          }}
          aria-label={`${link.title} 링크 삭제`}
          className="link-action-btn rounded-full bg-white/90 p-1.5 text-[var(--text-sub)] shadow-sm"
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
      </div>
      {link.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={link.thumbnail}
          alt=""
          className="-mx-6 -mt-6 mb-1 h-32 w-[calc(100%+3rem)] object-cover"
        />
      )}
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
