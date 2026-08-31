import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { FolderProvider } from "@/app/_lib/FolderContext";
import { LinkProvider } from "@/app/_lib/LinkContext";
import type {
  BookmarkLink,
  Folder,
  FolderRow,
  LinkRow,
} from "@/app/_lib/types";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "뷱 마크 Viewk Mark",
  description: "북마크 링크를 폴더별로 정리하고 관리하는 서비스",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: folderRows }, { data: linkRows }] = user
    ? await Promise.all([
        supabase
          .from("folders")
          .select("id, name")
          .eq("user_id", user.id)
          .order("name"),
        supabase
          .from("links")
          .select("id, title, url, folder_id, description, thumbnail")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ])
    : [{ data: null }, { data: null }];

  const folders: Folder[] = ((folderRows ?? []) as FolderRow[]).map(
    (row) => ({
      id: String(row.id),
      name: row.name,
    }),
  );
  const links: BookmarkLink[] = ((linkRows ?? []) as LinkRow[]).map(
    (row) => ({
      id: row.id,
      title: row.title,
      url: row.url,
      folderId: String(row.folder_id),
      description: row.description ?? undefined,
      thumbnail: row.thumbnail ?? undefined,
    }),
  );

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FolderProvider initialFolders={folders}>
          <LinkProvider initialLinks={links}>{children}</LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
