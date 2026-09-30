"use client";

import { useEffect, useRef, useState } from "react";
import type {
  KaynakGorsel,
  Kodlayici,
  SikistirmaRaporu,
} from "../../converter/pdf/pdfSikistir";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir, zipUrlOlustur } from "../gorsel/tuval";

const SEVIYELER = [
  {
    id: "az",
    ad: "Az sıkıştırma",
    aciklama: "Yüksek kalite, baskıya uygun",
    kenar: 2400,
    kalite: 0.82,
  },
  {
    id: "onerilen",
    ad: "Önerilen",
    aciklama: "İyi kalite, belirgin küçülme",
    kenar: 1600,
    kalite: 0.7,
  },
  {
    id: "yuksek",
    ad: "Yüksek sıkıştırma",
    aciklama: "En küçük dosya, ekranda okunur",
    kenar: 1100,
    kalite: 0.55,
  },
] as const;
type Seviye = (typeof SEVIYELER)[number];

const MAX_DOSYA = 20;

type Oge = {
  id: number;
  dosya: File;
  durum: "sirada" | "calisiyor" | "hazir" | "hata";
  ilerleme?: string;
  rapor?: SikistirmaRaporu;
  blob?: Blob;
  url?: string;
  hata?: string;
};

/** Görseli tarayıcıda küçültüp JPEG olarak yeniden kodlar. */
function kodlayici(s: Seviye): Kodlayici {
  return async (g: KaynakGorsel) => {
    let kaynak: CanvasImageSource;
    let kapat = () => {};
    if (g.tur === "jpeg") {
      const b = await createImageBitmap(
        new Blob([g.veri as BlobPart], { type: "image/jpeg" }),
      );
      kaynak = b;
      kapat = () => b.close();
    } else {
      const c = document.createElement("canvas");
      c.width = g.w;
      c.height = g.h;
      const x = c.getContext("2d")!;
      const img = x.createImageData(g.w, g.h);
      const p = img.data;
      for (let i = 0, j = 0; i < g.w * g.h; i++, j += g.kanal) {
        p[i * 4] = g.veri[j];
        p[i * 4 + 1] = g.veri[j + (g.kanal === 3 ? 1 : 0)];
        p[i * 4 + 2] = g.veri[j + (g.kanal === 3 ? 2 : 0)];
        p[i * 4 + 3] = 255;
      }
      x.putImageData(img, 0, 0);
      kaynak = c;
    }
    try {
      const k = Math.min(1, s.kenar / Math.max(g.w, g.h));
      const w = Math.max(1, Math.round(g.w * k));
      const h = Math.max(1, Math.round(g.h * k));
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const x = c.getContext("2d")!;
      x.fillStyle = "#ffffff";
      x.fillRect(0, 0, w, h);
      x.imageSmoothingQuality = "high";
      x.drawImage(kaynak, 0, 0, w, h);
      const blob = await new Promise<Blob | null>((r) =>
        c.toBlob(r, "image/jpeg", s.kalite),
      );
      if (!blob) return null;
      return { veri: new Uint8Array(await blob.arrayBuffer()), w, h };
    } finally {
      kapat();
    }
  };
}

const ciktiAdi = (ad: string) =>
  ad.replace(/\.pdf$/i, "") + "-sikistirilmis.pdf";

/** PDF'lerdeki görselleri yeniden sıkıştırarak dosya boyutunu küçültür. */
export default function PdfSikistir() {
  const [seviye, setSeviye] = useState<Seviye["id"]>("onerilen");
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [calisiyor, setCalisiyor] = useState(false);
  const sayac = useRef(0);
  const kuyruk = useRef<Oge[]>([]);
  const calisiyorRef = useRef(false);
  const seviyeRef = useRef(seviye);
  const urller = useRef<string[]>([]);

  useEffect(() => {
    seviyeRef.current = seviye;
  }, [seviye]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const guncelle = (id: number, p: Partial<Oge>) =>
    setOgeler((l) => l.map((o) => (o.id === id ? { ...o, ...p } : o)));

  const calistir = async () => {
    if (calisiyorRef.current) return;
    calisiyorRef.current = true;
    setCalisiyor(true);
    const { pdfSikistir } = await import("../../converter/pdf/pdfSikistir");
    while (kuyruk.current.length) {
      const o = kuyruk.current.shift()!;
      guncelle(o.id, { durum: "calisiyor", hata: undefined });
      try {
        const s = SEVIYELER.find((x) => x.id === seviyeRef.current)!;
        const { pdf, rapor } = await pdfSikistir(
          new Uint8Array(await o.dosya.arrayBuffer()),
          kodlayici(s),
          (i, t) =>
            guncelle(o.id, {
              ilerleme: t ? `Görsel ${Math.min(i + 1, t)}/${t}` : "",
            }),
        );
        const blob = new Blob([pdf as BlobPart], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        urller.current.push(url);
        guncelle(o.id, { durum: "hazir", rapor, blob, url });
      } catch (e) {
        guncelle(o.id, {
          durum: "hata",
          hata: e instanceof Error ? e.message : "Sıkıştırılamadı.",
        });
      }
    }
    calisiyorRef.current = false;
    setCalisiyor(false);
  };

  const ekle = (dosyalar: File[]) => {
    const yeni = dosyalar
      .slice(0, MAX_DOSYA)
      .map((dosya): Oge => ({ id: ++sayac.current, dosya, durum: "sirada" }));
    setOgeler((l) => [...l, ...yeni]);
    kuyruk.current.push(...yeni);
    void calistir();
  };

  const yenidenSikistir = () => {
    const l = ogeler.map(
      (o): Oge => ({ id: o.id, dosya: o.dosya, durum: "sirada" }),
    );
    setOgeler(l);
    kuyruk.current = [...l];
    void calistir();
  };

  const hazirlar = ogeler.filter((o) => o.durum === "hazir");
  const toplamOnce = hazirlar.reduce((t, o) => t + o.rapor!.once, 0);
  const toplamSonra = hazirlar.reduce((t, o) => t + o.rapor!.sonra, 0);

  const zip = async () => {
    const u = await zipUrlOlustur(
      hazirlar.map((o) => ({ ad: ciktiAdi(o.dosya.name), blob: o.blob! })),
    );
    urller.current.push(u);
    indir(u, "sikistirilmis-pdfler.zip");
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="pdf"
        baslik={ogeler.length ? "Başka PDF ekleyin" : "PDF dosyalarını seçin"}
        max={MAX_DOSYA}
        onSec={ekle}
      />
      <div className="date-calc-input">
        <div className="date-calc-field">
          <span>Sıkıştırma düzeyi</span>
          <div
            className="gorsel-hedefler"
            role="radiogroup"
            aria-label="Sıkıştırma düzeyi"
          >
            {SEVIYELER.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={seviye === s.id}
                className={seviye === s.id ? "is-active" : undefined}
                onClick={() => setSeviye(s.id)}
                title={s.aciklama}
              >
                {s.ad}
              </button>
            ))}
          </div>
          <small className="pdf-seviye-aciklama">
            {SEVIYELER.find((s) => s.id === seviye)!.aciklama} · görseller en
            fazla {SEVIYELER.find((s) => s.id === seviye)!.kenar} piksele
            indirilir
          </small>
        </div>
        {ogeler.length && !calisiyor ? (
          <button
            type="button"
            className="time-tool-button is-secondary ocr-yeniden"
            onClick={yenidenSikistir}
          >
            Bu düzeyle yeniden sıkıştır
          </button>
        ) : null}
      </div>

      {ogeler.length ? (
        <ul className="pdf-sikistir-liste">
          {ogeler.map((o) => {
            const r = o.rapor;
            const oran = r ? Math.round((1 - r.sonra / r.once) * 100) : 0;
            return (
              <li key={o.id}>
                <strong title={o.dosya.name}>{o.dosya.name}</strong>
                <span>
                  {o.durum === "sirada"
                    ? "Sırada"
                    : o.durum === "calisiyor"
                      ? `Sıkıştırılıyor… ${o.ilerleme ?? ""}`
                      : o.durum === "hata"
                        ? ""
                        : r && r.sonra < r.once
                          ? `${boyutMetni(r.once)} → ${boyutMetni(r.sonra)}`
                          : `${boyutMetni(r!.once)} · zaten küçük, değişiklik yapılmadı`}
                </span>
                {o.hata ? <span className="gorsel-hata">{o.hata}</span> : null}
                {o.durum === "hazir" && oran > 0 ? (
                  <b className="pdf-oran">−%{oran}</b>
                ) : null}
                {o.url ? (
                  <a
                    className="time-tool-button is-secondary"
                    href={o.url}
                    download={ciktiAdi(o.dosya.name)}
                  >
                    İndir
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      {hazirlar.length > 1 && !calisiyor ? (
        <div className="gorsel-alt">
          <span>
            Toplam {boyutMetni(toplamOnce)} → {boyutMetni(toplamSonra)}
          </span>
          <button
            type="button"
            className="time-tool-button"
            onClick={() => void zip()}
          >
            Tümünü ZIP olarak indir
          </button>
        </div>
      ) : null}

      <p className="date-calc-note">
        PDF&apos;ler tarayıcınızda sıkıştırılır, hiçbir sunucuya yüklenmez.
        Yalnızca fotoğraf ve taranmış sayfa gibi görseller yeniden kodlanır;
        yazılar seçilebilir ve keskin kalır. Yalnızca metin içeren PDF&apos;ler
        genellikle zaten küçüktür.
      </p>
    </div>
  );
}
