"use client";

import { useEffect, useRef, useState } from "react";
import {
  boyutMetni,
  ciktiAdi,
  FORMATLAR,
  formatTahmin,
  type GorselFormat,
} from "../../converter/gorsel/formatlar";
import { kirpmaBolgesi, type Bolge } from "../../converter/gorsel/sikistirma";
import DosyaBirak from "./DosyaBirak";
import KirpmaAlani from "./KirpmaAlani";
import { bitmapAc, kodla } from "./tuval";

const ORANLAR: Array<{ id: string; ad: string; oran: number | null }> = [
  { id: "serbest", ad: "Serbest", oran: null },
  { id: "1:1", ad: "1:1 Kare", oran: 1 },
  { id: "4:5", ad: "4:5 Instagram dikey", oran: 4 / 5 },
  { id: "9:16", ad: "9:16 Story / Reels", oran: 9 / 16 },
  { id: "16:9", ad: "16:9 YouTube / ekran", oran: 16 / 9 },
  { id: "3:2", ad: "3:2 Fotoğraf (10×15)", oran: 3 / 2 },
  { id: "2:3", ad: "2:3 Dikey fotoğraf", oran: 2 / 3 },
  { id: "4:3", ad: "4:3", oran: 4 / 3 },
  { id: "3:4", ad: "3:4", oran: 3 / 4 },
];

type Durum = {
  dosya: File;
  orijinal: ImageBitmap;
  calisma: ImageBitmap;
  onizleme: string;
  aci: number;
  yatay: boolean;
  dikey: boolean;
};

/** Döndürme ve çevirmeyi uygulayıp yeni bir çalışma görseli ve önizleme adresi üretir. */
async function donustur(
  o: ImageBitmap,
  aci: number,
  yatay: boolean,
  dikey: boolean,
) {
  const yan = aci % 180 !== 0;
  const w = yan ? o.height : o.width;
  const h = yan ? o.width : o.height;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  x.translate(w / 2, h / 2);
  x.rotate((aci * Math.PI) / 180);
  x.scale(yatay ? -1 : 1, dikey ? -1 : 1);
  x.drawImage(o, -o.width / 2, -o.height / 2);
  const calisma = await createImageBitmap(c);
  const blob = await new Promise<Blob | null>((r) =>
    c.toBlob(r, "image/jpeg", 0.85),
  );
  return { calisma, onizleme: URL.createObjectURL(blob!) };
}

/** Fotoğraf kırpma ve döndürme: hazır oranlar, köşe tutamaçları, 90° döndürme, yatay/dikey çevirme. */
export default function FotoKirp() {
  const [d, setD] = useState<Durum | null>(null);
  const [oranId, setOranId] = useState("serbest");
  const [bolge, setBolge] = useState<Bolge>({ x: 0, y: 0, w: 1, h: 1 });
  const [format, setFormat] = useState<GorselFormat | "ayni">("ayni");
  const [sonuc, setSonuc] = useState<{
    url: string;
    ad: string;
    boyut: number;
    w: number;
    h: number;
  } | null>(null);
  const [hata, setHata] = useState("");
  const ref = useRef<Durum | null>(null);
  const sonucRef = useRef<string | null>(null);

  useEffect(
    () => () => {
      const x = ref.current;
      if (x) {
        x.orijinal.close();
        x.calisma.close();
        URL.revokeObjectURL(x.onizleme);
      }
      if (sonucRef.current) URL.revokeObjectURL(sonucRef.current);
    },
    [],
  );

  const oran = ORANLAR.find((o) => o.id === oranId)?.oran ?? null;
  const varsayilanBolge = (c: ImageBitmap, or: number | null) =>
    kirpmaBolgesi(
      { genislik: c.width, yukseklik: c.height },
      or ?? c.width / c.height,
      0.9,
      { x: c.width / 2, y: c.height / 2 },
    );

  const sonucTemizle = () => {
    if (sonucRef.current) URL.revokeObjectURL(sonucRef.current);
    sonucRef.current = null;
    setSonuc(null);
  };

  const ac = async (dosyalar: File[]) => {
    setHata("");
    sonucTemizle();
    try {
      const orijinal = await bitmapAc(dosyalar[0]);
      const { calisma, onizleme } = await donustur(orijinal, 0, false, false);
      const eski = ref.current;
      if (eski) {
        eski.orijinal.close();
        eski.calisma.close();
        URL.revokeObjectURL(eski.onizleme);
      }
      const yeni = {
        dosya: dosyalar[0],
        orijinal,
        calisma,
        onizleme,
        aci: 0,
        yatay: false,
        dikey: false,
      };
      ref.current = yeni;
      setD(yeni);
      setBolge(varsayilanBolge(calisma, oran));
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Hata");
    }
  };

  const donusum = async (
    p: Partial<Pick<Durum, "aci" | "yatay" | "dikey">>,
  ) => {
    if (!d) return;
    sonucTemizle();
    const aci = p.aci ?? d.aci;
    const yatay = p.yatay ?? d.yatay;
    const dikey = p.dikey ?? d.dikey;
    const { calisma, onizleme } = await donustur(d.orijinal, aci, yatay, dikey);
    d.calisma.close();
    URL.revokeObjectURL(d.onizleme);
    const yeni = { ...d, calisma, onizleme, aci, yatay, dikey };
    ref.current = yeni;
    setD(yeni);
    setBolge(varsayilanBolge(calisma, oran));
  };

  const oranSec = (id: string) => {
    setOranId(id);
    sonucTemizle();
    if (d)
      setBolge(
        varsayilanBolge(
          d.calisma,
          ORANLAR.find((o) => o.id === id)?.oran ?? null,
        ),
      );
  };

  const kirp = async () => {
    if (!d) return;
    setHata("");
    try {
      const f: GorselFormat =
        format === "ayni"
          ? (formatTahmin(d.dosya.name, d.dosya.type) ?? "jpg")
          : format;
      const blob = await kodla(d.calisma, {
        genislik: bolge.w,
        yukseklik: bolge.h,
        format: f,
        kalite: 0.92,
        bolge,
      });
      sonucTemizle();
      const url = URL.createObjectURL(blob);
      sonucRef.current = url;
      setSonuc({
        url,
        ad: ciktiAdi(d.dosya.name, f),
        boyut: blob.size,
        w: bolge.w,
        h: bolge.h,
      });
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Hata");
    }
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        baslik={d ? "Başka bir fotoğraf seçin" : "Fotoğraf seçin"}
        max={1}
        coklu={false}
        onSec={(x) => void ac(x)}
      />
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      {d ? (
        <>
          <div
            className="kirp-araclar"
            role="toolbar"
            aria-label="Döndür ve çevir"
          >
            <button
              type="button"
              onClick={() => void donusum({ aci: (d.aci + 270) % 360 })}
            >
              ⟲ Sola döndür
            </button>
            <button
              type="button"
              onClick={() => void donusum({ aci: (d.aci + 90) % 360 })}
            >
              ⟳ Sağa döndür
            </button>
            <button
              type="button"
              aria-pressed={d.yatay}
              onClick={() => void donusum({ yatay: !d.yatay })}
            >
              ⇋ Yatay çevir
            </button>
            <button
              type="button"
              aria-pressed={d.dikey}
              onClick={() => void donusum({ dikey: !d.dikey })}
            >
              ⇵ Dikey çevir
            </button>
          </div>
          <div
            className="arac-filtre kirp-oranlar"
            role="group"
            aria-label="Kırpma oranı"
          >
            {ORANLAR.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={oranId === o.id}
                className={oranId === o.id ? "is-active" : undefined}
                onClick={() => oranSec(o.id)}
              >
                {o.ad}
              </button>
            ))}
          </div>
          <KirpmaAlani
            url={d.onizleme}
            kaynak={{ genislik: d.calisma.width, yukseklik: d.calisma.height }}
            bolge={bolge}
            onDegis={(b) => {
              setBolge(b);
              if (sonuc) sonucTemizle();
            }}
            onBitir={setBolge}
            tutamac
            oran={oran}
            kilavuz="ucte-bir"
          />
          <div className="kirp-alt">
            <span>
              Kırpılacak alan:{" "}
              <b>
                {bolge.w}×{bolge.h} px
              </b>{" "}
              · Orijinal: {d.calisma.width}×{d.calisma.height}
            </span>
            <label className="kirp-format">
              Format{" "}
              <select
                value={format}
                onChange={(e) =>
                  setFormat(e.target.value as GorselFormat | "ayni")
                }
              >
                <option value="ayni">
                  Aynı (
                  {
                    FORMATLAR[formatTahmin(d.dosya.name, d.dosya.type) ?? "jpg"]
                      .ad
                  }
                  )
                </option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </label>
            <button
              type="button"
              className="time-tool-button"
              onClick={() => void kirp()}
            >
              Kırp
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={sonuc.ad}
              >
                İndir ({sonuc.w}×{sonuc.h}, {boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
        </>
      ) : null}
      <p className="date-calc-note">
        Kutuyu sürükleyerek taşıyın, köşelerinden boyutlandırın. Kırpma orijinal
        çözünürlükte yapılır; fotoğraf tarayıcınızda işlenir ve hiçbir yere
        yüklenmez.
      </p>
    </div>
  );
}
