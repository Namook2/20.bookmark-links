import Link from "next/link";

export default function Header() {
  return (
    <header className="nav-blur sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--divider)] px-6">
      <span className="text-[17px] font-semibold tracking-tight text-[var(--text)]">
        북마크 링크 테스트
      </span>
      <Link
        href="/new"
        className="btn-primary flex items-center gap-1 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white"
      >
        <span aria-hidden>+</span>
        새 링크
      </Link>
    </header>
  );
}
