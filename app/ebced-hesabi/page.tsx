import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import EbcedTool from "../components/ebced/EbcedTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { EBCED_LETTERS, ebcedValue, numberToEbced } from "../converter/text/ebced";
import { hijriToGregorian } from "../converter/time/calendars";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/ebced-hesabi";
const title = "Ebced Hesabı: Harf ve Sayı Çevirici";
const description =
  "Arap harfli kelimelerin ebced değerini harf harf hesaplayın (ör. besmele = 786, محمد = 92) ve sayıyı ebced harfleriyle yazın (1453 = غتنج). Tarih düşürme ve ebced tablosu.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const v = (t: string) => ebcedValue(t).total;
const fetih = v("بلدة طيبة");
const fetihMiladi = hijriToGregorian({ year: fetih, month: 1, day: 1 })!.year;
const GROUPS = ["ebced", "hevvez", "huttî", "kelemen", "sa'fes", "karaşet", "sehaz", "dazığ"];
const groupOf = (i: number) => (i < 4 ? 0 : i < 7 ? 1 : i < 10 ? 2 : i < 14 ? 3 : i < 18 ? 4 : i < 22 ? 5 : i < 25 ? 6 : 7);

const EXAMPLES: Array<{ text: string; read: string }> = [
  { text: "بسم الله الرحمن الرحيم", read: "Bismillâhirrahmânirrahîm" },
  { text: "محمد", read: "Muhammed" },
  { text: "أحمد", read: "Ahmed" },
  { text: "علي", read: "Ali" },
  { text: "عشق", read: "aşk" },
];

const faqItems: FaqItem[] = [
  {
    question: "Ebced hesabı nedir?",
    answer:
      "Arap alfabesindeki her harfe bir sayı verilerek kelimelerin sayı değerinin bulunmasıdır. Harfler ebced, hevvez, huttî, kelemen, sa'fes, karaşet, sehaz, dazığ kelimelerindeki sırayla dizilir; ilk dokuz harf birler (1–9), sonraki dokuzu onlar (10–90), sonraki dokuzu yüzler (100–900), son harf gayın 1000'dir.",
  },
  {
    question: "İsmimin ebced değeri nasıl bulunur?",
    answer: `İsim Arap harfleriyle yazılır ve harflerin değerleri toplanır. Örneğin Ahmed (أحمد) elif 1 + ha 8 + mim 40 + dal 4 = ${v("أحمد")}, Muhammed (محمد) mim 40 + ha 8 + mim 40 + dal 4 = ${v("محمد")} eder. Sonuç ismin yazılışına bağlıdır; Latin harfleriyle yazılan isim için önce Osmanlıca ya da Arapça yazılışını bilmek gerekir.`,
  },
  {
    question: "Tarih düşürme nedir?",
    answer: `Bir olayın yılını, harflerinin ebced değeri toplamı o yılı veren bir söz ya da mısrayla bildirme sanatıdır. İstanbul'un fethi için söylenen "Beldetün tayyibetün" (بلدة طيبة) sözünün değeri ${fetih}'dir; hicri ${fetih} yılı miladi ${fetihMiladi}'e denk gelir. Kitabelerde ve mezar taşlarında sıkça görülür.`,
  },
  {
    question: "Yuvarlak te (ة) kaç sayılır?",
    answer: `Tarih düşürmelerde yuvarlak te çoğunlukla açık te gibi 400 sayılır; bazı hesaplarda okunuşu esas alınarak he gibi 5 sayılır. "Beldetün tayyibetün" 400 alındığında ${fetih}, 5 alındığında ${ebcedValue("بلدة طيبة", "he").total} eder. Çeviricide iki seçenek de vardır.`,
  },
  {
    question: "Harekeler ve şedde sayılır mı?",
    answer: "Hayır. Ebced hesabında yalnızca yazılan harfler sayılır; üstün, esre, ötre gibi harekeler ve şedde hesaba girmez. Şeddeli harf yazıldığı gibi bir kez sayılır.",
  },
];

export default function EbcedPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Tarih ve Saat" },
        { href: PATH, label: "Ebced Hesabı" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Ebced Hesabı Çevirici"
      intro="Arap harfleriyle yazılmış bir kelime ya da mısranın ebced değerini harf harf hesaplayın ya da bir sayıyı ebced harfleriyle yazın. Telefonda Arap klavyesi yoksa harf düğmelerini kullanabilirsiniz."
      tool={<EbcedTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/tarih-cevirici", label: "Hicri Rumi Tarih Çevirici" },
          { href: "/hicri-takvim", label: "Hicri Takvim" },
          { href: "/ezani-saat-cevirme", label: "Ezani Saat Çevirme" },
          { href: "/eski-para-yeni-para-cevirme", label: "Eski Para Yeni Para" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Ebced tablosu (28 harf)" },
        { id: "ornek", label: "Örnek hesaplar" },
        { id: "tarih", label: "Ebced ile tarih düşürme" },
        { id: "sayi", label: "Sayıyı ebced harfleriyle yazma" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Ebced tablosu (28 harf)</h2>
      <p>
        Harfler sekiz grupta ezberlenir: {GROUPS.join(", ")}. İlk dokuz harf birleri, sonraki dokuz harf onları, sonraki dokuz harf yüzleri gösterir;
        son harf gayın 1000&apos;dir. Osmanlı Türkçesine sonradan eklenen pe (پ), çim (چ), je (ژ) ve gef (گ) harfleri, benzedikleri be, cim, ze ve kef
        harflerinin değerini alır.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Harf</th>
              <th>Adı</th>
              <th>Değeri</th>
              <th>Grup</th>
            </tr>
          </thead>
          <tbody>
            {EBCED_LETTERS.map((l, i) => (
              <tr key={l.char}>
                <td dir="rtl" lang="ar" style={{ fontSize: "1.3rem" }}>
                  {l.char}
                </td>
                <td>{l.name}</td>
                <td>{l.value.toLocaleString("tr-TR")}</td>
                <td>{GROUPS[groupOf(i)]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="ornek">Örnek hesaplar</h2>
      <p>Değer, kelimedeki her harfin tablodaki karşılığı toplanarak bulunur. Aşağıdaki sonuçlar çeviricinin hesabıdır:</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Yazılış</th>
              <th>Okunuşu</th>
              <th>Harf harf</th>
              <th>Toplam</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map((e) => {
              const r = ebcedValue(e.text);
              return (
                <tr key={e.text}>
                  <td dir="rtl" lang="ar" style={{ fontSize: "1.2rem" }}>
                    {e.text}
                  </td>
                  <td>{e.read}</td>
                  <td>{r.parts.map((p) => p.value).join(" + ")}</td>
                  <td>
                    <strong>{r.total}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="tarih">Ebced ile tarih düşürme</h2>
      <p>
        Divan şiirinde bir yapının bitişi, bir doğum ya da bir ölüm gibi olayların yılı, harflerinin toplamı o yılı veren bir mısrayla bildirilirdi. Bu
        mısraya &quot;tarih mısraı&quot; denir ve çoğu zaman &quot;tarih&quot; kelimesinden sonra gelir. Sonuç genellikle hicri yıldır; miladi karşılığı için{" "}
        <Link href="/tarih-cevirici">hicri tarih çeviricisini</Link> kullanabilirsiniz.
      </p>
      <p>
        En bilinen örnek İstanbul&apos;un fethidir: &quot;Beldetün tayyibetün&quot; (güzel bir belde) sözü ب 2 + ل 30 + د 4 + ة 400 + ط 9 + ي 10 + ب 2 + ة 400
        = <strong>{fetih}</strong> eder. Hicri {fetih} yılı miladi {fetihMiladi} yılına denk gelir. Çevirici, toplam 1 ile 1500 arasındaysa hicri yılın
        miladi karşılığını da gösterir.
      </p>

      <h2 id="sayi">Sayıyı ebced harfleriyle yazma</h2>
      <p>
        Sayı basamaklarına ayrılır ve her basamak kendi harfiyle yazılır, büyük basamak önce gelir. Örneğin 1453 = 1000 + 400 + 50 + 3 olduğu için
        gayın, te, nun, cim harfleriyle <span dir="rtl" lang="ar">{numberToEbced(1453)}</span> yazılır; 786 ise{" "}
        <span dir="rtl" lang="ar">{numberToEbced(786)}</span> (700 + 80 + 6) olur. 2000 ve üstünde binler, çarpan harfi gayından önce yazılarak
        gösterilir: 2000 = <span dir="rtl" lang="ar">{numberToEbced(2000)}</span> (be × gayın).
      </p>
    </TimeToolPage>
  );
}
