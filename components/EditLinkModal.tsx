"use client";

import { useState } from "react";

import type { BookmarkLink, Folder } from "@/app/_lib/types";

type EditLinkModalProps = {
  link: BookmarkLink | null;
  folders: Folder[];
  onClose: () => void;
  onSave: (
    id: string,
    edits: { folderId: string; title: string; description: string },
  ) => void;
};

export default function EditLinkModal({
  link,
  folders,
  onClose,
  onSave,
}: EditLinkModalProps) {
  const [folderId, setFolderId] = useState(link?.folderId ?? "");
  const [title, setTitle] = useState(link?.title ?? "");
  const [description, setDescription] = useState(link?.description ?? "");

  if (!link) return null;

  const handleSave = () => {
    if (!title.trim() || !folderId) return;
    onSave(link.id, {
      folderId,
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-96 rounded-[12px] bg-[var(--surface)] p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-5 text-[17px] font-semibold text-[var(--text)]">
          링크 정보 수정
        </h2>
        <div className="mb-4 flex flex-col gap-2">
          <label
            htmlFor="edit-link-folder"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더
          </label>
          <select
            id="edit-link-folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="input-field rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)]"
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label
            htmlFor="edit-link-title"
            className="text-sm font-medium text-[var(--text)]"
          >
            제목
          </label>
          <input
            id="edit-link-title"
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="input-field rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
          />
        </div>
        <div className="mb-6 flex flex-col gap-2">
          <label
            htmlFor="edit-link-description"
            className="text-sm font-medium text-[var(--text)]"
          >
            설명
          </label>
          <textarea
            id="edit-link-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className="input-field resize-none rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
          />
        </div>
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
            onClick={handleSave}
            disabled={!title.trim() || !folderId}
            className="btn-primary rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-30"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
