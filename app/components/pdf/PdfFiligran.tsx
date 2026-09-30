"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import FiligranPaneli from "../gorsel/FiligranPaneli";
import { filigranCiz, type FiligranAyar } from "../gorsel/filigranCiz";
import { bitmapAc, indir } from "../gorsel/tuval";
import { pdfAc, sayfaCiz } from "./pdfjs";

/** Filigran katmanı çözünürlüğü: 1 pt başına piksel (≈108 DPI). */
const OLCEK = 1.5;

const ciktiAdi = (ad: string) => ad.replace(/\.pdf$/i, "") + "-filigranli.pdf";

/** PDF sayfalarına yazı veya logo filigranı ekler. */
export default function PdfFiligran() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [toplam, setToplam] = useState(0);
  const [ayar, setAyar] = useState<FiligranAyar>({
    tur: "yazi",
    yazi: "GİZLİ",
    renk: "#9aa3ab",
    boyut: 12,
    saydamlik: 0.35,
    aci: -40,
    konum: "orta",
    kalin: true,
    golge: false,
  });
  const [logo, setLogo] = useState<ImageBitmap | null>(null);
  const [aralik, setAralik] = useState("");
  const [onizleme, setOnizleme] = useState<HTMLCanvasElement | null>(null);
  const [sonuc, setSonuc] = useState<{ url: string; boyut: number } | null>(
    null,
  );
  const [calisiyor, setCalisiyor] = useState(false);
  const [hata, setHata] = useState("");
  const veri = useRef<Uint8Array | null>(null);
  const url = useRef<string | null>(null);
  const tuval = useRef<HTMLCanvasElement>(null);

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

  const ayarla = (p: Partial<FiligranAyar>) => {
    sonucTemizle();
    setAyar((a) => ({ ...a, ...p }));
  };

  const logoSec = async (f?: File) => {
    if (!f) return;
    try {
      const b = await bitmapAc(f);
      logo?.close();
      setLogo(b);
      ayarla({ tur: "logo", boyut: 30 });
    } catch {
      setHata("Logo açılamadı.");
    }
  };

  const ac = async (d: File[]) => {
    sonucTemizle();
    setHata("");
    setOnizleme(null);
    try {
      const v = new Uint8Array(await d[0].arrayBuffer());
      const belge = await pdfAc(v);
      setToplam(belge.numPages);
      const c = await sayfaCiz(belge, 1, 1);
      await belge.destroy();
      veri.current = v;
      setDosya(d[0]);
      setAralik("");
      setOnizleme(c);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "PDF okunamadı.");
      setDosya(null);
    }
  };

  // Canlı önizleme: ilk sayfa + filigran.
  useEffect(() => {
    const c = tuval.current;
    if (!c || !onizleme) return;
    c.width = onizleme.width;
    c.height = onizleme.height;
    const x = c.getContext("2d")!;
    x.drawImage(onizleme, 0, 0);
    if (ayar.tur === "yazi" || logo)
      filigranCiz(x, c.width, c.height, ayar, logo);
  }, [onizleme, ayar, logo]);

  const uygula = async () => {
    if (!veri.current || !dosya) return;
    setHata("");
    setCalisiyor(true);
    try {
      const { aralikCoz, katmanEkle } =
        await import("../../converter/pdf/pdfIslem");
      const dizinler = aralik.trim() ? aralikCoz(aralik, toplam) : undefined;
      const pdf = await katmanEkle(
        veri.current,
        async (w, h) => {
          const k = Math.min(OLCEK, 2400 / Math.max(w, h));
          const c = document.createElement("canvas");
          c.width = Math.round(w * k);
          c.height = Math.round(h * k);
          filigranCiz(c.getContext("2d")!, c.width, c.height, ayar, logo);
          const b = await new Promise<Blob | null>((r) =>
            c.toBlob(r, "image/png"),
          );
          return b ? new Uint8Array(await b.arrayBuffer()) : null;
        },
        dizinler,
      );
      sonucTemizle();
      const blob = new Blob([pdf as BlobPart], { type: "application/pdf" });
      url.current = URL.createObjectURL(blob);
      setSonuc({ url: url.current, boyut: blob.size });
      indir(url.current, ciktiAdi(dosya.name));
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Filigran eklenemedi.");
    } finally {
      setCalisiyor(false);
    }
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="pdf"
        coklu={false}
        max={1}
        baslik={dosya ? "Başka bir PDF seçin" : "PDF dosyasını seçin"}
        onSec={(d) => void ac(d)}
      />
      <FiligranPaneli
        ayar={ayar}
        ayarla={ayarla}
        logoSec={(f) => void logoSec(f)}
        kapsam="sayfa"
      />
      {dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {toplam} sayfa · {boyutMetni(dosya.size)}
          </p>
          <div className="filigran-onizleme">
            <canvas ref={tuval} aria-label="Filigranlı ilk sayfa önizlemesi" />
          </div>
          <div className="gorsel-alt">
            <label className="date-calc-field pdf-aralik">
              <span>Sayfalar (boş: tümü)</span>
              <input
                type="text"
                value={aralik}
                onChange={(e) => {
                  sonucTemizle();
                  setAralik(e.target.value);
                }}
                placeholder={`1-${toplam}`}
              />
            </label>
            <button
              type="button"
              className="time-tool-button"
              disabled={calisiyor || (ayar.tur === "logo" && !logo)}
              onClick={() => void uygula()}
            >
              {calisiyor ? "Ekleniyor…" : "Filigranı PDF'e ekle"}
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={ciktiAdi(dosya.name)}
              >
                İndir ({boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Filigran tarayıcınızda eklenir; PDF hiçbir sunucuya yüklenmez. Sayfa
        içeriği değişmez, filigran üstte ayrı bir katman olarak durur ve yazılar
        seçilebilir kalır.
      </p>
    </div>
  );
}
