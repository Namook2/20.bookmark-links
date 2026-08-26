"use client";

import { useState } from "react";

import type { BookmarkLink } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/FolderContext";
import { useLinks } from "@/app/_lib/LinkContext";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import EditLinkModal from "@/components/EditLinkModal";
import LinkCard from "@/components/LinkCard";

type LinkGridProps = {
  links: BookmarkLink[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  const { folders } = useFolders();
  const { updateLink, deleteLink } = useLinks();
  const [linkToEdit, setLinkToEdit] = useState<BookmarkLink | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<BookmarkLink | null>(null);

  const handleConfirmEdit = (
    id: string,
    edits: { folderId: string; title: string; description: string },
  ) => {
    updateLink(id, edits);
    setLinkToEdit(null);
  };

  const handleConfirmDelete = (link: BookmarkLink) => {
    deleteLink(link.id);
    setLinkToDelete(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onEditClick={setLinkToEdit}
            onDeleteClick={setLinkToDelete}
          />
        ))}
      </div>
      <EditLinkModal
        key={linkToEdit?.id ?? "closed"}
        link={linkToEdit}
        folders={folders}
        onClose={() => setLinkToEdit(null)}
        onSave={handleConfirmEdit}
      />
      <DeleteLinkModal
        link={linkToDelete}
        onClose={() => setLinkToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
