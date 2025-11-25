import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { mutations } = body;

    if (!mutations || !Array.isArray(mutations)) {
      return NextResponse.json(
        { error: "Missing mutations array" },
        { status: 400 }
      );
    }

    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      apiVersion: "2025-02-19",
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    });

    const result = await client.mutate(mutations);

    return NextResponse.json({ ok: true, result }, { status: 200 });
  } catch (err) {
    console.error("Sanity write error:", err);
    return NextResponse.json(
      { error: "Sanity write failed", details: err.message },
      { status: 500 }
    );
  }
}
