"use client";

// Saat bölümünün "Tarih hangi gün?" aracı (Türkçe /hangi-gun): siyah başlıkta tarih seçici ve Anton harflerle dev gün
// adı; altında Hicri ve Rumi karşılığı, yılın kaçıncı günü ve haftası, bugüne uzaklık, resmî tatil durumu ve aynı
// tarihin sonraki yıllarda hangi güne denk geldiği. İlk çizim derleme günüyle yapılır; ?t=YYYY-AA-GG adresi
// paylaşılabilir.
import { useEffect, useState } from "react";
import Link from "@/app/components/SiteLink";
import { gregorianToHijri, gregorianToRumi, HIJRI_MONTHS_TR, RUMI_MONTHS, type YMD } from "../../converter/time/calendars";
import { dayOfYear, diffDays, isoWeek, parseYmd, weekdayOf, ymdKey } from "../../converter/time/dateMath";
import { turkeyHolidays } from "../../converter/time/holidays";

const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const AY_SLUG = ["ocak", "subat", "mart", "nisan", "mayis", "haziran", "temmuz", "agustos", "eylul", "ekim", "kasim", "aralik"];

const tarihYaz = (d: YMD) => `${d.day} ${AYLAR[d.month - 1]} ${d.year}`;

export default function HangiGun({ bugun, takvimYillari }: { bugun: YMD; takvimYillari: number[] }) {
  const [deger, setDeger] = useState(ymdKey(bugun));
  useEffect(() => {
    const t = new URLSearchParams(location.search).get("t");
    if (t && parseYmd(t)) setDeger(t); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const d = parseYmd(deger);
  const sec = (v: string) => {
    setDeger(v);
    try {
      const u = new URL(location.href);
      u.searchParams.set("t", v);
      history.replaceState(null, "", u);
    } catch {
      // Adres güncellenemedi; hesap yine çalışır.
    }
  };

  if (!d) {
    return (
      <section className="saat-hero hg-hero">
        <div className="saat-hero-ic">
          <h1 className="saat-baslik">Tarih hangi gün?</h1>
          <input type="date" value={deger} onChange={(e) => sec(e.target.value)} />
        </div>
      </section>
    );
  }

  const fark = diffDays(bugun, d);
  const h = gregorianToHijri(d);
  const r = gregorianToRumi(d);
  const tatil = turkeyHolidays(d.year).find((x) => ymdKey(x.date) === ymdKey(d));
  const sonraki = [1, 2, 3, 4, 5].map((n) => {
    const y = { year: d.year + n, month: d.month, day: d.month === 2 && d.day === 29 ? 28 : d.day };
    return { y, gun: GUNLER[weekdayOf(y)] };
  });

  return (
    <section className="saat-hero hg-hero">
      <div className="saat-hero-ic">
        <div className="saat-hero-ust">
          <div>
            <h1 className="saat-baslik">Tarih hangi gün?</h1>
            <p className="saat-ulke">Bir tarih seçin; haftanın hangi gününe denk geldiğini, Hicri karşılığını ve kalan günü görün</p>
          </div>
        </div>

        <div className="uyku-kac-saat sh-girdiler">
          <div className="uyku-kac-saat-satir">
            <label>
              <span>Tarih</span>
              <input type="date" value={deger} min="1900-01-01" max="2100-12-31" onChange={(e) => e.target.value && sec(e.target.value)} />
            </label>
            <div className="saat-eylemler">
              <button type="button" onClick={() => sec(ymdKey(bugun))}>
                Bugün
              </button>
            </div>
          </div>
        </div>

        <p className="saat-ulke hg-tarih">{tarihYaz(d)}</p>
        <p className="saat-dev hg-dev" aria-live="polite">
          {GUNLER[weekdayOf(d)]}
        </p>
        <p className="saat-alt">
          {fark === 0 ? (
            <b>Bugün</b>
          ) : fark > 0 ? (
            <>
              <b>{fark.toLocaleString("tr-TR")} gün</b> sonra
            </>
          ) : (
            <>
              <b>{(-fark).toLocaleString("tr-TR")} gün</b> önce
            </>
          )}{" "}
          · yılın {dayOfYear(d)}. günü · {isoWeek(d).week}. hafta
          {tatil ? (
            <>
              {" "}
              · <b>{tatil.kind === "full" ? "resmî tatil" : "yarım gün tatil"}</b>: {tatil.name}
            </>
          ) : null}
        </p>

        <ul className="gs-parca hg-bilgi">
          <li>
            <b>{h.day}</b>
            <span>
              {HIJRI_MONTHS_TR[h.month - 1]} {h.year} (Hicri)
            </span>
          </li>
          {r ? (
            <li>
              <b>{r.day}</b>
              <span>
                {RUMI_MONTHS[r.month - 1]} {r.year} (Rumi)
              </span>
            </li>
          ) : null}
          {sonraki.slice(0, 3).map(({ y, gun }) => (
            <li key={y.year}>
              <b>{y.year}</b>
              <span>{gun}</span>
            </li>
          ))}
        </ul>

        {takvimYillari.includes(d.year) ? (
          <p className="saat-alt">
            <Link href={`/takvim/${d.year}/${AY_SLUG[d.month - 1]}#gun-${d.day}`} prefetch={false}>
              {AYLAR[d.month - 1]} {d.year} takviminde gör →
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
