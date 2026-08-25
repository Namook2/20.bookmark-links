import type { BookmarkLink } from "@/app/_lib/types";
import LinkCard from "@/components/LinkCard";

type LinkGridProps = {
  links: BookmarkLink[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
