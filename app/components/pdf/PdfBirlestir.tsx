"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";
import SiraListesi from "./SiraListesi";

type Oge = { id: number; dosya: File; sayfa?: number; hata?: string };

const pdfIslem = () => import("../../converter/pdf/pdfIslem");

/** PDF birleştirme: dosyaları sıralayıp tek PDF yapar. Tarayıcıda çalışır. */
export default function PdfBirlestir() {
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [sonuc, setSonuc] = useState<{
    url: string;
    boyut: number;
    sayfa: number;
  } | null>(null);
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

  const ekle = async (dosyalar: File[]) => {
    sonucTemizle();
    const { sayfaSayisi } = await pdfIslem();
    for (const dosya of dosyalar) {
      const id = ++sayac.current;
      let o: Oge = { id, dosya };
      try {
        o = {
          ...o,
          sayfa: await sayfaSayisi(new Uint8Array(await dosya.arrayBuffer())),
        };
      } catch (e) {
        o = { ...o, hata: e instanceof Error ? e.message : "PDF okunamadı." };
      }
      setOgeler((s) => [...s, o]);
    }
  };

  const birlestir = async () => {
    setHata("");
    setCalisiyor(true);
    try {
      const { birlestir: b } = await pdfIslem();
      const gecerli = ogeler.filter((o) => !o.hata);
      const veri = await b(
        await Promise.all(
          gecerli.map(async (o) => new Uint8Array(await o.dosya.arrayBuffer())),
        ),
      );
      sonucTemizle();
      const blob = new Blob([veri as BlobPart], { type: "application/pdf" });
      url.current = URL.createObjectURL(blob);
      setSonuc({
        url: url.current,
        boyut: blob.size,
        sayfa: gecerli.reduce((s, o) => s + (o.sayfa ?? 0), 0),
      });
      indir(url.current, "birlestirilmis.pdf");
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Birleştirme başarısız.");
    } finally {
      setCalisiyor(false);
    }
  };

  const gecerliSayi = ogeler.filter((o) => !o.hata).length;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="pdf"
        baslik={ogeler.length ? "Başka PDF ekleyin" : "PDF dosyalarını seçin"}
        max={50}
        onSec={(d) => void ekle(d)}
      />
      {ogeler.length ? (
        <>
          <SiraListesi
            ogeler={ogeler}
            onDegis={(l) => {
              sonucTemizle();
              setOgeler(l);
            }}
            ad={(o) => o.dosya.name}
            bilgi={(o) =>
              o.hata ? (
                <span className="gorsel-hata">{o.hata}</span>
              ) : (
                `${o.sayfa} sayfa · ${boyutMetni(o.dosya.size)}`
              )
            }
          />
          <div className="gorsel-alt">
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() =>
                setOgeler((l) =>
                  [...l].sort((a, b) =>
                    a.dosya.name.localeCompare(b.dosya.name, "tr", {
                      numeric: true,
                    }),
                  ),
                )
              }
            >
              Ada göre sırala
            </button>
            <button
              type="button"
              className="time-tool-button"
              disabled={gecerliSayi < 2 || calisiyor}
              onClick={() => void birlestir()}
            >
              {calisiyor
                ? "Birleştiriliyor…"
                : `${gecerliSayi} PDF'i birleştir`}
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download="birlestirilmis.pdf"
              >
                İndir ({sonuc.sayfa} sayfa, {boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        PDF&apos;ler tarayıcınızda birleştirilir, hiçbir sunucuya yüklenmez.
        Sırayı ↑ ↓ düğmeleriyle değiştirin. Şifreli PDF&apos;lerin önce şifresi
        kaldırılmalıdır.
      </p>
    </div>
  );
}
