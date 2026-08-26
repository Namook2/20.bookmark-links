import AllLinksGrid from "@/components/AllLinksGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <AllLinksGrid />
        </main>
      </div>
    </>
  );
}
