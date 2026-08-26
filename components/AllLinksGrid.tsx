"use client";

import { useLinks } from "@/app/_lib/LinkContext";
import LinkGrid from "@/components/LinkGrid";

export default function AllLinksGrid() {
  const { links } = useLinks();
  return <LinkGrid links={links} />;
}
