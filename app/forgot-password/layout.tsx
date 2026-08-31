import type { Metadata } from "next";

import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "비밀번호 찾기",
  "가입한 이메일로 비밀번호 재설정 링크를 받으세요.",
);

export default function ForgotPasswordLayout({
  children,
}: LayoutProps<"/forgot-password">) {
  return children;
}
