"use client";

// /kutsal-kitap-okuma-plani aracı: kapsam, gün sayısı ve başlangıç tarihine göre tarihli günlük okuma listesi;
// okunan bölüm sayısına göre plana yetişmek için gereken günlük hız.
import { useEffect, useState } from "react";
import { aralikMetni, KAPSAMLAR, kapsamKitaplari, okumaPlani, planDurumu, type Kapsam, type Kitap } from "../../converter/christian/kutsalKitap";
import { addDaysYmd, diffDays, parseYmd, ymdKey } from "../../converter/time/dateMath";

const SURELER: Array<[number, string]> = [
  [30, "30 gün"],
  [90, "3 ay (90 gün)"],
  [180, "6 ay (180 gün)"],
  [365, "1 yıl (365 gün)"],
  [730, "2 yıl (730 gün)"],
];
const tarih = (d: { year: number; month: number; day: number }) =>
  new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", weekday: "short", timeZone: "UTC" }).format(Date.UTC(d.year, d.month - 1, d.day));
const tamTarih = (d: { year: number; month: number; day: number }) =>
  new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long", timeZone: "UTC" }).format(Date.UTC(d.year, d.month - 1, d.day));
const sayi = (x: number, b = 1) => x.toLocaleString("tr-TR", { maximumFractionDigits: b });

export default function OkumaPlani({ kitaplar, derlemeGunu }: { kitaplar: Kitap[]; derlemeGunu: string }) {
  // İlk çizim derleme günüyle yapılır, tarayıcıda Türkiye saatine göre bugüne geçilir.
  const [bugun, setBugun] = useState(derlemeGunu);
  const [kapsam, setKapsam] = useState<Kapsam>("tumu");
  const [gun, setGun] = useState("365");
  const [baslangic, setBaslangic] = useState(derlemeGunu);
  useEffect(() => {
    const t = new Date(Date.now() + 3 * 3600000);
    const k = ymdKey({ year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() });
    setBugun(k); // eslint-disable-line react-hooks/set-state-in-effect
    setBaslangic((b) => (b === derlemeGunu ? k : b));
  }, [derlemeGunu]);
  const [okunan, setOkunan] = useState("");
  const [hepsi, setHepsi] = useState(false);

  const secili = kapsamKitaplari(kitaplar, kapsam);
  const toplam = secili.reduce((t, k) => t + k.bolum, 0);
  const plan = okumaPlani(secili, Number(gun));
  const bas = parseYmd(baslangic);
  const bugunYmd = parseYmd(bugun)!;
  const gecen = bas ? Math.max(0, diffDays(bas, bugunYmd)) : 0;
  const durum = okunan.trim() && bas ? planDurumu(toplam, Number(okunan), plan.length, gecen) : null;
  const gosterilen = hepsi ? plan : plan.slice(0, 14);

  return (
    <div className="okuma-plani">
      <div className="okuma-secim">
        <label className="hizli-alan">
          <span>Ne okunacak?</span>
          <select value={kapsam} onChange={(e) => setKapsam(e.target.value as Kapsam)}>
            {KAPSAMLAR.map((k) => (
              <option key={k.id} value={k.id}>
                {k.ad}
              </option>
            ))}
          </select>
        </label>
        <label className="hizli-alan">
          <span>Süre</span>
          <select value={gun} onChange={(e) => setGun(e.target.value)}>
            {SURELER.map(([g, ad]) => (
              <option key={g} value={g}>
                {ad}
              </option>
            ))}
          </select>
        </label>
        <label className="hizli-alan">
          <span>Başlangıç</span>
          <input type="date" value={baslangic} onChange={(e) => setBaslangic(e.target.value)} />
        </label>
      </div>

      {plan.length ? (
        <p className="okuma-ozet" aria-live="polite">
          {secili.length} kitap, {sayi(toplam, 0)} bölüm: günde ortalama {sayi(toplam / plan.length)} bölüm ({plan.length} gün)
          {bas ? `. Son okuma günü ${tamTarih(addDaysYmd(bas, plan.length - 1))}.` : "."}
        </p>
      ) : null}

      <div className="holiday-table-wrap">
        <table className="holiday-table okuma-tablo">
          <thead>
            <tr>
              <th scope="col">Gün</th>
              <th scope="col">Tarih</th>
              <th scope="col">Okuma</th>
              <th scope="col">Bölüm</th>
            </tr>
          </thead>
          <tbody>
            {gosterilen.map((g) => (
              <tr key={g.gun} className={bas && diffDays(addDaysYmd(bas, g.gun - 1), bugunYmd) === 0 ? "is-bugun" : undefined}>
                <td>{g.gun}</td>
                <td>{bas ? tarih(addDaysYmd(bas, g.gun - 1)) : "—"}</td>
                <td>{aralikMetni(g.ilk, g.son)}</td>
                <td>{g.adet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {plan.length > 14 ? (
        <button type="button" className="okuma-hepsi" onClick={() => setHepsi((h) => !h)}>
          {hepsi ? "İlk 14 günü göster" : `Planın tamamını göster (${plan.length} gün)`}
        </button>
      ) : null}

      <div className="okuma-durum">
        <h3>Plana yetişmek için</h3>
        <label className="hizli-alan">
          <span>Şimdiye kadar okuduğum bölüm sayısı</span>
          <input type="text" inputMode="numeric" value={okunan} onChange={(e) => setOkunan(e.target.value)} placeholder={`0 – ${toplam}`} />
        </label>
        {durum ? (
          <p aria-live="polite">
            Başlangıçtan bu yana {gecen} gün geçti; plana göre {durum.beklenen} bölüm okunmuş olmalıydı.{" "}
            {durum.geride > 0 ? `${durum.geride} bölüm gerideniz. ` : "Plana göre geride değilsiniz. "}
            {durum.yeniHiz !== null
              ? `Kalan ${sayi(durum.kalanBolum, 0)} bölümü ${durum.kalanGun} günde bitirmek için günde ${sayi(durum.yeniHiz)} bölüm okuyun.`
              : `Plan süresi doldu; kalan ${durum.kalanBolum} bölüm var.`}
          </p>
        ) : okunan.trim() ? (
          <p>0 ile {toplam} arasında bir sayı ve geçerli bir başlangıç tarihi girin.</p>
        ) : null}
      </div>
    </div>
  );
}
