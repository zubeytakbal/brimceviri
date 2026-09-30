"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/app/components/SiteLink";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import type { GorselPdfAyar } from "../../converter/pdf/pdfIslem";
import DosyaBirak from "../gorsel/DosyaBirak";
import { bitmapAc, indir, kodla } from "../gorsel/tuval";
import SiraListesi from "./SiraListesi";

type Oge = { id: number; dosya: File };

/** Görsellerden (JPG, PNG, WebP, HEIC) PDF oluşturur. Fotoğrafın yönü (EXIF) doğru uygulanır. */
export default function GorselPdf() {
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [ayar, setAyar] = useState<GorselPdfAyar>({
    sayfa: "a4",
    yon: "otomatik",
    kenar: 20,
  });
  const [sonuc, setSonuc] = useState<{ url: string; boyut: number } | null>(
    null,
  );
  const [calisiyor, setCalisiyor] = useState(false);
  const [hata, setHata] = useState("");
  const sayac = useRef(0);
  const url = useRef<string | null>(null);

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

  const olustur = async () => {
    setHata("");
    setCalisiyor(true);
    try {
      const sayfalar = [];
      for (const o of ogeler) {
        const bitmap = await bitmapAc(o.dosya);
        try {
          // Tarayıcıda açıp yeniden kaydetmek, telefon fotoğraflarının yönünü doğru uygular.
          const png =
            /\.png$/i.test(o.dosya.name) || o.dosya.type === "image/png";
          const blob = await kodla(bitmap, {
            genislik: bitmap.width,
            yukseklik: bitmap.height,
            format: png ? "png" : "jpg",
            kalite: 0.92,
          });
          sayfalar.push({
            veri: new Uint8Array(await blob.arrayBuffer()),
            tur: png ? ("png" as const) : ("jpg" as const),
            genislik: bitmap.width,
            yukseklik: bitmap.height,
          });
        } finally {
          bitmap.close();
        }
      }
      const { gorsellerdenPdf } = await import("../../converter/pdf/pdfIslem");
      const veri = await gorsellerdenPdf(sayfalar, ayar);
      sonucTemizle();
      const blob = new Blob([veri as BlobPart], { type: "application/pdf" });
      url.current = URL.createObjectURL(blob);
      setSonuc({ url: url.current, boyut: blob.size });
      indir(url.current, "gorseller.pdf");
    } catch (e) {
      setHata(e instanceof Error ? e.message : "PDF oluşturulamadı.");
    } finally {
      setCalisiyor(false);
    }
  };

  const ayarla = (p: Partial<GorselPdfAyar>) => {
    sonucTemizle();
    setAyar((a) => ({ ...a, ...p }));
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        baslik={
          ogeler.length
            ? "Başka görsel ekleyin"
            : "Görselleri seçin (JPG, PNG, HEIC…)"
        }
        max={100}
        onSec={(d) => {
          sonucTemizle();
          setOgeler((s) => [
            ...s,
            ...d.map((dosya) => ({ id: ++sayac.current, dosya })),
          ]);
        }}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Sayfa boyutu</span>
            <span className="date-calc-field-row">
              <select
                value={ayar.sayfa}
                onChange={(e) =>
                  ayarla({ sayfa: e.target.value as GorselPdfAyar["sayfa"] })
                }
              >
                <option value="a4">A4 (görsel sayfaya sığdırılır)</option>
                <option value="gorsel">Görselin kendi boyutu</option>
              </select>
            </span>
          </label>
          {ayar.sayfa === "a4" ? (
            <>
              <label className="date-calc-field">
                <span>Yön</span>
                <span className="date-calc-field-row">
                  <select
                    value={ayar.yon}
                    onChange={(e) =>
                      ayarla({ yon: e.target.value as GorselPdfAyar["yon"] })
                    }
                  >
                    <option value="otomatik">Otomatik (görsele göre)</option>
                    <option value="dikey">Dikey</option>
                    <option value="yatay">Yatay</option>
                  </select>
                </span>
              </label>
              <label className="date-calc-field">
                <span>Kenar boşluğu</span>
                <span className="date-calc-field-row">
                  <select
                    value={ayar.kenar}
                    onChange={(e) => ayarla({ kenar: Number(e.target.value) })}
                  >
                    <option value={0}>Yok</option>
                    <option value={20}>Küçük</option>
                    <option value={40}>Büyük</option>
                  </select>
                </span>
              </label>
            </>
          ) : null}
        </div>
      </div>
      {ogeler.length ? (
        <>
          <SiraListesi
            ogeler={ogeler}
            onDegis={(l) => {
              sonucTemizle();
              setOgeler(l);
            }}
            ad={(o) => o.dosya.name}
            bilgi={(o) => boyutMetni(o.dosya.size)}
          />
          <div className="gorsel-alt">
            <span>
              {ogeler.length} görsel → {ogeler.length} sayfa
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={calisiyor}
              onClick={() => void olustur()}
            >
              {calisiyor ? "Oluşturuluyor…" : "PDF oluştur"}
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download="gorseller.pdf"
              >
                İndir ({boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Her görsel bir sayfa olur; sırayı ↑ ↓ ile değiştirin. PDF tarayıcınızda
        oluşturulur, görseller yüklenmez. Dosya çok büyük olursa önce{" "}
        <Link href="/fotograf-boyutu-kucultme">Fotoğraf Boyutu Küçültme</Link>{" "}
        aracını kullanın.
      </p>
    </div>
  );
}
