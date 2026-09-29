import Link from "@/app/components/SiteLink";
import {
  dersGunu,
  OKUL_YILLARI,
  okulOlaylari,
  siradakiOkulOlaylari,
} from "../../converter/calendar/okulTakvimi";
import { AY_ADLARI, takvimAyPath } from "../../converter/calendar/trTakvim";
import type { YMD } from "../../converter/time/calendars";
import {
  diffDays,
  formatYmd,
  formatYmdParts,
} from "../../converter/time/dateMath";
import type { FaqItem } from "../../converter/faqSchema";
import TimeToolPage from "../time/TimeToolPage";
import TakvimGorsel from "./TakvimGorsel";
import { TAKVIM_ARACLARI, trBugun } from "./TakvimSayfalari";

const kisa = (d: YMD) =>
  formatYmdParts(d, "tr", { day: "numeric", month: "long", weekday: "long" });
const aralik = (a: YMD, b?: YMD) =>
  b
    ? `${formatYmdParts(a, "tr", { day: "numeric", month: "long" })} – ${formatYmdParts(b, "tr", { day: "numeric", month: "long", year: "numeric" })}`
    : formatYmd(a, "tr");

export default function OkulTakvimiSayfasi() {
  const bugun = trBugun();
  const yil = OKUL_YILLARI[OKUL_YILLARI.length - 1];
  const olaylar = okulOlaylari(yil);
  const sira = siradakiOkulOlaylari(bugun).filter((o) => o.id !== "uyum");
  const sonraki = sira[0];
  const suren = sira.find(
    (o) => o.bit && diffDays(o.bas, bugun) >= 0 && diffDays(bugun, o.bit) >= 0,
  );
  const donem1 = dersGunu(yil.acilis, yil.karne1, yil);
  const donem2 = dersGunu(yil.ikinciDonem, yil.kapanis, yil);
  const kalanDers =
    diffDays(bugun, yil.kapanis) >= 0
      ? dersGunu(
          diffDays(yil.acilis, bugun) > 0 ? bugun : yil.acilis,
          yil.kapanis,
          yil,
        )
      : 0;
  const faq: FaqItem[] = [
    {
      question: `${yil.ad} okullar ne zaman açılıyor?`,
      answer: `${yil.ad} eğitim öğretim yılında okullar ${kisa(yil.acilis)} günü açılır. Okul öncesi ve 1. sınıf öğrencileri için uyum haftası ${aralik(yil.uyum[0], yil.uyum[1])} tarihlerindedir.`,
    },
    {
      question: "Ara tatiller ne zaman?",
      answer: `Birinci ara tatil ${aralik(yil.araTatil1[0], yil.araTatil1[1])}, ikinci ara tatil ${aralik(yil.araTatil2[0], yil.araTatil2[1])} tarihleri arasındadır.`,
    },
    {
      question: "Karneler ne zaman verilecek?",
      answer: `Birinci dönem karneleri ${kisa(yil.karne1)}, yıl sonu karneleri ${kisa(yil.kapanis)} günü verilir.`,
    },
    {
      question: "Yarıyıl (sömestr) tatili ne zaman?",
      answer: `Yarıyıl tatili ${aralik(yil.yariyil[0], yil.yariyil[1])} tarihleri arasında iki hafta sürer; ikinci dönem ${kisa(yil.ikinciDonem)} günü başlar.`,
    },
    {
      question: `${yil.ad} ders yılında kaç gün okul var?`,
      answer: `Hafta sonları, resmî tatiller ve ara tatiller çıkarıldığında birinci dönemde ${donem1}, ikinci dönemde ${donem2} olmak üzere toplam ${donem1 + donem2} ders günü vardır.`,
    },
  ];
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/takvim", label: "Takvim" },
        { label: "Okul Takvimi" },
      ]}
      crumbLabel="Sayfa yolu"
      title={`Okul Takvimi ${yil.ad}`}
      intro={`MEB ${yil.ad} eğitim öğretim yılı takvimi: okulların açılışı, ara tatiller, yarıyıl tatili ve karne günleri; sıradaki tatile ve karneye kaç gün kaldığı.`}
      tool={
        <div className="date-calc">
          <article className="takvim-kart">
            <TakvimGorsel gorsel="okul" size={112} title="Okul" />
            <div>
              <span className="takvim-kat kat-okul">
                {suren ? "Şu an" : "Sıradaki"}
              </span>
              {suren ? (
                <>
                  <h2>{suren.ad} sürüyor</h2>
                  <p>
                    {kisa(suren.bit!)} günü bitiyor · okula dönüşe{" "}
                    {diffDays(bugun, suren.bit!) + 1} gün var
                  </p>
                </>
              ) : sonraki ? (
                <>
                  <h2>{sonraki.ad}</h2>
                  <p>
                    {kisa(sonraki.bas)} ·{" "}
                    {diffDays(bugun, sonraki.bas) === 0
                      ? "bugün"
                      : `${diffDays(bugun, sonraki.bas)} gün kaldı`}
                  </p>
                </>
              ) : (
                <h2>
                  Ders yılı sona erdi; yeni takvim MEB tarafından açıklanınca
                  eklenecek
                </h2>
              )}
              <p className="takvim-kart-alt">
                {sira
                  .filter((o) => o !== sonraki && o !== suren)
                  .slice(0, 3)
                  .map((o) => (
                    <span key={o.id} className="takvim-etiket">
                      {o.ad}: {diffDays(bugun, o.bas)} gün
                    </span>
                  ))}
              </p>
            </div>
          </article>
          <div className="date-calc-results">
            <div className="date-calc-stat">
              <span>Kalan ders günü</span>
              <strong>{kalanDers} gün</strong>
              <em>yaz tatiline kadar (hafta sonu ve tatiller hariç)</em>
            </div>
            <div className="date-calc-stat">
              <span>1. dönem</span>
              <strong>{donem1} ders günü</strong>
              <em>
                {formatYmdParts(yil.acilis, "tr", {
                  day: "numeric",
                  month: "long",
                })}{" "}
                –{" "}
                {formatYmdParts(yil.karne1, "tr", {
                  day: "numeric",
                  month: "long",
                })}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>2. dönem</span>
              <strong>{donem2} ders günü</strong>
              <em>
                {formatYmdParts(yil.ikinciDonem, "tr", {
                  day: "numeric",
                  month: "long",
                })}{" "}
                –{" "}
                {formatYmdParts(yil.kapanis, "tr", {
                  day: "numeric",
                  month: "long",
                })}
              </em>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Tarih</th>
                  <th scope="col">Olay</th>
                  <th scope="col">Kalan</th>
                </tr>
              </thead>
              <tbody>
                {olaylar.map((o) => {
                  const kalan = diffDays(bugun, o.bas);
                  return (
                    <tr
                      key={o.id}
                      className={
                        diffDays(bugun, o.bit ?? o.bas) < 0
                          ? "is-weekend"
                          : undefined
                      }
                    >
                      <td>
                        <Link
                          href={takvimAyPath(o.bas.year, o.bas.month)}
                          prefetch={false}
                        >
                          {aralik(o.bas, o.bit)}
                        </Link>
                      </td>
                      <td>
                        <strong>{o.ad}</strong>
                        <br />
                        <small>{o.aciklama}</small>
                      </td>
                      <td>
                        {kalan > 0
                          ? `${kalan} gün`
                          : o.bit && diffDays(bugun, o.bit) >= 0
                            ? "sürüyor"
                            : kalan === 0
                              ? "bugün"
                              : "geçti"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="date-calc-note">
            Kaynak: {yil.kaynak}. İl ve ilçelerde hava koşulları gibi nedenlerle
            verilen idari tatiller bu takvimde yer almaz.
          </p>
        </div>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/resmi-tatiller", label: "Resmî Tatiller" },
          { href: "/geri-sayim", label: "Geri Sayım" },
          { href: "/ogretmen-araclari", label: "Öğretmen Araçları" },
          { href: "/harf-notu-hesaplama", label: "Harf Notu Hesaplama" },
          { href: "/devamsizlik-hesaplama", label: "Devamsızlık Hesaplama" },
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "donemler", label: "Dönemler ve tatiller" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faq}
    >
      <h2 id="donemler">Dönemler ve tatiller</h2>
      <p>
        {yil.ad} eğitim öğretim yılı iki dönemden oluşur. Birinci dönem{" "}
        {kisa(yil.acilis)} günü başlar ve {kisa(yil.karne1)} günü karnelerle
        sona erer; bu dönemin ortasında{" "}
        {aralik(yil.araTatil1[0], yil.araTatil1[1])} arasında bir haftalık ara
        tatil vardır. İki haftalık yarıyıl tatilinin ardından ikinci dönem{" "}
        {kisa(yil.ikinciDonem)} günü başlar,{" "}
        {aralik(yil.araTatil2[0], yil.araTatil2[1])} arasında ikinci ara tatil
        yapılır ve ders yılı {kisa(yil.kapanis)} günü sona erer.
      </p>
      <p>
        Ders günü sayıları, hafta sonları, resmî tatiller (29 Ekim, 1 Ocak, 23
        Nisan, 1 Mayıs, 19 Mayıs ve dini bayramlar) ve ara tatiller çıkarılarak
        hesaplanır. Tüm tatilleri ay ay görmek için{" "}
        <Link href="/takvim">Türkiye takvimine</Link>, devamsızlık sınırı için{" "}
        <Link href="/devamsizlik-hesaplama">devamsızlık hesaplamaya</Link>{" "}
        bakabilirsiniz. Tarihler {AY_ADLARI[yil.acilis.month - 1]}{" "}
        {yil.acilis.year} itibarıyla MEB&apos;in açıkladığı takvime göredir.
      </p>
    </TimeToolPage>
  );
}
