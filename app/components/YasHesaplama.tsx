"use client";

import { useEffect, useState } from "react";
import type { YMD } from "../converter/time/calendars";
import { parseYmd, weekdayOf } from "../converter/time/dateMath";
import { duzeltilmisYas, yasBilgisi, yasFarki } from "../converter/yasHesap";

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const tarih = (d: YMD) => `${d.day} ${AYLAR[d.month - 1]} ${d.year} ${GUNLER[weekdayOf(d)]}`;
const n = (x: number) => x.toLocaleString("tr-TR");
const yag = (y: number, a: number, g: number) => [y ? `${y} yıl` : "", a ? `${a} ay` : "", `${g} gün`].filter(Boolean).join(" ");

function bugunIso() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** Bugünün tarihi: sabit tarihle ön işlenir, tarayıcıda gerçek güne geçer. */
function useBugun(initial: string) {
  const [value, setValue] = useState(initial);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setValue(bugunIso()));
    return () => cancelAnimationFrame(frame);
  }, []);
  return value;
}

type Mod = "yas" | "fark" | "duzeltilmis";

export default function YasHesaplama({ initialDate }: { initialDate: string }) {
  const bugunRaw = useBugun(initialDate);
  const [mod, setMod] = useState<Mod>("yas");
  const [dogum, setDogum] = useState("2000-01-01");
  const [hedef, setHedef] = useState("");
  const [ikinci, setIkinci] = useState("2003-06-15");
  const [hafta, setHafta] = useState("32");
  const bugun = parseYmd(hedef || bugunRaw);
  const d = parseYmd(dogum);

  let sonuc: React.ReactNode = <p className="date-calc-note">Doğum tarihini girin.</p>;
  if (d && bugun && mod === "yas") {
    const r = yasBilgisi(d, bugun);
    sonuc = r ? (
      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>Yaşınız</span>
          <strong>{yag(r.yil, r.ay, r.gun)}</strong>
          <em>{hedef ? `${tarih(bugun)} itibarıyla` : "bugün itibarıyla"}</em>
        </div>
        <div className="date-calc-stat">
          <span>Sonraki doğum günü</span>
          <strong>{r.kalanGun === 0 ? "Bugün, iyi ki doğdunuz!" : `${n(r.kalanGun)} gün kaldı`}</strong>
          <em>
            {tarih(r.sonrakiDogumGunu)} · {r.yeniYas} yaşına giriyorsunuz
          </em>
        </div>
        <div className="date-calc-stat">
          <span>Toplam yaşadığınız</span>
          <strong>{n(r.toplamGun)} gün</strong>
          <em>
            {n(r.toplamAy)} ay · {n(r.toplamHafta)} hafta · {n(r.toplamSaat)} saat
          </em>
        </div>
        <div className="date-calc-stat">
          <span>Doğduğunuz gün</span>
          <strong>{GUNLER[weekdayOf(d)]}</strong>
          <em>
            {d.day} {AYLAR[d.month - 1]} {d.year}
          </em>
        </div>
      </div>
    ) : (
      <p className="date-calc-note">Doğum tarihi, hesaplanan tarihten sonra olamaz.</p>
    );
  } else if (d && mod === "fark") {
    const b = parseYmd(ikinci);
    if (b) {
      const r = yasFarki(d, b);
      sonuc = (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Aradaki yaş farkı</span>
            <strong>{r.buyuk ? yag(r.yil, r.ay, r.gun) : "Aynı gün doğmuşlar"}</strong>
            <em>{r.buyuk ? `${r.buyuk === "a" ? "1. kişi" : "2. kişi"} daha büyük` : ""}</em>
          </div>
          <div className="date-calc-stat">
            <span>Gün olarak</span>
            <strong>{n(r.toplamGun)} gün</strong>
            <em>yaklaşık {n(Math.round(r.toplamGun / 7))} hafta</em>
          </div>
        </div>
      );
    }
  } else if (d && bugun && mod === "duzeltilmis") {
    const h = Number(hafta.replace(",", "."));
    const r = duzeltilmisYas(d, h, bugun);
    sonuc = r ? (
      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>Düzeltilmiş yaş</span>
          <strong>
            {r.duzeltilmis ? yag(r.duzeltilmis.years, r.duzeltilmis.months, r.duzeltilmis.days) : `Tahmini doğum tarihine ${n(-r.duzeltilmisGun)} gün var`}
          </strong>
          <em>gelişim takibinde bu yaş esas alınır (genellikle 2 yaşına kadar)</em>
        </div>
        <div className="date-calc-stat">
          <span>Kronolojik (takvim) yaşı</span>
          <strong>{yag(r.kronolojik.years, r.kronolojik.months, r.kronolojik.days)}</strong>
          <em>aşılar bu yaşa göre yapılır</em>
        </div>
        <div className="date-calc-stat">
          <span>Düşülen süre</span>
          <strong>{n(r.dusulenHafta)} hafta</strong>
          <em>40 − {h} hafta · tahmini doğum tarihi {tarih(r.tahminiDogum)}</em>
        </div>
      </div>
    ) : (
      <p className="date-calc-note">Doğduğu gebelik haftasını 22 ile 42 arasında girin.</p>
    );
  }

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist" aria-label="Hesaplama türü">
        {(
          [
            ["yas", "Kaç yaşındayım?"],
            ["fark", "İki kişi arası yaş farkı"],
            ["duzeltilmis", "Düzeltilmiş yaş (prematüre)"],
          ] as const
        ).map(([v, t]) => (
          <button key={v} type="button" role="tab" aria-selected={mod === v} className={mod === v ? "is-active" : undefined} onClick={() => setMod(v)}>
            {t}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{mod === "fark" ? "1. kişinin doğum tarihi" : mod === "duzeltilmis" ? "Bebeğin doğum tarihi" : "Doğum tarihi"}</span>
            <input type="date" value={dogum} onChange={(e) => setDogum(e.target.value)} />
          </label>
          {mod === "fark" ? (
            <label className="date-calc-field">
              <span>2. kişinin doğum tarihi</span>
              <input type="date" value={ikinci} onChange={(e) => setIkinci(e.target.value)} />
            </label>
          ) : null}
          {mod === "duzeltilmis" ? (
            <label className="date-calc-field">
              <span>Doğduğu gebelik haftası</span>
              <input inputMode="numeric" value={hafta} onChange={(e) => setHafta(e.target.value)} />
            </label>
          ) : null}
          {mod !== "fark" ? (
            <label className="date-calc-field">
              <span>Hangi tarihe göre (boş: bugün)</span>
              <input type="date" value={hedef} onChange={(e) => setHedef(e.target.value)} />
            </label>
          ) : null}
        </div>
      </div>
      {sonuc}
    </div>
  );
}
