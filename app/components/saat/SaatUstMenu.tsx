"use client";

import Link from "@/app/components/SiteLink";
import { useEffect, useRef, useState } from "react";
import { SAAT_MENUSU } from "./saatBolumu";

type Sehir = { href: string; ad: string; ulke: string };

const ara = (s: string) => s.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function SaatUstMenu({ sehirler }: { sehirler: Sehir[] }) {
  const [acik, setAcik] = useState<"yok" | "arama" | "menu">("yok");
  const [sorgu, setSorgu] = useState("");
  const girdi = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (acik === "arama") girdi.current?.focus();
    if (acik === "yok") return;
    const kapat = (e: KeyboardEvent) => e.key === "Escape" && setAcik("yok");
    window.addEventListener("keydown", kapat);
    return () => window.removeEventListener("keydown", kapat);
  }, [acik]);

  const q = ara(sorgu.trim());
  const sonuclar = q ? sehirler.filter((s) => ara(s.ad).includes(q) || ara(s.ulke).includes(q)).slice(0, 12) : sehirler.slice(0, 12);

  return (
    <header className="saat-ust">
      <div className="saat-ust-ic">
        <Link href="/" className="saat-logo" aria-label="birimceviri.app ana sayfa">
          birimceviri<span>Saat</span>
        </Link>
        <div className="saat-ust-dugmeler">
          <button type="button" aria-label="Şehir ara" aria-expanded={acik === "arama"} onClick={() => setAcik(acik === "arama" ? "yok" : "arama")}>
            <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
              <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="3.4" />
              <line x1="15" y1="15" x2="21.5" y2="21.5" stroke="currentColor" strokeWidth="3.8" strokeLinecap="square" />
            </svg>
          </button>
          <button type="button" aria-label="Menü" aria-expanded={acik === "menu"} onClick={() => setAcik(acik === "menu" ? "yok" : "menu")}>
            <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
              <path d="M2 5.5h20M2 12h20M2 18.5h20" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>

      {acik === "arama" && (
        <div className="saat-katman" role="dialog" aria-label="Şehir ara">
          <div className="saat-katman-ic">
            <input
              ref={girdi}
              type="search"
              className="saat-arama"
              placeholder="Şehir ya da ülke yazın"
              value={sorgu}
              onChange={(e) => setSorgu(e.target.value)}
            />
            <ul className="saat-sonuclar">
              {sonuclar.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} onClick={() => setAcik("yok")}>
                    <b>{s.ad}</b> <span>{s.ulke}</span>
                  </Link>
                </li>
              ))}
              {sonuclar.length === 0 && <li className="saat-bos">Bu adla bir şehir bulunamadı.</li>}
            </ul>
          </div>
        </div>
      )}

      {acik === "menu" && (
        <div className="saat-katman" role="dialog" aria-label="Menü">
          <nav className="saat-katman-ic saat-menu">
            {SAAT_MENUSU.map((m) => (
              <Link key={m.href} href={m.href} onClick={() => setAcik("yok")}>
                {m.label}
              </Link>
            ))}
            <Link href="/" className="saat-menu-ana" onClick={() => setAcik("yok")}>
              birimceviri.app ana sayfa
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
