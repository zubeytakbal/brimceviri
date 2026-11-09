"use client";

// Yeni yapidaki sayfalarin ust menusu. 1. satir: logo ve arama; 2. satir: sitenin ana bolumleri (birim cevirme ve
// arac gruplari) butun genislige esit aralikla yayilir. Ana sayfada arama ve bolumler sayfanin icinde oldugu icin
// yalnizca logo gorunur.
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import HomeSearch from "../HomeSearch";
import { aramaMetni } from "./aramaMetni";
import { HESAPLAYICI_GRUPLARI } from "./anaSayfaVerisi";
import { birimGruplari, yeniYapiKategorileri } from "../../converter/siteYapisi";
import { SITE_NAME } from "../../siteConfig";

/** Menude kisa adlar; grup sayfasindaki tam ad uzun kalir. */
const KISA_AD: Readonly<Record<string, string>> = {
  "finans-ve-maas": "Finans",
  "insaat-ve-ev": "İnşaat ve ev",
  "tarih-ve-zaman": "Tarih ve zaman",
  "enerji-ve-arac": "Enerji ve araç",
  "saglik-ve-spor": "Sağlık",
  kuyumcu: "Kuyumcu",
  "tarim-ve-hayvancilik": "Tarım",
  matematik: "Matematik",
  "kimya-ve-biyoloji": "Kimya",
  "muhendislik-ve-elektrik": "Mühendislik",
  "harita-ve-tasima": "Harita",
  "gunluk-olculer": "Günlük",
  "dini-hesaplar": "Dini",
};

const BIRIM_KATEGORILERI = new Set(birimGruplari.flatMap((g) => g.kategoriler));

function aktifBolum(pathname: string): string | undefined {
  const [, ilk, ikinci] = pathname.split("/");
  if (ilk === "ceviriciler" || ilk === "tum-birimler" || ilk === "kategoriler" || yeniYapiKategorileri.has(ilk) || BIRIM_KATEGORILERI.has(ilk)) {
    return "birim";
  }
  if (ilk === "hesaplayicilar" && ikinci && HESAPLAYICI_GRUPLARI.some((g) => g.slug === ikinci)) return ikinci;
  return HESAPLAYICI_GRUPLARI.find((g) => g.linkler.some((l) => l.href === pathname))?.slug;
}

export default function YeniUst({ pathname }: { pathname: string }) {
  const anaSayfa = pathname === "/";
  const aktif = aktifBolum(pathname);
  const [bas, son] = [SITE_NAME.slice(0, 5), SITE_NAME.replace(/\.app$/, "").slice(5)];
  return (
    <header className={`yy yy-ust${anaSayfa ? " yy-ust-ana" : ""}`}>
      <div className="yy-ust-ic">
        <Link href="/" className="yy-logo">
          {bas}
          <span>{son}</span>
        </Link>
        {!anaSayfa && (
          <div className="yy-arama">
            <HomeSearch locale="tr" strings={aramaMetni} kimlik="yy-ust-arama" />
          </div>
        )}
      </div>
      {!anaSayfa && (
        <nav className="yy-sekmeler" aria-label="Bölümler">
          <ul>
            <li>
              <Link href="/tum-birimler" aria-current={aktif === "birim" ? "page" : undefined}>
                Birim çevirme
              </Link>
            </li>
            {HESAPLAYICI_GRUPLARI.map((g) => (
              <li key={g.slug}>
                <Link href={`/hesaplayicilar/${g.slug}`} aria-current={aktif === g.slug ? "page" : undefined}>
                  {KISA_AD[g.slug] ?? g.ad}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
