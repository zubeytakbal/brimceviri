"use client";

import { useEffect, useMemo, useState } from "react";
import { kazaOrucu, SEFER_KM, SEFER_METIN, seferDurumu, umreMesafe } from "../../converter/diniHesaplar";
import { airKm, roadKm } from "../../converter/geo/provinceDistances";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { SURELER } from "../../converter/sureler";
import { SURE_META } from "../../converter/sureMeta";

const fmt = (n: number, d = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: d });
const sayi = (raw: string) => {
  const s = raw.trim().replace(/\s/g, "");
  if (!s) return Number.NaN;
  const n = Number(s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s);
  return Number.isFinite(n) ? n : Number.NaN;
};
const sortedProvinces = [...turkeyProvinces].sort((a, b) => a.name.localeCompare(b.name, "tr"));

function Field({ label, value, onChange, suffix }: { label: string; value: string; onChange: (v: string) => void; suffix?: string }) {
  return (
    <label className="date-calc-field">
      <span>
        {label}
        {suffix ? ` (${suffix})` : ""}
      </span>
      <input inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function ProvinceSelect({ label, value, onChange }: { label: string; value: number; onChange: (plate: number) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {sortedProvinces.map((p) => (
          <option key={p.plate} value={p.plate}>
            {p.name}
          </option>
        ))}
      </select>
    </label>
  );
}


/* ---------------- Seferî mesafe ---------------- */

export function SeferiHesaplama({ initialA = 34, initialB = 16 }: { initialA?: number; initialB?: number }) {
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [manuel, setManuel] = useState("");
  const A = turkeyProvinces[a - 1];
  const B = turkeyProvinces[b - 1];
  const road = a === b ? 0 : roadKm(A, B);
  const durum = a === b ? null : seferDurumu(road);
  const manuelKm = sayi(manuel);
  const manuelDurum = Number.isFinite(manuelKm) ? seferDurumu(manuelKm, false) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <ProvinceSelect label="Nereden" value={a} onChange={setA} />
          <ProvinceSelect label="Nereye" value={b} onChange={setB} />
        </div>
      </div>

      {a === b ? (
        <p className="date-calc-note">
          Aynı il içinde de seferî olunabilir: büyük illerde ilçeler arası mesafe {SEFER_KM} km'yi aşabilir. Mesafeyi alttaki alana yazın.
        </p>
      ) : (
        durum && (
          <div className="date-calc-results">
            <div className={`date-calc-stat is-main sefer-${durum}`}>
              <span>
                {A.name} → {B.name}
              </span>
              <strong>{SEFER_METIN[durum].baslik}</strong>
              <em>{SEFER_METIN[durum].aciklama}</em>
            </div>
            <div className="date-calc-stat">
              <span>Karayolu (il merkezleri)</span>
              <strong>{fmt(road)} km</strong>
              <em>Karayolları Genel Müdürlüğü</em>
            </div>
            <div className="date-calc-stat">
              <span>Kuş uçuşu</span>
              <strong>{fmt(airKm(A, B))} km</strong>
              <em>seferîlikte yol mesafesi esas alınır</em>
            </div>
          </div>
        )
      )}

      <div className="date-calc-input">
        <strong className="date-calc-input-title">Kendi mesafenizi girin</strong>
        <div className="date-calc-fields">
          <Field label="Yerleşim sınırından gidilecek yere" suffix="km" value={manuel} onChange={setManuel} />
        </div>
        <p className="zins-ziel-ergebnis">
          {manuelDurum ? `${SEFER_METIN[manuelDurum].baslik}. ${manuelDurum === "seferi" ? "Gidilecek yerde 15 günden az kalınacaksa." : ""}` : "Harita uygulamasındaki yol mesafesini yazın; sadece gidiş mesafesi esas alınır."}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Sure bulucu ---------------- */

const normalize = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/['’]/g, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/suresi?/g, "")
    .trim();

export function SureBulucu() {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const slug = new URLSearchParams(window.location.search).get("sure");
      const sure = slug ? SURELER.find((item) => item.slug === slug) : null;
      if (sure) setQuery(sure.ad);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return SURELER;
    const asNumber = Number(q);
    return SURELER.filter((s) => (Number.isInteger(asNumber) ? s.no === asNumber : normalize(s.ad).includes(q)));
  }, [query]);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field sure-arama">
            <span>Sure adı ya da sıra numarası</span>
            <input type="search" value={query} placeholder="örn. Yasin, Mülk, 18" onChange={(event) => setQuery(event.target.value)} />
          </label>
        </div>
      </div>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Sıra</th>
              <th scope="col">Sure</th>
              <th scope="col">Ayet</th>
              <th scope="col">Cüz</th>
              <th scope="col">İndiği yer (iniş sırası)</th>
              <th scope="col">Sayfa*</th>
            </tr>
          </thead>
          <tbody>
            {results.map((s) => {
              const meta = SURE_META[s.no];
              return (
                <tr key={s.no} id={s.slug}>
                  <td>{s.no}</td>
                  <th scope="row">{s.ad}</th>
                  <td>{s.ayet}</td>
                  <td>{s.cuzBas === s.cuzSon ? `${s.cuzBas}.` : `${s.cuzBas}–${s.cuzSon}.`}</td>
                  <td>
                    {meta.mekki ? "Mekke" : "Medine"} ({meta.nuzul}.)
                  </td>
                  <td>{meta.sayfaBas === meta.sayfaSon ? meta.sayfaBas : `${meta.sayfaBas}–${meta.sayfaSon}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {results.length === 0 && <p className="date-calc-note">Bu adla bir sure bulunamadı. Yazımı kontrol edin ya da sıra numarası girin.</p>}
      <p className="date-calc-note">* Medine mushafına (604 sayfa) göre; başka baskılarda bir iki sayfa kayabilir.</p>
    </div>
  );
}

/* ---------------- Umre mesafesi ---------------- */

const TAVAF_KONUM: Array<[string, string]> = [
  ["3", "Kâbe'ye çok yakın (~3 m)"],
  ["15", "Mataf ortası (~15 m)"],
  ["35", "Mataf kenarı (~35 m)"],
];

export function UmreMesafe() {
  const [uzaklik, setUzaklik] = useState("15");
  const [tavafSayisi, setTavafSayisi] = useState("1");
  const [say, setSay] = useState(true);
  const [safaMerve, setSafaMerve] = useState("400");
  const [adim, setAdim] = useState("70");
  const [hiz, setHiz] = useState("3");
  const r = umreMesafe({
    duvaraUzaklikM: sayi(uzaklik),
    tavafSayisi: sayi(tavafSayisi),
    sayYapilacak: say,
    safaMerveM: sayi(safaMerve),
    adimCm: sayi(adim),
    hizKmSaat: sayi(hiz),
  });

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" aria-label="Tavaf konumu">
          {TAVAF_KONUM.map(([value, label]) => (
            <button key={value} type="button" onClick={() => setUzaklik(value)}>
              {label}
            </button>
          ))}
        </div>
        <div className="date-calc-fields is-amounts">
          <Field label="Kâbe duvarına uzaklık" suffix="m" value={uzaklik} onChange={setUzaklik} />
          <Field label="Tavaf sayısı" value={tavafSayisi} onChange={setTavafSayisi} />
          <Field label="Adım uzunluğu" suffix="cm" value={adim} onChange={setAdim} />
          <Field label="Yürüme hızı" suffix="km/saat" value={hiz} onChange={setHiz} />
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={say} onChange={(event) => setSay(event.target.checked)} />
          Sa'y da yapılacak
        </label>
        {say && (
          <div className="date-calc-fields">
            <Field label="Safâ–Merve arası (tek yön)" suffix="m" value={safaMerve} onChange={setSafaMerve} />
          </div>
        )}
      </div>

      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Toplam yürüyüş</span>
            <strong>{fmt(r.toplamM / 1000, 2)} km</strong>
            <em>
              yaklaşık {fmt(r.adim)} adım, {fmt(r.dakika)} dakika
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Bir şavt (tur)</span>
            <strong>{fmt(r.tavafSavtM)} m</strong>
          </div>
          <div className="date-calc-stat">
            <span>Tavaf (7 şavt)</span>
            <strong>{fmt(r.tavafToplamM)} m</strong>
            <em>{fmt(sayi(tavafSayisi))} tavaf</em>
          </div>
          {say && (
            <div className="date-calc-stat">
              <span>Sa'y (7 şavt)</span>
              <strong>{fmt(r.sayToplamM)} m</strong>
            </div>
          )}
        </div>
      ) : (
        <p className="date-calc-note">Değerleri kontrol edin: uzaklık 0–300 m, Safâ–Merve 300–600 m, adım 30–150 cm, hız 0–10 km/saat.</p>
      )}
    </div>
  );
}

/* ---------------- Kaza orucu ---------------- */

export function KazaOrucuHesaplama() {
  const [ramazan, setRamazan] = useState("1");
  const [gunSayisi, setGunSayisi] = useState("30");
  const [ekGun, setEkGun] = useState("0");
  const [haftalik, setHaftalik] = useState("2");
  const r = kazaOrucu(sayi(ramazan), sayi(gunSayisi), sayi(ekGun), sayi(haftalik));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Field label="Hiç tutulmayan Ramazan sayısı" value={ramazan} onChange={setRamazan} />
          <Field label="Ramazan kaç gün sürdü" suffix="29 ya da 30" value={gunSayisi} onChange={setGunSayisi} />
          <Field label="Ayrıca tutulamayan günler" value={ekGun} onChange={setEkGun} />
          <Field label="Haftada kaç gün tutacaksınız" suffix="1–7" value={haftalik} onChange={setHaftalik} />
        </div>
        <div className="date-calc-chips" aria-label="Haftalık plan">
          {[
            ["2", "Pazartesi + Perşembe"],
            ["3", "Haftada 3 gün"],
            ["7", "Her gün"],
          ].map(([value, label]) => (
            <button key={value} type="button" onClick={() => setHaftalik(value)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Kaza orucu borcu</span>
            <strong>{fmt(r.gun)} gün</strong>
            <em>
              haftada {fmt(sayi(haftalik))} gün tutarak {fmt(r.bitisHafta)} haftada ({fmt(r.bitisHafta / 52, 1)} yıl) biter
            </em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Değerleri kontrol edin: Ramazan 29 ya da 30 gün, haftada 1–7 gün.</p>
      )}
    </div>
  );
}
