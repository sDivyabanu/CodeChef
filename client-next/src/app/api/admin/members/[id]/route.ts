import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/lib/sanityWriteClient";
import { requireAdminSession } from "@/lib/requireAdminSession";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (session instanceof NextResponse) return session;

  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Missing member id." }, { status: 400 });
    }

    const body = await req.json();
    const patch: Record<string, any> = {};

    if (body.name !== undefined) {
      const name = typeof body.name === "string" ? body.name.trim() : "";
      if (!name) {
        return NextResponse.json({ error: "Name is required." }, { status: 400 });
      }
      patch.name = name;
    }

    if (body.codechefUsername !== undefined) {
      const codechefUsername =
        typeof body.codechefUsername === "string" ? body.codechefUsername.trim() : "";
      if (!codechefUsername) {
        return NextResponse.json({ error: "CodeChef username is required." }, { status: 400 });
      }
      patch.codechefUsername = codechefUsername;
    }

    if (body.rating !== undefined) {
      const rating = Number(body.rating);
      if (!Number.isFinite(rating)) {
        return NextResponse.json({ error: "Rating must be a valid number." }, { status: 400 });
      }
      patch.rating = rating;
    }

    if (body.active !== undefined) {
      patch.active = Boolean(body.active);
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    const member = await writeClient.patch(id).set(patch).commit();
    return NextResponse.json(member);
  } catch (error: any) {
    console.error("Error updating member:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
