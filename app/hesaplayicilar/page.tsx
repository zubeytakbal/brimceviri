import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ToolHubPage, { countTools } from "../components/ToolHubPage";
import { GERMAN_TOOL_HUB_PATH } from "../i18n/germanToolDirectory";
import {
  TURKISH_TOOL_HUB_PATH,
  turkishToolGroups,
} from "../i18n/turkishToolDirectory";
import { buildSiteUrl } from "../siteConfig";

const toolCount = countTools(turkishToolGroups);

const description = `Kredi, KDV, maaş, yaş, BMI, tarih, saat, inşaat, enerji ve dosya araçları dahil ${toolCount} ücretsiz hesaplama aracı, konularına göre gruplanmış tek listede.`;

export const metadata: Metadata = {
  title: "Tüm Hesaplama Araçları: Kredi, Maaş, Yaş, Tarih ve Daha Fazlası",
  description,
  alternates: {
    canonical: TURKISH_TOOL_HUB_PATH,
    languages: {
      tr: TURKISH_TOOL_HUB_PATH,
      de: GERMAN_TOOL_HUB_PATH,
      "x-default": TURKISH_TOOL_HUB_PATH,
    },
  },
  openGraph: {
    title: "Tüm Hesaplama Araçları",
    description,
    url: buildSiteUrl(TURKISH_TOOL_HUB_PATH),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function HesaplayicilarPage() {
  return (
    <ToolHubPage
      homeHref="/"
      homeLabel="Ana Sayfa"
      breadcrumbLabel="Tüm Hesaplamalar"
      breadcrumbAriaLabel="Sayfa yolu"
      jumpAriaLabel="Gruplar"
      title="Tüm Hesaplama Araçları"
      groups={turkishToolGroups}
      intro={
        <>
          Sitedeki {toolCount} hesaplama aracını konularına göre grupladık.
          Hepsi ücretsizdir, kayıt istemez ve hesaplamalar tarayıcınızda
          yapılır. Birim çevirmek için{" "}
          <Link href="/tum-birimler">tüm birim dönüşümlerine</Link>, mesleğinize
          özel araçlar için <Link href="/meslekler">mesleğe göre araçlara</Link>{" "}
          bakabilirsiniz.
        </>
      }
    />
  );
}
