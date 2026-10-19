import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PaskalyaHesap from "../components/christian/PaskalyaHesap";
import TimeToolPage from "../components/time/TimeToolPage";
import { batiPaskalya, ortodoksPaskalya, paskalyaGunleri, trTarih } from "../converter/christian/paskalya";
import type { FaqItem } from "../converter/faqSchema";
import { diffDays } from "../converter/time/dateMath";
import { buildSiteUrl } from "../siteConfig";

// Türkiye'deki Hristiyan topluluklar için Paskalya tarihleri: Batı (Ermeni, Katolik, Protestan) ve Ortodoks (Rum, Süryani).
export const revalidate = 86400;

const path = "/paskalya-ne-zaman";
const yil = new Date().getFullYear();
const title = `Paskalya Ne Zaman? ${yil} ve ${yil + 1} Paskalya Tarihleri (Batı ve Ortodoks)`;
const description = `${yil + 1} Paskalyası ${trTarih(batiPaskalya(yil + 1), false)}, Ortodoks Paskalyası ${trTarih(ortodoksPaskalya(yil + 1), false)}. Kül Çarşambası, Kutsal Cuma, Göğe Yükseliş ve 2020-2035 Paskalya tarihleri.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const yillar = Array.from({ length: 16 }, (_, i) => 2020 + i);
const kisa = (d: { year: number; month: number; day: number }) => trTarih(d, false).replace(/ \d{4}$/, "");
const gun = (y: number, ortodoks: boolean, id: string) => paskalyaGunleri(y, ortodoks).find((g) => g.id === id)!.tarih;
const ayni = yillar.filter((y) => diffDays(batiPaskalya(y), ortodoksPaskalya(y)) === 0);

const faqItems: FaqItem[] = [
  {
    question: `${yil + 1} Paskalya ne zaman?`,
    answer: `${yil + 1} yılında Batı Paskalyası (Katolik, Protestan ve Ermeni kiliseleri) ${trTarih(batiPaskalya(yil + 1))}, Ortodoks Paskalyası (Rum Ortodoks ve Süryaniler) ${trTarih(ortodoksPaskalya(yil + 1))} günüdür.`,
  },
  {
    question: "Paskalya tarihi nasıl hesaplanır?",
    answer:
      "Paskalya, 21 Mart'tan sonraki ilk kilise dolunayını izleyen pazar günüdür. Kilise dolunayı gökyüzündeki gerçek dolunay değil, tablolarla hesaplanan dolunaydır; bu yüzden tarih her yıl önceden kesin olarak bilinir. Batı Paskalyası her zaman 22 Mart ile 25 Nisan arasındadır.",
  },
  {
    question: "Ortodoks Paskalyası neden farklı günde?",
    answer: `Ortodoks kiliseleri aynı kuralı Jülyen takvimi ve eski ay tablolarıyla uygular. Bu yüzden Ortodoks Paskalyası Batı ile aynı gün ya da 1-5 hafta sonra olur. ${yillar[0]}-${yillar[yillar.length - 1]} arasında iki Paskalya ${ayni.join(", ")} yıllarında aynı güne denk gelir.`,
  },
  {
    question: "Türkiye'de hangi kilise hangi Paskalya tarihini kullanır?",
    answer:
      "İstanbul Ermeni Patrikhanesi'ne bağlı Ermeniler, Katolikler ve Protestanlar Batı (Gregoryen) tarihini kullanır. Fener Rum Patrikhanesi'ne bağlı Rum Ortodokslar ve Mardin, Midyat gibi yerlerdeki Süryaniler Ortodoks tarihini kullanır.",
  },
  {
    question: "Paskalya Türkiye'de resmî tatil mi?",
    answer: "Hayır. Paskalya Türkiye'de resmî tatil değildir; Hristiyan vatandaşlar için dini bayramdır ve kiliselerde ayinlerle kutlanır.",
  },
];

export default function PaskalyaPage() {
  const bati = batiPaskalya(yil + 1);
  const ortodoks = ortodoksPaskalya(yil + 1);
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/takvim", label: "Türkiye Takvimi" },
        { href: path, label: "Paskalya Ne Zaman?" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Paskalya Ne Zaman?"
      intro={`${yil + 1} Paskalyası ${trTarih(bati)}, Ortodoks Paskalyası ${trTarih(ortodoks)}. Yılı değiştirerek Batı ve Ortodoks kiliselerinin Paskalya'ya bağlı bütün günlerini görün.`}
      tool={<PaskalyaHesap ilkYil={yil + 1} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/geri-sayim/paskalya", label: "Paskalya'ya kaç gün kaldı?" },
          { href: "/geri-sayim/ortodoks-paskalyasi", label: "Ortodoks Paskalyası'na kaç gün kaldı?" },
          { href: "/geri-sayim/noel", label: "Noel'e kaç gün kaldı?" },
          { href: "/geri-sayim/aya-yorgi", label: "Aya Yorgi ne zaman?" },
          { href: "/ozel-gunler#kat-hristiyan", label: "Hristiyan bayramları" },
          { href: "/takvim", label: "Türkiye Takvimi" },
          { href: "/ay-evreleri", label: "Ay evreleri" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: `Paskalya tarihleri ${yillar[0]}-${yillar[yillar.length - 1]}` },
        { id: "kiliseler", label: "Türkiye'de hangi kilise hangi tarihi kullanır?" },
        { id: "hesap", label: "Paskalya nasıl hesaplanır?" },
        { id: "perhiz", label: "Büyük Perhiz ve Kutsal Hafta" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">
        Paskalya tarihleri {yillar[0]}-{yillar[yillar.length - 1]}
      </h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Yıl</th>
              <th scope="col">Kül Çarşambası</th>
              <th scope="col">Batı Paskalyası</th>
              <th scope="col">Ortodoks Paskalyası</th>
              <th scope="col">Fark</th>
            </tr>
          </thead>
          <tbody>
            {yillar.map((y) => {
              const fark = diffDays(batiPaskalya(y), ortodoksPaskalya(y)) / 7;
              return (
                <tr key={y}>
                  <td>{y}</td>
                  <td>{kisa(gun(y, false, "kul-carsambasi"))}</td>
                  <td>
                    <strong>{kisa(batiPaskalya(y))}</strong>
                  </td>
                  <td>
                    <strong>{kisa(ortodoksPaskalya(y))}</strong>
                  </td>
                  <td>{fark === 0 ? "aynı gün" : `${fark} hafta`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="kiliseler">Türkiye&apos;de hangi kilise hangi tarihi kullanır?</h2>
      <ul>
        <li>
          <strong>Batı tarihi (Gregoryen hesap):</strong> İstanbul Ermeni Patrikhanesi&apos;ne bağlı Türkiye Ermenileri (Paskalya&apos;ya Surp Zadik
          derler), Katolik ve Protestan kiliseleri.
        </li>
        <li>
          <strong>Ortodoks tarihi (Jülyen hesap):</strong> Fener Rum Patrikhanesi&apos;ne bağlı Rum Ortodokslar ve Mardin, Midyat, Tur Abdin
          bölgesindeki Süryaniler. Rusça konuşan Ortodoks topluluklar da bu tarihi kullanır.
        </li>
      </ul>
      <p>
        Noel&apos;de durum farklıdır: Rum Ortodokslar Noel&apos;i 25 Aralık&apos;ta kutlarken Paskalya&apos;yı Ortodoks tarihinde kutlar. Ermeniler Noel&apos;i
        6 Ocak&apos;ta kutlar. Ayrıntılar için <Link href="/geri-sayim/noel">Noel sayfasına</Link> bakın.
      </p>

      <h2 id="hesap">Paskalya nasıl hesaplanır?</h2>
      <p>
        325 yılındaki İznik Konsili&apos;nden bu yana Paskalya, ilkbaharın ilk dolunayından sonraki pazar günü kutlanır. Kilise, ilkbahar
        ekinoksunu 21 Mart&apos;ta sabitlemiş ve dolunayı gözlem yerine tablolarla hesaplar; bu yüzden her yılın Paskalyası yüzyıllar öncesinden
        hesaplanabilir. İznik (bugünkü Bursa İznik) bu kararın alındığı yer olduğu için Paskalya tarihinin Türkiye ile de tarihî bir bağı vardır.
      </p>
      <p>
        Batı kiliseleri 1582&apos;deki Gregoryen takvim reformunu kullanır. Ortodoks kiliseleri Jülyen takvimini ve eski ay döngüsünü korur; bulunan
        tarih bugünkü takvimde 13 gün ileri kayar (2100&apos;e kadar). Bu sayfadaki Ortodoks tarihleri bugünkü takvime çevrilmiş hâlidir.
      </p>

      <h2 id="perhiz">Büyük Perhiz ve Kutsal Hafta</h2>
      <p>
        Batı kiliselerinde Büyük Perhiz, Paskalya&apos;dan 46 gün önceki <strong>Kül Çarşambası</strong> başlar; pazar günleri oruçtan sayılmadığı için
        bu süre 40 günlük oruca karşılık gelir. Ortodoks kiliselerinde perhiz, Paskalya&apos;dan 48 gün önceki <strong>Temiz Pazartesi</strong> başlar.
        Paskalya&apos;dan önceki hafta Kutsal Hafta&apos;dır: Palmiye Pazarı ile başlar, Kutsal Perşembe ve Kutsal Cuma ile devam eder. Paskalya&apos;dan
        39 gün sonra Göğe Yükseliş, 49 gün sonra Pentekost kutlanır.
      </p>
      <p>
        {yil + 1} için: Kül Çarşambası {trTarih(gun(yil + 1, false, "kul-carsambasi"))}, Batı Kutsal Cuma {trTarih(gun(yil + 1, false, "kutsal-cuma"))};
        Ortodoks Temiz Pazartesi {trTarih(gun(yil + 1, true, "temiz-pazartesi"))}, Ortodoks Kutsal Cuma {trTarih(gun(yil + 1, true, "kutsal-cuma"))}.
      </p>
    </TimeToolPage>
  );
}
