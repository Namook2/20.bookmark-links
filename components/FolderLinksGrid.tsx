"use client";

import { useLinks } from "@/app/_lib/LinkContext";
import LinkGrid from "@/components/LinkGrid";

type FolderLinksGridProps = {
  folderId: string;
};

export default function FolderLinksGrid({ folderId }: FolderLinksGridProps) {
  const { links } = useLinks();
  const folderLinks = links.filter((link) => link.folderId === folderId);
  return <LinkGrid links={folderLinks} />;
}
