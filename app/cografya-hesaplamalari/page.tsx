import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { geoGroupLabels, geoToolsTr, type GeoTool } from "../converter/geo/geoTools";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

const path = "/cografya-hesaplamalari";
const title = "Coğrafya Hesaplamaları: Harita Ölçeği, Koordinat, Yerel Saat";
const description =
  "Harita ölçeği, koordinat dönüştürme, yerel saat farkı, kuş uçuşu mesafe, il rakımları ve daha fazlası: coğrafya dersleri ve arazi çalışmaları için hesaplama araçları.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: path, en: "/en/geography-calculators" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Bu araçlar hangi derslerde işe yarar?",
    answer:
      "Harita bilgisi (ölçek, uzunluk ve alan hesapları), Dünya'nın şekli ve hareketleri (yerel saat, meridyen farkı), koordinat sistemi ve Türkiye'nin coğrafi konumu gibi 9. ve 10. sınıf coğrafya konularında ve TYT-AYT coğrafya sorularında kullanılabilir.",
  },
  {
    question: "Hesaplamalar resmî işlerde kullanılabilir mi?",
    answer:
      "Araçlar bilgi ve kontrol amaçlıdır. Tapu, kadastro ya da mühendislik projelerinde resmî ölçüm ve kurum verileri esas alınmalıdır.",
  },
];

const groups = Object.keys(geoGroupLabels) as GeoTool["group"][];

export default function GeographyHubPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: path, label: "Coğrafya Hesaplamaları" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Coğrafya Hesaplamaları"
      intro="Harita, koordinat, zaman ve Türkiye coğrafyası üzerine hesaplama araçları. Her araç formülü ve çözümlü örnekleriyle birlikte gelir."
      tool={
        <div className="geo-hub">
          {groups.map((g) => (
            <section className="science-hub-group" key={g}>
              <h2>{geoGroupLabels[g]}</h2>
              <ul className="science-hub-tools">
                {geoToolsTr
                  .filter((t) => t.group === g)
                  .map((t) => (
                    <li key={t.href}>
                      <Link href={t.href} prefetch={false}>
                        <strong>{t.title}</strong>
                        <span>{t.description}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      }
      tocTitle="İçindekiler"
      tocItems={[
        { id: "harita-bilgisi", label: "Harita bilgisinin temel hesapları" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="harita-bilgisi">Harita bilgisinin temel hesapları</h2>
      <ul>
        <li>
          <strong>Ölçek:</strong> Gerçek uzunluk = harita uzunluğu × ölçek paydası; alanlarda paydanın karesi kullanılır.{" "}
          <Link href="/harita-olcegi-hesaplama">Harita ölçeği hesaplama</Link>
        </li>
        <li>
          <strong>Yerel saat:</strong> Her meridyen 4 dakikalık fark yaratır; doğudaki yerin saati ileridedir.{" "}
          <Link href="/yerel-saat-hesaplama">Yerel saat farkı hesaplama</Link>
        </li>
        <li>
          <strong>Koordinat:</strong> 1° = 60 dakika = 3.600 saniye; ondalık derece = derece + dakika/60 + saniye/3600.{" "}
          <Link href="/koordinat-donusturucu">Koordinat dönüştürücü</Link>
        </li>
        <li>
          <strong>Mesafe:</strong> Ekvator&apos;da 1° boylam yaklaşık 111 km&apos;dir; kutuplara doğru kısalır. Enlemler arası 1° ise her yerde yaklaşık
          111 km&apos;dir. <Link href="/buyuk-daire-mesafesi-hesaplama">Kuş uçuşu mesafe hesaplama</Link>
        </li>
      </ul>
    </TimeToolPage>
  );
}
