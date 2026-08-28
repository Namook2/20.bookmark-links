import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/proxy";

const protectedPaths = ["/", "/new"];

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  // Refreshing the auth token
  const { data } = await supabase.auth.getClaims();

  const { pathname } = request.nextUrl;
  const isProtected =
    protectedPaths.includes(pathname) || pathname.startsWith("/folder/");

  if (isProtected && !data?.claims) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
