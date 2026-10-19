// Türkçe ana sayfanın "Tüm araçlar" bölümü: üst menüdeki altı başlığın aynısı, her sütunda en çok kullanılan araçlar ve
// "Tümü →" bağlantısı. Menü ve ana sayfa aynı veriden (getMenuGroups) beslenir.
import Link from "@/app/components/SiteLink";
import { getMenuGroups } from "../i18n/siteNavigation";

const SUTUN_BASINA = 7;

export default function TumAraclar() {
  const gruplar = getMenuGroups("tr");
  return (
    <section className="directory-section tum-araclar" id="tum-araclar">
      <header className="directory-section-header">
        <div>
          <h2>Tüm araçlar</h2>
          <p>Üst menüdeki başlıklarla aynı sırada; her başlıkta en çok kullanılan araçlar.</p>
        </div>
      </header>
      <div className="tum-araclar-izgara">
        {gruplar.map((g) => {
          const tumu = g.footer?.[0];
          return (
            <div key={g.id} className="tum-araclar-sutun">
              <h3>{tumu ? <Link href={tumu.href}>{g.label}</Link> : g.label}</h3>
              <ul>
                {g.links.slice(0, SUTUN_BASINA).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
              {tumu ? (
                <Link className="tum-araclar-tumu" href={tumu.href}>
                  {tumu.label}
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
