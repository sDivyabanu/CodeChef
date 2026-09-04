import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/lib/sanityWriteClient";
import { requireAdminSession } from "@/lib/requireAdminSession";

export async function POST(req: NextRequest) {
  const session = await requireAdminSession();
  if (session instanceof NextResponse) return session;

  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const codechefUsername =
      typeof body.codechefUsername === "string" ? body.codechefUsername.trim() : "";
    const rating = Number(body.rating);

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!codechefUsername) {
      return NextResponse.json({ error: "CodeChef username is required." }, { status: 400 });
    }
    if (!Number.isFinite(rating)) {
      return NextResponse.json({ error: "Rating must be a valid number." }, { status: 400 });
    }

    const member = await writeClient.create({
      _type: "users",
      name,
      codechefUsername,
      rating,
      active: true,
    });

    return NextResponse.json(member);
  } catch (error: any) {
    console.error("Error creating member:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
