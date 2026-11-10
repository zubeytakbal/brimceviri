// Arac sayfalarinin ortak duzeni (Omni olculeri): solda son guncelleme, baslik, hazirlayan, icindekiler ve yazi;
// sagda hesap kutusu ve ayni gruptan benzer araclar. Telefonda hesap kutusu basligin hemen altina gelir.
// Eski hesaplayicilar (category-general-converter siniflari) .yy-arac-hesap icinde yeni gorunumle cizilir.
import type { ReactNode } from "react";
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import { ArrowRight } from "lucide-react";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";
import { GENIS_ARACLAR, YENI_ARACLAR } from "../../converter/siteYapisi";
import { ALT_GRUPLAR, HESAPLAYICI_GRUPLARI } from "./anaSayfaVerisi";
import { EDITOR } from "./editor";
import { grupYolu } from "./GrupSayfasi";

export type AracBolumu = { id: string; baslik: string; icerik: ReactNode };

type Props = {
  /** Sayfanin adresi, ornek "/kdv-hesaplama". Grup ve benzer araclar buradan bulunur. */
  yol: string;
  baslik: string;
  /** ISO tarih (YYYY-AA-GG): icerigin son degistigi gun. Verilmezse YENI_ARACLAR'daki tarih; o da yoksa satir cikmaz. */
  guncelleme?: string;
  hesap: ReactNode;
  /** Hesap kutusunun hemen altinda (ornek: uygulama olarak yukle dugmesi). */
  hesapAlti?: ReactNode;
  giris?: ReactNode;
  bolumler?: AracBolumu[];
  /** Kendi h2 basliklarini (id'li) tasiyan hazir yazi; icindekiler serbestIcindekiler'den gelir (TimeToolPage). */
  serbestIcerik?: ReactNode;
  serbestIcindekiler?: { id: string; baslik: string }[];
  sss?: FaqItem[];
  kaynaklar?: { ad: string; href?: string }[];
  /** Sayfanin kendi sectigi ilgili araclar (benzer araclar kutusunda olmayanlar yazinin sonunda listelenir). */
  ilgili?: { href: string; ad: string }[];
};

const tarihYaz = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const json = (veri: object) => JSON.stringify(veri).replace(/</g, "\\u003c");

/** Aracin grubu ve benzer araclar: once ayni alt baslik, yetmezse grubun geri kalani (en fazla 6). */
function grupVeBenzerler(yol: string) {
  const grup = HESAPLAYICI_GRUPLARI.find((g) => g.linkler.some((l) => l.href === yol));
  if (!grup) return { grup: undefined, benzerler: [] };
  const alt = ALT_GRUPLAR[grup.slug]?.find((a) => a.hrefler.includes(yol));
  const sira = alt ? [...alt.hrefler, ...grup.linkler.map((l) => l.href)] : grup.linkler.map((l) => l.href);
  const hrefler = [...new Set(sira)].filter((h) => h !== yol).slice(0, 6);
  return { grup, benzerler: hrefler.map((h) => grup.linkler.find((l) => l.href === h)!) };
}

export default function AracSayfasi({
  yol,
  baslik,
  guncelleme = YENI_ARACLAR[yol],
  hesap,
  hesapAlti,
  giris,
  bolumler = [],
  serbestIcerik,
  serbestIcindekiler = [],
  sss,
  kaynaklar,
  ilgili,
}: Props) {
  const { grup, benzerler } = grupVeBenzerler(yol);
  const genis = GENIS_ARACLAR.has(yol);
  const hesapBlogu = (
    <>
      <section className="yy-arac-hesap" aria-label={`${baslik} aracı`}>
        {hesap}
      </section>
      {hesapAlti}
    </>
  );
  const benzerHref = new Set(benzerler.map((b) => b.href));
  const ilgiliKalan = (ilgili ?? []).filter((l, i, t) => l.href !== yol && !benzerHref.has(l.href) && t.findIndex((x) => x.href === l.href) === i);
  const tumBolumler: AracBolumu[] = [...bolumler];
  if (ilgiliKalan.length) {
    tumBolumler.push({
      id: "ilgili-araclar",
      baslik: "İlgili araçlar",
      icerik: (
        <ul>
          {ilgiliKalan.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.ad}</Link>
            </li>
          ))}
        </ul>
      ),
    });
  }
  if (sss?.length) {
    tumBolumler.push({
      id: "sss",
      baslik: "Sık sorulan sorular",
      icerik: sss.map((s) => (
        <div key={s.question} className="yy-arac-soru">
          <h3>{s.question}</h3>
          <p>{s.answer}</p>
        </div>
      )),
    });
  }
  if (kaynaklar?.length) {
    tumBolumler.push({
      id: "kaynaklar",
      baslik: "Kaynaklar",
      icerik: (
        <ul>
          {kaynaklar.map((k) => (
            <li key={k.ad}>{k.href ? <a href={k.href} rel="noopener" target="_blank">{k.ad}</a> : k.ad}</li>
          ))}
        </ul>
      ),
    });
  }
  const yolSemasi = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: buildSiteUrl("/") },
      ...(grup ? [{ "@type": "ListItem", position: 2, name: grup.ad, item: buildSiteUrl(grupYolu("hesap", grup.slug)) }] : []),
      { "@type": "ListItem", position: grup ? 3 : 2, name: baslik, item: buildSiteUrl(yol) },
    ],
  };

  return (
    <div className="yy yy-sayfa yy-arac-zemin">
      <main className={genis ? "yy-arac yy-arac-genis" : "yy-arac"}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(yolSemasi) }} />
        {sss?.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(buildFaqSchema(sss)) }} /> : null}

        <header className="yy-arac-bas">
          <ol className="yy-arac-yol" aria-label="Sayfa yolu">
            <li>
              <Link href="/">Ana sayfa</Link>
            </li>
            {grup && (
              <li>
                <Link href={grupYolu("hesap", grup.slug)}>{grup.ad}</Link>
              </li>
            )}
          </ol>
          {guncelleme && (
            <p className="yy-arac-tarih">
              Son güncelleme: <time dateTime={guncelleme}>{tarihYaz(guncelleme)}</time>
            </p>
          )}
          <h1>{baslik}</h1>
          <div className="yy-arac-kunye">
            <span>Hazırlayan</span>
            <Link href="/yazar">{EDITOR.ad}</Link>
            <span className="yy-arac-kunye-ayrac" aria-hidden="true">·</span>
            <Link href="/editoryal-politika">Nasıl hazırlıyoruz?</Link>
          </div>
        </header>

        {genis && <div className="yy-arac-genis-hesap">{hesapBlogu}</div>}

        <div className="yy-arac-sag">
          {!genis && hesapBlogu}
          {grup && benzerler.length > 0 && (
            <nav className="yy-arac-benzer" aria-labelledby="benzer-araclar">
              <p id="benzer-araclar">
                <Link href={grupYolu("hesap", grup.slug)}>{grup.ad}</Link> kategorisinden benzer araçlar
              </p>
              <ul>
                {benzerler.map((b) => (
                  <li key={b.href}>
                    <Link href={b.href}>
                      {b.ad}
                      <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <article className="yy-arac-metin">
          {serbestIcindekiler.length + tumBolumler.length > 2 && (
            <nav className="yy-arac-icindekiler" aria-labelledby="icindekiler">
              <h2 id="icindekiler">İçindekiler</h2>
              <ul>
                {[...serbestIcindekiler, ...tumBolumler].map((b) => (
                  <li key={b.id}>
                    <a href={`#${b.id}`}>{b.baslik}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {giris && <div className="yy-arac-giris">{giris}</div>}
          {serbestIcerik && <div className="yy-arac-serbest">{serbestIcerik}</div>}
          {tumBolumler.map((b) => (
            <section key={b.id} id={b.id} aria-labelledby={`${b.id}-baslik`}>
              <h2 id={`${b.id}-baslik`}>{b.baslik}</h2>
              {b.icerik}
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}
