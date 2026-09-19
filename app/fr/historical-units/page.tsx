import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Unites de mesure historiques",
  description:
    "Decouvrez les unites de mesure byzantines, ottomanes et anciennes turques, et convertissez-les en metres et grammes avec de breves explications.",
  alternates: {
    canonical: "/fr/historical-units",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      de: "/de/historische-masseinheiten",
      bn: "/bn/historical-units",
      fr: "/fr/historical-units",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Unites de mesure historiques",
    description: "Decouvrez les unites de mesure byzantines, ottomanes et anciennes turques.",
    url: buildSiteUrl("/fr/historical-units"),
    siteName: "BirimCeviri.app",
    locale: "fr_FR",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Metre (m)", symbol: "m" },
  { value: "arşın", label: "Arşın", symbol: "arşın" },
  { value: "endaze", label: "Endaze", symbol: "endaze" },
  { value: "pus", label: "Pied byzantin (Pous)", symbol: "pus" },
  { value: "orgyia", label: "Brasse byzantine (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Gramme (g)", symbol: "g" },
  { value: "okka", label: "Okka ottomane", symbol: "okka" },
  { value: "dirhem", label: "Dirhem", symbol: "dirhem" },
  { value: "litra", label: "Litra byzantine", symbol: "litra" },
  { value: "ounkia", label: "Ounkia byzantine", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "Pied byzantin (pous)",
    value: "≈ 0,3148 m",
    note: "Extension du pied grec antique, utilise jusqu'en 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Brasse byzantine (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Distance entre les extremites des doigts, bras completement ecartes.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Litra byzantine (litra)",
    value: "≈ 324 g",
    note: "Unite de masse de base de la tradition byzantine, influencee par la libra romaine.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Ounkia byzantine (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Different de l'once moderne des systemes britannique et americain.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Plusieurs usages existaient : l'arşın de marche le plus connu, l'arşın de construction servant a de plus grandes longueurs.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Utilise notamment pour mesurer le tissu et le textile, ainsi que dans le commerce associe.",
  },
  {
    href: "/birimler/okka",
    name: "Okka ottomane (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "L'une des unites de poids les plus connues des marches ottomans traditionnels.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Utilise pour de petites quantites, comme les metaux precieux, les epices et certains cosmetiques.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "Une ancienne unite de longueur turque, retrouvee dans des sources linguistiques et historiques anciennes.",
  },
];

function UnitList({
  units,
}: {
  units: Array<{
    href: string;
    name: string;
    value: string;
    note: string;
  }>;
}) {
  return (
    <ul className="calculator-example-list">
      {units.map((unit) => (
        <li key={unit.href}>
          <article>
            <h3>
              <Link href={unit.href}>{unit.name}</Link>
            </h3>
            <p>
              <strong>{unit.value}</strong> {" - "} {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function FrenchHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="fr"
      breadcrumbAriaLabel="Fil d'Ariane"
      breadcrumbs={[
        { href: "/fr", label: "Accueil" },
        { label: "Unites de mesure historiques" },
      ]}
      title="Unites de mesure historiques"
      description="Decouvrez les unites de mesure byzantines, ottomanes et anciennes turques avec leurs equivalents modernes en metres et grammes, et convertissez-les directement grace a deux outils pratiques."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Türkçe versiyonu aç",
      }}
      sections={[
        {
          heading: "Bref contexte historique",
          content: (
            <>
              <p>
                L'histoire de la mesure en Anatolie et dans cette region
                n'a pas commence avec le systeme metrique moderne ; elle a
                traverse plusieurs strates de systemes byzantin puis
                ottoman, en passant par des mesures turques encore plus
                anciennes.
              </p>
              <p>
                C'est pourquoi des noms comme arşın, okka et dirhem
                apparaissent encore aujourd'hui dans d'anciens documents,
                ainsi que dans certains livres et recherches historiques.
              </p>
            </>
          ),
        },
        {
          heading: "Convertisseur d'unites de longueur historiques",
          content: (
            <>
              <p>
                Convertissez directement entre arşın, endaze, pied
                byzantin, brasse byzantine et çığ, avec l'equivalent
                moderne en metres. Pour voir toutes les unites de longueur
                modernes, ouvrez la{" "}
                <Link href="/fr/categories/longueur">bibliotheque complete des longueurs</Link>.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="fr"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Convertisseur d'unites de masse historiques",
          content: (
            <>
              <p>
                Convertissez entre l'okka ottomane, le dirhem, la litra
                byzantine et l'ounkia byzantine, en utilisant le gramme
                moderne comme reference. Pour des unites modernes comme le
                kilogramme et la tonne, ouvrez la{" "}
                <Link href="/fr/categories/masse">bibliotheque complete des masses</Link>.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="fr"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Unites de l'epoque byzantine",
          content: (
            <>
              <p>
                Byzance a herite d'une grande partie de la tradition de
                mesure grecque et romaine, et a cree des unites de
                longueur et de masse pratiques, restees en usage dans le
                commerce et la construction pendant des siecles.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Unites de l'epoque ottomane",
          content: (
            <>
              <p>
                Avant que l'Etat ottoman ne passe entierement au systeme
                metrique au XXe siecle, des unites comme l'arşın,
                l'endaze, l'okka et le dirhem etaient utilisees dans le
                commerce, la construction et la vie quotidienne.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Unites turques encore plus anciennes",
          content: (
            <>
              <p>
                Certaines unites anciennes restent connues grace a des
                sources linguistiques et historiques, et sont importantes
                pour comprendre d'anciens ecrits et les relier aux mesures
                modernes.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Pourquoi ces unites sont-elles encore importantes aujourd'hui ?",
          content: (
            <>
              <p>
                Ces noms apparaissent encore aujourd'hui dans les actes de
                waqf, les anciens registres, la recherche historique et
                les travaux de traduction ; les convertir en metres ou en
                grammes aide a les comprendre rapidement.
              </p>
              <p>
                Cette page est egalement utile pour les etudiants, les
                createurs de contenu et toute personne souhaitant lire des
                chiffres historiques selon des reperes modernes clairs.
              </p>
            </>
          ),
        },
        {
          heading: "Outils lies",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/fr/kitchen-measurement-converter">Convertisseur de mesures de cuisine</Link>
              </li>
              <li>
                <Link href="/fr/recipe-converter">Convertisseur de recettes</Link>
              </li>
              <li>
                <Link href="/fr/shoe-size-converter">Convertisseur de pointures de chaussures</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
