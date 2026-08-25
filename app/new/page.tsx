import Header from "@/components/Header";
import LinkForm from "@/components/LinkForm";
import Sidebar from "@/components/Sidebar";
import { folders } from "@/app/_lib/mock-data";

export default function NewLink() {
  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar folders={folders} />
        <main className="flex flex-1 flex-col items-center overflow-y-auto p-8">
          <div className="w-full max-w-md pt-14">
            <h1 className="mb-8 text-[24px] font-semibold tracking-tight text-[var(--text)]">
              새 링크 추가
            </h1>
            <LinkForm folders={folders} />
          </div>
        </main>
      </div>
    </>
  );
}
