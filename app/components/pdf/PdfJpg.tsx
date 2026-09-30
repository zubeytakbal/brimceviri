"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir, zipUrlOlustur } from "../gorsel/tuval";
import { pdfAc, sayfaCiz, type PdfBelge } from "./pdfjs";

type Cikti = {
  no: number;
  ad: string;
  blob: Blob;
  url: string;
  w: number;
  h: number;
};

const COZUNURLUK = [
  { dpi: 72, ad: "Düşük (72 DPI, ekran)" },
  { dpi: 150, ad: "Orta (150 DPI)" },
  { dpi: 300, ad: "Yüksek (300 DPI, baskı)" },
];

/** PDF sayfalarını JPG veya PNG görsellerine çevirir (pdf.js ile tarayıcıda). */
export default function PdfJpg() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [toplam, setToplam] = useState(0);
  const [dpi, setDpi] = useState(150);
  const [format, setFormat] = useState<"jpg" | "png">("jpg");
  const [aralik, setAralik] = useState("");
  const [ciktilar, setCiktilar] = useState<Cikti[]>([]);
  const [ilerleme, setIlerleme] = useState<string>("");
  const [hata, setHata] = useState("");
  const belge = useRef<PdfBelge | null>(null);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
      void belge.current?.destroy();
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
    setIlerleme("PDF açılıyor…");
    try {
      await belge.current?.destroy();
      belge.current = await pdfAc(new Uint8Array(await d[0].arrayBuffer()));
      setToplam(belge.current.numPages);
      setDosya(d[0]);
      setAralik("");
    } catch (e) {
      setHata(e instanceof Error ? e.message : "PDF okunamadı.");
      setDosya(null);
    } finally {
      setIlerleme("");
    }
  };

  const cevir = async () => {
    const b = belge.current;
    if (!b || !dosya) return;
    temizle();
    setHata("");
    try {
      const { aralikCoz } = await import("../../converter/pdf/pdfIslem");
      const sayfalar = aralik.trim()
        ? aralikCoz(aralik, toplam)
        : Array.from({ length: toplam }, (_, i) => i);
      const taban = dosya.name.replace(/\.pdf$/i, "");
      const yeni: Cikti[] = [];
      for (const [i, s] of sayfalar.entries()) {
        setIlerleme(`Sayfa ${s + 1} çevriliyor (${i + 1}/${sayfalar.length})…`);
        const c = await sayfaCiz(b, s + 1, dpi / 72);
        const blob = await new Promise<Blob | null>((r) =>
          c.toBlob(
            r,
            format === "jpg" ? "image/jpeg" : "image/png",
            format === "jpg" ? 0.9 : undefined,
          ),
        );
        if (!blob) throw new Error("Görsel kaydedilemedi.");
        const url = URL.createObjectURL(blob);
        urller.current.push(url);
        yeni.push({
          no: s + 1,
          ad: `${taban}-sayfa-${s + 1}.${format}`,
          blob,
          url,
          w: c.width,
          h: c.height,
        });
        setCiktilar([...yeni]);
      }
      if (yeni.length === 1) indir(yeni[0].url, yeni[0].ad);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Çevirme başarısız.");
    } finally {
      setIlerleme("");
    }
  };

  const zip = async () => {
    const u = await zipUrlOlustur(
      ciktilar.map((c) => ({ ad: c.ad, blob: c.blob })),
    );
    urller.current.push(u);
    indir(u, `${dosya?.name.replace(/\.pdf$/i, "") ?? "pdf"}-sayfalar.zip`);
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
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Çözünürlük</span>
                <span className="date-calc-field-row">
                  <select
                    value={dpi}
                    onChange={(e) => setDpi(Number(e.target.value))}
                  >
                    {COZUNURLUK.map((c) => (
                      <option key={c.dpi} value={c.dpi}>
                        {c.ad}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="date-calc-field">
                <span>Format</span>
                <span className="date-calc-field-row">
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as "jpg" | "png")}
                  >
                    <option value="jpg">JPG (küçük dosya)</option>
                    <option value="png">PNG (kayıpsız)</option>
                  </select>
                </span>
              </label>
              <label className="date-calc-field pdf-aralik">
                <span>Sayfalar (boş bırakırsanız tümü): ör. 1-3, 5</span>
                <span className="date-calc-field-row">
                  <input
                    type="text"
                    value={aralik}
                    onChange={(e) => setAralik(e.target.value)}
                    placeholder={`1-${toplam}`}
                  />
                </span>
              </label>
            </div>
          </div>
          <div className="gorsel-alt">
            <span>
              {ilerleme ||
                (ciktilar.length ? `${ciktilar.length} görsel hazır` : "")}
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={!!ilerleme}
              onClick={() => void cevir()}
            >
              {format === "jpg" ? "JPG'ye çevir" : "PNG'ye çevir"}
            </button>
            {ciktilar.length > 1 && !ilerleme ? (
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
            <ul className="pdf-kucuk-resimler">
              {ciktilar.map((c) => (
                <li key={c.url}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- yerel nesne URL'si */}
                  <img src={c.url} alt={`Sayfa ${c.no}`} loading="lazy" />
                  <span>
                    Sayfa {c.no} · {c.w}×{c.h} · {boyutMetni(c.blob.size)}
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
      ) : ilerleme ? (
        <p className="gorsel-durum">{ilerleme}</p>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Sayfalar tarayıcınızda çizilir, PDF hiçbir sunucuya yüklenmez. PDF
        görüntüleyici (pdf.js) ilk kullanımda jsDelivr&apos;den bir kez
        indirilir.
      </p>
    </div>
  );
}
