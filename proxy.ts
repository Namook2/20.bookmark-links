import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  // Refreshing the auth token
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
