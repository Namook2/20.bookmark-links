"use client";

import { useState } from "react";

type NewFolderModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function NewFolderModal({
  isOpen,
  isSubmitting,
  onClose,
  onSave,
}: NewFolderModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleSave = () => {
    if (!name.trim() || isSubmitting) return;
    onSave(name);
    setName("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="w-80 rounded-[12px] bg-[var(--surface)] p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-5 text-[17px] font-semibold text-[var(--text)]">
          새 폴더
        </h2>
        <input
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSave();
          }}
          disabled={isSubmitting}
          placeholder="폴더 이름"
          className="input-field mb-6 w-full rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="btn-tertiary rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text-sub)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim() || isSubmitting}
            className="btn-primary rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-30"
          >
            {isSubmitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
