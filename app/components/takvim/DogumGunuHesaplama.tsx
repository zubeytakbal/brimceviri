"use client";

import { useEffect, useState } from "react";
import Link from "@/app/components/SiteLink";
import {
  AY_ADLARI,
  GUN_ADLARI,
  gunBilgisi,
  halkDonemi,
  halkMetni,
  ozelGunPath,
  tarihliAd,
} from "../../converter/calendar/trTakvim";
import {
  gregorianToHijri,
  HIJRI_MONTHS_TR,
  type YMD,
} from "../../converter/time/calendars";
import {
  addDaysYmd,
  diffDays,
  formatYmd,
  isLeapYear,
  parseYmd,
  weekdayOf,
  ymdKey,
} from "../../converter/time/dateMath";
import TakvimGorsel from "./TakvimGorsel";

const bugunTr = (): YMD => {
  const d = new Date(Date.now() + 3 * 3600000);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
};

const sayi = (n: number) => n.toLocaleString("tr-TR");

/** Doğum gününün belirli bir yıldaki karşılığı; 29 Şubat artık olmayan yılda 1 Mart sayılır. */
function yildonumu(d: YMD, year: number): YMD {
  if (d.month === 2 && d.day === 29 && !isLeapYear(year))
    return { year, month: 3, day: 1 };
  return { year, month: d.month, day: d.day };
}

/** Bugünden sonraki ilk Hicri doğum günü (aynı Hicri ay ve gün). */
function hicriDogumGunu(dogum: YMD, bugun: YMD): YMD | null {
  const h = gregorianToHijri(dogum);
  for (let i = 0; i < 400; i += 1) {
    const d = addDaysYmd(bugun, i);
    const x = gregorianToHijri(d);
    if (
      x.month === h.month &&
      (x.day === h.day ||
        (h.day === 30 &&
          x.day === 29 &&
          gregorianToHijri(addDaysYmd(d, 1)).day === 1))
    )
      return d;
  }
  return null;
}

export default function DogumGunuHesaplama() {
  const [deger, setDeger] = useState("");
  const [bugun, setBugun] = useState<YMD | null>(null);

  useEffect(() => {
    const b = bugunTr();
    const fromUrl = new URLSearchParams(window.location.search).get("tarih");
    setBugun(b); // eslint-disable-line react-hooks/set-state-in-effect
    setDeger(
      fromUrl && parseYmd(fromUrl)
        ? fromUrl
        : ymdKey({ year: b.year - 30, month: b.month, day: b.day }),
    );
  }, []);

  const d = parseYmd(deger);
  const gecerli =
    d && bugun && d.year >= 1900 && diffDays(d, bugun) >= 0 ? d : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Doğum tarihi</span>
            <input
              type="date"
              min="1900-01-01"
              value={deger}
              onChange={(event) => setDeger(event.target.value)}
            />
          </label>
        </div>
      </div>
      {gecerli && bugun ? (
        <Sonuc d={gecerli} bugun={bugun} />
      ) : (
        <p className="date-calc-note">
          {bugun
            ? "1900 ile bugün arasında bir doğum tarihi girin."
            : "Yükleniyor…"}
        </p>
      )}
    </div>
  );
}

function Sonuc({ d, bugun }: { d: YMD; bugun: YMD }) {
  const b = gunBilgisi(d);
  const yasanan = diffDays(d, bugun);
  let sonraki = yildonumu(d, bugun.year);
  if (diffDays(bugun, sonraki) < 0) sonraki = yildonumu(d, bugun.year + 1);
  const kalan = diffDays(bugun, sonraki);
  const yas = sonraki.year - d.year;
  const onBin = addDaysYmd(d, 10000);
  const hicriSonraki = hicriDogumGunu(d, bugun);
  const hicriYas = hicriSonraki
    ? gregorianToHijri(hicriSonraki).year - b.hicri.year
    : null;
  const gelecek = Array.from({ length: 8 }, (_, i) =>
    yildonumu(d, sonraki.year + i),
  );
  const ayni = gelecek.find((g) => weekdayOf(g) === weekdayOf(d));
  const halk = halkDonemi(d);

  return (
    <>
      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>Doğduğun gün</span>
          <strong>{b.gunAdi}</strong>
          <em>
            {formatYmd(d, "tr", false)} · yılın {b.yilinGunu}. günü, {b.hafta}.
            haftası
          </em>
        </div>
        <div className="date-calc-stat">
          <span>Hicri doğum tarihin</span>
          <strong>{b.hicriMetin}</strong>
          <em>
            {hicriSonraki
              ? `Sonraki Hicri doğum günün ${formatYmd(hicriSonraki, "tr", false)}; Hicri takvimde ${hicriYas} yaşına giriyorsun`
              : null}
          </em>
        </div>
        {b.rumiMetin ? (
          <div className="date-calc-stat">
            <span>Rumi takvimde</span>
            <strong>{b.rumiMetin}</strong>
            <em>Osmanlı mali takvimi</em>
          </div>
        ) : null}
        <div className="date-calc-stat">
          <span>Doğduğun gece ay</span>
          <strong>{b.ayEvresi}</strong>
          <em>%{Math.round(b.ayAydinlik * 100)} aydınlık</em>
        </div>
        <div className="date-calc-stat">
          <span>Halk takviminde</span>
          <strong>{halkMetni(halk)}</strong>
          <em>
            <Link href="/firtina-takvimi" prefetch={false}>
              Halk takvimi nedir?
            </Link>
          </em>
        </div>
        <div className="date-calc-stat">
          <span>Yaşadığın gün</span>
          <strong>{sayi(yasanan)} gün</strong>
          <em>
            {sayi(Math.floor(yasanan / 7))} hafta · 10.000. günün{" "}
            {diffDays(bugun, onBin) >= 0 ? "" : "oldu: "}
            {formatYmd(onBin, "tr", false)}
          </em>
        </div>
        <div className="date-calc-stat">
          <span>Sonraki doğum günün</span>
          <strong>
            {kalan === 0 ? "Bugün! İyi ki doğdun" : `${sayi(kalan)} gün kaldı`}
          </strong>
          <em>
            {formatYmd(sonraki, "tr")} · {yas} yaşına giriyorsun
          </em>
        </div>
      </div>

      {b.etkinlikler.length ? (
        <div className="takvim-kart">
          <TakvimGorsel gorsel={b.etkinlikler[0].etkinlik.gorsel} size={96} />
          <div>
            <span className="takvim-kat kat-ozel">
              Doğduğun gün aynı zamanda
            </span>
            <h2>
              {b.etkinlikler.map((t, i) => (
                <span key={t.etkinlik.id}>
                  {i ? ", " : ""}
                  <Link href={ozelGunPath(t.etkinlik.id)} prefetch={false}>
                    {tarihliAd(t)}
                  </Link>
                </span>
              ))}
            </h2>
            <p>{b.etkinlikler[0].etkinlik.kisa}</p>
          </div>
        </div>
      ) : null}

      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Yıl</th>
              <th scope="col">Doğum günün</th>
              <th scope="col">Yaş</th>
            </tr>
          </thead>
          <tbody>
            {gelecek.map((g) => (
              <tr
                key={g.year}
                className={
                  weekdayOf(g) === 0 || weekdayOf(g) === 6
                    ? "is-weekend"
                    : undefined
                }
              >
                <td>{g.year}</td>
                <td>
                  {g.day} {AY_ADLARI[g.month - 1]}{" "}
                  <strong>{GUN_ADLARI[weekdayOf(g)]}</strong>
                </td>
                <td>{g.year - d.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="date-calc-note">
        {ayni
          ? `Doğum günün ${ayni.year} yılında yeniden doğduğun gün olan ${b.gunAdi} gününe denk geliyor.`
          : "Doğum günün önümüzdeki 8 yıl içinde doğduğun güne denk gelmiyor."}{" "}
        Takvim 28 yılda bir aynı sıraya döner.
        {d.month === 2 && d.day === 29
          ? " 29 Şubat doğumluların doğum günü artık yıl olmayan yıllarda 1 Mart olarak gösterilir."
          : ""}{" "}
        Hicri doğum günün ({b.hicri.day} {HIJRI_MONTHS_TR[b.hicri.month - 1]})
        miladi takvimde her yıl yaklaşık 11 gün öne gelir.
      </p>
    </>
  );
}
