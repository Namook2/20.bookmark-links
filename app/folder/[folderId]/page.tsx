import FolderPageContent from "@/components/FolderPageContent";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
