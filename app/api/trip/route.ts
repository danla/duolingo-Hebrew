import { NextResponse } from "next/server";

import { allowed, init, sql } from "@/lib/trip";

export const dynamic = "force-dynamic";

const COLS = ["settings", "expenses", "photos", "todo", "notes"];

export async function GET() {
  await init();
  const rows = await sql`select col, id, data from trip_docs where col <> 'meta'`;
  const out: Record<string, unknown[]> = {};
  for (const c of COLS) out[c] = [];
  for (const r of rows) (out[r.col as string] ??= []).push({ ...(r.data as object), id: r.id });
  return NextResponse.json(out, { headers: { "Cache-Control": "no-store" } });
}

// body: { col, id, data, merge? }
export async function PUT(req: Request) {
  if (!allowed(req)) return NextResponse.json({ error: "code" }, { status: 401 });
  const { col, id, data, merge } = await req.json();
  if (!COLS.includes(col) || typeof id !== "string" || !id || typeof data !== "object")
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  await init();
  const json = JSON.stringify(data);
  if (merge)
    await sql`insert into trip_docs (col, id, data) values (${col}, ${id}, ${json}::jsonb)
      on conflict (col, id) do update set data = trip_docs.data || excluded.data`;
  else
    await sql`insert into trip_docs (col, id, data) values (${col}, ${id}, ${json}::jsonb)
      on conflict (col, id) do update set data = excluded.data`;
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!allowed(req)) return NextResponse.json({ error: "code" }, { status: 401 });
  const u = new URL(req.url);
  const col = u.searchParams.get("col") ?? "";
  const id = u.searchParams.get("id") ?? "";
  if (!COLS.includes(col) || !id) return NextResponse.json({ error: "bad request" }, { status: 400 });
  await init();
  await sql`delete from trip_docs where col = ${col} and id = ${id}`;
  if (col === "photos") await sql`delete from trip_photos where id = ${id}`;
  return NextResponse.json({ ok: true });
}
