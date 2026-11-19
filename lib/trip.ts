import { neon } from "@neondatabase/serverless";

// Storage for the trip app (public/trip.html). Two small tables, created on first use.
// SEED_DOCS is a snapshot of what was already entered in the first (Claude-hosted) version,
// loaded once into an empty database so nothing is lost.
const sql = neon(process.env.DATABASE_URL!);

let ready: Promise<void> | null = null;

const SEED_DOCS: [string, string, Record<string, unknown>][] = [
  ["expenses", "s1", { kind: "expense", title: "מלון Leonardo קרקוב (2 לילות)", amount: 1500, cur: "ILS", payer: "yarden", shares: { yarden: 700, dan: 400, ben: 400 }, date: "2026-10-21", ts: 1000, note: "חדר של ירדן 700, החדר המשותף 800" }],
  ["expenses", "s2", { kind: "expense", title: "מלון Focus Premium ורוצלאב (לילה)", amount: 930, cur: "ILS", payer: "yarden", shares: { yarden: 410, dan: 260, ben: 260 }, date: "2026-10-21", ts: 2000, note: "חדר של ירדן 410, החדר המשותף 520" }],
  ["expenses", "s3", { kind: "expense", title: "מלון Art Boutique קרקוב (2 לילות)", amount: 1445, cur: "ILS", payer: "yarden", shares: { yarden: 626, dan: 409.5, ben: 409.5 }, date: "2026-10-23", ts: 3000, note: "חדר של ירדן 626, החדר המשותף 819" }],
  ["expenses", "uu0uzl6wceqji1wyuivv", { kind: "expense", title: "בולט", amount: 70, cur: "PLN", payer: "yarden", split: ["yarden", "dan", "ben"], date: "2026-11-19", ts: 1795045624012 }],
  ...[
    ["דרכון בתוקף", true],
    ["כרטיסי הרכבת באפליקציה, שמורים גם בלי אינטרנט", false],
    ["להתקין Bolt ולחבר כרטיס אשראי", false],
    ["להתקין Jakdojade לתחבורה ציבורית", false],
    ["ביטוח נסיעות", false],
    ["נדידת נתונים או eSIM", false],
    ["בגדים חמים: שכבות תרמיות, מעיל, כפפות, כובע, מטרייה", false],
    ["נעליים סגורות ועמידות למים", false],
    ["מטענים ומתאם לשקע אירופאי", false],
    ["להזמין Bolt לשדה ל־23.11 בשעה ~02:45", false],
  ].map(([text, done], i): [string, string, Record<string, unknown>] => ["todo", `t${i + 1}`, { text, done, order: i + 1 }]),
];

export function init() {
  if (!ready) {
    ready = (async () => {
      await sql`create table if not exists trip_docs (col text not null, id text not null, data jsonb not null, primary key (col, id))`;
      await sql`create table if not exists trip_photos (id text primary key, mime text not null, b64 text not null)`;
      const rows = await sql`select 1 from trip_docs where col = 'meta' and id = 'seeded'`;
      if (!rows.length) {
        for (const [col, id, data] of SEED_DOCS)
          await sql`insert into trip_docs (col, id, data) values (${col}, ${id}, ${JSON.stringify(data)}::jsonb) on conflict do nothing`;
        await sql`insert into trip_docs (col, id, data) values ('meta', 'seeded', '{}'::jsonb) on conflict do nothing`;
      }
    })().catch((e) => {
      ready = null;
      throw e;
    });
  }
  return ready;
}

// If TRIP_CODE is set on Vercel, writes need the same code (the page asks for it once).
export function allowed(req: Request) {
  const code = process.env.TRIP_CODE;
  return !code || req.headers.get("x-trip-code") === code;
}

export { sql };
