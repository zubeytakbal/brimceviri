"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";
import { pdfAc, sayfaCiz } from "./pdfjs";

type Sayfa = {
  kaynak: number;
  donme: number;
  silindi: boolean;
  resim?: string;
};

/** PDF sayfalarını önizlemeyle döndürme, silme ve yeniden sıralama. */
export default function PdfDuzenle() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [sayfalar, setSayfalar] = useState<Sayfa[]>([]);
  const [durum, setDurum] = useState("");
  const [hata, setHata] = useState("");
  const [sonuc, setSonuc] = useState<{
    url: string;
    boyut: number;
    sayfa: number;
  } | null>(null);
  const veri = useRef<Uint8Array | null>(null);
  const surukle = useRef<number | null>(null);
  const url = useRef<string | null>(null);
  const oturum = useRef(0);

  useEffect(
    () => () => {
      if (url.current) URL.revokeObjectURL(url.current);
    },
    [],
  );

  const sonucTemizle = () => {
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
    setSonuc(null);
  };

  const ac = async (d: File[]) => {
    const no = ++oturum.current;
    sonucTemizle();
    setHata("");
    setDurum("PDF açılıyor…");
    try {
      veri.current = new Uint8Array(await d[0].arrayBuffer());
      const belge = await pdfAc(veri.current);
      setDosya(d[0]);
      setSayfalar(
        Array.from({ length: belge.numPages }, (_, i) => ({
          kaynak: i,
          donme: 0,
          silindi: false,
        })),
      );
      for (let i = 0; i < belge.numPages; i++) {
        if (no !== oturum.current) break;
        setDurum(`Önizlemeler hazırlanıyor (${i + 1}/${belge.numPages})…`);
        const c = await sayfaCiz(belge, i + 1, 0.35);
        const resim = c.toDataURL("image/jpeg", 0.7);
        setSayfalar((s) =>
          s.map((x) => (x.kaynak === i ? { ...x, resim } : x)),
        );
      }
      await belge.destroy();
    } catch (e) {
      setHata(e instanceof Error ? e.message : "PDF okunamadı.");
      setDosya(null);
    } finally {
      if (no === oturum.current) setDurum("");
    }
  };

  const degis = (f: (s: Sayfa[]) => Sayfa[]) => {
    sonucTemizle();
    setSayfalar(f);
  };
  const tasi = (i: number, j: number) =>
    degis((s) => {
      if (j < 0 || j >= s.length || i === j) return s;
      const l = [...s];
      const [x] = l.splice(i, 1);
      l.splice(j, 0, x);
      return l;
    });
  const dondur = (i: number, d: number) =>
    degis((s) =>
      s.map((x, k) =>
        k === i ? { ...x, donme: (x.donme + d + 360) % 360 } : x,
      ),
    );

  const kaydet = async () => {
    if (!veri.current || !dosya) return;
    setHata("");
    try {
      const kalan = sayfalar.filter((s) => !s.silindi);
      if (!kalan.length) throw new Error("En az bir sayfa kalmalı.");
      const { sayfalariAl } = await import("../../converter/pdf/pdfIslem");
      const pdf = await sayfalariAl(
        veri.current,
        kalan.map((s) => s.kaynak),
        Object.fromEntries(kalan.map((s) => [s.kaynak, s.donme])),
      );
      sonucTemizle();
      const blob = new Blob([pdf as BlobPart], { type: "application/pdf" });
      url.current = URL.createObjectURL(blob);
      setSonuc({ url: url.current, boyut: blob.size, sayfa: kalan.length });
      indir(
        url.current,
        dosya.name.replace(/\.pdf$/i, "") + "-duzenlenmis.pdf",
      );
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Kaydedilemedi.");
    }
  };

  const silinen = sayfalar.filter((s) => s.silindi).length;
  const degisti = sayfalar.some(
    (s, i) => s.silindi || s.donme || s.kaynak !== i,
  );

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
          <div
            className="kirp-araclar"
            role="toolbar"
            aria-label="Tüm sayfalar"
          >
            <button
              type="button"
              onClick={() =>
                degis((s) =>
                  s.map((x) => ({ ...x, donme: (x.donme + 90) % 360 })),
                )
              }
            >
              ↻ Tümünü döndür
            </button>
            <button
              type="button"
              onClick={() => degis((s) => [...s].reverse())}
            >
              ⇅ Sırayı ters çevir
            </button>
            <button
              type="button"
              onClick={() =>
                degis((s) =>
                  [...s]
                    .sort((a, b) => a.kaynak - b.kaynak)
                    .map((x) => ({ ...x, donme: 0, silindi: false })),
                )
              }
            >
              ↺ Sıfırla
            </button>
          </div>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {sayfalar.length} sayfa
            {silinen ? ` · ${silinen} sayfa silinecek` : ""}
            {durum ? ` · ${durum}` : ""}
          </p>
          <ol className="pdf-kucuk-resimler pdf-duzen">
            {sayfalar.map((s, i) => (
              <li
                key={s.kaynak}
                className={s.silindi ? "is-silindi" : undefined}
                draggable
                onDragStart={() => {
                  surukle.current = i;
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (surukle.current !== null) tasi(surukle.current, i);
                  surukle.current = null;
                }}
              >
                <div className="pdf-onizleme">
                  {s.resim ? (
                    // eslint-disable-next-line @next/next/no-img-element -- yerel önizleme
                    <img
                      src={s.resim}
                      alt={`Sayfa ${s.kaynak + 1}`}
                      style={{
                        // Yan dönen sayfa kutudan taşmasın diye küçültülür.
                        transform: `rotate(${s.donme}deg)${s.donme % 180 ? " scale(0.7)" : ""}`,
                      }}
                      draggable={false}
                    />
                  ) : (
                    <span className="gorsel-durum">…</span>
                  )}
                </div>
                <span>
                  {i + 1}. sıra · orijinal sayfa {s.kaynak + 1}
                  {s.donme ? ` · ${s.donme}°` : ""}
                </span>
                <span className="pdf-duzen-dugmeler">
                  <button
                    type="button"
                    onClick={() => tasi(i, i - 1)}
                    disabled={i === 0}
                    aria-label={`Sayfa ${s.kaynak + 1} sola taşı`}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => dondur(i, -90)}
                    aria-label={`Sayfa ${s.kaynak + 1} sola döndür`}
                  >
                    ↺
                  </button>
                  <button
                    type="button"
                    onClick={() => dondur(i, 90)}
                    aria-label={`Sayfa ${s.kaynak + 1} sağa döndür`}
                  >
                    ↻
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      degis((l) =>
                        l.map((x, k) =>
                          k === i ? { ...x, silindi: !x.silindi } : x,
                        ),
                      )
                    }
                    aria-label={
                      s.silindi
                        ? `Sayfa ${s.kaynak + 1} geri al`
                        : `Sayfa ${s.kaynak + 1} sil`
                    }
                    className="pdf-sil"
                  >
                    {s.silindi ? "↩" : "🗑"}
                  </button>
                  <button
                    type="button"
                    onClick={() => tasi(i, i + 1)}
                    disabled={i === sayfalar.length - 1}
                    aria-label={`Sayfa ${s.kaynak + 1} sağa taşı`}
                  >
                    →
                  </button>
                </span>
              </li>
            ))}
          </ol>
          <div className="gorsel-alt">
            <span>Sürükleyerek de sıralayabilirsiniz.</span>
            <button
              type="button"
              className="time-tool-button"
              disabled={!degisti}
              onClick={() => void kaydet()}
            >
              Değişiklikleri kaydet
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={
                  dosya.name.replace(/\.pdf$/i, "") + "-duzenlenmis.pdf"
                }
              >
                İndir ({sonuc.sayfa} sayfa, {boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
        </>
      ) : durum ? (
        <p className="gorsel-durum">{durum}</p>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Önizlemeler ve kaydetme tarayıcınızda yapılır; PDF hiçbir sunucuya
        yüklenmez. Sayfalar yeniden sıkıştırılmaz, kalite değişmez.
      </p>
    </div>
  );
}
