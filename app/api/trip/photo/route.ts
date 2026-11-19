import { NextResponse } from "next/server";

import { allowed, init, sql } from "@/lib/trip";

// Upload one already-compressed JPEG (the page shrinks photos to ~1600px first).
export async function POST(req: Request) {
  if (!allowed(req)) return NextResponse.json({ error: "code" }, { status: 401 });
  const buf = Buffer.from(await req.arrayBuffer());
  if (!buf.length || buf.length > 3_500_000)
    return NextResponse.json({ error: "size" }, { status: 413 });
  await init();
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  await sql`insert into trip_photos (id, mime, b64) values (${id}, 'image/jpeg', ${buf.toString("base64")})`;
  return NextResponse.json({ id, url: `/api/trip/photo/${id}` });
}
