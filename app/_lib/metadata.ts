import type { Metadata } from "next";

export const siteName = "뷱 마크 Viewk Mark";
export const siteDescription = "북마크 링크를 폴더별로 정리하고 관리하는 서비스";

const ogImages: NonNullable<NonNullable<Metadata["openGraph"]>["images"]> = [
  {
    url: "/thumbnail.png",
    width: 2400,
    height: 1260,
    alt: siteName,
  },
];

export function pageMetadata(
  title: string,
  description: string = siteDescription,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName,
      images: ogImages,
      locale: "ko_KR",
      type: "website",
    },
  };
}
