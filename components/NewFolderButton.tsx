type NewFolderButtonProps = {
  onClick: () => void;
};

export default function NewFolderButton({ onClick }: NewFolderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 rounded-full border border-[var(--border)] px-6 py-2.5 text-sm font-medium text-[var(--text)] btn-secondary"
    >
      <span aria-hidden>+</span>
      새 폴더
    </button>
  );
}
