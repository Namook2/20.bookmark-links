import type { Metadata } from "next";

import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "회원가입",
  "이메일로 새 계정을 만들고 북마크 링크를 관리하세요.",
);

export default function SignupLayout({ children }: LayoutProps<"/signup">) {
  return children;
}
