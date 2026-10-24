"use client";

import Link from "@/app/components/SiteLink";
import { useEffect, useRef, useState } from "react";
import { SITE_NAV_DATA } from "../../i18n/siteNavData.generated";
import { SAAT_GRUPLARI } from "./saatBolumu";

// Sitenin ana bölümleri (genel menüyle aynı veri): saat bölümünden sitenin geri kalanına giden yol.
const SITE_BOLUMLERI = [
  { href: "/", label: "Ana sayfa" },
  ...SITE_NAV_DATA.locales.tr.menuGroups.map((g) => ({ href: g.footer?.[0]?.href ?? g.links[0].href, label: g.label })),
];

type Oge = { href: string; ad: string; ulke: string };

const ara = (s: string) => s.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[̀-ͯ]/g, "");

type Bolum = { etiket: string; href: string; gruplar: Array<{ baslik: string; linkler: Array<{ href: string; label: string }> }>; arama: string };

const SAAT: Bolum = { etiket: "Saat", href: "/saat-ve-tarih", gruplar: SAAT_GRUPLARI, arama: "Şehir, ülke ya da araç yazın" };

/** Saat bölümünün üst menüsü; aynı düzen başka bölümlerde (ör. Hesap) kendi adı ve gruplarıyla kullanılır. */
export default function SaatUstMenu({ ogeler, bolum = SAAT }: { ogeler: Oge[]; bolum?: Bolum }) {
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
  const sonuclar = q ? ogeler.filter((s) => ara(s.ad).includes(q) || ara(s.ulke).includes(q)).slice(0, 12) : ogeler.slice(0, 12);

  return (
    <header className="saat-ust">
      <div className="saat-ust-ic">
        <div className="saat-marka">
          <Link href="/" className="site-logo saat-site-logo" dir="ltr">
            birimceviri<span>.app</span>
          </Link>
          <Link href={bolum.href} className="saat-bolum-etiket">
            {bolum.etiket}
          </Link>
        </div>
        <div className="saat-ust-dugmeler">
          <button type="button" aria-label="Şehir ya da araç ara" aria-expanded={acik === "arama"} onClick={() => setAcik(acik === "arama" ? "yok" : "arama")}>
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
        <div className="saat-katman" role="dialog" aria-label="Şehir ya da araç ara">
          <div className="saat-katman-ic">
            <input
              ref={girdi}
              type="search"
              className="saat-arama"
              placeholder={bolum.arama}
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
              {sonuclar.length === 0 && <li className="saat-bos">Sonuç bulunamadı.</li>}
            </ul>
          </div>
        </div>
      )}

      {acik === "menu" && (
        <div className="saat-katman" role="dialog" aria-label="Menü">
          <nav className="saat-katman-ic saat-menu">
            <div className="saat-menu-gruplar">
              {bolum.gruplar.map((g) => (
                <div key={g.baslik}>
                  <p className="saat-menu-baslik">{g.baslik}</p>
                  {g.linkler.map((m) => (
                    <Link key={m.href} href={m.href} onClick={() => setAcik("yok")}>
                      {m.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="saat-menu-site">
              <p className="saat-menu-baslik">birimceviri.app</p>
              {SITE_BOLUMLERI.map((b) => (
                <Link key={b.href} href={b.href} onClick={() => setAcik("yok")}>
                  {b.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
