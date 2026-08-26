"use client";

import { useEffect, useState } from "react";

import type { Folder } from "@/app/_lib/types";

type EditFolderModalProps = {
  folder: Folder | null;
  onClose: () => void;
  onSave: (id: string, name: string) => void;
};

export default function EditFolderModal({
  folder,
  onClose,
  onSave,
}: EditFolderModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (folder) setName(folder.name);
  }, [folder]);

  if (!folder) return null;

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(folder.id, name);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-80 rounded-[12px] bg-[var(--surface)] p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-5 text-[17px] font-semibold text-[var(--text)]">
          폴더 이름 수정
        </h2>
        <input
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSave();
          }}
          placeholder="폴더 이름"
          className="input-field mb-6 w-full rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
        />
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
            disabled={!name.trim()}
            className="btn-primary rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-30"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
