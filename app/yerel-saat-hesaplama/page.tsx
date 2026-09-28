import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LocalTimeCalculator from "../components/geo/LocalTimeCalculator";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { geoRelated } from "../converter/geo/geoTools";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

const path = "/yerel-saat-hesaplama";
const title = "Yerel Saat Farkı Hesaplama: Boylam ve Meridyen Farkıyla";
const description =
  "İki boylam ya da iki şehir arasındaki yerel saat farkını adım adım hesaplayın. Her meridyen 4 dakika; doğudaki yerin saati ileride. Resmî saat ile karşılaştırma ve güneş saatiniz.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: path, en: "/en/solar-time-calculator" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "İki meridyen arasındaki yerel saat farkı kaç dakikadır?",
    answer: "4 dakikadır. Dünya 24 saatte (1.440 dakikada) 360° döndüğü için her 1° boylam 1.440 ÷ 360 = 4 dakikalık yerel saat farkı yaratır.",
  },
  {
    question: "Yerel saat farkı nasıl hesaplanır?",
    answer:
      "Önce iki yer arasındaki meridyen farkı bulunur: iki yer aynı yarım küredeyse (ikisi de doğu ya da ikisi de batı) boylamlar çıkarılır, farklı yarım kürelerdeyse toplanır. Bulunan fark 4 dakikayla çarpılır. Doğudaki yerin saati ileride olduğu için doğudaki yerin saati bulunurken fark eklenir, batıdakinde çıkarılır.",
  },
  {
    question: "Türkiye'nin doğusu ile batısı arasında kaç dakika yerel saat farkı vardır?",
    answer:
      "Türkiye yaklaşık 26° ile 45° doğu meridyenleri arasında yer alır. Yaklaşık 19 meridyenlik fark 19 × 4 = 76 dakikalık yerel saat farkına karşılık gelir; Güneş Iğdır'da Gökçeada'dan yaklaşık 76 dakika önce doğar ve batar.",
  },
  {
    question: "Yerel saat ile ortak (resmî) saat aynı şey mi?",
    answer:
      "Hayır. Yerel saat, Güneş'in o meridyene göre konumuna bağlıdır ve her meridyende değişir. Ortak saat ise bir ülkenin ya da saat diliminin tamamında kullanılan resmî saattir. Türkiye 2016'dan bu yana tüm yıl UTC+3 kullanır; bu saat 45° doğu meridyeninin yerel saatine karşılık gelir.",
  },
  {
    question: "Hangi yerin yerel saati ileridedir?",
    answer: "Dünya batıdan doğuya döndüğü için Güneş doğudaki yerlerde daha önce doğar; bu yüzden doğudaki yerin yerel saati her zaman ileridedir.",
  },
];

export default function LocalTimePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        { href: path, label: "Yerel Saat Farkı Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Yerel Saat Farkı Hesaplama"
      intro="İki boylamın ya da iki şehrin yerel saat farkını adım adım bulun, saat farkından boylam farkını hesaplayın. Bulunduğunuz yerde Güneş'e göre saatin kaç olduğunu da görebilirsiniz."
      tool={<LocalTimeCalculator />}
      related={{ title: "İlginizi çekebilir", links: geoRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "yerel-saat", label: "Yerel saat nedir?" },
        { id: "adimlar", label: "Yerel saat farkı nasıl hesaplanır?" },
        { id: "ornekler", label: "Çözümlü örnek sorular" },
        { id: "ortak-saat", label: "Yerel saat ve ortak saat" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="yerel-saat">Yerel saat nedir?</h2>
      <p>
        Yerel saat, Güneş&apos;in bir meridyene göre konumuyla belirlenen saattir: Güneş bir meridyenin tam üzerinden geçtiği anda (en yüksek
        noktasındayken) o meridyendeki bütün yerlerde yerel saat 12.00&apos;dir. Aynı meridyen üzerindeki yerlerin yerel saati aynı, farklı
        meridyenlerdeki yerlerinki farklıdır.
      </p>

      <h2 id="adimlar">Yerel saat farkı nasıl hesaplanır?</h2>
      <ol>
        <li>İki yer aynı yarım küredeyse (ikisi doğu ya da ikisi batı) boylamlar çıkarılır, farklı yarım kürelerdeyse toplanır.</li>
        <li>Bulunan meridyen farkı 4 dakikayla çarpılır: yerel saat farkı = meridyen farkı × 4 dk.</li>
        <li>Doğudaki yerin saati ileridedir. Doğudaki yerin saati sorulursa fark eklenir, batıdaki yerin saati sorulursa çıkarılır.</li>
      </ol>

      <h2 id="ornekler">Çözümlü örnek sorular</h2>
      <ol>
        <li>
          <strong>30° D meridyeninde yerel saat 10.00 iken 42° D meridyeninde yerel saat kaçtır?</strong> İkisi de doğu: 42 − 30 = 12°. 12 × 4 =
          48 dk. 42° D doğuda olduğu için 10.00 + 48 dk = 10.48.
        </li>
        <li>
          <strong>15° D&apos;de saat 14.00 iken 30° B&apos;de yerel saat kaçtır?</strong> Farklı yarım küreler: 15 + 30 = 45°. 45 × 4 = 180 dk =
          3 saat. 30° B batıda olduğu için 14.00 − 3 saat = 11.00.
        </li>
        <li>
          <strong>İki yer arasında 1 saat 20 dakika yerel saat farkı varsa meridyen farkı kaçtır?</strong> 80 dk ÷ 4 = 20°.
        </li>
      </ol>

      <h2 id="ortak-saat">Yerel saat ve ortak saat</h2>
      <p>
        Her meridyende farklı saat kullanmak günlük hayatı zorlaştıracağı için ülkeler ortak (resmî) saat kullanır. Türkiye 2016&apos;dan bu yana
        tüm yıl UTC+3 saatini uygular; bu saat 45° doğu meridyeninin yerel saatidir. Bu yüzden Türkiye&apos;nin batısında resmî saat Güneş&apos;ten
        belirgin biçimde ileridedir: 29° D boylamındaki İstanbul&apos;da Güneş&apos;e göre saat, resmî saatten (45 − 29) × 4 = 64 dakika geridedir.
        Şehirler arasındaki resmî saat farkını görmek için <Link href="/dunya-saatleri">dünya saatlerini</Link> ya da{" "}
        <Link href="/saat-dilimi-cevirici">saat dilimi çeviriciyi</Link>, Güneş&apos;in doğuş ve batış saatleri için{" "}
        <Link href="/altin-saat">gün doğumu ve altın saat</Link> sayfasını kullanın.
      </p>
    </TimeToolPage>
  );
}
