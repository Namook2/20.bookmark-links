"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${window.location.origin}/reset-password` },
    );

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(
        "비밀번호 재설정 링크를 보내지 못했습니다. 잠시 후 다시 시도해 주세요.",
      );
      return;
    }

    setIsSent(true);
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto p-8">
      <div className="w-full max-w-[360px]">
        <p className="mb-10 text-center text-[24px] font-semibold tracking-tight text-[var(--text)]">
          뷱 마크 Viewk Mark
        </p>
        {isSent ? (
          <p className="text-center text-sm text-[var(--text-sub)]">
            입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다. 받은편지함을
            확인해 주세요.
          </p>
        ) : (
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
            <button
              type="submit"
              disabled={!email.trim() || isSubmitting}
              className="btn-primary mt-2 w-full rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:opacity-30"
            >
              {isSubmitting ? "보내는 중..." : "재설정 링크 보내기"}
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          <Link
            href="/login"
            className="text-[var(--accent)] hover:underline"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </main>
  );
}
