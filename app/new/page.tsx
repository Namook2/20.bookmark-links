import type { Metadata } from "next";

import Header from "@/components/Header";
import LinkForm from "@/components/LinkForm";
import Sidebar from "@/components/Sidebar";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "새 링크 추가",
  "새로운 북마크 링크를 폴더에 추가하세요.",
);

export default function NewLink() {
  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col items-center overflow-y-auto p-8">
          <div className="w-full max-w-md pt-14">
            <h1 className="mb-8 text-[24px] font-semibold tracking-tight text-[var(--text)]">
              새 링크 추가
            </h1>
            <LinkForm />
          </div>
        </main>
      </div>
    </>
  );
}
