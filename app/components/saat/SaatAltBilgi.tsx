import Link from "@/app/components/SiteLink";
import { SITE_NAV_DATA } from "../../i18n/siteNavData.generated";
import { SAAT_GRUPLARI } from "./saatBolumu";
import { POPULER_SEHIRLER, SEHIR_SAYISI, ULKE_LINKLERI } from "./saatListeleri";

/** Saat bölümünün büyük, kaba alt bilgisi: marka, araç grupları, popüler şehirler ve ülkeler. */
export default function SaatAltBilgi() {
  return (
    <footer className="saat-alt-bilgi">
      <div className="saat-alt-bilgi-ic">
        <p className="saat-alt-marka">
          BİRİMCEVİRİ <span>SAAT</span>
          <small>dünyanın her köşesi, tek saatte</small>
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
          <nav aria-label="Popüler şehirler">
            <h2>Popüler şehirler</h2>
            {POPULER_SEHIRLER.map((c) => (
              <Link key={c.href} href={c.href} prefetch={false}>
                {c.ad}
              </Link>
            ))}
          </nav>
          <nav aria-label="Ülkelerin saat dilimleri">
            <h2>Ülkelerin saat dilimleri</h2>
            {ULKE_LINKLERI.map((u) => (
              <Link key={u.href} href={u.href} prefetch={false}>
                {u.ad} <small>{u.dilim} dilim</small>
              </Link>
            ))}
            <h2 className="saat-alt-ikinci">Site</h2>
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
        <p className="saat-alt-bilgi-son">
          {SEHIR_SAYISI} şehir ve {ULKE_LINKLERI.length} ülkenin saati. Saat dilimi verileri IANA veritabanından; saatler cihazının saatine göre işler.
        </p>
      </div>
    </footer>
  );
}
