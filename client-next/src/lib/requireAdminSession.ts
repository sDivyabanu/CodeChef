import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionCookieValue } from "@/lib/adminSession";

export async function requireAdminSession(): Promise<{ email: string } | NextResponse> {
  const cookieStore = await cookies();
  const session = await verifySessionCookieValue(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return session;
}
