import type { Metadata } from "next";
import Link from "next/link";
import CategoryUnitConverter from "../components/CategoryUnitConverter";
import StaticPageLayout from "../components/StaticPageLayout";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Tarihi Ölçü Birimleri: Bizans, Osmanlı ve Eski Türk Ölçüleri",
  description:
    "Bizans, Osmanlı ve eski Türk dönemlerinden kalma ölçü birimlerini (arşın, okka, dirhem, endaze, Bizans ayağı, Bizans litrası, çığ) metreye ve grama ücretsiz çevirin.",
  alternates: {
    canonical: "/tarihi-olcu-birimleri",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Tarihi Ölçü Birimleri: Bizans, Osmanlı ve Eski Türk Ölçüleri",
    description:
      "Bizans, Osmanlı ve eski Türk dönemlerinden kalma ölçü birimlerini metreye ve grama ücretsiz çevirin; tarihçelerini ve kaynaklarını inceleyin.",
    url: buildSiteUrl("/tarihi-olcu-birimleri"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Metre (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Bizans Ayağı (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Bizans Kulacı (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Gram (g)", symbol: "g" },
  { value: "okka", label: "Okka", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Bizans Litrası (Litra)", symbol: "litra" },
  { value: "ounkia", label: "Bizans Onsu (Ounkia)", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Bizans Ayağı (pous)",
    value: "≈ 0,3148 m",
    note: "Antik Yunan pous biriminden gelir, 1453'e kadar kullanıldı.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Bizans Kulacı (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Kollar iki yana açıldığında parmak uçları arasındaki mesafe.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Bizans Litrası (litra)",
    value: "≈ 324 g",
    note: "Roma librası geleneğinden gelen temel kütle birimi.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Bizans Onsu (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Modern İngiliz/Amerikan onsundan (28,35 g) farklıdır.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m (çarşı arşını)",
    note: "Ticarette 68 cm, inşaatta (mimar arşını) 75,77 cm kullanılırdı.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Özellikle kumaş ve manifatura ölçümünde kullanılırdı.",
  },
  {
    href: "/birimler/okka",
    name: "Okka (Kıyye)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "Çarşı ve pazarlarda en yaygın kullanılan ağırlık ölçüsüydü.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Kıymetli maden, baharat ve ilaç gibi küçük miktarlar için.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note:
      "Kaşgarlı Mahmud'un Dîvânu Lugâti't-Türk'ünde geçen eski Türk uzunluk ölçüsü.",
  },
];

function UnitList({
  units,
}: {
  units: Array<{
    href: string;
    name: string;
    value: string;
    note: string;
  }>;
}) {
  return (
    <ul className="calculator-example-list">
      {units.map((unit) => (
        <li key={unit.href}>
          <article>
            <h3>
              <Link href={unit.href}>{unit.name}</Link>
            </h3>
            <p>
              <strong>{unit.value}</strong> — {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function TarihiOlcuBirimleriPage() {
  return (
    <StaticPageLayout
      locale="tr"
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        { href: "/", label: "Ana Sayfa" },
        { label: "Tarihi Ölçü Birimleri" },
      ]}
      title="Tarihi Ölçü Birimleri"
      description="Bizans, Osmanlı ve eski Türk dönemlerinden kalma ölçü birimlerini modern metre ve gram karşılıklarıyla birlikte inceleyin, aralarında ücretsiz dönüşüm yapın."
      sections={[
        {
          heading: "Bizans'tan Cumhuriyet'e: Türkiye'nin ölçü tarihi",
          content: (
            <>
              <p>
                Bugün Türkiye topraklarında kullanılan ölçüler tek bir
                kaynaktan gelmez; Bizans İmparatorluğu&apos;nun kulaç ve
                litrasından, Osmanlı&apos;nın arşın ve okkasına, eski Türk
                boylarının çığından, 1931&apos;de yürürlüğe giren Ölçüler ve
                Ayarlar Kanunu ile kabul edilen metrik sisteme uzanan
                kesintisiz bir tarihsel süreklilik vardır.
              </p>
              <p>
                Bu sayfa, bu üç farklı dönemden kalma ölçü birimlerini bir
                araya getirir. Her birimin modern SI karşılığını, kısa
                tarihçesini ve ilgili birimlere dönüşüm araçlarını
                aşağıdaki bölümlerden bulabilirsiniz.
              </p>
            </>
          ),
        },
        {
          heading: "Tarihi Uzunluk Birimi Çevirici",
          content: (
            <>
              <p>
                Arşın, endaze, Bizans ayağı, Bizans kulacı ve çığ
                arasında, modern metre karşılığıyla birlikte anında
                dönüşüm yap. (Metre/kilometre gibi tüm modern uzunluk
                birimleri için{" "}
                <Link href="/kategoriler/uzunluk">
                  uzunluk dönüşümleri sayfasını
                </Link>{" "}
                kullanabilirsin.)
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="tr"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Tarihi Kütle Birimi Çevirici",
          content: (
            <>
              <p>
                Okka, dirhem, Bizans litrası ve Bizans onsu arasında,
                modern gram karşılığıyla birlikte anında dönüşüm yap.
                (Kilogram/ton gibi tüm modern kütle birimleri için{" "}
                <Link href="/kategoriler/kutle">
                  kütle dönüşümleri sayfasını
                </Link>{" "}
                kullanabilirsin.)
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="tr"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Bizans Dönemi Ölçü Birimleri",
          content: (
            <>
              <p>
                Bizans İmparatorluğu, Antik Yunan ölçü geleneğini miras
                almış ve kendi uzunluk (pous, orgyia) ile kütle (litra,
                ounkia) birimlerini 1453&apos;teki İstanbul&apos;un
                fethine kadar kullanmıştır.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Osmanlı Dönemi Ölçü Birimleri",
          content: (
            <>
              <p>
                Osmanlı İmparatorluğu&apos;nda ticaret, inşaat ve gündelik
                hayatta arşın, endaze, okka ve dirhem gibi birimler
                kullanılmış; bu birimler 1869&apos;daki ilk metrik ıslahat
                çalışmalarından sonra, 1931&apos;de kabul edilen Ölçüler ve
                Ayarlar Kanunu ile tamamen yürürlükten kaldırılmıştır.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Eski Türk (Köktürk) Dönemi Ölçü Birimleri",
          content: (
            <>
              <p>
                Osmanlı öncesi Türk ölçülerine dair en önemli kaynak,
                Kaşgarlı Mahmud&apos;un 11. yüzyılda yazdığı Dîvânu
                Lugâti&apos;t-Türk adlı eseridir. Köktürkler döneminde
                Çin ile ticari ilişkiler, ölçü biriminde de dil
                alışverişine yol açmıştır.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Bu birimler neden hâlâ aranıyor?",
          content: (
            <p>
              Bu ölçüler artık resmi olarak kullanılmasa da tarih ve
              arkeoloji araştırmalarında, eski tapu kayıtları ile vakfiye
              ve şer&apos;iyye sicili gibi metinlerin yorumlanmasında, okul
              ödevlerinde ve genel kültür meraklıları arasında sıkça
              aranmaya devam ediyor. Bu sayfadaki araçlar, bu değerleri
              modern birimlere hızlıca çevirmenizi sağlar.
            </p>
          ),
        },
        {
          heading: "İlgili kategoriler",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/kategoriler/uzunluk">
                  Tüm uzunluk birimleri
                </Link>
              </li>
              <li>
                <Link href="/kategoriler/kutle">Tüm kütle birimleri</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
