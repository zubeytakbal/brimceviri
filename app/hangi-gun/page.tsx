import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SaatKabugu from "../components/saat/SaatKabugu";
import { trBugun } from "../components/takvim/TakvimSayfalari";
import HangiGun from "../components/time/HangiGun";
import HangiGunSahneleri from "../components/time/HangiGunSahneleri";
import { TAKVIM_YILLARI } from "../converter/calendar/trTakvim";
import type { FaqItem } from "../converter/faqSchema";
import { weekdayOf } from "../converter/time/dateMath";
import { buildSiteUrl } from "../siteConfig";

// "Tarih hangi gün?": herhangi bir tarihin haftanın hangi gününe denk geldiği (1900–2100). Sayfa her gün yeniden
// derlenir; ilk çizim ve örnekler derleme gününe göredir.

const PATH = "/hangi-gun";
const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const title = "Tarih Hangi Gün? Herhangi Bir Tarihin Haftanın Günü";
const description =
  "Bir tarih seçin, haftanın hangi gününe denk geldiğini görün: Hicri ve Rumi karşılığı, yılın kaçıncı günü ve haftası, bugüne kaç gün kaldığı, resmî tatil olup olmadığı ve önemli günlerin hangi güne geldiği.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function HangiGunPage() {
  const bugun = trBugun();
  const ornek = (month: number, day: number, year = bugun.year) => GUNLER[weekdayOf({ year, month, day })];
  const faqItems: FaqItem[] = [
    {
      question: "Bir tarihin hangi gün olduğunu nasıl bulurum?",
      answer:
        "Tarihi seçmeniz yeterli; araç takvim hesabıyla haftanın gününü bulur. 1900 ile 2100 arasındaki her tarih için çalışır. Elle hesap için bilinen bir günden (ör. bugün) kaç gün ileride ya da geride olduğunu bulup 7'ye bölmek ve kalan kadar gün kaydırmak yeterlidir.",
    },
    {
      question: `29 Ekim ${bugun.year + 1} hangi gün?`,
      answer: `29 Ekim ${bugun.year + 1} ${ornek(10, 29, bugun.year + 1)} gününe denk geliyor. ${bugun.year} yılında ${ornek(10, 29)} idi.`,
    },
    {
      question: `10 Kasım ${bugun.year} hangi gün?`,
      answer: `10 Kasım ${bugun.year} ${ornek(11, 10)} günüdür; ${bugun.year + 1} yılında ${ornek(11, 10, bugun.year + 1)} gününe gelir.`,
    },
    {
      question: "Aynı tarih neden her yıl başka güne denk geliyor?",
      answer:
        "365 gün 52 hafta 1 gündür; bu yüzden bir tarih her yıl haftanın bir sonraki gününe kayar. Artık yılda (366 gün) 29 Şubat'tan sonraki tarihler iki gün kayar. Aynı takvim düzeni 6, 11 ya da 28 yılda bir tekrar eder.",
    },
    {
      question: "Hicri tarih nasıl hesaplanıyor?",
      answer:
        "Hicri karşılık hesapla bulunur ve ay gözlemine bağlı olarak resmî takvimden bir gün sapabilir. Dini günlerin kesin tarihleri için Diyanet takvimine dayanan özel günler sayfası kullanılabilir.",
    },
  ];

  return (
    <SaatKabugu
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Saat ve Tarih" },
        { href: PATH, label: "Tarih hangi gün?" },
      ]}
      faqItems={faqItems}
      hero={<HangiGun bugun={bugun} takvimYillari={TAKVIM_YILLARI} />}
      sahneler={<HangiGunSahneleri bugun={bugun} />}
    >
      <h2 id="nasil">Bir tarih haftanın hangi gününe denk gelir?</h2>
      <p>
        Haftanın günü, tarihin bilinen bir günden kaç gün uzakta olduğuna göre bulunur: aradaki gün sayısı 7&apos;ye bölünür, kalan
        kadar gün ileri ya da geri sayılır. Örneğin bir tarih bugünden 100 gün sonraysa 100 = 14 hafta + 2 gün olduğu için bugünden
        iki gün sonraki güne denk gelir. Yukarıdaki araç bunu 1900–2100 arasındaki her tarih için yapar; aynı tarihin sonraki
        yıllarda hangi güne geldiğini de gösterir.
      </p>
      <p>
        Doğum gününüzün hangi güne denk geldiğini <Link href="/dogdugum-gun-hangi-gun">doğduğum gün hangi gün</Link>, iki tarih
        arasındaki gün sayısını <Link href="/iki-tarih-arasi-gun-hesaplama">iki tarih arası gün hesaplama</Link>, tatil ve bayramları
        <Link href="/takvim"> Türkiye takvimi</Link> gösterir.
      </p>
    </SaatKabugu>
  );
}
