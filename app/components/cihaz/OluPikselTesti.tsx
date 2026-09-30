"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RENKLER: Array<[string, string]> = [
  ["#000000", "Siyah: parlayan (takılı) pikselleri ve ışık sızmasını gösterir"],
  ["#ffffff", "Beyaz: ölü (siyah kalan) pikselleri gösterir"],
  ["#ff0000", "Kırmızı"],
  ["#00ff00", "Yeşil"],
  ["#0000ff", "Mavi"],
  ["#808080", "Gri: renk ve parlaklık düzgünlüğü"],
];

/** Ölü piksel testi: tam ekran düz renkler. */
export default function OluPikselTesti() {
  const [acik, setAcik] = useState(false);
  const [i, setI] = useState(0);
  const [imlec, setImlec] = useState(true);
  const alan = useRef<HTMLDivElement>(null);
  const zaman = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const kapat = useCallback(() => {
    setAcik(false);
    if (document.fullscreenElement) void document.exitFullscreen();
  }, []);

  useEffect(() => {
    if (!acik) return;
    const tus = (e: KeyboardEvent) => {
      if (e.key === "Escape") kapat();
      else if (e.key === "ArrowLeft")
        setI((x) => (x + RENKLER.length - 1) % RENKLER.length);
      else if (e.key === "ArrowRight" || e.key === " ")
        setI((x) => (x + 1) % RENKLER.length);
    };
    const tamEkran = () => {
      if (!document.fullscreenElement) setAcik(false);
    };
    window.addEventListener("keydown", tus);
    document.addEventListener("fullscreenchange", tamEkran);
    return () => {
      window.removeEventListener("keydown", tus);
      document.removeEventListener("fullscreenchange", tamEkran);
    };
  }, [acik, kapat]);

  const baslat = async (n = 0) => {
    setI(n);
    setAcik(true);
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      /* tam ekran desteklenmiyorsa (iPhone) sayfa içi kaplama yeter */
    }
  };

  const hareket = () => {
    setImlec(true);
    clearTimeout(zaman.current);
    zaman.current = setTimeout(() => setImlec(false), 1500);
  };

  return (
    <div className="date-calc gorsel-arac">
      <div className="cihaz-basla">
        <button
          type="button"
          className="time-tool-button"
          onClick={() => void baslat()}
        >
          🖥️ Tam ekran testi başlat
        </button>
        <p className="date-calc-note">
          Tıklayın veya → tuşuna basın: sonraki renk · ← önceki · Esc: çıkış
        </p>
      </div>
      <div className="piksel-renkler">
        {RENKLER.map(([r, ad], n) => (
          <button
            key={r}
            type="button"
            style={{ background: r }}
            title={ad}
            aria-label={ad}
            onClick={() => void baslat(n)}
          />
        ))}
      </div>
      {acik ? (
        <div
          ref={alan}
          className={`piksel-tam${imlec ? "" : " is-gizli"}`}
          style={{ background: RENKLER[i][0] }}
          onClick={() => setI((x) => (x + 1) % RENKLER.length)}
          onMouseMove={hareket}
          role="presentation"
        >
          {imlec ? (
            <span className="piksel-ipucu">
              {RENKLER[i][1]} · {i + 1}/{RENKLER.length} · tıklayın: sonraki ·
              Esc: çıkış
            </span>
          ) : null}
        </div>
      ) : null}
      <p className="date-calc-note">
        Ekranı temizledikten sonra, her renkte ekranın tamamını yakından ve
        farklı açılardan inceleyin. Her renkte siyah kalan nokta ölü, hep aynı
        renkte parlayan nokta takılı pikseldir.
      </p>
    </div>
  );
}
