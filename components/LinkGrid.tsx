"use client";

import { useState } from "react";

import type { BookmarkLink } from "@/app/_lib/types";
import { useLinks } from "@/app/_lib/LinkContext";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import LinkCard from "@/components/LinkCard";

type LinkGridProps = {
  links: BookmarkLink[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  const { deleteLink } = useLinks();
  const [linkToDelete, setLinkToDelete] = useState<BookmarkLink | null>(null);

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
            onDeleteClick={setLinkToDelete}
          />
        ))}
      </div>
      <DeleteLinkModal
        link={linkToDelete}
        onClose={() => setLinkToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
