import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import DogumGunuHesaplama from "../components/takvim/DogumGunuHesaplama";
import { takvimMetadata } from "../components/takvim/takvimMeta";
import { TAKVIM_ARACLARI } from "../components/takvim/TakvimSayfalari";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { trAblative, trLocative } from "../converter/turkishSuffix";
import { trToday } from "../components/sun/SunToday";
import {
  DogumGunuBugunHero,
  GelecekYillarTablosu,
  gunAdi,
  gunAyMetni,
  ILK_YIL,
  ornekYillar,
  YilGunTablosu,
} from "../components/takvim/DogumGunuBugun";

// Derleme günü (Türkiye saati); site her gece yeniden derlenir.
const TODAY = trToday();
const ORNEK = ornekYillar(TODAY);

export const metadata: Metadata = takvimMetadata("/dogdugum-gun-hangi-gun", {
  title: "Doğduğum Gün Hangi Gündü? Doğum Günü Hesaplama",
  short: "Doğduğum Gün Hangi Gündü?",
  description: `${trLocative(gunAyMetni(TODAY))} doğanlar: ${ORNEK[3]} ${gunAdi(TODAY, ORNEK[3])}, ${ORNEK[2]} ${gunAdi(TODAY, ORNEK[2])}, ${ORNEK[1]} ${gunAdi(TODAY, ORNEK[1])}. Doğum tarihini gir: hangi gün doğduğunu, Hicri ve Rumi tarihini, ayın evresini gör.`,
});

const faq: FaqItem[] = [
  {
    question: "Doğduğum günün hangi gün olduğunu nasıl bulurum?",
    answer:
      "Doğum tarihinizi girmeniz yeterli; araç tarihin haftanın hangi gününe denk geldiğini (Pazartesi, Salı…) takvim hesabıyla bulur. 1900'den bugüne kadar her tarih için çalışır.",
  },
  {
    question: "Hicri doğum günü nedir?",
    answer:
      "Doğduğunuz günün Hicri (ay) takvimindeki karşılığıdır. Hicri yıl yaklaşık 354 gün olduğu için Hicri doğum gününüz miladi takvimde her yıl yaklaşık 11 gün öne gelir ve Hicri yaşınız miladi yaşınızdan biraz büyüktür.",
  },
  {
    question: "Doğum günüm neden her yıl farklı bir güne denk geliyor?",
    answer:
      "365 gün 52 hafta ve 1 gün ettiği için doğum gününüz her yıl haftanın bir sonraki gününe kayar; artık yıllarda iki gün kayar. Bu yüzden takvim ancak 28 yılda bir aynı sıraya döner.",
  },
  {
    question: "29 Şubat doğumluların doğum günü ne zaman kutlanır?",
    answer:
      "29 Şubat yalnızca artık yıllarda (4 yılda bir) vardır. Bu araç artık olmayan yıllarda doğum gününü 1 Mart olarak gösterir; birçok kişi 28 Şubat'ta da kutlar.",
  },
];

export default function DogdugumGunRoute() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/takvim", label: "Takvim" },
        { label: "Doğduğum Gün Hangi Gündü?" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Doğduğum Gün Hangi Gündü?"
      intro="Doğum tarihini gir; haftanın hangi günü doğduğunu, Hicri ve Rumi doğum tarihini, o gece ayın hangi evrede olduğunu ve doğum gününün önümüzdeki yıllarda hangi güne denk geleceğini gör."
      tool={
        <>
          <DogumGunuBugunHero t={TODAY} />
          <DogumGunuHesaplama />
        </>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
          { href: "/tarih-cevirici", label: "Hicri – Miladi Tarih Çevirici" },
          { href: "/ozel-gunler", label: "Özel Günler" },
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "yillar", label: `${gunAyMetni(TODAY)} hangi yıl hangi gün?` },
        { id: "gelecek", label: "Önümüzdeki yıllarda" },
        { id: "nasil", label: "Nasıl hesaplanır?" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faq}
    >
      <h2 id="yillar">{gunAyMetni(TODAY)} hangi yıl hangi güne denk geldi?</h2>
      <p>
        Tabloda {trAblative(ILK_YIL)} bu yana her yıl, {gunAyMetni(TODAY)} tarihinin
        haftanın hangi gününe denk geldiği yer alıyor; sütun başlığındaki sayı o
        güne kaç kez denk geldiğini gösterir. Doğum yılınızı bulduğunuz sütun,
        bugün doğum günü olanlar için doğdukları gündür. Tablo her gün o günün
        tarihine göre yenilenir; başka bir tarih için yukarıdaki aracı kullanın.
      </p>
      <YilGunTablosu t={TODAY} />

      <h2 id="gelecek">{gunAyMetni(TODAY)} önümüzdeki yıllarda hangi gün?</h2>
      <p>
        Tarih her yıl haftanın bir sonraki gününe, artık yıldan sonra iki gün
        ileri kayar. Önümüzdeki yıllarda {gunAyMetni(TODAY)} şu günlere denk
        geliyor (hafta sonları vurgulu):
      </p>
      <GelecekYillarTablosu t={TODAY} />

      <h2 id="nasil">Nasıl hesaplanır?</h2>
      <p>
        Haftanın günü, 1 Ocak 1900&apos;den itibaren geçen gün sayısının
        7&apos;ye bölümünden kalanla bulunur; araç bu hesabı Türkiye&apos;de
        kullanılan miladi (Gregoryen) takvime göre yapar. Hicri karşılık
        Diyanet&apos;in de esas aldığı ay takvimiyle, Rumi karşılık Osmanlı mali
        takvimiyle hesaplanır; eski belgelerdeki tarihler için{" "}
        <Link href="/tarih-cevirici">tarih çeviriciyi</Link> kullanabilirsiniz.
      </p>
      <p>
        Doğduğunuz gün bir bayrama, kandile ya da milli bir güne denk geliyorsa
        araç bunu da gösterir; tüm günleri{" "}
        <Link href="/takvim">Türkiye takviminde</Link> ve{" "}
        <Link href="/ozel-gunler">özel günler</Link> sayfasında görebilirsiniz.
        Tam yaşınızı yıl, ay ve gün olarak hesaplamak için{" "}
        <Link href="/yas-hesaplama">yaş hesaplama</Link> aracını kullanın.
      </p>
    </TimeToolPage>
  );
}
