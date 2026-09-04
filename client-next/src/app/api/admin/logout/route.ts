import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminSession";
import { requireAdminSession } from "@/lib/requireAdminSession";

export async function POST() {
  const session = await requireAdminSession();
  if (session instanceof NextResponse) return session;

  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Error logging out admin:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
