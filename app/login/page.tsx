"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("error") === "kakao") {
      setErrorMessage("카카오 로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  }, [searchParams]);

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

  const handleKakaoLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto p-8">
      <div className="w-full max-w-[360px]">
        <p className="mb-10 text-center text-[24px] font-semibold tracking-tight text-[var(--text)]">
          뷱 마크 Viewk Mark
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
        <button
          type="button"
          onClick={handleKakaoLogin}
          disabled={isSubmitting}
          className="mt-3 flex w-full items-center justify-center overflow-hidden rounded-[10px] disabled:opacity-30"
        >
          <Image
            src="/kakao_login_medium_wide.png"
            alt="카카오 로그인"
            width={300}
            height={45}
            className="h-auto w-full"
          />
        </button>
        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          <Link
            href="/forgot-password"
            className="text-[var(--accent)] hover:underline"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-[var(--text-sub)]">
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

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
