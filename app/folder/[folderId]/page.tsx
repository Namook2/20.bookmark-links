import type { Metadata } from "next";

import FolderPageContent from "@/components/FolderPageContent";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "폴더",
  "폴더에 저장된 북마크 링크를 확인하세요.",
);

export default async function FolderPage(
  props: PageProps<"/folder/[folderId]">,
) {
  const { folderId } = await props.params;

  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <FolderPageContent folderId={folderId} />
        </main>
      </div>
    </>
  );
}
