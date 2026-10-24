import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HicriYasHesaplama } from "../components/dini/DiniAraclar2";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { gregorianToHijri, hijriToGregorian, HIJRI_MONTHS_TR } from "../converter/time/calendars";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/hicri-yas-hesaplama";
const title = "Hicri Yaş Hesaplama: Hicri Takvime Göre Kaç Yaşındayım?";
const description = "Doğum tarihinizi girin: Hicri takvime göre yaşınızı, Hicri doğum tarihinizi ve bir sonraki Hicri doğum gününüzü görün.";

export const metadata: Metadata = {
  title: seoTitle(title, "Hicri Yaş Hesaplama"),
  description,
  alternates: { canonical: path, languages: { tr: path, ar: "/ar/hijri-age-calculator", "x-default": path } },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  { question: "Hicri yaş neden Miladi yaştan büyüktür?", answer: "Hicri yıl ayın hareketine göre 354 ya da 355 gündür, Miladi yıldan yaklaşık 11 gün kısadır. Bu fark birikir: yaklaşık her 33 yılda Hicri yaş Miladi yaşı bir yıl geçer." },
  { question: "Hicri doğum tarihi hangi takvime göre hesaplanıyor?", answer: "Hesap, Ümmü'l-Kurâ takvimine göre yapılır. Türkiye'de Diyanet'in yayımladığı Hicri takvimle bazı aylarda bir günlük fark olabilir." },
];

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const miladi = (d: { year: number; month: number; day: number }) => `${d.day} ${AYLAR[d.month - 1]} ${d.year}`;
const hicri = (d: { year: number; month: number; day: number }) => `${d.day} ${HIJRI_MONTHS_TR[d.month - 1]} ${d.year}`;

// Doğum yılına göre Hicri doğum yılı: Miladi yılın ilk ve son günü hangi Hicri yıllara düşer.
const DOGUM_YILLARI = [1950, 1960, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020].map((y) => ({
  y,
  bas: gregorianToHijri({ year: y, month: 1, day: 1 }),
  son: gregorianToHijri({ year: y, month: 12, day: 31 }),
}));

// Örnek: 15 Mart 1990 doğumlu birinin Hicri doğum günü Miladi takvimde hangi günlere denk gelir.
const ORNEK = { year: 1990, month: 3, day: 15 };
const ORNEK_HICRI = gregorianToHijri(ORNEK);
const KAYMA = [1447, 1448, 1449, 1450, 1451]
  .map((hy) => ({ hy, g: hijriToGregorian({ year: hy, month: ORNEK_HICRI.month, day: ORNEK_HICRI.day }) }))
  .filter((x): x is { hy: number; g: { year: number; month: number; day: number } } => x.g !== null);

export default function HicriYasPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Hicri Yaş Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Hicri Yaş Hesaplama"
      intro="Doğum tarihinizi girin: Hicri takvime göre yaşınızı, Hicri doğum tarihinizi ve bir sonraki Hicri doğum gününüzü görün."
      tool={<HicriYasHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "fark", label: "Hicri ve Miladi yaş farkı" },
        { id: "tablo", label: "Miladi yaşa göre Hicri yaş" },
        { id: "ornek", label: "Örnek hesap" },
        { id: "dogum-yili", label: "Doğum yılına göre Hicri yıl" },
        { id: "kayma", label: "Hicri doğum günü her yıl ne zaman?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="fark">Hicri ve Miladi yaş farkı</h2>
      <p>
        Hicri takvim ay yılına dayanır ve bir yılı Miladi yıldan yaklaşık 11 gün kısadır. Bu yüzden Hicri yaşınız Miladi yaşınızla aynı ya da
        daha büyüktür; fark yaklaşık her 33 yılda bir yaş açılır. Miladi yaşınızı ayrıntılı görmek için <Link href="/yas-hesaplama">yaş hesaplama</Link>, tarihleri birbirine çevirmek
        için <Link href="/tarih-cevirici">Hicri–Miladi tarih çevirici</Link> aracını kullanabilirsiniz.
      </p>

      <h2 id="tablo">Miladi yaşa göre yaklaşık Hicri yaş</h2>
      <p>
        Ortalama Miladi yıl 365,2425 gün, ortalama Hicri yıl ise 354,367 gündür (30 yıllık döngüde 10.631 gün). Oran 365,2425 /
        354,367 ≈ 1,0307 olduğu için Hicri yaş, Miladi yaşın yaklaşık yüzde 3 fazlasıdır. Tablodaki değerler doğum gününüzden
        sonraki gün için yaklaşık sonuçtur; kesin yaş için yukarıdaki araçta doğum tarihinizi girin.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Miladi yaş</th>
              <th>Geçen gün (yaklaşık)</th>
              <th>Hicri yaş (yaklaşık)</th>
              <th>Fark</th>
            </tr>
          </thead>
          <tbody>
            {[10, 18, 20, 30, 33, 40, 50, 60, 65, 70, 80].map((yas) => {
              const gun = yas * 365.2425;
              const hicri = gun / 354.367;
              return (
                <tr key={yas}>
                  <td>{yas}</td>
                  <td>{Math.round(gun).toLocaleString("tr-TR")}</td>
                  <td>{hicri.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}</td>
                  <td>+{(hicri - yas).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="ornek">Örnek hesap</h2>
      <p>
        15 Mart 1990&apos;da doğan biri 15 Mart 2026&apos;da Miladi takvime göre 36 yaşını doldurur. Bu süre yaklaşık 36 × 365,2425 ≈
        13.149 gündür. 13.149 / 354,367 ≈ 37,1 olduğundan aynı gün Hicri takvime göre 37 yaşındadır ve 38. Hicri yaşına girmesine
        yaklaşık 0,9 Hicri yıl (yaklaşık 317 gün) vardır. Hicri doğum günü her yıl Miladi takvimde yaklaşık 11 gün geriye kayar.
      </p>

      <h2 id="dogum-yili">Doğum yılına göre Hicri doğum yılı</h2>
      <p>
        Bir Miladi yıl iki Hicri yıla yayılır. Doğduğunuz yılın hangi Hicri yıllara denk geldiği aşağıda; kesin Hicri doğum tarihiniz
        için yukarıdaki araca doğum gününüzü girin.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Doğum yılı</th>
              <th>1 Ocak (Hicri)</th>
              <th>31 Aralık (Hicri)</th>
              <th>Hicri doğum yılı</th>
            </tr>
          </thead>
          <tbody>
            {DOGUM_YILLARI.map((r) => (
              <tr key={r.y}>
                <td>{r.y}</td>
                <td>{hicri(r.bas)}</td>
                <td>{hicri(r.son)}</td>
                <td>{r.bas.year === r.son.year ? r.bas.year : `${r.bas.year} veya ${r.son.year}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="kayma">Hicri doğum günü her yıl ne zaman?</h2>
      <p>
        Örnekteki {miladi(ORNEK)} doğumlu kişinin Hicri doğum tarihi {hicri(ORNEK_HICRI)}&apos;dur. Bu Hicri doğum günü önümüzdeki
        yıllarda Miladi takvimde şu günlere denk gelir; her yıl 10–12 gün öne kaydığı görülür:
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Hicri yıl</th>
              <th>Hicri doğum günü</th>
              <th>Miladi karşılığı</th>
              <th>Hicri yaş</th>
            </tr>
          </thead>
          <tbody>
            {KAYMA.map((k) => (
              <tr key={k.hy}>
                <td>{k.hy}</td>
                <td>
                  {ORNEK_HICRI.day} {HIJRI_MONTHS_TR[ORNEK_HICRI.month - 1]}
                </td>
                <td>{miladi(k.g)}</td>
                <td>{k.hy - ORNEK_HICRI.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
