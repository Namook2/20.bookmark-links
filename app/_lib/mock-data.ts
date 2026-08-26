import type { BookmarkLink, Folder } from "./types";

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "reading", name: "읽을거리" },
];

export const links: BookmarkLink[] = [
  {
    id: "1",
    title: "Next.js Docs",
    url: "https://nextjs.org/docs",
    folderId: "dev",
    description: "Next.js 공식 문서 및 API 레퍼런스",
  },
  {
    id: "2",
    title: "React Docs",
    url: "https://react.dev",
    folderId: "dev",
    description: "React 공식 문서",
  },
  {
    id: "3",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    folderId: "dev",
    description: "웹 표준 기술 문서",
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com",
    folderId: "dev",
    description: "코드 저장소 및 협업 플랫폼",
  },
  {
    id: "5",
    title: "Figma",
    url: "https://figma.com",
    folderId: "design",
    description: "협업 디자인 툴",
  },
  {
    id: "6",
    title: "Dribbble",
    url: "https://dribbble.com",
    folderId: "design",
    description: "디자인 영감 공유 플랫폼",
  },
  {
    id: "7",
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    folderId: "reading",
    description: "개발자를 위한 뉴스 커뮤니티",
  },
  {
    id: "8",
    title: "CSS-Tricks",
    url: "https://css-tricks.com",
    folderId: "reading",
    description: "CSS 및 프론트엔드 아티클",
  },
];
