import { homeSearchIndex } from "../../components/HomeDirectory";
import { homeSearchIndex as arIndex } from "../../components/ArabicHomeDirectory";
import { homeSearchIndex as bnIndex } from "../../components/BengaliHomeDirectory";
import { homeSearchIndex as esIndex } from "../../components/SpanishHomeDirectory";
import { homeSearchIndex as frIndex } from "../../components/FrenchHomeDirectory";
import { homeSearchIndex as itIndex } from "../../components/ItalianHomeDirectory";
import { homeSearchIndex as ptIndex } from "../../components/PortugueseHomeDirectory";

// Ana sayfa arama dizinleri: /arama-dizini/<dil>.json. Derlemede statik dosya olarak uretilir;
// ana sayfalar dizini yalnizca arama kutusuna dokunulunca indirir (bkz. HomeSearch).
const INDEXES = {
  tr: () => homeSearchIndex("tr"),
  en: () => homeSearchIndex("en"),
  de: () => homeSearchIndex("de"),
  ar: arIndex,
  bn: bnIndex,
  es: esIndex,
  fr: frIndex,
  it: itIndex,
  pt: ptIndex,
} as const;

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(INDEXES).map((l) => ({ file: `${l}.json` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const locale = (Object.keys(INDEXES) as Array<keyof typeof INDEXES>).find((l) => `${l}.json` === file);
  if (!locale) return new Response("Not found", { status: 404 });
  return Response.json(INDEXES[locale]());
}
