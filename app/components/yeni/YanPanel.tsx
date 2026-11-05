// Yan panel: tum birim kategorileri (gruplu) ve hesaplayicilar. Veri sunucuda hazirlanir,
// acilir gruplar ve arama istemcide calisir.
import { categoryPages } from "../../converter/categoryPages";
import { birimGruplari, kategorininGrubu, turkceKategoriYolu } from "../../converter/siteYapisi";
import { turkishToolGroups } from "../../i18n/turkishToolDirectory";
import YanPanelIstemci, { type PanelGrubu } from "./YanPanelIstemci";

function kategoriAdi(slug: string) {
  const sayfa = categoryPages.find((c) => c.slug === slug);
  return (sayfa?.title ?? slug).replace(/ Dönüşümleri$/, "");
}

export default function YanPanel({ aktifKategori, aktifHref }: { aktifKategori?: string; aktifHref?: string }) {
  const aktifGrup = aktifKategori ? kategorininGrubu(aktifKategori)?.id : undefined;
  const birimler: PanelGrubu[] = birimGruplari.map((g) => ({
    id: g.id,
    ad: g.ad,
    acik: g.id === aktifGrup,
    ogeler: g.kategoriler.map((k) => ({ ad: kategoriAdi(k), href: turkceKategoriYolu(k) })),
  }));
  const hesaplayicilar: PanelGrubu[] = turkishToolGroups.map((g) => ({
    id: g.id,
    ad: g.title,
    acik: false,
    ogeler: g.links.map((l) => ({ ad: l.label, href: l.href })),
  }));
  return (
    <YanPanelIstemci
      birimler={birimler}
      hesaplayicilar={hesaplayicilar}
      aktifHref={aktifHref ?? (aktifKategori ? turkceKategoriYolu(aktifKategori) : undefined)}
    />
  );
}
