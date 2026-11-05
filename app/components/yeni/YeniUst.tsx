"use client";

// Yeni yapidaki sayfalarin ust menusu: logo, arama ve sik kullanilan kategori sekmeleri.
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import HomeSearch from "../HomeSearch";
import { turkceKategoriYolu, ustMenuKategorileri } from "../../converter/siteYapisi";
import { SITE_NAME } from "../../siteConfig";

const SEKME_ADI: Record<string, string> = {
  uzunluk: "Uzunluk",
  kutle: "Ağırlık",
  alan: "Alan",
  hacim: "Hacim",
  sicaklik: "Sıcaklık",
  zaman: "Zaman",
  hiz: "Hız",
  basinc: "Basınç",
};

const aramaMetni = {
  searchLabel: "Dönüşüm veya hesaplayıcı ara",
  searchPlaceholder: "Birim veya araç ara: cm inç, dönüm, kıdem…",
  searchHint: "",
  searchResultsLabel: "Arama sonuçları",
  searchEmpty: "Eşleşen dönüşüm veya hesaplayıcı bulunamadı.",
  searchEnterHint: "",
  searchCategoryPrefix: "Kategori",
  openLabel: "Aç",
};

export default function YeniUst({ pathname }: { pathname: string }) {
  const aktif = pathname.split("/")[1] ?? "";
  const [bas, son] = [SITE_NAME.slice(0, 5), SITE_NAME.replace(/\.app$/, "").slice(5)];
  return (
    <header className="yy yy-ust">
      <div className="yy-ust-ic">
        <Link href="/" className="yy-logo">
          {bas}
          <span>{son}</span>
        </Link>
        <div className="yy-arama">
          <HomeSearch locale="tr" strings={aramaMetni} />
        </div>
      </div>
      <nav className="yy-sekmeler" aria-label="Temel çeviriciler">
        {ustMenuKategorileri.map((k) => (
          <Link key={k} href={turkceKategoriYolu(k)} aria-current={k === aktif ? "page" : undefined}>
            {SEKME_ADI[k] ?? k}
          </Link>
        ))}
        <Link href="/tum-birimler">Tüm çeviriciler</Link>
      </nav>
    </header>
  );
}
