"use client";

import { useEffect, useRef, useState } from "react";
import {
  boyutMetni,
  ciktiAdi,
  FORMATLAR,
  type GorselFormat,
} from "../../converter/gorsel/formatlar";
import DosyaBirak from "./DosyaBirak";
import {
  bitmapAc,
  hedefBoyutaKodla,
  indir,
  zipUrlOlustur,
  type HedefSonuc,
} from "./tuval";

const HAZIR = [20, 50, 100, 150, 200, 500, 1000, 2000];
const MAX_DOSYA = 30;

type Oge = {
  id: number;
  dosya: File;
  durum: "bekliyor" | "hazir" | "hata";
  hata?: string;
  sonuc?: HedefSonuc & { url: string; ad: string };
};

const kbEtiket = (kb: number) => (kb >= 1000 ? `${kb / 1000} MB` : `${kb} KB`);

/**
 * Fotoğrafı seçilen KB sınırının altına indirir. Güvenli tarafta kalmak için 1 KB = 1000 bayt alınır;
 * böylece sonuç 1024 bayt kullanan sistemlerde de sınırın altında kalır.
 */
export default function FotoKucult({
  varsayilanKb = 100,
}: {
  varsayilanKb?: number;
}) {
  const [hedefKb, setHedefKb] = useState(varsayilanKb);
  const [ozel, setOzel] = useState("");
  const [format, setFormat] = useState<GorselFormat>("jpg");
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const sayac = useRef(0);
  const calisma = useRef(0);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const isle = async (liste: Oge[], kb: number, fmt: GorselFormat) => {
    const no = ++calisma.current;
    for (const u of urller.current) URL.revokeObjectURL(u);
    urller.current = [];
    setZipUrl(null);
    setOgeler(
      liste.map((o) => ({
        ...o,
        durum: "bekliyor",
        sonuc: undefined,
        hata: undefined,
      })),
    );
    for (const o of liste) {
      let yeni: Oge;
      try {
        const bitmap = await bitmapAc(o.dosya);
        let sonuc: HedefSonuc;
        try {
          sonuc = await hedefBoyutaKodla(bitmap, kb * 1000, fmt);
        } finally {
          bitmap.close();
        }
        if (no !== calisma.current) return;
        const url = URL.createObjectURL(sonuc.blob);
        urller.current.push(url);
        yeni = {
          ...o,
          durum: "hazir",
          sonuc: { ...sonuc, url, ad: ciktiAdi(o.dosya.name, fmt) },
        };
      } catch (e) {
        if (no !== calisma.current) return;
        yeni = {
          ...o,
          durum: "hata",
          hata: e instanceof Error ? e.message : "Hata",
        };
      }
      setOgeler((s) => s.map((x) => (x.id === o.id ? yeni : x)));
    }
  };

  const ekle = (dosyalar: File[]) => {
    const yeni = dosyalar.map(
      (dosya): Oge => ({ id: ++sayac.current, dosya, durum: "bekliyor" }),
    );
    void isle([...ogeler, ...yeni].slice(-MAX_DOSYA), hedefKb, format);
  };

  const hedefSec = (kb: number) => {
    if (!(kb > 0)) return;
    setHedefKb(kb);
    if (ogeler.length) void isle(ogeler, kb, format);
  };

  const formatSec = (f: GorselFormat) => {
    setFormat(f);
    if (ogeler.length) void isle(ogeler, hedefKb, f);
  };

  const zipYap = async () => {
    const url = await zipUrlOlustur(
      ogeler.flatMap((o) =>
        o.sonuc ? [{ ad: o.sonuc.ad, blob: o.sonuc.blob }] : [],
      ),
    );
    urller.current.push(url);
    setZipUrl(url);
    indir(url, `kucultulmus-${hedefKb}kb.zip`);
  };

  const hazir = ogeler.filter((o) => o.sonuc).length;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak baslik="Fotoğrafları seçin" max={MAX_DOSYA} onSec={ekle} />

      <div className="date-calc-input">
        <div className="date-calc-field">
          <span>Hedef dosya boyutu (en fazla)</span>
          <div
            className="gorsel-hedefler"
            role="group"
            aria-label="Hedef boyut"
          >
            {HAZIR.map((kb) => (
              <button
                key={kb}
                type="button"
                aria-pressed={hedefKb === kb}
                className={hedefKb === kb ? "is-active" : undefined}
                onClick={() => {
                  setOzel("");
                  hedefSec(kb);
                }}
              >
                {kbEtiket(kb)}
              </button>
            ))}
          </div>
        </div>
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Başka bir değer (KB)</span>
            <span className="date-calc-field-row">
              <input
                type="number"
                inputMode="numeric"
                min={5}
                placeholder="ör. 300"
                value={ozel}
                onChange={(e) => setOzel(e.target.value)}
                onBlur={() => ozel && hedefSec(Number(ozel))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && ozel) hedefSec(Number(ozel));
                }}
              />
            </span>
          </label>
          <label className="date-calc-field">
            <span>Çıktı formatı</span>
            <span className="date-calc-field-row">
              <select
                value={format}
                onChange={(e) => formatSec(e.target.value as GorselFormat)}
              >
                <option value="jpg">JPG (her yerde kabul edilir)</option>
                <option value="webp">WebP (daha küçük, web için)</option>
              </select>
            </span>
          </label>
        </div>
      </div>

      {ogeler.length ? (
        <>
          <ul className="gorsel-liste">
            {ogeler.map((o) => (
              <li key={o.id}>
                <span className="gorsel-ad" title={o.dosya.name}>
                  {o.dosya.name}
                </span>
                <span className="gorsel-boyut">
                  {boyutMetni(o.dosya.size)}
                  {o.sonuc ? (
                    <>
                      {" → "}
                      <b>{boyutMetni(o.sonuc.blob.size)}</b> ·{" "}
                      {o.sonuc.genislik}×{o.sonuc.yukseklik} · kalite %
                      {Math.round(o.sonuc.kalite * 100)}
                    </>
                  ) : null}
                </span>
                {o.sonuc ? (
                  <span className="gorsel-tamam">
                    ✓ {kbEtiket(hedefKb)} altında
                    {o.sonuc.kucultuldu ? " (ölçü küçültüldü)" : ""}
                  </span>
                ) : null}
                {o.durum === "bekliyor" ? (
                  <span className="gorsel-durum">Küçültülüyor…</span>
                ) : null}
                {o.hata ? <span className="gorsel-hata">{o.hata}</span> : null}
                {o.sonuc ? (
                  <a
                    className="time-tool-button is-secondary"
                    href={o.sonuc.url}
                    download={o.sonuc.ad}
                  >
                    İndir
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="gorsel-alt">
            <span>
              {hazir}/{ogeler.length} hazır
            </span>
            {hazir > 1 ? (
              <button
                type="button"
                className="time-tool-button"
                onClick={() => void zipYap()}
              >
                Tümünü ZIP olarak indir
              </button>
            ) : null}
            {zipUrl ? (
              <a
                href={zipUrl}
                download={`kucultulmus-${hedefKb}kb.zip`}
                className="gorsel-zip-link"
              >
                ZIP indirilmediyse tıklayın
              </a>
            ) : null}
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => {
                calisma.current++;
                for (const u of urller.current) URL.revokeObjectURL(u);
                urller.current = [];
                setZipUrl(null);
                setOgeler([]);
              }}
            >
              Listeyi temizle
            </button>
          </div>
        </>
      ) : null}
      <p className="date-calc-note">
        Önce kalite düşürülür; hedefe yine ulaşılamazsa fotoğrafın piksel ölçüsü
        küçültülür. Güvenli tarafta kalmak için 1 KB = 1000 bayt alınır, böylece
        dosya 1024 bayt hesabı yapan sistemlerde de sınırın altında kalır. Konum
        ve kamera bilgileri (EXIF) çıktıya aktarılmaz.{" "}
        {FORMATLAR[format].seffaflik ? "" : "Saydam alanlar beyaz olur."}
      </p>
    </div>
  );
}
