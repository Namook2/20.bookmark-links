"use client";

import { useState } from "react";
import Link from "next/link";

import { useFolders } from "@/app/_lib/FolderContext";
import NewFolderButton from "@/components/NewFolderButton";
import NewFolderModal from "@/components/NewFolderModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addFolder } = useFolders();

  const handleSave = async (name: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await addFolder(name);
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <header className="nav-blur sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--divider)] px-6">
      <span className="text-[17px] font-semibold tracking-tight text-[var(--text)]">
        뷱 마크 Viewk Mark
      </span>
      <div className="flex items-center gap-2">
        <NewFolderButton onClick={() => setIsModalOpen(true)} />
        <Link
          href="/new"
          className="btn-primary flex items-center gap-1 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white"
        >
          <span aria-hidden>+</span>
          새 링크
        </Link>
      </div>
      <NewFolderModal
        isOpen={isModalOpen}
        isSubmitting={isSubmitting}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </header>
  );
}
