import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import GeriSayimHero from "../components/countdown/GeriSayimHero";
import SaatKabugu from "../components/saat/SaatKabugu";
import YazSaatiSahneleri from "../components/time/YazSaatiSahneleri";
import type { FaqItem } from "../converter/faqSchema";
import { sonrakiGecisler, TR_FARK, utcFarki, yilGecisleri } from "../converter/time/yazSaati";
import { buildSiteUrl } from "../siteConfig";

// Yaz saati / kış saati: Avrupa'daki sıradaki saat geçişine canlı geri sayım ve Türkiye ile saat farkının nasıl
// değiştiği. Bütün tarihler saat dilimi verisinden hesaplanır; site her gün yeniden derlendiği için yıl geçince
// kendiliğinden bir sonraki geçişe geçer.

const TR = "Europe/Istanbul";
const PATH = "/yaz-saati";
const tarih = (an: number, o: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  new Intl.DateTimeFormat("tr-TR", { timeZone: TR, ...o }).format(an);
const saat = (an: number) => new Intl.DateTimeFormat("tr-TR", { timeZone: TR, hour: "2-digit", minute: "2-digit" }).format(an);

function bilgiler() {
  const an = Date.now();
  const ab = sonrakiGecisler("Europe/Berlin", an, 4);
  const abd = sonrakiGecisler("America/New_York", an, 1)[0];
  const geri = ab[0].sonra < ab[0].once;
  return { an, ab, abd, geri, yil: new Date(an).getUTCFullYear() };
}

export function generateMetadata(): Metadata {
  const { ab, geri } = bilgiler();
  const yil = new Date(ab[0].an).getUTCFullYear();
  const title = `Saatler Ne Zaman ${geri ? "Geri" : "İleri"} Alınacak? ${yil} Yaz Saati ve Kış Saati`;
  const description = `Avrupa'da saatler ${tarih(ab[0].an, { day: "numeric", month: "long", year: "numeric", weekday: "long" })} ${geri ? "geri" : "ileri"} alınıyor; Türkiye'de saatler değişmiyor. Almanya, İngiltere ve ABD ile saat farkı, canlı geri sayım ve yıllara göre geçiş tarihleri.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PATH },
    openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default function YazSaatiPage() {
  const { an, ab, abd, geri, yil } = bilgiler();
  const ilk = ab[0];
  const yonMetni = geri ? "geri" : "ileri";
  const berlinSonra = TR_FARK - ilk.sonra;
  const berlinSimdi = TR_FARK - utcFarki("Europe/Berlin", an);
  const onceki = [yil - 1, yil].flatMap((y) => yilGecisleri("Europe/Berlin", y)).filter((g) => g.an <= an).pop();
  const ileri = ab.find((g) => g.sonra > g.once);
  const geriAlma = ab.find((g) => g.sonra < g.once);

  const faqItems: FaqItem[] = [
    {
      question: `Türkiye'de saatler geri alınacak mı ${yil}?`,
      answer:
        "Hayır. Türkiye'de saatler en son 2016 baharında ileri alındı ve o tarihten beri geri alınmadı; ülke yıl boyunca UTC+3 saatini kullanıyor. Telefon ve bilgisayarlardaki Türkiye saati de değişmez.",
    },
    {
      question: `Avrupa'da saatler ne zaman ${yonMetni} alınacak?`,
      answer: `${tarih(ilk.an, { day: "numeric", month: "long", year: "numeric", weekday: "long" })} günü, Türkiye saatiyle ${saat(ilk.an)}'te. Avrupa Birliği ülkeleri ve İngiltere saatlerini aynı anda değiştirir.`,
    },
    {
      question: "Almanya ile Türkiye arasındaki saat farkı kaç saat?",
      answer: `Şu an ${berlinSimdi / 60} saat. ${tarih(ilk.an, { day: "numeric", month: "long" })} gecesinden sonra ${berlinSonra / 60} saat olur: Türkiye'de saat 12:00 iken Almanya'da ${String(12 - berlinSonra / 60).padStart(2, "0")}:00.`,
    },
    ...(abd
      ? [
          {
            question: "Amerika'da saatler ne zaman değişiyor?",
            answer: `ABD ve Kanada'nın büyük bölümünde bir sonraki geçiş ${tarih(abd.an, { day: "numeric", month: "long", year: "numeric" })}; saatler ${abd.sonra < abd.once ? "geri" : "ileri"} alınır. Avrupa'dan birkaç hafta farklı olduğu için arada Türkiye ile New York arasındaki fark geçici olarak 1 saat değişir.`,
          },
        ]
      : []),
    ...(ileri && geriAlma
      ? [
          {
            question: "Yaz saati ve kış saati ne demek?",
            answer: `Yaz saati, güneşli saatleri akşama kaydırmak için saatlerin ilkbaharda 1 saat ileri alınmasıdır; kış saati, sonbaharda yeniden geri alınmasıdır. Avrupa'da sıradaki ileri alma ${tarih(ileri.an)}, geri alma ${tarih(geriAlma.an)} tarihinde.`,
          },
        ]
      : []),
    {
      question: "Telefonumun saati kendiliğinden değişir mi?",
      answer:
        "Saat diliminin otomatik ayarlandığı telefon ve bilgisayarlar, bulunduğunuz ülkenin kuralına göre kendiliğinden ayarlanır. Türkiye'de bulunan cihazların saati değişmez; yurt dışındaysanız o ülkenin geçişine göre değişir.",
    },
  ];

  return (
    <SaatKabugu
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/saat-ve-tarih", label: "Saat ve Tarih" },
        { href: PATH, label: "Yaz saati" },
      ]}
      faqItems={faqItems}
      hero={
        <GeriSayimHero
          baslik={`Saatler ne zaman ${yonMetni} alınacak?`}
          ad={`Avrupa'da saatlerin ${yonMetni} alınması`}
          hedefler={ab.map((g) => g.an)}
          oncekiMs={onceki?.an ?? null}
          olusturma={an}
          tahmini={false}
          saatEtiketi={`Türkiye saatiyle ${saat(ilk.an)} · Türkiye'de saatler değişmiyor`}
          bugunMetni={`Avrupa'da saatler bu gece ${yonMetni} alındı; Türkiye'de değişiklik yok.`}
        />
      }
      sahneler={<YazSaatiSahneleri />}
    >
      <h2 id="turkiye">Türkiye&apos;de yaz saati uygulaması var mı?</h2>
      <p>
        Hayır. Türkiye uzun yıllar Avrupa ile birlikte saatlerini martta ileri, ekimde geri alıyordu. 2016 baharında saatler
        ileri alındıktan sonra sonbaharda geri alınmadı ve o günden beri ülke yıl boyunca UTC+3 saatini kullanıyor. Bu yüzden
        Türkiye&apos;de saat değişmez, ama saat değiştiren ülkelerle aradaki fark yılda iki kez 1 saat değişir: kışın Almanya ile
        fark 2 saate çıkar, yazın 1 saate iner.
      </p>

      <h2 id="avrupa">Avrupa&apos;da saatler neden ve ne zaman değişiyor?</h2>
      <p>
        Avrupa Birliği ülkeleri ve İngiltere saatlerini aynı anda değiştirir: mart ayının son pazarı 1 saat ileri, ekim ayının
        son pazarı 1 saat geri. Geçiş anı her ülkede aynı andır (UTC 01:00), Türkiye saatiyle 04:00&apos;e denk gelir. ABD ve
        Kanada&apos;da ise kural farklıdır (martın ikinci, kasımın ilk pazarı); güney yarımkürede Avustralya gibi ülkeler tam
        tersine ekimde ileri, nisanda geri alır.
      </p>
      <p>
        Bir şehrin şu anki saati ve Türkiye ile farkı için <Link href="/dunya-saatleri">dünya saatleri</Link>, belirli bir saati
        başka şehirlere çevirmek için <Link href="/saat-dilimi-cevirici">saat dilimi çevirici</Link> kullanılabilir.
      </p>
    </SaatKabugu>
  );
}
