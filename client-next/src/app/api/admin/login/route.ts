import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, adminSessionCookieOptions, createSessionCookieValue } from "@/lib/adminSession";

function getAdminAccounts(): Array<{ email: string; password: string }> {
  return [
    { email: process.env.ADMIN_1_EMAIL || "", password: process.env.ADMIN_1_PASSWORD || "" },
    { email: process.env.ADMIN_2_EMAIL || "", password: process.env.ADMIN_2_PASSWORD || "" },
  ].filter((account) => account.email && account.password);
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const accounts = getAdminAccounts();
    const match = accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (!match) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const sessionValue = await createSessionCookieValue(match.email);
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, sessionValue, adminSessionCookieOptions);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Error logging in admin:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
