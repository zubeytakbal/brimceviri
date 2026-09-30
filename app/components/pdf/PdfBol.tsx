"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir, zipUrlOlustur } from "../gorsel/tuval";

type Mod = "tek" | "her" | "aralik" | "cikar";
type Cikti = { ad: string; blob: Blob; url: string; sayfa: number };

const MODLAR: Array<{ id: Mod; ad: string }> = [
  { id: "tek", ad: "Her sayfa ayrı PDF" },
  { id: "her", ad: "Her N sayfada böl" },
  { id: "aralik", ad: "Özel aralıklar" },
  { id: "cikar", ad: "Sayfaları çıkar" },
];

/** PDF bölme ve sayfa çıkarma. */
export default function PdfBol() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [toplam, setToplam] = useState(0);
  const [mod, setMod] = useState<Mod>("tek");
  const [n, setN] = useState(2);
  const [aralik, setAralik] = useState("1-3, 4-6");
  const [ciktilar, setCiktilar] = useState<Cikti[]>([]);
  const [hata, setHata] = useState("");
  const [calisiyor, setCalisiyor] = useState(false);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const temizle = () => {
    for (const u of urller.current) URL.revokeObjectURL(u);
    urller.current = [];
    setCiktilar([]);
  };

  const ac = async (d: File[]) => {
    temizle();
    setHata("");
    try {
      const { sayfaSayisi } = await import("../../converter/pdf/pdfIslem");
      setToplam(await sayfaSayisi(new Uint8Array(await d[0].arrayBuffer())));
      setDosya(d[0]);
      setAralik("1-2");
    } catch (e) {
      setHata(e instanceof Error ? e.message : "PDF okunamadı.");
      setDosya(null);
    }
  };

  const bol = async () => {
    if (!dosya) return;
    temizle();
    setHata("");
    setCalisiyor(true);
    try {
      const m = await import("../../converter/pdf/pdfIslem");
      const veri = new Uint8Array(await dosya.arrayBuffer());
      const taban = dosya.name.replace(/\.pdf$/i, "");
      let gruplar: number[][];
      if (mod === "tek") gruplar = m.esitGruplar(toplam, 1);
      else if (mod === "her") gruplar = m.esitGruplar(toplam, Math.max(1, n));
      else if (mod === "aralik")
        gruplar = aralik.split(/[;,]/).map((p) => m.aralikCoz(p, toplam));
      else gruplar = [m.aralikCoz(aralik, toplam)];
      const parcalar = await m.bol(veri, gruplar);
      const etiket = (g: number[]) =>
        g.length === 1
          ? `${g[0] + 1}`
          : g.every((x, i) => i === 0 || x === g[i - 1] + 1)
            ? `${g[0] + 1}-${g[g.length - 1] + 1}`
            : `${g.length}-sayfa`;
      const yeni = parcalar.map((p, i) => {
        const blob = new Blob([p as BlobPart], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        urller.current.push(url);
        return {
          ad:
            mod === "cikar"
              ? `${taban}-secilen.pdf`
              : `${taban}-${etiket(gruplar[i])}.pdf`,
          blob,
          url,
          sayfa: gruplar[i].length,
        };
      });
      setCiktilar(yeni);
      if (yeni.length === 1) indir(yeni[0].url, yeni[0].ad);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Bölme başarısız.");
    } finally {
      setCalisiyor(false);
    }
  };

  const zip = async () => {
    const u = await zipUrlOlustur(
      ciktilar.map((c) => ({ ad: c.ad, blob: c.blob })),
    );
    urller.current.push(u);
    indir(u, `${dosya?.name.replace(/\.pdf$/i, "") ?? "pdf"}-parcalar.zip`);
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="pdf"
        coklu={false}
        max={1}
        baslik={dosya ? "Başka bir PDF seçin" : "PDF dosyasını seçin"}
        onSec={(d) => void ac(d)}
      />
      {dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {toplam} sayfa · {boyutMetni(dosya.size)}
          </p>
          <div className="date-calc-input">
            <div
              className="date-converter-modes"
              role="radiogroup"
              aria-label="Bölme yöntemi"
            >
              {MODLAR.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={mod === x.id}
                  className={mod === x.id ? "is-active" : undefined}
                  onClick={() => {
                    setMod(x.id);
                    temizle();
                  }}
                >
                  {x.ad}
                </button>
              ))}
            </div>
            <div className="date-calc-fields">
              {mod === "her" ? (
                <label className="date-calc-field">
                  <span>Kaç sayfada bir?</span>
                  <span className="date-calc-field-row">
                    <input
                      type="number"
                      min={1}
                      max={toplam}
                      value={n}
                      onChange={(e) => setN(Number(e.target.value))}
                    />
                  </span>
                </label>
              ) : null}
              {mod === "aralik" || mod === "cikar" ? (
                <label className="date-calc-field pdf-aralik">
                  <span>
                    {mod === "aralik"
                      ? "Aralıklar (her biri ayrı PDF): ör. 1-3, 4-6, 7"
                      : "Çıkarılacak sayfalar (tek PDF): ör. 1, 3, 5-8"}
                  </span>
                  <span className="date-calc-field-row">
                    <input
                      type="text"
                      value={aralik}
                      onChange={(e) => setAralik(e.target.value)}
                      placeholder={`1-${toplam}`}
                    />
                  </span>
                </label>
              ) : null}
            </div>
          </div>
          <div className="gorsel-alt">
            <span>
              {mod === "tek"
                ? `${toplam} ayrı PDF oluşacak`
                : mod === "her"
                  ? `${Math.ceil(toplam / Math.max(1, n))} PDF oluşacak`
                  : ""}
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={calisiyor}
              onClick={() => void bol()}
            >
              {calisiyor
                ? "Bölünüyor…"
                : mod === "cikar"
                  ? "Sayfaları çıkar"
                  : "PDF'i böl"}
            </button>
            {ciktilar.length > 1 ? (
              <button
                type="button"
                className="time-tool-button is-secondary"
                onClick={() => void zip()}
              >
                Tümünü ZIP olarak indir
              </button>
            ) : null}
          </div>
          {ciktilar.length ? (
            <ul className="gorsel-liste">
              {ciktilar.map((c) => (
                <li key={c.url}>
                  <span className="gorsel-ad">{c.ad}</span>
                  <span className="gorsel-boyut">
                    {c.sayfa} sayfa · {boyutMetni(c.blob.size)}
                  </span>
                  <a
                    className="time-tool-button is-secondary"
                    href={c.url}
                    download={c.ad}
                  >
                    İndir
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        PDF tarayıcınızda bölünür, hiçbir sunucuya yüklenmez. Sayfa numaraları
        1&apos;den başlar.
      </p>
    </div>
  );
}
