"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni, ciktiAdi } from "../../converter/gorsel/formatlar";
import { jpegDoldur } from "../../converter/gorsel/jpeg";
import {
  kaliteAra,
  kirpmaBolgesi,
  type Bolge,
} from "../../converter/gorsel/sikistirma";
import DosyaBirak from "./DosyaBirak";
import KirpmaAlani from "./KirpmaAlani";
import { bitmapAc, indir, kodla, zipUrlOlustur } from "./tuval";

export type VesikalikOlcu = {
  ad: string;
  genislik: number;
  yukseklik: number;
  /** Güvenli alt sınır (bayt); küçük kalırsa dosya görüntü değişmeden tamamlanır. */
  minBayt?: number;
  /** Güvenli üst sınır (bayt). */
  maxBayt?: number;
  /** Kullanıcıya gösterilecek sınır metni, ör. "20–150 KB". */
  sinirMetni?: string;
};

type Oge = {
  id: number;
  dosya: File;
  url: string;
  W: number;
  H: number;
  olcek: number;
  bolge: Bolge;
  sonuc?: { blob: Blob; url: string; ad: string; dolduruldu: boolean };
  hata?: string;
};

const MAX_DOSYA = 60;

/**
 * Vesikalık / belge fotoğrafı hazırlayıcı: sabit piksel ölçüsüne kırpar, JPG olarak kaydeder
 * ve dosya boyutunu belgenin istediği aralığa getirir. Toplu kullanım için (ör. bir sınıfın fotoğrafları).
 */
export default function VesikalikArac({ olcu }: { olcu: VesikalikOlcu }) {
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [secili, setSecili] = useState<number | null>(null);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const sayac = useRef(0);
  const bitmapler = useRef(new Map<number, ImageBitmap>());
  const urller = useRef(new Set<string>());
  const oran = olcu.genislik / olcu.yukseklik;

  useEffect(() => {
    const b = bitmapler.current;
    const u = urller.current;
    return () => {
      for (const x of b.values()) x.close();
      for (const x of u) URL.revokeObjectURL(x);
    };
  }, []);

  const url = (blob: Blob) => {
    const x = URL.createObjectURL(blob);
    urller.current.add(x);
    return x;
  };
  const birak = (x?: string) => {
    if (!x) return;
    URL.revokeObjectURL(x);
    urller.current.delete(x);
  };

  const uret = async (o: Oge) => {
    const bitmap = bitmapler.current.get(o.id);
    if (!bitmap) return;
    try {
      const ayar = {
        genislik: olcu.genislik,
        yukseklik: olcu.yukseklik,
        format: "jpg" as const,
        bolge: o.bolge,
      };
      let blob = await kodla(bitmap, { ...ayar, kalite: 0.95 });
      if (olcu.maxBayt && blob.size > olcu.maxBayt) {
        const onbellek = new Map<number, Blob>();
        const r = await kaliteAra(async (q) => {
          const b = await kodla(bitmap, { ...ayar, kalite: q });
          onbellek.set(q, b);
          return b.size;
        }, olcu.maxBayt);
        if (!r)
          throw new Error("Fotoğraf üst boyut sınırının altına indirilemedi.");
        blob = onbellek.get(r.kalite)!;
      }
      let dolduruldu = false;
      if (olcu.minBayt && blob.size < olcu.minBayt) {
        const veri = jpegDoldur(
          new Uint8Array(await blob.arrayBuffer()),
          olcu.minBayt,
        );
        blob = new Blob([veri as BlobPart], { type: "image/jpeg" });
        dolduruldu = true;
      }
      const sonuc = {
        blob,
        url: url(blob),
        ad: ciktiAdi(o.dosya.name, "jpg"),
        dolduruldu,
      };
      setOgeler((s) =>
        s.map((x) => {
          if (x.id !== o.id) return x;
          birak(x.sonuc?.url);
          return {
            ...x,
            bolge: o.bolge,
            olcek: o.olcek,
            sonuc,
            hata: undefined,
          };
        }),
      );
    } catch (e) {
      setOgeler((s) =>
        s.map((x) =>
          x.id === o.id
            ? { ...x, hata: e instanceof Error ? e.message : "Hata" }
            : x,
        ),
      );
    }
  };

  const ekle = async (dosyalar: File[]) => {
    setZipUrl(null);
    for (const dosya of dosyalar.slice(0, MAX_DOSYA - ogeler.length)) {
      const id = ++sayac.current;
      try {
        const bitmap = await bitmapAc(dosya);
        bitmapler.current.set(id, bitmap);
        const kaynak = { genislik: bitmap.width, yukseklik: bitmap.height };
        const o: Oge = {
          id,
          dosya,
          url: url(dosya),
          W: bitmap.width,
          H: bitmap.height,
          olcek: 1,
          bolge: kirpmaBolgesi(kaynak, oran),
        };
        setOgeler((s) => [...s, o]);
        setSecili((x) => x ?? id);
        await uret(o);
      } catch (e) {
        setOgeler((s) => [
          ...s,
          {
            id,
            dosya,
            url: "",
            W: 1,
            H: 1,
            olcek: 1,
            bolge: { x: 0, y: 0, w: 1, h: 1 },
            hata: e instanceof Error ? e.message : "Hata",
          },
        ]);
      }
    }
  };

  const guncelle = (id: number, p: Partial<Oge>, kaydet: boolean) => {
    setZipUrl(null);
    setOgeler((s) => s.map((x) => (x.id === id ? { ...x, ...p } : x)));
    if (kaydet) {
      const o = ogeler.find((x) => x.id === id);
      if (o) void uret({ ...o, ...p });
    }
  };

  const olcekDegis = (o: Oge, olcek: number, kaydet: boolean) => {
    const merkez = {
      x: o.bolge.x + o.bolge.w / 2,
      y: o.bolge.y + o.bolge.h / 2,
    };
    const bolge = kirpmaBolgesi(
      { genislik: o.W, yukseklik: o.H },
      oran,
      olcek,
      merkez,
    );
    guncelle(o.id, { olcek, bolge }, kaydet);
  };

  const sil = (id: number) => {
    const o = ogeler.find((x) => x.id === id);
    birak(o?.url);
    birak(o?.sonuc?.url);
    bitmapler.current.get(id)?.close();
    bitmapler.current.delete(id);
    setOgeler((s) => s.filter((x) => x.id !== id));
    if (secili === id) setSecili(ogeler.find((x) => x.id !== id)?.id ?? null);
    setZipUrl(null);
  };

  const zipYap = async () => {
    const u = await zipUrlOlustur(
      ogeler.flatMap((o) =>
        o.sonuc ? [{ ad: o.sonuc.ad, blob: o.sonuc.blob }] : [],
      ),
    );
    urller.current.add(u);
    setZipUrl(u);
    indir(u, `fotograflar-${olcu.genislik}x${olcu.yukseklik}.zip`);
  };

  const s = ogeler.find((o) => o.id === secili) ?? null;
  const hazir = ogeler.filter((o) => o.sonuc).length;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        baslik={ogeler.length ? "Başka fotoğraf ekleyin" : "Fotoğrafları seçin"}
        max={MAX_DOSYA}
        onSec={(d) => void ekle(d)}
      />
      <p className="vesikalik-ozet">
        Çıktı:{" "}
        <b>
          {olcu.genislik}×{olcu.yukseklik} piksel
        </b>
        , JPG
        {olcu.sinirMetni ? (
          <>
            , <b>{olcu.sinirMetni}</b>
          </>
        ) : null}{" "}
        · {olcu.ad}
      </p>

      {s && s.url ? (
        <div className="vesikalik-duzen">
          <div>
            <KirpmaAlani
              url={s.url}
              kaynak={{ genislik: s.W, yukseklik: s.H }}
              bolge={s.bolge}
              onDegis={(bolge) => guncelle(s.id, { bolge }, false)}
              onBitir={(bolge) => guncelle(s.id, { bolge }, true)}
            />
            <label className="vesikalik-yakin">
              <span>Yakınlaştır</span>
              <input
                type="range"
                min={0.2}
                max={1}
                step={0.01}
                value={s.olcek}
                onChange={(e) => olcekDegis(s, Number(e.target.value), false)}
                onPointerUp={(e) =>
                  olcekDegis(
                    s,
                    Number((e.target as HTMLInputElement).value),
                    true,
                  )
                }
                onKeyUp={(e) =>
                  olcekDegis(
                    s,
                    Number((e.target as HTMLInputElement).value),
                    true,
                  )
                }
                aria-label="Yakınlaştır"
              />
            </label>
            <p className="vesikalik-ipucu">
              Kutuyu sürükleyerek yüzü ortalayın; yüz kutunun üst yarısında
              olmalı.
            </p>
          </div>
          <div className="vesikalik-sonuc">
            {s.sonuc ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- yerel nesne URL'si */}
                <img
                  src={s.sonuc.url}
                  width={olcu.genislik}
                  height={olcu.yukseklik}
                  alt="Hazırlanan fotoğraf"
                />
                <strong>{boyutMetni(s.sonuc.blob.size)}</strong>
                <span className="gorsel-tamam">✓ {olcu.ad} için uygun</span>
                <a
                  className="time-tool-button"
                  href={s.sonuc.url}
                  download={s.sonuc.ad}
                >
                  İndir
                </a>
              </>
            ) : (
              <span className="gorsel-durum">Hazırlanıyor…</span>
            )}
          </div>
        </div>
      ) : null}

      {ogeler.length ? (
        <>
          <ul className="gorsel-liste">
            {ogeler.map((o) => (
              <li
                key={o.id}
                className={o.id === secili ? "is-secili" : undefined}
              >
                <button
                  type="button"
                  className="gorsel-ad vesikalik-sec"
                  onClick={() => setSecili(o.id)}
                  title="Kırpmayı düzenle"
                >
                  {o.dosya.name}
                </button>
                <span className="gorsel-boyut">
                  {boyutMetni(o.dosya.size)}
                  {o.sonuc ? (
                    <>
                      {" → "}
                      <b>{boyutMetni(o.sonuc.blob.size)}</b>
                    </>
                  ) : null}
                </span>
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
                <button
                  type="button"
                  className="vesikalik-sil"
                  onClick={() => sil(o.id)}
                  aria-label={`${o.dosya.name} kaldır`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <div className="gorsel-alt">
            <span>
              {hazir}/{ogeler.length} hazır · düzenlemek için dosya adına
              tıklayın
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
                download={`fotograflar-${olcu.genislik}x${olcu.yukseklik}.zip`}
                className="gorsel-zip-link"
              >
                ZIP indirilmediyse tıklayın
              </a>
            ) : null}
          </div>
        </>
      ) : null}
      {olcu.minBayt ? (
        <p className="date-calc-note">
          Bu ölçüde bir fotoğraf çoğu zaman alt sınırın altında kalır. Böyle
          durumlarda dosyaya görüntüyü değiştirmeyen bir açıklama alanı
          eklenerek dosya boyutu sınıra tamamlanır; fotoğraf her programda aynı
          görünür.
        </p>
      ) : null}
    </div>
  );
}
