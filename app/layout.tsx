import type { Metadata } from "next";
import "./globals.css";
import { FolderProvider } from "@/app/_lib/FolderContext";
import { folders } from "@/app/_lib/mock-data";

export const metadata: Metadata = {
  title: "북마크 링크 테스트",
  description: "북마크 링크를 폴더별로 정리하고 관리하는 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FolderProvider initialFolders={folders}>{children}</FolderProvider>
      </body>
    </html>
  );
}
