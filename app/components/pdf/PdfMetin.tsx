"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";
import { pdfAc, sayfaCiz, sayfaMetni } from "./pdfjs";

const DILLER: Array<{ kod: string; ad: string }> = [
  { kod: "tur", ad: "Türkçe" },
  { kod: "eng", ad: "İngilizce" },
  { kod: "deu", ad: "Almanca" },
  { kod: "ara", ad: "Arapça" },
  { kod: "fra", ad: "Fransızca" },
];

/** Metin katmanı bu kadar karakterden azsa sayfa taranmış kabul edilir. */
const TARANMIS_ESIK = 20;

type Sayfa = { no: number; metin: string; kaynak: "metin" | "ocr" | "bos" };

type Isci = {
  recognize: (g: HTMLCanvasElement) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<unknown>;
};

/** PDF'teki yazıyı çıkarır; metin katmanı olmayan (taranmış) sayfaları isteğe bağlı OCR ile okur. */
export default function PdfMetin() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [ocr, setOcr] = useState(true);
  const [diller, setDiller] = useState<string[]>(["tur", "eng"]);
  const [sayfalar, setSayfalar] = useState<Sayfa[]>([]);
  const [ilerleme, setIlerleme] = useState("");
  const [hata, setHata] = useState("");
  const [kopyalandi, setKopyalandi] = useState(false);
  const oturum = useRef(0);
  const isci = useRef<Isci | null>(null);

  useEffect(
    () => () => {
      oturum.current++;
      void isci.current?.terminate();
    },
    [],
  );

  const oku = async (f: File) => {
    const no = ++oturum.current;
    setDosya(f);
    setSayfalar([]);
    setHata("");
    setIlerleme("PDF açılıyor…");
    let belge: Awaited<ReturnType<typeof pdfAc>> | null = null;
    try {
      belge = await pdfAc(new Uint8Array(await f.arrayBuffer()));
      const liste: Sayfa[] = [];
      for (let i = 1; i <= belge.numPages; i++) {
        if (no !== oturum.current) return;
        setIlerleme(`Sayfa ${i}/${belge.numPages} okunuyor…`);
        const m = await sayfaMetni(belge, i);
        liste.push({
          no: i,
          metin: m,
          kaynak:
            m.replace(/\s/g, "").length >= TARANMIS_ESIK ? "metin" : "bos",
        });
        setSayfalar([...liste]);
      }
      const taranmis = liste.filter((s) => s.kaynak === "bos");
      if (ocr && taranmis.length) {
        const { createWorker } = await import("tesseract.js");
        await isci.current?.terminate();
        isci.current = (await createWorker(
          diller.length ? diller : ["tur"],
          1,
        )) as unknown as Isci;
        for (const [k, s] of taranmis.entries()) {
          if (no !== oturum.current) return;
          setIlerleme(
            `Taranmış sayfa ${s.no} OCR ile okunuyor (${k + 1}/${taranmis.length})…`,
          );
          const c = await sayfaCiz(belge, s.no, 3);
          const { data } = await isci.current.recognize(c);
          const metin = data.text.replace(/\n{3,}/g, "\n\n").trim();
          s.metin = metin;
          s.kaynak = metin ? "ocr" : "bos";
          setSayfalar([...liste]);
        }
      }
    } catch (e) {
      if (no === oturum.current)
        setHata(
          e instanceof Error && /PDF|şifre/.test(e.message)
            ? e.message
            : "Metin çıkarılamadı. İnternet bağlantınızı kontrol edin (okuyucu ilk kullanımda indirilir).",
        );
    } finally {
      await belge?.destroy();
      if (no === oturum.current) setIlerleme("");
    }
  };

  const tumMetin = sayfalar
    .map((s) =>
      sayfalar.length > 1 ? `--- Sayfa ${s.no} ---\n${s.metin}` : s.metin,
    )
    .join("\n\n");
  const ocrSayisi = sayfalar.filter((s) => s.kaynak === "ocr").length;
  const bosSayisi = sayfalar.filter((s) => s.kaynak === "bos").length;

  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(tumMetin);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 1500);
    } catch {
      /* pano erişimi yok */
    }
  };

  const txtIndir = () => {
    const u = URL.createObjectURL(
      new Blob(["﻿" + tumMetin], { type: "text/plain;charset=utf-8" }),
    );
    indir(u, (dosya?.name.replace(/\.pdf$/i, "") ?? "pdf") + ".txt");
    setTimeout(() => URL.revokeObjectURL(u), 5000);
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="pdf"
        coklu={false}
        max={1}
        baslik={dosya ? "Başka bir PDF seçin" : "PDF dosyasını seçin"}
        onSec={(d) => void oku(d[0])}
      />
      <div className="date-calc-input">
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={ocr}
            onChange={(e) => setOcr(e.target.checked)}
          />{" "}
          Taranmış sayfaları OCR ile oku (metin katmanı olmayan sayfalar)
        </label>
        {ocr ? (
          <div className="date-calc-field">
            <span>Taranmış sayfalardaki dil(ler)</span>
            <div className="gorsel-hedefler" role="group" aria-label="Diller">
              {DILLER.map((d) => {
                const secili = diller.includes(d.kod);
                return (
                  <button
                    key={d.kod}
                    type="button"
                    aria-pressed={secili}
                    className={secili ? "is-active" : undefined}
                    onClick={() =>
                      setDiller((l) =>
                        secili ? l.filter((x) => x !== d.kod) : [...l, d.kod],
                      )
                    }
                  >
                    {d.ad}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
        {dosya && !ilerleme && sayfalar.length ? (
          <button
            type="button"
            className="time-tool-button is-secondary ocr-yeniden"
            onClick={() => void oku(dosya)}
          >
            Bu ayarlarla yeniden oku
          </button>
        ) : null}
      </div>

      {dosya ? (
        <p className="vesikalik-ozet">
          <b>{dosya.name}</b> · {boyutMetni(dosya.size)}
          {sayfalar.length ? ` · ${sayfalar.length} sayfa` : ""}
          {ocrSayisi ? ` · ${ocrSayisi} sayfa OCR ile okundu` : ""}
          {!ilerleme && bosSayisi
            ? ` · ${bosSayisi} sayfada yazı bulunamadı`
            : ""}
        </p>
      ) : null}
      {ilerleme ? <p className="gorsel-durum">{ilerleme}</p> : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}

      {sayfalar.length && !ilerleme ? (
        <>
          <textarea
            className="ocr-metin"
            value={tumMetin}
            readOnly
            rows={16}
            aria-label="Çıkarılan metin"
            spellCheck={false}
          />
          <div className="gorsel-alt">
            <span>
              {tumMetin.length.toLocaleString("tr-TR")} karakter
              {!ocr && bosSayisi
                ? " · taranmış sayfalar için OCR seçeneğini açın"
                : ""}
            </span>
            <button
              type="button"
              className="time-tool-button"
              onClick={() => void kopyala()}
            >
              {kopyalandi ? "Kopyalandı ✓" : "Tümünü kopyala"}
            </button>
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={txtIndir}
            >
              TXT indir
            </button>
          </div>
        </>
      ) : null}

      <p className="date-calc-note">
        PDF tarayıcınızda okunur, hiçbir sunucuya yüklenmez. Dijital
        PDF&apos;lerde metin doğrudan dosyadan alınır; taranmış sayfalar için
        OCR motoru ve dil verisi ilk kullanımda bir kez jsDelivr&apos;den
        indirilir.
      </p>
    </div>
  );
}
