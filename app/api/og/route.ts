import { NextRequest, NextResponse } from "next/server";

import type { OgInfo } from "@/app/_lib/types";

function extractMetaContent(html: string, key: string): string | null {
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["']`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1]?.trim() || null;
}

function resolveUrl(raw: string | null, baseUrl: string): string | null {
  if (!raw) return null;
  try {
    return new URL(raw, baseUrl).toString();
  } catch {
    return null;
  }
}

async function fetchOgInfo(targetUrl: string): Promise<OgInfo> {
  const fallback: OgInfo = {
    url: targetUrl,
    title: new URL(targetUrl).hostname.replace("www.", ""),
    description: null,
    thumbnail: null,
  };

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; BookmarkLinksBot/1.0; +https://example.com/bot)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return fallback;

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return fallback;

    const html = await response.text();

    const title =
      extractMetaContent(html, "og:title") ??
      extractTitleTag(html) ??
      fallback.title;
    const description =
      extractMetaContent(html, "og:description") ??
      extractMetaContent(html, "description");
    const thumbnail = resolveUrl(
      extractMetaContent(html, "og:image"),
      targetUrl,
    );

    return { url: targetUrl, title, description, thumbnail };
  } catch {
    return fallback;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "url 쿼리 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  let normalizedUrl: string;
  try {
    normalizedUrl = new URL(url).toString();
  } catch {
    return NextResponse.json(
      { error: "유효하지 않은 URL입니다." },
      { status: 400 },
    );
  }

  const ogInfo = await fetchOgInfo(normalizedUrl);
  return NextResponse.json(ogInfo);
}
