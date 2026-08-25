import type { Folder } from "@/app/_lib/types";

type LinkFormProps = {
  folders: Folder[];
};

export default function LinkForm({ folders }: LinkFormProps) {
  return (
    <form className="flex max-w-md flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="url"
          className="text-sm font-medium text-[var(--text)]"
        >
          링크
        </label>
        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
          className="input-field rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="folderId"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="folderId"
          name="folderId"
          defaultValue=""
          className="input-field rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)]"
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
        className="btn-primary mt-2 w-full rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white"
      >
        저장
      </button>
    </form>
  );
}
