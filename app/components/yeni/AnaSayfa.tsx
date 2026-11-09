// Turkce ana sayfa: hizli cevirme, sik kullanilan donusumler, gruplu birim ceviricileri ve hesaplayicilar.
// Her grup kendi satirinda, linkler sutun sutun hizali; gorunum arac sayfalariyla ayni.
import Link from "@/app/components/SiteLink";
import { categoryPages } from "../../converter/categoryPages";
import { conversionPages } from "../../converter/conversionPages";
import { convert } from "../../converter/convert";
import { hizliCevirmeVerisi } from "../../converter/hizliCevirmeVeri";
import { ciftYayinda } from "../../converter/mergedPairs";
import { birimGruplari, turkceKategoriYolu } from "../../converter/siteYapisi";
import { turkceCiftYolu } from "../../converter/turkceYollar";
import { HESAPLAYICI_GRUPLARI, HIZLI_KATEGORILER, SIK_GRUPLARI, type AnaSayfaGrubu } from "./anaSayfaVerisi";
import HizliCevirici, { type HizliSecenek } from "./HizliCevirici";
import { formatSayi } from "./sayi";

const tr = (s: string) => s.toLocaleLowerCase("tr-TR");

/** "Aydınlatma Şiddeti" -> "Aydınlatma şiddeti"; parantez ici ve tek harfli sozcukler ("Vitamin D") korunur. */
function cumleBicimi(ad: string) {
  const [bas, ...kalan] = ad.split(" ");
  return [bas, ...kalan.map((s) => (s.startsWith("(") || s.length === 1 ? s : tr(s)))].join(" ");
}

const kategoriAdi = (slug: string) => {
  if (slug === "kutle") return "Ağırlık (kütle)";
  const sayfa = categoryPages.find((c) => c.slug === slug);
  return cumleBicimi((sayfa?.title ?? slug).replace(/ (Dönüşümleri|Birimi?)\b.*$/, ""));
};

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

function GrupSatirlari({ gruplar }: { gruplar: readonly AnaSayfaGrubu[] }) {
  return (
    <div className="yy-gruplar">
      {gruplar.map((g) => (
        <div key={g.ad} className="yy-grup">
          <h3>{g.ad}</h3>
          <ul>
            {g.linkler.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.ad}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function AnaSayfa() {
  const birimSatirlari: AnaSayfaGrubu[] = birimGruplari.map((g) => ({
    ad: g.ad,
    linkler: g.kategoriler.map((k) => ({ href: turkceKategoriYolu(k), ad: kategoriAdi(k) })),
  }));

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

        <section aria-labelledby="birim">
          <h2 id="birim">Birim çeviriciler</h2>
          <GrupSatirlari gruplar={birimSatirlari} />
        </section>

        <section aria-labelledby="hesap">
          <h2 id="hesap">Hesaplayıcılar</h2>
          <GrupSatirlari gruplar={HESAPLAYICI_GRUPLARI} />
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
