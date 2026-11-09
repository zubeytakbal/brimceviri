// Turkce ana sayfa: hizli cevirme, sik donusumler, en cok kullanilan araclar, renkli grup bloklari.
// Grup basliklari grup sayfasina (/hesaplayicilar/<grup>, /ceviriciler/<grup>) gider.
import type { CSSProperties } from "react";
import Link from "@/app/components/SiteLink";
import { categoryPages } from "../../converter/categoryPages";
import { conversionPages } from "../../converter/conversionPages";
import { convert } from "../../converter/convert";
import { hizliCevirmeVerisi } from "../../converter/hizliCevirmeVeri";
import { ciftYayinda } from "../../converter/mergedPairs";
import { turkceKategoriYolu } from "../../converter/siteYapisi";
import { turkceCiftYolu } from "../../converter/turkceYollar";
import { grupRengi, HIZLI_KATEGORILER, POPULER_ARACLAR, SIK_GRUPLARI, type AnaSayfaGrubu } from "./anaSayfaVerisi";
import { grupYolu, type GrupTuru } from "./GrupSayfasi";
import { BIRIM_GRUPLARI, HESAPLAYICI_GRUPLARI } from "./gruplar";
import HizliCevirici, { type HizliSecenek } from "./HizliCevirici";
import { formatSayi } from "./sayi";

const BLOKTA_LINK = 6;
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

/** Her grup bir blok: baslik grup sayfasina gider, ilk alti link gosterilir. */
function GrupBloklari({ tur, gruplar }: { tur: GrupTuru; gruplar: readonly AnaSayfaGrubu[] }) {
  return (
    <div className="yy-bloklar">
      {gruplar.map((g) => (
        <div key={g.slug} className="yy-blok" style={renk(g.slug)}>
          <h3>
            <Link href={grupYolu(tur, g.slug)}>{g.ad}</Link>
            <span>{g.linkler.length}</span>
          </h3>
          <ul>
            {g.linkler.slice(0, BLOKTA_LINK).map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.ad}</Link>
              </li>
            ))}
          </ul>
          {g.linkler.length > BLOKTA_LINK && (
            <Link className="yy-blok-tumu" href={grupYolu(tur, g.slug)}>
              Tümünü gör ({g.linkler.length}) →
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AnaSayfa() {
  return (
    <div className="yy yy-sayfa">
      <main className="yy-ana-sayfa">
        <h1>Birim Çevirici ve Hesaplama Araçları</h1>

        <HizliCevirici secenekler={hizliSecenekler()} />

        <section aria-labelledby="sik">
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

        <section aria-labelledby="populer">
          <h2 id="populer">En çok kullanılan araçlar</h2>
          <ul className="yy-populer">
            {POPULER_ARACLAR.map((a) => (
              <li key={a.href} style={renk(a.grup)}>
                <Link href={a.href}>{a.ad}</Link>
                <span>{a.aciklama}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="hesap">
          <h2 id="hesap">
            <Link href="/hesaplayicilar">Hesaplayıcılar</Link>
          </h2>
          <GrupBloklari tur="hesap" gruplar={HESAPLAYICI_GRUPLARI} />
        </section>

        <section aria-labelledby="birim">
          <h2 id="birim">
            <Link href="/tum-birimler">Birim çeviriciler</Link>
          </h2>
          <GrupBloklari tur="birim" gruplar={BIRIM_GRUPLARI} />
        </section>

        <section className="yy-hakkinda" aria-labelledby="hakkinda">
          <h2 id="hakkinda">BirimCeviri nedir?</h2>
          <p>
            BirimCeviri, birim çevirme ve günlük hesapları Türkçe olarak tek yerde toplayan bir sitedir. Metre ve kilogram
            gibi yaygın ölçülerin yanında dönüm ve arşın gibi Türkiye'de kullanılan ölçüler de burada. Çeviri sonuçları
            siz yazarken tarayıcınızda hesaplanır; üyelik gerekmez. Bir hata görürseniz{" "}
            <Link href="/iletisim">bize yazın</Link>. Sitenin kim tarafından, nasıl hazırlandığını{" "}
            <Link href="/hakkimizda">hakkımızda</Link> sayfasında bulabilirsiniz.
          </p>
        </section>
      </main>
    </div>
  );
}
