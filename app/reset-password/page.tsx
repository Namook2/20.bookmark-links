"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [status, setStatus] = useState<"checking" | "ready" | "invalid">(
    "checking",
  );
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "ready" : "invalid");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setStatus("ready");
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const isFormFilled = password !== "" && passwordConfirm !== "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(
        "비밀번호를 변경하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      );
      return;
    }

    router.push("/");
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto p-8">
      <div className="w-full max-w-[360px]">
        <p className="mb-10 text-center text-[24px] font-semibold tracking-tight text-[var(--text)]">
          뷱 마크 Viewk Mark
        </p>
        {status === "checking" && (
          <p className="text-center text-sm text-[var(--text-sub)]">
            확인 중...
          </p>
        )}
        {status === "invalid" && (
          <p className="text-center text-sm text-[var(--text-sub)]">
            유효하지 않거나 만료된 링크입니다. 비밀번호 찾기를 다시 시도해
            주세요.
          </p>
        )}
        {status === "ready" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[var(--text)]"
              >
                새 비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                className="input-field rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="passwordConfirm"
                className="text-sm font-medium text-[var(--text)]"
              >
                새 비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요"
                className="input-field rounded-[10px] px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)]"
              />
            </div>
            <button
              type="submit"
              disabled={!isFormFilled || isSubmitting}
              className="btn-primary mt-2 w-full rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:opacity-30"
            >
              {isSubmitting ? "변경 중..." : "비밀번호 변경"}
            </button>
          </form>
        )}
      </div>
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </main>
  );
}
