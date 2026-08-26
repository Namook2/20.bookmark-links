"use client";

import { useFolders } from "@/app/_lib/FolderContext";
import FolderLinksGrid from "@/components/FolderLinksGrid";

type FolderPageContentProps = {
  folderId: string;
};

export default function FolderPageContent({
  folderId,
}: FolderPageContentProps) {
  const { folders } = useFolders();
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    return (
      <div className="flex flex-col items-center gap-2 pt-24 text-center">
        <p className="text-[17px] font-medium text-[var(--text)]">
          폴더를 찾을 수 없습니다.
        </p>
        <p className="text-sm text-[var(--text-sub)]">
          삭제되었거나 존재하지 않는 폴더예요.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-8 text-[24px] font-semibold tracking-tight text-[var(--text)]">
        {folder.name}
      </h1>
      <FolderLinksGrid folderId={folderId} />
    </>
  );
}
