"use client";

import { useEffect, useRef, useState } from "react";
import type { NumaraAyar } from "../../converter/pdf/pdfIslem";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";

const KONUMLAR: Array<{ id: NumaraAyar["konum"]; ad: string }> = [
  { id: "ust-sol", ad: "Üst sol" },
  { id: "ust-orta", ad: "Üst orta" },
  { id: "ust-sag", ad: "Üst sağ" },
  { id: "alt-sol", ad: "Alt sol" },
  { id: "alt-orta", ad: "Alt orta" },
  { id: "alt-sag", ad: "Alt sağ" },
];

const BICIMLER: Array<{ id: NumaraAyar["bicim"]; ad: string }> = [
  { id: "n", ad: "1, 2, 3…" },
  { id: "n / toplam", ad: "1 / 10" },
  { id: "Sayfa n", ad: "Sayfa 1" },
];

/** PDF sayfalarına numara ekler (pdf-lib ile tarayıcıda). */
export default function PdfNumara() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [toplam, setToplam] = useState(0);
  const [ayar, setAyar] = useState<NumaraAyar>({
    konum: "alt-orta",
    bicim: "n",
    baslangic: 1,
    boyut: 11,
    ilkSayfaAtla: false,
  });
  const [sonuc, setSonuc] = useState<{ url: string; boyut: number } | null>(
    null,
  );
  const [onizleme, setOnizleme] = useState("");
  const [calisiyor, setCalisiyor] = useState(false);
  const [hata, setHata] = useState("");
  const veri = useRef<Uint8Array | null>(null);
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
    setOnizleme("");
  };

  const ac = async (d: File[]) => {
    sonucTemizle();
    setHata("");
    try {
      const v = new Uint8Array(await d[0].arrayBuffer());
      const { sayfaSayisi } = await import("../../converter/pdf/pdfIslem");
      setToplam(await sayfaSayisi(v));
      veri.current = v;
      setDosya(d[0]);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "PDF okunamadı.");
      setDosya(null);
    }
  };

  const degis = (p: Partial<NumaraAyar>) => {
    sonucTemizle();
    setAyar((a) => ({ ...a, ...p }));
  };

  const ekle = async () => {
    if (!veri.current || !dosya) return;
    setHata("");
    setCalisiyor(true);
    try {
      const { sayfaNumarasiEkle } =
        await import("../../converter/pdf/pdfIslem");
      const pdf = await sayfaNumarasiEkle(veri.current, ayar);
      sonucTemizle();
      const blob = new Blob([pdf as BlobPart], { type: "application/pdf" });
      url.current = URL.createObjectURL(blob);
      setSonuc({ url: url.current, boyut: blob.size });
      indir(url.current, dosya.name.replace(/\.pdf$/i, "") + "-numarali.pdf");
      // Önizleme: numaralı ilk sayfa (pdf.js yüklenemezse sessizce atlanır).
      try {
        const { pdfAc, sayfaCiz } = await import("./pdfjs");
        const belge = await pdfAc(pdf);
        const no = ayar.ilkSayfaAtla && belge.numPages > 1 ? 2 : 1;
        const c = await sayfaCiz(belge, no, 0.6);
        setOnizleme(c.toDataURL("image/jpeg", 0.8));
        await belge.destroy();
      } catch {
        /* önizleme isteğe bağlı */
      }
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Numara eklenemedi.");
    } finally {
      setCalisiyor(false);
    }
  };

  const ad = dosya ? dosya.name.replace(/\.pdf$/i, "") + "-numarali.pdf" : "";

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
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {toplam} sayfa · {boyutMetni(dosya.size)}
          </p>
          <div className="date-calc-input">
            <div className="date-calc-field">
              <span>Konum</span>
              <div
                className="pdf-konum"
                role="radiogroup"
                aria-label="Numara konumu"
              >
                {KONUMLAR.map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    role="radio"
                    aria-checked={ayar.konum === k.id}
                    aria-label={k.ad}
                    title={k.ad}
                    className={ayar.konum === k.id ? "is-active" : undefined}
                    onClick={() => degis({ konum: k.id })}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </div>
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Biçim</span>
                <span className="date-calc-field-row">
                  <select
                    value={ayar.bicim}
                    onChange={(e) =>
                      degis({ bicim: e.target.value as NumaraAyar["bicim"] })
                    }
                  >
                    {BICIMLER.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.ad}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="date-calc-field">
                <span>İlk numara</span>
                <span className="date-calc-field-row">
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    value={ayar.baslangic}
                    onChange={(e) =>
                      degis({
                        baslangic: Math.max(
                          0,
                          Math.min(9999, Number(e.target.value) || 0),
                        ),
                      })
                    }
                  />
                </span>
              </label>
              <label className="date-calc-field">
                <span>Yazı boyutu</span>
                <span className="date-calc-field-row">
                  <select
                    value={ayar.boyut}
                    onChange={(e) => degis({ boyut: Number(e.target.value) })}
                  >
                    {[9, 10, 11, 12, 14, 16].map((b) => (
                      <option key={b} value={b}>
                        {b} pt
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>
            <label className="date-calc-check">
              <input
                type="checkbox"
                checked={ayar.ilkSayfaAtla}
                onChange={(e) => degis({ ilkSayfaAtla: e.target.checked })}
              />{" "}
              Kapak sayfasını numaralandırma (numaralar 2. sayfadan başlar)
            </label>
          </div>
          <div className="gorsel-alt">
            <span>{calisiyor ? "Numaralar ekleniyor…" : ""}</span>
            <button
              type="button"
              className="time-tool-button"
              disabled={calisiyor}
              onClick={() => void ekle()}
            >
              Sayfa numarası ekle
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={ad}
              >
                İndir ({boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
          {onizleme ? (
            <figure className="pdf-sonuc-onizleme">
              {/* eslint-disable-next-line @next/next/no-img-element -- yerel önizleme */}
              <img src={onizleme} alt="Numaralı sayfa önizlemesi" />
              <figcaption>Önizleme</figcaption>
            </figure>
          ) : null}
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Numaralar tarayıcınızda eklenir; PDF hiçbir sunucuya yüklenmez. Mevcut
        içerik yeniden sıkıştırılmaz, yalnızca her sayfaya küçük bir yazı
        katmanı eklenir.
      </p>
    </div>
  );
}
