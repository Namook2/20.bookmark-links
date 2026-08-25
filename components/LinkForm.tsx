import type { Folder } from "@/app/_lib/types";

type LinkFormProps = {
  folders: Folder[];
};

export default function LinkForm({ folders }: LinkFormProps) {
  return (
    <form className="flex max-w-md flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-sm font-medium">
          링크
        </label>
        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
          className="rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-black/[.24] dark:border-white/[.145] dark:focus:border-white/[.32]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="folderId" className="text-sm font-medium">
          폴더
        </label>
        <select
          id="folderId"
          name="folderId"
          defaultValue=""
          className="rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-black/[.24] dark:border-white/[.145] dark:focus:border-white/[.32]"
        >
          <option value="" disabled>
            폴더 선택
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        저장
      </button>
    </form>
  );
}
