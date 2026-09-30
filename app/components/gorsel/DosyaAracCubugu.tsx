"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "@/app/components/SiteLink";
import {
  DOSYA_ARACLARI,
  DOSYA_ARACLARI_YOLU,
  DOSYA_KATEGORILER,
} from "../../converter/gorsel/dosyaAraclari";
import AracIkonu from "./AracIkonu";

/** Çubukta doğrudan görünen araçlar. */
const ONE_CIKAN = [
  "/gorsel-donusturucu",
  "/fotograf-boyutu-kucultme",
  "/e-okul-fotograf-kucultme",
];

/**
 * Dosya araçları sayfalarının üst çubuğu ve "Tüm dosya araçları" açılır menüsü.
 * Menü kapalıyken de bağlantılar HTML'de bulunur (hidden), arama motorları hepsini görür.
 */
export default function DosyaAracCubugu() {
  const [acik, setAcik] = useState(false);
  const yol = usePathname();
  const kap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!acik) return;
    const kapat = (e: MouseEvent | KeyboardEvent) => {
      if (
        e instanceof KeyboardEvent
          ? e.key === "Escape"
          : !kap.current?.contains(e.target as Node)
      )
        setAcik(false);
    };
    document.addEventListener("mousedown", kapat);
    document.addEventListener("keydown", kapat);
    return () => {
      document.removeEventListener("mousedown", kapat);
      document.removeEventListener("keydown", kapat);
    };
  }, [acik]);

  const kategoriler = DOSYA_KATEGORILER.map((k) => ({
    ...k,
    araclar: DOSYA_ARACLARI.filter((a) => a.kategoriler.includes(k.id)),
  })).filter((k) => k.araclar.length);

  return (
    <nav className="dosya-cubuk" aria-label="Dosya araçları" ref={kap}>
      <div className="dosya-cubuk-ic">
        <Link href={DOSYA_ARACLARI_YOLU} className="dosya-cubuk-marka">
          Dosya Araçları
        </Link>
        <ul className="dosya-cubuk-liste">
          {ONE_CIKAN.map((h) => {
            const a = DOSYA_ARACLARI.find((x) => x.href === h);
            if (!a) return null;
            return (
              <li key={h}>
                <Link href={h} aria-current={yol === h ? "page" : undefined}>
                  {a.baslik}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="dosya-cubuk-tum"
          aria-expanded={acik}
          aria-controls="dosya-mega"
          onClick={() => setAcik((x) => !x)}
        >
          Tüm dosya araçları <span aria-hidden="true">{acik ? "▴" : "▾"}</span>
        </button>
      </div>
      <div id="dosya-mega" className="dosya-mega" hidden={!acik}>
        {kategoriler.map((k) => (
          <div key={k.id} className="dosya-mega-sutun">
            <h2>{k.ad}</h2>
            <ul>
              {k.araclar.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    aria-current={yol === a.href ? "page" : undefined}
                    onClick={() => setAcik(false)}
                  >
                    <AracIkonu ikon={a.ikon} boyut={26} />
                    <span>{a.baslik}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
