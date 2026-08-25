import { notFound } from "next/navigation";

import Header from "@/components/Header";
import LinkGrid from "@/components/LinkGrid";
import Sidebar from "@/components/Sidebar";
import { folders, links } from "@/app/_lib/mock-data";

export default async function FolderPage(
  props: PageProps<"/folder/[folderId]">,
) {
  const { folderId } = await props.params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="mb-8 text-[24px] font-semibold tracking-tight text-[var(--text)]">
            {folder.name}
          </h1>
          <LinkGrid links={folderLinks} />
        </main>
      </div>
    </>
  );
}
