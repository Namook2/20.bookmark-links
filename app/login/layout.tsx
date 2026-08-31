import type { Metadata } from "next";

import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "로그인",
  "이메일과 비밀번호 또는 카카오 계정으로 로그인하세요.",
);

export default function LoginLayout({ children }: LayoutProps<"/login">) {
  return children;
}
