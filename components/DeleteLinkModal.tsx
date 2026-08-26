"use client";

import type { BookmarkLink } from "@/app/_lib/types";

type DeleteLinkModalProps = {
  link: BookmarkLink | null;
  onClose: () => void;
  onConfirm: (link: BookmarkLink) => void;
};

export default function DeleteLinkModal({
  link,
  onClose,
  onConfirm,
}: DeleteLinkModalProps) {
  if (!link) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-80 rounded-[12px] bg-[var(--surface)] p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-2 text-[17px] font-semibold text-[var(--text)]">
          링크 삭제
        </h2>
        <p className="mb-6 text-sm text-[var(--text-sub)]">
          {`'${link.title}' 링크를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-tertiary rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text-sub)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onConfirm(link)}
            className="btn-danger rounded-full bg-[var(--error)] px-5 py-2.5 text-sm font-medium text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
