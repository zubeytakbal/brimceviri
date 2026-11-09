import Link from "@/app/components/SiteLink";
import { SITE_NAV_DATA } from "../../i18n/siteNavData.generated";
import { SAAT_GRUPLARI } from "./saatBolumu";

/** Saat bölümünün büyük, kaba alt bilgisi: marka, araç grupları ve site bağlantıları. */
export default function SaatAltBilgi() {
  return (
    <footer className="saat-alt-bilgi">
      <div className="saat-alt-bilgi-ic">
        <p className="saat-alt-marka">
          BİRİMCEVİRİ <span>SAAT</span>
          <small>saat ve tarih hesapları</small>
        </p>
        <div className="saat-alt-sutunlar">
          {SAAT_GRUPLARI.map((g) => (
            <nav key={g.baslik} aria-label={g.baslik}>
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
            {SITE_NAV_DATA.locales.tr.menuGroups
              .filter((g) => g.id !== "time")
              .map((g) => (
                <Link key={g.id} href={g.footer?.[0]?.href ?? g.links[0].href} prefetch={false}>
                  {g.label}
                </Link>
              ))}
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/iletisim">İletişim</Link>
            <Link href="/gizlilik">Gizlilik</Link>
          </nav>
        </div>
        <p className="saat-alt-bilgi-son">Saat dilimi verileri IANA veritabanından; saatler cihazının saatine göre işler.</p>
      </div>
    </footer>
  );
}
