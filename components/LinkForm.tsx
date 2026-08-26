"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { OgInfo } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/FolderContext";
import { useLinks } from "@/app/_lib/LinkContext";

export default function LinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();

  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!url.trim() || !folderId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/og?url=${encodeURIComponent(url.trim())}`,
      );

      if (!response.ok) {
        throw new Error("링크 정보를 가져오지 못했습니다.");
      }

      const ogInfo: OgInfo = await response.json();

      addLink({
        title: ogInfo.title,
        url: ogInfo.url,
        folderId,
        description: ogInfo.description ?? undefined,
        thumbnail: ogInfo.thumbnail ?? undefined,
      });

      router.push(`/folder/${folderId}`);
    } catch {
      setError("링크 정보를 가져오지 못했습니다. URL을 다시 확인해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-5">
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
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
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
          required
          value={folderId}
          onChange={(event) => setFolderId(event.target.value)}
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
      {error && <p className="text-sm text-[var(--error)]">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-2 w-full rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:opacity-30"
      >
        {isSubmitting ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
