import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import BikeRimTool from "../components/scales/BikeRimTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { BIKE_RIMS, outerDiameter } from "../converter/scales/bikeRim";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/bisiklet-jant-olcusu";
const title = "Bisiklet Jant Ölçüsü: İnç ve ETRTO (mm)";
const description =
  "Bisiklet jant ölçüsünü çevirin: 28 inç = 700c = 622 mm, 26 inç = 559 mm, 27,5 inç = 650b = 584 mm. ETRTO lastik kodu (37-622) okuma ve yaklaşık teker çapı.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  { question: "28 jant ile 700c aynı mı?", answer: "Evet. Türkiye'de 28 jant denilen şehir ve trekking bisikleti jantı, yol bisikletlerindeki 700c ve dağ bisikletlerindeki 29 inç ile aynı 622 mm oturma çapına sahiptir. Aradaki fark lastik genişliğidir; jant genişliği uygunsa aynı jantta farklı lastikler kullanılabilir." },
  { question: "27,5 jant kaç mm?", answer: "27,5 inç (650b) jantın oturma çapı 584 mm'dir. 26 inç (559 mm) ile 29 inç (622 mm) arasında kalır." },
  { question: "Lastik üzerindeki 37-622 ne demek?", answer: `ETRTO (ISO 5775) koduyla yazılmış ölçüdür: ilk sayı şişirilmiş lastiğin yaklaşık genişliği (37 mm), ikincisi jantın oturma çapıdır (622 mm). Bu lastik 28" / 700c janta takılır; teker dış çapı yaklaşık ${outerDiameter(37, 622)} mm olur.` },
  { question: "20 jant her zaman aynı mı?", answer: "Hayır. BMX ve katlanır bisikletlerin çoğu 406 mm, bazı eski şehir ve yarış çocuk bisikletleri 451 mm jant kullanır. İkisi de 20 inç diye satılır ama lastikleri birbirine uymaz; lastik yanağındaki ETRTO numarasına bakmak gerekir." },
];

export default function BikeRimPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
        { href: PATH, label: "Bisiklet Jant Ölçüsü" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Bisiklet Jant Ölçüsü Çevirme"
      intro="İnç ya da 700c, 650b gibi jant adını ETRTO milimetre ölçüsüne çevirin veya lastik yanağındaki ETRTO kodunu (ör. 37-622) yazıp hangi janta uyduğunu görün."
      tool={<BikeRimTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/lastik-ebati-hesaplama", label: "Lastik Ebatı Hesaplama" },
          { href: "/inc-santimetre", label: "İnç - Santimetre" },
          { href: "/kategoriler/uzunluk", label: "Uzunluk Çevirici" },
          { href: "/lastik-dot-kodu-okuma", label: "Lastik DOT Kodu Okuma" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Jant ölçüleri tablosu" },
        { id: "etrto", label: "ETRTO kodu nasıl okunur?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Jant ölçüleri tablosu</h2>
      <p>
        İnç adları jantın değil, eski lastiklerin yaklaşık dış çapının adıdır; bu yüzden 26 inçlik bir jantın kendisi 26 inç (660 mm) değil 559 mm&apos;dir.
        Lastik uyumunu belirleyen ETRTO oturma çapıdır (BSD).
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>ETRTO (mm)</th>
              <th>İnç / Fransız adı</th>
              <th>Kullanım</th>
            </tr>
          </thead>
          <tbody>
            {BIKE_RIMS.map((rim) => (
              <tr key={rim.bsd}>
                <td>
                  <strong>{rim.bsd}</strong>
                </td>
                <td>{rim.names.join(", ")}</td>
                <td>{rim.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="etrto">ETRTO kodu nasıl okunur?</h2>
      <p>
        Lastik yanağında genellikle üç ölçü birlikte yazar: inç (28 x 1.40), Fransız (700 x 35C) ve ETRTO (37-622). En güvenilir olanı ETRTO&apos;dur:
        tire işaretinden önceki sayı lastik genişliği, sonraki jant oturma çapıdır. 25-622 ince bir yol lastiği, 50-559 kalın bir 26 inç dağ bisikleti
        lastiğidir.
      </p>
      <p>
        Teker dış çapı yaklaşık olarak jant çapı artı iki kez lastik genişliğidir: 50-622 bir lastikte {outerDiameter(50, 622)} mm, yani yaklaşık{" "}
        {(outerDiameter(50, 622) / 25.4).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} inç eder; 29 inç adı buradan gelir. Milimetre ile inç arasındaki
        tam çeviri için <Link href="/inc-santimetre">inç - santimetre</Link> sayfasına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
