"use client";

import { useEffect, useRef, useState } from "react";
import DosyaBirak from "./DosyaBirak";
import { bitmapAc, indir } from "./tuval";

/** Tesseract dil kodları. Dil verisi seçildiğinde bir kez jsDelivr'den indirilir. */
const DILLER: Array<{ kod: string; ad: string }> = [
  { kod: "tur", ad: "Türkçe" },
  { kod: "eng", ad: "İngilizce" },
  { kod: "deu", ad: "Almanca" },
  { kod: "ara", ad: "Arapça" },
  { kod: "rus", ad: "Rusça" },
  { kod: "fra", ad: "Fransızca" },
  { kod: "spa", ad: "İspanyolca" },
];

const MAX_DOSYA = 20;

type Oge = {
  id: number;
  ad: string;
  kaynak: Blob;
  durum: "sirada" | "okunuyor" | "hazir" | "hata";
  ilerleme: number;
  metin: string;
  guven?: number;
  hata?: string;
};

type Isci = {
  recognize: (
    g: HTMLCanvasElement,
  ) => Promise<{ data: { text: string; confidence: number } }>;
  terminate: () => Promise<unknown>;
};

/** Görseli OCR için hazırlar: küçükse büyütür, isteğe bağlı gri tonlama ve kontrast artırma. */
async function hazirla(
  kaynak: Blob,
  iyilestir: boolean,
): Promise<HTMLCanvasElement> {
  const bitmap = await bitmapAc(kaynak);
  try {
    const k = bitmap.width < 1200 ? Math.min(3, 1600 / bitmap.width) : 1;
    const c = document.createElement("canvas");
    c.width = Math.round(bitmap.width * k);
    c.height = Math.round(bitmap.height * k);
    const x = c.getContext("2d", { willReadFrequently: true })!;
    x.fillStyle = "#ffffff";
    x.fillRect(0, 0, c.width, c.height);
    x.imageSmoothingQuality = "high";
    x.drawImage(bitmap, 0, 0, c.width, c.height);
    if (iyilestir) {
      const d = x.getImageData(0, 0, c.width, c.height);
      const p = d.data;
      for (let i = 0; i < p.length; i += 4) {
        const g = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2];
        const v = Math.max(0, Math.min(255, (g - 128) * 1.6 + 128));
        p[i] = p[i + 1] = p[i + 2] = v;
      }
      x.putImageData(d, 0, 0);
    }
    return c;
  } finally {
    bitmap.close();
  }
}

/** Resimdeki yazıyı metne çevirir (Tesseract OCR). Görseller tarayıcıda işlenir. */
export default function MetinTani() {
  const [diller, setDiller] = useState<string[]>(["tur", "eng"]);
  const [iyilestir, setIyilestir] = useState(true);
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [calisiyor, setCalisiyor] = useState(false);
  const [kopyalandi, setKopyalandi] = useState<number | null>(null);
  const sayac = useRef(0);
  const calisiyorRef = useRef(false);
  const isci = useRef<{ diller: string; isci: Isci } | null>(null);
  const aktif = useRef<number | null>(null);
  const kuyruk = useRef<Oge[]>([]);
  const ayar = useRef({ diller, iyilestir });

  useEffect(() => {
    ayar.current = { diller, iyilestir };
  }, [diller, iyilestir]);

  useEffect(
    () => () => {
      void isci.current?.isci.terminate();
    },
    [],
  );

  const guncelle = (id: number, p: Partial<Oge>) =>
    setOgeler((s) => s.map((o) => (o.id === id ? { ...o, ...p } : o)));

  const isciAl = async (kodlar: string[]) => {
    const anahtar = kodlar.join("+");
    if (isci.current?.diller === anahtar) return isci.current.isci;
    await isci.current?.isci.terminate();
    isci.current = null;
    const { createWorker } = await import("tesseract.js");
    const yeni = (await createWorker(kodlar, 1, {
      logger: (m: { status: string; progress: number }) => {
        if (aktif.current !== null && m.status === "recognizing text")
          guncelle(aktif.current, { ilerleme: m.progress });
      },
    })) as unknown as Isci;
    isci.current = { diller: anahtar, isci: yeni };
    return yeni;
  };

  const calistir = async () => {
    if (calisiyorRef.current) return;
    calisiyorRef.current = true;
    setCalisiyor(true);
    while (kuyruk.current.length) {
      const o = kuyruk.current.shift()!;
      aktif.current = o.id;
      guncelle(o.id, { durum: "okunuyor", ilerleme: 0, hata: undefined });
      try {
        const { diller: d, iyilestir: iy } = ayar.current;
        const w = await isciAl(d.length ? d : ["tur"]);
        const tuval = await hazirla(o.kaynak, iy);
        const { data } = await w.recognize(tuval);
        guncelle(o.id, {
          durum: "hazir",
          ilerleme: 1,
          metin: data.text.replace(/\n{3,}/g, "\n\n").trim(),
          guven: Math.round(data.confidence),
        });
      } catch (e) {
        guncelle(o.id, {
          durum: "hata",
          hata:
            e instanceof Error && e.message.includes("açılamadı")
              ? e.message
              : "Metin tanıma başlatılamadı. İnternet bağlantınızı kontrol edin (dil verisi ilk kullanımda indirilir).",
        });
      }
    }
    aktif.current = null;
    calisiyorRef.current = false;
    setCalisiyor(false);
  };

  const ekle = (kaynaklar: Array<{ ad: string; kaynak: Blob }>) => {
    const yeni = kaynaklar.slice(0, MAX_DOSYA).map(
      (k): Oge => ({
        id: ++sayac.current,
        ...k,
        durum: "sirada",
        ilerleme: 0,
        metin: "",
      }),
    );
    setOgeler((s) => [...s, ...yeni]);
    kuyruk.current.push(...yeni);
    void calistir();
  };

  // Panodan yapıştırma (Ctrl+V ile ekran görüntüsü).
  useEffect(() => {
    const yapistir = (e: ClipboardEvent) => {
      const dosyalar = [...(e.clipboardData?.files ?? [])].filter((f) =>
        f.type.startsWith("image/"),
      );
      if (!dosyalar.length) return;
      e.preventDefault();
      ekle(
        dosyalar.map((f, i) => ({
          ad:
            f.name && f.name !== "image.png"
              ? f.name
              : `yapistirilan-${Date.now()}-${i + 1}.png`,
          kaynak: f,
        })),
      );
    };
    window.addEventListener("paste", yapistir);
    return () => window.removeEventListener("paste", yapistir);
  });

  const yenidenOku = () => {
    const liste = ogeler.map((o) => ({
      ...o,
      durum: "sirada" as const,
      ilerleme: 0,
      metin: "",
      guven: undefined,
    }));
    setOgeler(liste);
    kuyruk.current = [...liste];
    void calistir();
  };

  const kopyala = async (metin: string, id: number) => {
    try {
      await navigator.clipboard.writeText(metin);
      setKopyalandi(id);
      setTimeout(() => setKopyalandi((x) => (x === id ? null : x)), 1500);
    } catch {
      /* pano erişimi yok */
    }
  };

  const txtIndir = (metin: string, ad: string) => {
    const url = URL.createObjectURL(
      new Blob(["﻿" + metin], { type: "text/plain;charset=utf-8" }),
    );
    indir(url, ad);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const hazirlar = ogeler.filter((o) => o.durum === "hazir");
  const tumMetin = hazirlar
    .map((o) => (hazirlar.length > 1 ? `--- ${o.ad} ---\n${o.metin}` : o.metin))
    .join("\n\n");

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        baslik="Yazı içeren görselleri seçin"
        max={MAX_DOSYA}
        onSec={(d) => ekle(d.map((f) => ({ ad: f.name, kaynak: f })))}
      />
      <p className="vesikalik-ozet">
        İpucu: Ekran görüntüsünü <kbd>Ctrl</kbd> + <kbd>V</kbd> ile doğrudan bu
        sayfaya yapıştırabilirsiniz.
      </p>

      <div className="date-calc-input">
        <div className="date-calc-field">
          <span>Görseldeki dil(ler)</span>
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
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={iyilestir}
            onChange={(e) => setIyilestir(e.target.checked)}
          />{" "}
          Görüntüyü iyileştir (siyah-beyaz, kontrast)
        </label>
        {ogeler.length && !calisiyor ? (
          <button
            type="button"
            className="time-tool-button is-secondary ocr-yeniden"
            onClick={yenidenOku}
          >
            Bu ayarlarla yeniden oku
          </button>
        ) : null}
      </div>

      {ogeler.length ? (
        <ul className="ocr-liste">
          {ogeler.map((o) => (
            <li key={o.id}>
              <div className="exif-bas">
                <strong title={o.ad}>{o.ad}</strong>
                <span className="gorsel-boyut">
                  {o.durum === "sirada"
                    ? "Sırada"
                    : o.durum === "okunuyor"
                      ? `Okunuyor… %${Math.round(o.ilerleme * 100)}`
                      : o.durum === "hazir"
                        ? `${o.metin.length.toLocaleString("tr-TR")} karakter · güven %${o.guven}`
                        : ""}
                </span>
              </div>
              {o.durum === "okunuyor" ? (
                <progress max={1} value={o.ilerleme} />
              ) : null}
              {o.hata ? <span className="gorsel-hata">{o.hata}</span> : null}
              {o.durum === "hazir" ? (
                <>
                  <textarea
                    className="ocr-metin"
                    value={o.metin}
                    onChange={(e) => guncelle(o.id, { metin: e.target.value })}
                    rows={Math.min(
                      14,
                      Math.max(4, o.metin.split("\n").length + 1),
                    )}
                    aria-label={`${o.ad} metni`}
                    spellCheck={false}
                  />
                  <div className="ocr-dugmeler">
                    <button
                      type="button"
                      className="time-tool-button"
                      onClick={() => void kopyala(o.metin, o.id)}
                    >
                      {kopyalandi === o.id ? "Kopyalandı ✓" : "Kopyala"}
                    </button>
                    <button
                      type="button"
                      className="time-tool-button is-secondary"
                      onClick={() =>
                        txtIndir(o.metin, o.ad.replace(/\.[^.]+$/, "") + ".txt")
                      }
                    >
                      TXT indir
                    </button>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {hazirlar.length > 1 ? (
        <div className="gorsel-alt">
          <span>{hazirlar.length} görsel okundu</span>
          <button
            type="button"
            className="time-tool-button"
            onClick={() => void kopyala(tumMetin, -1)}
          >
            {kopyalandi === -1 ? "Kopyalandı ✓" : "Tümünü kopyala"}
          </button>
          <button
            type="button"
            className="time-tool-button is-secondary"
            onClick={() => txtIndir(tumMetin, "metinler.txt")}
          >
            Tümünü TXT indir
          </button>
        </div>
      ) : null}

      <p className="date-calc-note">
        Görseller tarayıcınızda okunur, hiçbir sunucuya yüklenmez. Tanıma motoru
        ve seçtiğiniz dillerin verisi ilk kullanımda bir kez jsDelivr&apos;den
        indirilir (Türkçe yaklaşık 2 MB). Net, düz ve iyi aydınlatılmış
        görsellerde doğruluk yüksektir; el yazısında sonuç zayıf olabilir.
      </p>
    </div>
  );
}
