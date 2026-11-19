import { init, sql } from "@/lib/trip";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await init();
  const rows = await sql`select mime, b64 from trip_photos where id = ${id}`;
  if (!rows.length) return new Response("not found", { status: 404 });
  return new Response(Buffer.from(rows[0].b64 as string, "base64"), {
    headers: { "Content-Type": rows[0].mime as string, "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
