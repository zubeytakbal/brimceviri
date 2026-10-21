"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Telefonda uzun sayfaları kısaltır: içindeki bölümün yalnızca ilk başlığı (h2) görünür, dokununca açılır.
// Geniş ekranda her şey açıktır. İçerik HTML'de durduğu için arama motorları okumaya devam eder.
export default function MobilDaralt({ children }: { children: ReactNode }) {
  const kutu = useRef<HTMLDivElement>(null);
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    const el = kutu.current;
    const baslik = el?.firstElementChild;
    if (!el || !(baslik instanceof HTMLElement) || baslik.tagName !== "H2") return;
    const dar = window.matchMedia("(max-width: 720px)");
    const ayarla = () => {
      if (dar.matches) {
        baslik.setAttribute("role", "button");
        baslik.setAttribute("tabindex", "0");
      } else {
        baslik.removeAttribute("role");
        baslik.removeAttribute("tabindex");
      }
    };
    const degistir = (e: Event) => {
      if (!dar.matches) return;
      if (e instanceof KeyboardEvent && e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      setAcik((a) => !a);
    };
    // İçindekiler bağlantısıyla bu bölüme gelinirse kendiliğinden açılır.
    const adres = () => {
      const id = window.location.hash.slice(1);
      if (id && el.querySelector(`[id="${CSS.escape(id)}"]`)) setAcik(true);
    };
    ayarla();
    adres();
    dar.addEventListener("change", ayarla);
    baslik.addEventListener("click", degistir);
    baslik.addEventListener("keydown", degistir);
    window.addEventListener("hashchange", adres);
    return () => {
      dar.removeEventListener("change", ayarla);
      baslik.removeEventListener("click", degistir);
      baslik.removeEventListener("keydown", degistir);
      window.removeEventListener("hashchange", adres);
    };
  }, []);

  useEffect(() => {
    kutu.current?.firstElementChild?.setAttribute("aria-expanded", String(acik));
  }, [acik]);

  return (
    <div ref={kutu} className={`mobil-daralt${acik ? " is-acik" : ""}`}>
      {children}
    </div>
  );
}
