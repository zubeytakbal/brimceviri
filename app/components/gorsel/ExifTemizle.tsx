"use client";

import { useEffect, useRef, useState } from "react";
import {
  jpegExifOku,
  jpegTemizle,
  pngExifOku,
  pngTemizle,
  type ExifBilgi,
} from "../../converter/gorsel/exif";
import {
  boyutMetni,
  ciktiAdi,
  formatTahmin,
} from "../../converter/gorsel/formatlar";
import DosyaBirak from "./DosyaBirak";
import { bitmapAc, indir, kodla, zipUrlOlustur } from "./tuval";

type Oge = {
  id: number;
  dosya: File;
  bilgi?: ExifBilgi;
  kayipsiz?: boolean;
  cikti?: { blob: Blob; url: string; ad: string };
  hata?: string;
};

const MAX_DOSYA = 50;

const tarihMetni = (t?: string) => {
  const m = t?.match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2})/);
  return m ? `${m[3]}.${m[2]}.${m[1]} ${m[4]}:${m[5]}` : t;
};

async function isle(dosya: File): Promise<Omit<Oge, "id" | "dosya">> {
  const veri = new Uint8Array(await dosya.arrayBuffer());
  const tur = formatTahmin(dosya.name, dosya.type);
  if (tur === "jpg") {
    const bilgi = jpegExifOku(veri) ?? { turler: [] };
    const temiz = jpegTemizle(veri);
    const blob = new Blob([temiz as BlobPart], { type: "image/jpeg" });
    return {
      bilgi,
      kayipsiz: true,
      cikti: { blob, url: URL.createObjectURL(blob), ad: dosya.name },
    };
  }
  if (tur === "png") {
    const bilgi = pngExifOku(veri) ?? { turler: [] };
    const blob = new Blob([pngTemizle(veri) as BlobPart], {
      type: "image/png",
    });
    return {
      bilgi,
      kayipsiz: true,
      cikti: { blob, url: URL.createObjectURL(blob), ad: dosya.name },
    };
  }
  // Diğer biçimler: tarayıcıda yeniden kaydedilerek temizlenir (meta veri aktarılmaz).
  const bitmap = await bitmapAc(dosya);
  try {
    const format = tur ?? "jpg";
    const blob = await kodla(bitmap, {
      genislik: bitmap.width,
      yukseklik: bitmap.height,
      format,
      kalite: 0.95,
    });
    return {
      bilgi: { turler: [] },
      kayipsiz: false,
      cikti: {
        blob,
        url: URL.createObjectURL(blob),
        ad: ciktiAdi(dosya.name, format),
      },
    };
  } finally {
    bitmap.close();
  }
}

/** Fotoğraflardaki konum (GPS), cihaz ve tarih bilgilerini gösterir ve kayıpsız siler. */
export default function ExifTemizle() {
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const sayac = useRef(0);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const ekle = async (dosyalar: File[]) => {
    setZipUrl(null);
    for (const dosya of dosyalar.slice(0, MAX_DOSYA)) {
      const id = ++sayac.current;
      setOgeler((s) => [...s, { id, dosya }].slice(-MAX_DOSYA));
      let sonuc: Omit<Oge, "id" | "dosya">;
      try {
        sonuc = await isle(dosya);
        if (sonuc.cikti) urller.current.push(sonuc.cikti.url);
      } catch (e) {
        sonuc = { hata: e instanceof Error ? e.message : "Hata" };
      }
      setOgeler((s) => s.map((x) => (x.id === id ? { ...x, ...sonuc } : x)));
    }
  };

  const zipYap = async () => {
    const url = await zipUrlOlustur(
      ogeler.flatMap((o) =>
        o.cikti ? [{ ad: o.cikti.ad, blob: o.cikti.blob }] : [],
      ),
    );
    urller.current.push(url);
    setZipUrl(url);
    indir(url, "temizlenmis-fotograflar.zip");
  };

  const konumlu = ogeler.filter((o) => o.bilgi?.gps).length;
  const hazir = ogeler.filter((o) => o.cikti).length;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        baslik="Fotoğrafları seçin"
        max={MAX_DOSYA}
        onSec={(d) => void ekle(d)}
      />

      {ogeler.length ? (
        <>
          {konumlu ? (
            <p className="exif-uyari" role="alert">
              ⚠️ {konumlu} fotoğrafta çekildiği yerin konumu kayıtlı.
              Temizlenmiş halini paylaşın.
            </p>
          ) : null}
          <ul className="exif-liste">
            {ogeler.map((o) => {
              const b = o.bilgi;
              const cihaz = [
                b?.marka,
                b?.model?.startsWith(b?.marka ?? "\0")
                  ? b?.model.slice(b.marka!.length).trim()
                  : b?.model,
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <li key={o.id}>
                  <div className="exif-bas">
                    <strong title={o.dosya.name}>{o.dosya.name}</strong>
                    {o.cikti ? (
                      <a
                        className="time-tool-button"
                        href={o.cikti.url}
                        download={o.cikti.ad}
                      >
                        Temiz halini indir
                      </a>
                    ) : null}
                  </div>
                  {o.hata ? (
                    <span className="gorsel-hata">{o.hata}</span>
                  ) : null}
                  {!o.cikti && !o.hata ? (
                    <span className="gorsel-durum">İnceleniyor…</span>
                  ) : null}
                  {b ? (
                    <dl className="exif-bilgi">
                      <div>
                        <dt>Konum</dt>
                        <dd>
                          {b.gps ? (
                            <>
                              <b className="exif-kirmizi">
                                {b.gps.enlem.toFixed(5)},{" "}
                                {b.gps.boylam.toFixed(5)}
                              </b>{" "}
                              <a
                                href={`https://www.openstreetmap.org/?mlat=${b.gps.enlem.toFixed(6)}&mlon=${b.gps.boylam.toFixed(6)}#map=17/${b.gps.enlem.toFixed(6)}/${b.gps.boylam.toFixed(6)}`}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                              >
                                haritada gör
                              </a>
                            </>
                          ) : (
                            "Yok"
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt>Cihaz</dt>
                        <dd>{cihaz || "—"}</dd>
                      </div>
                      <div>
                        <dt>Çekim tarihi</dt>
                        <dd>{tarihMetni(b.tarih) || "—"}</dd>
                      </div>
                      {b.yazilim ? (
                        <div>
                          <dt>Yazılım</dt>
                          <dd>{b.yazilim}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt>Bulunan bilgiler</dt>
                        <dd>
                          {b.turler.length
                            ? b.turler.join(", ")
                            : "Meta veri yok"}
                        </dd>
                      </div>
                      {o.cikti ? (
                        <div>
                          <dt>Sonuç</dt>
                          <dd className="gorsel-tamam">
                            ✓ Temizlendi · {boyutMetni(o.dosya.size)} →{" "}
                            {boyutMetni(o.cikti.blob.size)}
                            {o.kayipsiz
                              ? " · kalite kaybı yok"
                              : " · yeniden kaydedildi"}
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className="gorsel-alt">
            <span>
              {hazir}/{ogeler.length} temizlendi
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
                download="temizlenmis-fotograflar.zip"
                className="gorsel-zip-link"
              >
                ZIP indirilmediyse tıklayın
              </a>
            ) : null}
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => {
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
        JPG ve PNG dosyaları yeniden sıkıştırılmadan temizlenir; görüntü
        kalitesi hiç değişmez. Telefonun kaydettiği yön bilgisi, fotoğraf yan
        dönmesin diye korunur. Renk profili de silinmez.
      </p>
    </div>
  );
}
