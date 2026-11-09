// Turkce ana sayfa: ustte buyuk baslik, arama ve hizli cevirme (birim cevirme one cikar); altinda grup kartlari
// (simge, ad, arac sayisi) ve sade link listeleri.
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import Link from "@/app/components/SiteLink";
import HomeSearch from "../HomeSearch";
import { categoryPages } from "../../converter/categoryPages";
import { conversionPages } from "../../converter/conversionPages";
import { convert } from "../../converter/convert";
import { hizliCevirmeVerisi } from "../../converter/hizliCevirmeVeri";
import { ciftYayinda } from "../../converter/mergedPairs";
import { turkceKategoriYolu } from "../../converter/siteYapisi";
import { turkceCiftYolu } from "../../converter/turkceYollar";
import { grupRengi, HIZLI_KATEGORILER, POPULER_ARACLAR, SIK_GRUPLARI, type AnaSayfaGrubu } from "./anaSayfaVerisi";
import { aramaMetni } from "./aramaMetni";
import { GrupIkonu } from "./grupIkonlari";
import { grupYolu, type GrupTuru } from "./GrupSayfasi";
import { BIRIM_GRUPLARI, HESAPLAYICI_GRUPLARI } from "./gruplar";
import HizliCevirici, { type HizliSecenek } from "./HizliCevirici";
import { formatSayi } from "./sayi";

const tr = (s: string) => s.toLocaleLowerCase("tr-TR");

function hizliSecenekler(): HizliSecenek[] {
  const { kategoriler } = hizliCevirmeVerisi(null);
  const secenekler: HizliSecenek[] = [];
  for (const [anahtar, [kaynak, hedef]] of Object.entries(HIZLI_KATEGORILER)) {
    const kategori = kategoriler.find((k) => k.key === anahtar);
    const slug = categoryPages.find((c) => c.category === anahtar)?.slug;
    if (!kategori || !slug) continue;
    const var_ = (s: string) => kategori.birimler.some((b) => b.s === s);
    secenekler.push({
      kategori,
      href: turkceKategoriYolu(slug),
      kaynak: var_(kaynak) ? kaynak : kategori.birimler[0].s,
      hedef: var_(hedef) ? hedef : kategori.birimler[1].s,
    });
  }
  return secenekler;
}

/** "1 inç = 2,54 cm": sonuc birim simgesiyle, dar sutunda tek satira sigsin diye. */
function sikDonusumler(sluglar: readonly string[]) {
  return sluglar.flatMap((slug) => {
    const c = conversionPages.find((p) => p.slug === slug);
    if (!c || !ciftYayinda(slug)) return [];
    const kaynak = c.fromName === c.fromName.toLocaleUpperCase("tr-TR") ? c.fromName : tr(c.fromName);
    return [{
      slug,
      href: turkceCiftYolu(slug),
      kaynak: `1 ${kaynak.replace(/ \(.*\)$/, "")}`,
      sonuc: `${formatSayi(convert(c.category, 1, c.fromUnit, c.toUnit))} ${c.toUnit}`,
    }];
  });
}

const renk = (slug: string) => ({ "--g": grupRengi(slug) }) as CSSProperties;

function GrupKartlari({ tur, gruplar }: { tur: GrupTuru; gruplar: readonly AnaSayfaGrubu[] }) {
  return (
    <ul className="yy-kartlar">
      {gruplar.map((g) => (
        <li key={g.slug} style={renk(g.slug)}>
          <Link href={grupYolu(tur, g.slug)}>
            <span className="yy-kart-ikon">
              <GrupIkonu slug={g.slug} boyut={26} />
            </span>
            <strong>{g.ad}</strong>
            <small>
              {g.linkler.length} {tur === "hesap" ? "araç" : "çevirici"}
            </small>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function AnaSayfa() {
  const hesapSayisi = HESAPLAYICI_GRUPLARI.reduce((t, g) => t + g.linkler.length, 0);
  const birimSayisi = BIRIM_GRUPLARI.reduce((t, g) => t + g.linkler.length, 0);
  return (
    <div className="yy yy-sayfa yy-ana-zemin">
      <section className="yy-hero" aria-labelledby="ana-baslik">
        <div className="yy-hero-ic">
          <h1 id="ana-baslik">
            <span className="yy-hero-kucuk">Birbirinden farklı</span>
            <span className="yy-hero-mavi">hesaplama ve dönüşüm</span>
            <span>araçlarını keşfedin</span>
          </h1>
          <div className="yy-hero-arama">
            <HomeSearch locale="tr" strings={aramaMetni} kimlik="yy-ana-arama" />
          </div>
        </div>
      </section>
      <main className="yy-ana-sayfa">
        <div className="yy-bolum">
          <HizliCevirici secenekler={hizliSecenekler()} />
        </div>

        <section className="yy-bolum" aria-labelledby="birim">
          <h2 id="birim">
            Birim çevirme <small>{birimSayisi} çevirici</small>
          </h2>
          <GrupKartlari tur="birim" gruplar={BIRIM_GRUPLARI} />
        </section>

        <section className="yy-bolum" aria-labelledby="sik">
          <h2 id="sik">Sık kullanılan dönüşümler</h2>
          <div className="yy-sik">
            {SIK_GRUPLARI.map((g) => (
              <div key={g.ad}>
                <h3>{g.ad}</h3>
                <ul>
                  {sikDonusumler(g.sluglar).map((d) => (
                    <li key={d.slug}>
                      <Link href={d.href}>
                        {d.kaynak} = <strong>{d.sonuc}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="yy-bolum" aria-labelledby="hesap">
          <h2 id="hesap">
            Hesaplama araçları <small>{hesapSayisi} araç</small>
          </h2>
          <GrupKartlari tur="hesap" gruplar={HESAPLAYICI_GRUPLARI} />
        </section>

        <section className="yy-populer-bolum" aria-labelledby="populer">
          <h2 id="populer">En çok kullanılan araçlar</h2>
          <ul className="yy-populer">
            {POPULER_ARACLAR.map((a) => (
              <li key={a.href}>
                <Link href={a.href}>
                  <strong>
                    {a.ad}
                    <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                  </strong>
                  <span>{a.aciklama}</span>
                  <small>{HESAPLAYICI_GRUPLARI.find((g) => g.slug === a.grup)?.ad}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}
