import Link from "@/app/components/SiteLink";
import { SITE_NAV_DATA } from "../../i18n/siteNavData.generated";
import { BILIM_ARAMA, BILIM_GRUPLARI } from "./bilimListeleri";

/** Bilim bölümünün alt bilgisi: marka, araç grupları ve sitenin diğer bölümleri (saat bölümünün düzeniyle). */
export default function BilimAltBilgi() {
  return (
    <footer className="saat-alt-bilgi bilim-alt-bilgi">
      <div className="saat-alt-bilgi-ic">
        <p className="saat-alt-marka">
          BİRİMCEVİRİ <span>BİLİM</span>
          <small>matematik, kimya ve gökyüzü hesapları</small>
        </p>
        <div className="saat-alt-sutunlar">
          {BILIM_GRUPLARI.map((g) => (
            <nav key={g.id} aria-label={g.baslik}>
              <h2>{g.baslik}</h2>
              {g.linkler.map((m) => (
                <Link key={m.href} href={m.href} prefetch={false}>
                  {m.label}
                </Link>
              ))}
            </nav>
          ))}
          <nav aria-label="Site">
            <h2>Site</h2>
            <Link href="/">birimceviri.app ana sayfa</Link>
            {SITE_NAV_DATA.locales.tr.menuGroups.map((g) => (
              <Link key={g.id} href={g.footer?.[0]?.href ?? g.links[0].href} prefetch={false}>
                {g.label}
              </Link>
            ))}
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/iletisim">İletişim</Link>
            <Link href="/gizlilik">Gizlilik</Link>
          </nav>
        </div>
        <p className="saat-alt-bilgi-son">{BILIM_ARAMA.length} bilim aracı ve başvuru sayfası. Sonuçlar bilgi ve öğrenme amaçlıdır.</p>
      </div>
    </footer>
  );
}
