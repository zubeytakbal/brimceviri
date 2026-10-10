import { homeSearchIndex } from "../../components/HomeDirectory";

// Ana sayfa arama dizini: /arama-dizini/tr.json, en.json, uz.json, de.json. Derlemede statik
// dosya olarak uretilir; ana sayfa yalnizca arama kutusuna dokunulunca indirir.
const LOCALES = ["tr", "en", "uz", "de"] as const;

export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((l) => ({ file: `${l}.json` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const locale = LOCALES.find((l) => `${l}.json` === file);
  if (!locale) return new Response("Not found", { status: 404 });
  return Response.json(homeSearchIndex(locale));
}
