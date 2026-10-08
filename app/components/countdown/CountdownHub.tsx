import Link from "@/app/components/SiteLink";
import { countdownEvents, countdownPath } from "../../converter/time/countdownEvents";
import type { FaqItem } from "../../converter/faqSchema";
import TimeToolPage from "../time/TimeToolPage";
import { customCountdownCopy } from "./countdownCopy";
import CustomCountdown from "./CustomCountdown";
import { eventSummary, formatEventDate } from "./CountdownEventPage";

// Geri sayim hub'i: yaklasan tum etkinlikler (en yakindan uzaga) + kendi geri sayimini olustur.
export default function CountdownHub({ lang }: { lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const now = new Date();
  const events = countdownEvents
    .filter((event) => event.lang === lang)
    .map((event) => ({ event, ...eventSummary(event, now) }))
    .filter((item) => item.next)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0));

  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Geri sayımlar hangi saate göre hesaplanıyor?",
          answer: "Türkiye'deki bayram ve özel günler Türkiye saatine (UTC+3) göre, etkinlik gününün 00:00'ına kadar sayılır. Kendi oluşturduğun geri sayımlar ise cihazının saatine göre çalışır.",
        },
        {
          question: "Tarih geçince ne oluyor?",
          answer: "Sayfalar her gün kendini yeniler ve etkinlik günü bitince otomatik olarak bir sonraki yılın tarihine geçer. Açık bıraktığın sayfadaki sayaç da gün bitince yeni tarihe kendiliğinden geçer.",
        },
        {
          question: "Dini bayram tarihleri nereden alınıyor?",
          answer: "Diyanet İşleri Başkanlığı'nın ilan ettiği yıllar resmî takvimden alınır. Henüz ilan edilmemiş yıllar Hicri takvimle (Umm al-Qura) hesaplanır ve \"tahmini\" diye işaretlenir.",
        },
        {
          question: "Kendi geri sayımımı arkadaşıma gönderebilir miyim?",
          answer: "Evet. Oluşturduğun geri sayımın altındaki \"Paylaşım linkini kopyala\" düğmesine bas; linki açan kişi aynı geri sayımı görür.",
        },
      ]
    : [
        {
          question: "Which time zone do the countdowns use?",
          answer: "Holiday countdowns run to midnight at the start of the day in your own time zone, as do the countdowns you create.",
        },
        {
          question: "What happens after the date passes?",
          answer: "Pages refresh daily and roll over to next year's date automatically once the day is over. A countdown left open in your browser also switches to the next date by itself.",
        },
        {
          question: "Can I share my own countdown?",
          answer: "Yes. Press \"Copy share link\" under your countdown; anyone who opens the link sees the same countdown.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: tr ? "/geri-sayim" : "/en/countdown", label: tr ? "Geri Sayım" : "Countdown" },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      title={tr ? "Geri Sayım: Kaç Gün Kaldı?" : "Countdown: How Many Days Until…?"}
      intro={
        tr
          ? "Yılbaşına, bayramlara ve özel günlere kaç gün kaldığını tek listede gör; ya da doğum günün, sınavın veya tatilin için kendi geri sayımını oluşturup paylaş."
          : "See how many days are left until holidays and special days in one list, or create and share your own countdown for a birthday, exam or trip."
      }
      tool={<CustomCountdown lang={lang} copy={customCountdownCopy[lang]} basePath={tr ? "/geri-sayim" : "/en/countdown"} />}
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: tr
          ? [
              { href: "/resmi-tatiller", label: "Resmî Tatiller ve Köprü Günleri" },
              { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki Tarih Arası Gün Hesaplama" },
              { href: "/dunya-saatleri", label: "Dünya Saatleri" },
              { href: "/online-saat", label: "Online Saat" },
              { href: "/zamanlayici", label: "Zamanlayıcı" },
              { href: "/online-alarm-kur", label: "Online Alarm" },
              { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
            ]
          : [
              { href: "/en/federal-holidays", label: "US Federal Holidays" },
              { href: "/en/days-between-dates", label: "Days Between Dates" },
              { href: "/en/world-clock", label: "World Clock" },
              { href: "/en/online-clock", label: "Online Clock" },
              { href: "/en/timer", label: "Timer" },
              { href: "/en/alarm-clock", label: "Alarm Clock" },
            ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "yaklasan", label: tr ? "Yaklaşan günler" : "Upcoming dates" },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="yaklasan">{tr ? "Yaklaşan günler" : "Upcoming dates"}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Gün" : "Occasion"}</th>
              <th>{tr ? "Tarih" : "Date"}</th>
              <th>{tr ? "Kalan" : "Days left"}</th>
            </tr>
          </thead>
          <tbody>
            {events.map(({ event, next, days, started }) => (
              <tr key={event.id}>
                <td>
                  <Link href={countdownPath(event)} prefetch={false}>
                    {event.name}
                  </Link>
                </td>
                <td>
                  {formatEventDate(next!, lang)}
                  {next!.estimated && (tr ? " (tahmini)" : " (estimated)")}
                </td>
                <td>
                  <strong>{days === 0 ? (started ? (tr ? "Bugün" : "Today") : tr ? "1 günden az" : "< 1 day") : `${days} ${tr ? "gün" : "days"}`}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
