"use client";

// Türkçe ana sayfanın ilk ekranındaki çevirici: sekmeden türü seç, değeri yaz, iki listeden birer tıkla birimleri seç.
// Listeler açılır menü değil, hep açık durur (tek tıkla seçim). İlk görünüm sunucuda örnek değerle derlenir.
// Seçilen çiftin kendi dönüşüm sayfası varsa sonuçla birlikte o sayfaya bağlantı verilir.
import { useId, useState } from "react";
import Link from "@/app/components/SiteLink";
import type { AnaCeviriciVeri } from "../converter/anaCeviriciVeri";
import { birimCevir } from "../converter/hizliCevir";

const DOVIZ = "doviz";

type Secim = { from: string; to: string };

const sayiOku = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));

function bicimle(x: number) {
  if (!Number.isFinite(x)) return "—";
  if (x !== 0 && (Math.abs(x) >= 1e12 || Math.abs(x) < 1e-6)) return x.toExponential(4).replace(".", ",");
  return Number(x.toPrecision(7)).toLocaleString("tr-TR", { maximumFractionDigits: 10 });
}

function ilkSecim(veri: AnaCeviriciVeri, tur: string): Secim {
  if (tur === DOVIZ) return { from: "USD", to: "TRY" };
  const s = veri.sekmeler.find((x) => x.key === tur)!;
  return { from: s.birimler[0].s, to: s.birimler[1].s };
}

export default function AnaCevirici({ veri }: { veri: AnaCeviriciVeri }) {
  const id = useId();
  const [tur, setTur] = useState(veri.sekmeler[0].key);
  const [deger, setDeger] = useState("1");
  const [secimler, setSecimler] = useState<Record<string, Secim>>(() => ({ [veri.sekmeler[0].key]: ilkSecim(veri, veri.sekmeler[0].key) }));
  const secim = secimler[tur] ?? ilkSecim(veri, tur);
  const sec = (yeni: Secim) => setSecimler((eski) => ({ ...eski, [tur]: yeni }));

  const doviz = tur === DOVIZ ? veri.doviz : null;
  const sekme = doviz ? null : veri.sekmeler.find((x) => x.key === tur)!;

  const secenekler = doviz
    ? Object.keys(doviz.kurlar).map((kod) => ({ deger: kod, ad: `${doviz.adlar[kod]} (${kod})`, simge: kod }))
    : sekme!.birimler.map((b) => ({ deger: b.s, ad: b.n, simge: b.d ?? b.s }));
  const fromS = secenekler.find((o) => o.deger === secim.from) ?? secenekler[0];
  const toS = secenekler.find((o) => o.deger === secim.to) ?? secenekler[1];

  const v = sayiOku(deger);
  const gecerli = deger.trim() !== "" && Number.isFinite(v);
  let sonuc = NaN;
  if (gecerli) {
    if (doviz) sonuc = (v / doviz.kurlar[fromS.deger]) * doviz.kurlar[toS.deger];
    else sonuc = birimCevir(sekme!, v, sekme!.birimler.find((b) => b.s === fromS.deger)!, sekme!.birimler.find((b) => b.s === toS.deger)!);
  }

  const sayfa = sekme ? veri.sayfalar[`${sekme.key}|${fromS.deger}|${toS.deger}`] : undefined;
  const turler = [...veri.sekmeler.map((s) => ({ key: s.key, ad: s.ad })), ...(veri.doviz ? [{ key: DOVIZ, ad: "Döviz" }] : [])];
  const listeBoyu = Math.min(secenekler.length, 11);

  return (
    <section className="ana-cevirici" aria-label="Birim çevirici">
      <div className="ana-cevirici-sekmeler" role="tablist" aria-label="Dönüşüm türü">
        {turler.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`${id}-sekme-${t.key}`}
            aria-selected={t.key === tur}
            aria-controls={`${id}-panel`}
            className={t.key === tur ? "secili" : undefined}
            onClick={() => setTur(t.key)}
          >
            {t.ad}
          </button>
        ))}
      </div>

      <div className="ana-cevirici-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-sekme-${tur}`}>
        <label className="ana-cevirici-deger">
          <span>Değer</span>
          <input type="text" inputMode="decimal" autoComplete="off" value={deger} onChange={(e) => setDeger(e.target.value)} />
        </label>

        <div className="ana-cevirici-listeler">
          <label>
            <span>Kimden</span>
            <select size={listeBoyu} value={fromS.deger} onChange={(e) => sec({ from: e.target.value, to: toS.deger })}>
              {secenekler.map((o) => (
                <option key={o.deger} value={o.deger}>
                  {o.ad}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="ana-cevirici-degistir"
            aria-label="Birimlerin yerini değiştir"
            onClick={() => sec({ from: toS.deger, to: fromS.deger })}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 8h14m0 0-3-3m3 3-3 3M20 16H6m0 0 3-3m-3 3 3 3" />
            </svg>
          </button>
          <label>
            <span>Kime</span>
            <select size={listeBoyu} value={toS.deger} onChange={(e) => sec({ from: fromS.deger, to: e.target.value })}>
              {secenekler.map((o) => (
                <option key={o.deger} value={o.deger}>
                  {o.ad}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="ana-cevirici-sonuc" aria-live="polite">
          {gecerli ? (
            <>
              <span>
                {bicimle(v)} {fromS.simge} =
              </span>{" "}
              <strong>
                {bicimle(sonuc)} {toS.simge}
              </strong>
            </>
          ) : (
            <span>Bir sayı yazın</span>
          )}
        </p>

        <p className="ana-cevirici-alt">
          {doviz ? (
            <>
              <span>
                Günlük referans kur:{" "}
                {new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(doviz.tarih * 1000)}
              </span>
              <Link href="/doviz-cevirici">Döviz çevirici</Link>
            </>
          ) : (
            <>
              {sayfa ? <Link href={sayfa}>{fromS.ad} → {toS.ad} tablosu ve formülü</Link> : <span />}
              <Link href={sekme!.href}>Bütün {sekme!.ad.toLocaleLowerCase("tr")} birimleri</Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
