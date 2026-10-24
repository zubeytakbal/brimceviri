import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import HesapHubHero from "../components/hesap/HesapHubHero";
import { HESAP_GRUPLARI } from "../components/hesap/hesapBolumu";
import { DecorativeIcon, type SiteIconName } from "../components/siteIcons";
import TimeToolPage from "../components/time/TimeToolPage";
import { countTools } from "../components/ToolHubPage";
import type { FaqItem } from "../converter/faqSchema";
import { GERMAN_TOOL_HUB_PATH } from "../i18n/germanToolDirectory";
import { TURKISH_TOOL_HUB_PATH, turkishToolGroups } from "../i18n/turkishToolDirectory";
import { buildSiteUrl } from "../siteConfig";

const toolCount = countTools(turkishToolGroups);

const description = `Kredi, KDV, maaş, yaş, BMI, tarih, saat, inşaat, enerji ve dosya araçları dahil ${toolCount} ücretsiz hesaplama aracı, konularına göre gruplanmış tek listede.`;

export const metadata: Metadata = {
  title: "Tüm Hesaplama Araçları: Kredi, Maaş, Yaş, Tarih ve Daha Fazlası",
  description,
  alternates: {
    canonical: TURKISH_TOOL_HUB_PATH,
    languages: {
      tr: TURKISH_TOOL_HUB_PATH,
      de: GERMAN_TOOL_HUB_PATH,
      "x-default": TURKISH_TOOL_HUB_PATH,
    },
  },
  openGraph: {
    title: "Tüm Hesaplama Araçları",
    description,
    url: buildSiteUrl(TURKISH_TOOL_HUB_PATH),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const IKON: Record<string, SiteIconName> = {
  "para-ve-is": "salaryCalculator",
  "saglik-ve-spor": "bmiCalculator",
  klinik: "doctorHub",
  "ev-ve-yapi": "builderHub",
  "enerji-ve-arac": "electricityConsumptionCalculator",
  tarim: "ciftciHub",
  "olcu-ve-gunluk": "kitchenMeasures",
  "dosya-ve-gorsel": "pixelCalculator",
};

/** Hesap bölümünün dışında kalan gruplar ve kendi bölüm sayfaları. */
const DIGER: Array<{ id: string; ikon: SiteIconName; bolum?: { href: string; label: string } }> = [
  { id: "tarih", ikon: "dateCalculator", bolum: { href: "/saat-ve-tarih", label: "Saat ve Tarih bölümü" } },
  { id: "saat", ikon: "time", bolum: { href: "/saat-ve-tarih", label: "Saat ve Tarih bölümü" } },
  { id: "dini", ikon: "hijriCalendarCalculator" },
  { id: "teknik", ikon: "electricianHub", bolum: { href: "/muhendislik-hesaplayicilari", label: "Mühendislik bölümü" } },
  { id: "harita-ve-havacilik", ikon: "greatCircleCalculator" },
];

const aciklama = (id: string) => turkishToolGroups.find((g) => g.id === id)?.description ?? "";

const faq: FaqItem[] = [
  {
    question: "Hesaplamalar nerede yapılıyor, girdiğim bilgiler kaydediliyor mu?",
    answer:
      "Hesaplamalar tarayıcınızda yapılır. Girdiğiniz tutar, ölçü ya da tarih bir sunucuya gönderilmez; dosya araçlarında da fotoğraflar bilgisayarınızdan çıkmaz.",
  },
  {
    question: "Sonuçlar resmî bir hesap yerine geçer mi?",
    answer:
      "Hayır. Araçlar bilgi ve ön hesap içindir. Maaş, tazminat ve vergi gibi konularda bordro ya da mali müşavir, malzeme miktarında usta ve üretici, klinik skorlarda hekim değerlendirmesi esas alınır.",
  },
  {
    question: "Aradığım hesabı nasıl bulurum?",
    answer:
      "Sayfanın üstündeki arama kutusuna ne hesaplamak istediğinizi yazın (örneğin \"boya\", \"klima\" ya da \"kıdem\"); grup kısayolları da sizi doğrudan ilgili listeye götürür.",
  },
];

export default function HesaplayicilarPage() {
  const araclar = HESAP_GRUPLARI.flatMap((g) => g.linkler.map((l) => ({ href: l.href, ad: l.label, grup: g.baslik })));
  const digerGruplar = DIGER.map((d) => ({ ...d, grup: turkishToolGroups.find((g) => g.id === d.id) })).filter((d) => d.grup !== undefined);
  const tumAraclar = [
    ...araclar,
    ...digerGruplar.flatMap((d) => d.grup!.links.map((l) => ({ href: l.href, ad: l.label, grup: d.grup!.title }))),
  ].filter((a, i, hepsi) => hepsi.findIndex((b) => b.href === a.href) === i);

  return (
    <TimeToolPage
      crumbs={[{ href: "/", label: "Ana Sayfa" }, { label: "Tüm Hesaplamalar" }]}
      crumbLabel="Sayfa yolu"
      title="Tüm Hesaplama Araçları"
      intro={`Kredi taksitinden boya miktarına, klima kapasitesinden gebelik haftasına kadar günlük hayatın hesapları tek yerde. Sitedeki ${toolCount} aracın hepsi ücretsizdir, kayıt istemez ve hesaplamalar tarayıcınızda yapılır.`}
      tool={<HesapHubHero araclar={tumAraclar} gruplar={HESAP_GRUPLARI.map((g) => ({ id: g.id, baslik: g.baslik, sayi: g.linkler.length }))} />}
      tocTitle="İçindekiler"
      tocItems={[
        ...HESAP_GRUPLARI.map((g) => ({ id: g.id, label: g.baslik })),
        { id: "diger", label: "Diğer araçlar" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faq}
    >
      {HESAP_GRUPLARI.map((g) => (
        <section key={g.id} className="hesap-hub-grup">
          <h2 id={g.id}>
            <span className="home-category-icon-box" aria-hidden="true">
              <DecorativeIcon className="home-category-icon-svg" name={IKON[g.id]} size={26} />
            </span>
            {g.baslik}
            <small>{g.linkler.length} araç</small>
          </h2>
          <p>{aciklama(g.id)}</p>
          <ul className="timehub-group hesap-hub-kartlar">
            {g.linkler.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <strong>{l.label}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2 id="diger">Diğer araçlar</h2>
      <p>
        Tarih, saat, dini hesaplar, teknik hesaplar ve harita araçları kendi bölümlerinde de toplu olarak yer alır. Birim çevirmek için{" "}
        <Link href="/tum-birimler">tüm birim dönüşümlerine</Link>, mesleğinize özel araçlar için <Link href="/meslekler">mesleğe göre araçlara</Link>{" "}
        bakabilirsiniz.
      </p>
      <div className="hesap-hub-diger">
        {digerGruplar.map((d) => (
          <section key={d.id} aria-labelledby={`diger-${d.id}`}>
            <h3 id={`diger-${d.id}`}>
              <span className="home-category-icon-box" aria-hidden="true">
                <DecorativeIcon className="home-category-icon-svg" name={d.ikon} size={22} />
              </span>
              {d.grup!.title}
            </h3>
            <ul>
              {d.grup!.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            {d.bolum ? (
              <p>
                <Link href={d.bolum.href}>{d.bolum.label} →</Link>
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </TimeToolPage>
  );
}
