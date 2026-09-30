"use client";

import { useEffect, useRef, useState } from "react";
import { slugYap, turkceKaldir } from "../../converter/metin/turkce";
import CopyResultButton from "../CopyResultButton";

type Kip = "duzelt" | "kaldir" | "slug";

/** Değişen harfleri işaretleyerek gösterir. */
function Farklar({ once, sonra }: { once: string; sonra: string }) {
  const a = Array.from(once);
  const b = Array.from(sonra);
  if (a.length !== b.length) return <>{sonra}</>;
  const parcalar: Array<{ m: string; d: boolean }> = [];
  b.forEach((c, i) => {
    const d = c !== a[i];
    const son = parcalar[parcalar.length - 1];
    if (son && son.d === d) son.m += c;
    else parcalar.push({ m: c, d });
  });
  return (
    <>
      {parcalar.map((p, i) =>
        p.d ? <mark key={i}>{p.m}</mark> : <span key={i}>{p.m}</span>,
      )}
    </>
  );
}

/** Türkçe karakter düzeltme (turkce → Türkçe), kaldırma (Türkçe → Turkce) ve URL üretme. */
export default function KarakterDuzelt({ odak = "duzelt" }: { odak?: Kip }) {
  const [kip, setKip] = useState<Kip>(odak);
  const [metin, setMetin] = useState(
    odak === "duzelt"
      ? "Bu cumledeki turkce karakterler otomatik olarak duzeltilir. Sisli'de ogrenci ucretleri artti."
      : "Şişli'de öğrenci ücretleri arttı; çağrı merkezi güncellendi.",
  );
  const [sonuc, setSonuc] = useState("");
  const [durum, setDurum] = useState("");
  const d = useRef<{ deasciify: (s: string) => string } | null>(null);

  useEffect(() => {
    let iptal = false;
    const zaman = setTimeout(async () => {
      if (kip === "kaldir") return setSonuc(turkceKaldir(metin));
      if (kip === "slug") return setSonuc(slugYap(metin));
      if (!d.current) {
        setDurum("Sözlük yükleniyor…");
        const { default: Deasciifier } = await import("turkish-deasciifier");
        d.current = new Deasciifier();
        setDurum("");
      }
      if (!iptal) setSonuc(d.current.deasciify(metin) ?? "");
    }, 150);
    return () => {
      iptal = true;
      clearTimeout(zaman);
    };
  }, [metin, kip]);

  const degisen =
    kip === "duzelt" && sonuc.length === metin.length
      ? Array.from(sonuc).filter((c, i) => c !== metin[i]).length
      : null;

  return (
    <div className="date-calc gorsel-arac">
      <div
        className="date-converter-modes is-light"
        role="tablist"
        aria-label="İşlem"
      >
        {(
          [
            ["duzelt", "Türkçe karaktere çevir"],
            ["kaldir", "Türkçe karakterleri kaldır"],
            ["slug", "Web adresi (URL) yap"],
          ] as const
        ).map(([k, ad]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={kip === k}
            className={kip === k ? "is-active" : ""}
            onClick={() => setKip(k)}
          >
            {ad}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>Metin</span>
          <textarea
            rows={6}
            value={metin}
            onChange={(e) => setMetin(e.target.value)}
            spellCheck={false}
          />
        </label>
      </div>
      {durum ? <p className="gorsel-durum">{durum}</p> : null}
      <div className="metin-sonuc">
        <div className="metin-sonuc-ust">
          <b>Sonuç</b>
          {degisen !== null ? <span>{degisen} harf düzeltildi</span> : null}
          <CopyResultButton text={sonuc} locale="tr" />
        </div>
        <div className="metin-sonuc-govde" aria-live="polite">
          {kip === "duzelt" ? <Farklar once={metin} sonra={sonuc} /> : sonuc}
        </div>
      </div>
      <p className="date-calc-note">
        {kip === "duzelt"
          ? "Düzeltilen harfler sarı ile işaretlenir. Yöntem kelimenin çevresine bakarak tahmin eder; özel adlarda ve kısaltmalarda nadiren yanılabilir, kopyalamadan önce göz gezdirin. "
          : ""}
        Metniniz tarayıcınızda işlenir, hiçbir yere gönderilmez.
      </p>
    </div>
  );
}
