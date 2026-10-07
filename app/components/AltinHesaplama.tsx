"use client";

import { useEffect, useState } from "react";
import {
  AYARLAR,
  hasGram,
  SIKKELER,
  sikkeToplam,
  taki,
  ZIYNET_MILYEM,
} from "../converter/turkishAltin";

const g = (n: number, d = 3) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d })} g`;
const tl = (n: number) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;

function sayi(raw: string) {
  let s = raw.replace(/[\sTL₺g]/gi, "");
  if (!s) return Number.NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : Number.NaN;
}

export default function AltinHesaplama({ baslangic }: { baslangic?: string }) {
  const [modus, setModus] = useState<"sikke" | "taki">("sikke");
  const [adet, setAdet] = useState<Record<string, string>>(() =>
    baslangic
      ? { [baslangic]: "1" }
      : { "ceyrek-altin": "4", "tam-altin": "1" },
  );
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const tur = new URLSearchParams(window.location.search).get("tur");
      if (tur && SIKKELER.some((x) => x.id === tur)) setAdet({ [tur]: "1" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const [fiyat, setFiyat] = useState("");
  const [gram, setGram] = useState("20");
  const [milyem, setMilyem] = useState(916);
  const [iscilik, setIscilik] = useState("20");

  const f = sayi(fiyat);
  const hasFiyat = Number.isFinite(f) && f > 0 ? f : null;
  const adetler = Object.fromEntries(
    Object.entries(adet).map(([k, v]) => [k, Math.floor(sayi(v)) || 0]),
  );
  const toplam = sikkeToplam(adetler);
  const tg = sayi(gram);
  const t =
    Number.isFinite(tg) && tg > 0
      ? taki(tg, milyem, sayi(iscilik) || 0, hasFiyat)
      : null;

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {(
          [
            ["sikke", "Çeyrek, yarım, tam altın"],
            ["taki", "Bilezik ve takı"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={modus === id}
            className={modus === id ? "is-active" : undefined}
            onClick={() => setModus(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="date-calc-input">
        {modus === "sikke" ? (
          <>
            {(["ziynet", "ata"] as const).map((seri) => (
              <div key={seri}>
                <p className="date-calc-note">
                  {seri === "ziynet"
                    ? "Ziynet altınlar"
                    : "Ata / Cumhuriyet altınları"}
                </p>
                <div className="date-calc-fields">
                  {SIKKELER.filter((s) => s.seri === seri).map((s) => (
                    <label className="date-calc-field" key={s.id}>
                      <span>
                        {s.kisa} ({g(s.gram)})
                      </span>
                      <input
                        inputMode="numeric"
                        value={adet[s.id] ?? ""}
                        placeholder="0"
                        onChange={(event) =>
                          setAdet({ ...adet, [s.id]: event.target.value })
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Ağırlık (gram)</span>
              <input
                inputMode="decimal"
                value={gram}
                onChange={(event) => setGram(event.target.value)}
              />
            </label>
            <label className="date-calc-field">
              <span>Ayar</span>
              <select
                value={milyem}
                onChange={(event) => setMilyem(Number(event.target.value))}
              >
                {AYARLAR.map((a) => (
                  <option key={a.milyem} value={a.milyem}>
                    {a.ad}
                  </option>
                ))}
              </select>
            </label>
            <label className="date-calc-field">
              <span>İşçilik (milyem)</span>
              <input
                inputMode="numeric"
                value={iscilik}
                onChange={(event) => setIscilik(event.target.value)}
              />
              <small>
                kuyumcunun eklediği işçilik; bilezikte genelde 10–30
              </small>
            </label>
          </div>
        )}
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Gram altın fiyatı (TL, isteğe bağlı)</span>
            <input
              inputMode="decimal"
              value={fiyat}
              placeholder="ör. 4.250"
              onChange={(event) => setFiyat(event.target.value)}
            />
            <small>24 ayar has altının güncel gram fiyatını girin</small>
          </label>
        </div>
      </div>

      {modus === "sikke" ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Toplam has altın</span>
            <strong>{g(toplam.has)}</strong>
            <em>
              {g(toplam.brut)} 22 ayar altın ·{" "}
              {toplam.ceyrekKarsiligi.toLocaleString("tr-TR", {
                maximumFractionDigits: 2,
              })}{" "}
              çeyrek değerinde
            </em>
          </div>
          {hasFiyat && (
            <div className="date-calc-stat">
              <span>Has altın değeri</span>
              <strong>{tl(toplam.has * hasFiyat)}</strong>
              <em>
                kuyumcu alış-satış fiyatı işçilik ve marj nedeniyle farklı
                olabilir
              </em>
            </div>
          )}
        </div>
      ) : t ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Has altın karşılığı</span>
            <strong>{g(t.has)}</strong>
            <em>
              {g(tg, 2)} × {milyem}/1000 · işçilik dahil {g(t.hasIscilikli)}
            </em>
          </div>
          {hasFiyat && t.deger !== null && t.satisFiyati !== null && (
            <>
              <div className="date-calc-stat">
                <span>Altın değeri (bozdurma)</span>
                <strong>{tl(t.deger)}</strong>
                <em>
                  işçiliksiz has değer; bozdururken bunun biraz altı ödenir
                </em>
              </div>
              <div className="date-calc-stat">
                <span>Tahmini satış fiyatı</span>
                <strong>{tl(t.satisFiyati)}</strong>
                <em>işçilik dahil kuyumcu fiyatı</em>
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="date-calc-note">Lütfen ağırlığı girin.</p>
      )}
      <p className="date-calc-note">
        Darphane altınları 22 ayar ({ZIYNET_MILYEM.toLocaleString("tr-TR")}{" "}
        milyem) basılır; bir çeyrekte {g(hasGram(1.754, ZIYNET_MILYEM))} has
        altın vardır.
      </p>
    </div>
  );
}
