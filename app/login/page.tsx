"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormFilled = email.trim() !== "" && password !== "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    router.push("/");
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto p-8">
      <div className="w-full max-w-[360px]">
        <p className="mb-10 text-center text-[24px] font-semibold tracking-tight text-[var(--text)]">
          북마크 링크
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="input-field rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="input-field rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
            />
          </div>
          <button
            type="submit"
            disabled={!isFormFilled || isSubmitting}
            className="btn-primary mt-2 w-full rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:opacity-30"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="text-[var(--accent)] hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </main>
  );
}
