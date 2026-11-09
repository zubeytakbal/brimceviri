// Yeni yapidaki sayfalarin alt menusu: solda slogan ve logo; sagda simgeli arac kategorileri ve uc sutun
// kurumsal baglanti; en altta telif seridi.
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import { SITE_NAME } from "../../siteConfig";
import { HESAPLAYICI_GRUPLARI } from "./anaSayfaVerisi";
import { GrupIkonu } from "./grupIkonlari";

const KATEGORILER = [{ slug: "donusum", ad: "Dönüşüm" }, ...HESAPLAYICI_GRUPLARI.map((g) => ({ slug: g.slug, ad: g.ad }))];

const SUTUNLAR: { baslik: string; linkler: { href: string; ad: string }[] }[] = [
  {
    baslik: "BirimCeviri",
    linkler: [
      { href: "/hakkimizda", ad: "Hakkımızda" },
      { href: "/yazar", ad: "Yazar" },
      { href: "/editoryal-politika", ad: "Editoryal politika" },
      { href: "/iletisim", ad: "İletişim" },
    ],
  },
  {
    baslik: "Keşfet",
    linkler: [
      { href: "/hesaplayicilar", ad: "Hesaplama araçları" },
      { href: "/hesaplayicilar/donusum", ad: "Dönüşüm" },
      { href: "/tum-birimler", ad: "Tüm birimler" },
    ],
  },
  {
    baslik: "Yasal",
    linkler: [
      { href: "/gizlilik", ad: "Gizlilik ve çerezler" },
      { href: "/kullanim-kosullari", ad: "Kullanım koşulları" },
    ],
  },
];

export default function YeniAlt() {
  const [bas, son] = [SITE_NAME.slice(0, 5), SITE_NAME.replace(/\.app$/, "").slice(5)];
  return (
    <footer className="yy yy-alt">
      <div className="yy-alt-ana">
        <div className="yy-alt-sol">
          <p className="yy-alt-slogan">Ölç, çevir, hesapla.</p>
          <Link href="/" className="yy-logo">
            {bas}
            <span>{son}</span>
          </Link>
          <p className="yy-alt-kisa">Türkçe ve ücretsiz hesaplama ve dönüşüm araçları.</p>
        </div>
        <div className="yy-alt-sag">
          <nav aria-labelledby="alt-kategoriler">
            <h2 id="alt-kategoriler">Araç kategorileri</h2>
            <ul className="yy-alt-kategoriler">
              {KATEGORILER.map((k) => (
                <li key={k.slug}>
                  <Link href={`/hesaplayicilar/${k.slug}`}>
                    <GrupIkonu slug={k.slug} boyut={22} />
                    {k.ad}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="yy-alt-sutunlar">
            {SUTUNLAR.map((s) => (
              <nav key={s.baslik} aria-label={s.baslik}>
                <h2>{s.baslik}</h2>
                <ul>
                  {s.linkler.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.ad}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>
      <div className="yy-alt-serit">
        <div>
          <Link href="/gizlilik">Gizlilik, çerezler ve kullanım koşulları</Link>
          <span>
            © {new Date().getFullYear()} {SITE_NAME}
          </span>
        </div>
      </div>
    </footer>
  );
}
