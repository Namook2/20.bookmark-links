import type { Metadata } from "next";

import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "비밀번호 재설정",
  "새 비밀번호를 설정하세요.",
);

export default function ResetPasswordLayout({
  children,
}: LayoutProps<"/reset-password">) {
  return children;
}
