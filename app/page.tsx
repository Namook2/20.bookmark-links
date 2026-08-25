import Header from "@/components/Header";
import LinkGrid from "@/components/LinkGrid";
import Sidebar from "@/components/Sidebar";
import { folders, links } from "./_lib/mock-data";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto p-6">
          <LinkGrid links={links} />
        </main>
      </div>
    </>
  );
}
