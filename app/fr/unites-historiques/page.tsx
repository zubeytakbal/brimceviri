import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "Unités de mesure historiques",
  description:
    "Découvrez les unités de mesure byzantines, ottomanes et anciennes turques, puis convertissez-les en mètres et grammes avec de brèves explications.",
  alternates: {
    canonical: "/fr/unites-historiques",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      de: "/de/historische-masseinheiten",
      bn: "/bn/historical-units",
      fr: "/fr/unites-historiques",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "Unités de mesure historiques",
    description: "Découvrez les unités de mesure byzantines, ottomanes et anciennes turques.",
    url: buildSiteUrl("/fr/unites-historiques"),
    siteName: "BirimCeviri.app",
    locale: "fr_FR",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Mètre (m)", symbol: "m" },
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
    note: "Prolongement du pied grec antique, utilisé jusqu’en 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "Brasse byzantine (orgyia)",
    value: "= 6 pous ≈ 1,8888 m",
    note: "Distance entre les extrémités des doigts, bras complètement écartés.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "Litra byzantine (litra)",
    value: "≈ 324 g",
    note: "Unité de masse de base de la tradition byzantine, influencée par la libra romaine.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "Ounkia byzantine (ounkia)",
    value: "= 1/12 litra ≈ 27 g",
    note: "Différente de l’once moderne des systèmes britannique et américain.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "Arşın",
    value: "≈ 0,68 m",
    note: "Plusieurs usages existaient : l’arşın de marche, le plus connu, et l’arşın de construction pour de plus grandes longueurs.",
  },
  {
    href: "/birimler/endaze",
    name: "Endaze",
    value: "= 0,65 m",
    note: "Utilisée notamment pour mesurer les tissus et dans le commerce associé.",
  },
  {
    href: "/birimler/okka",
    name: "Okka ottomane (Okka)",
    value: "= 400 dirhem ≈ 1282,945 g",
    note: "L’une des unités de poids les plus connues des marchés ottomans traditionnels.",
  },
  {
    href: "/birimler/dirhem",
    name: "Dirhem",
    value: "= 1/400 okka ≈ 3,207 g",
    note: "Utilisé pour de petites quantités, comme les métaux précieux, les épices et certains cosmétiques.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0,333 m",
    note: "Une ancienne unité de longueur turque, relevée dans des sources linguistiques et historiques.",
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
        { label: "Unités de mesure historiques" },
      ]}
      title="Unités de mesure historiques"
      description="Découvrez les unités de mesure byzantines, ottomanes et anciennes turques avec leurs équivalents modernes en mètres et grammes, et convertissez-les directement grâce à deux outils pratiques."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Ouvrir la version turque",
      }}
      sections={[
        {
          heading: "Bref contexte historique",
          content: (
            <>
              <p>
                L’histoire de la mesure en Anatolie et dans cette région
                n’a pas commencé avec le système métrique moderne ; elle a
                traversé plusieurs strates de systèmes byzantin puis
                ottoman, en passant par des mesures turques encore plus
                anciennes.
              </p>
              <p>
                C’est pourquoi des noms comme arşın, okka et dirhem
                apparaissent encore aujourd’hui dans d’anciens documents,
                ainsi que dans certains livres et recherches historiques.
              </p>
            </>
          ),
        },
        {
          heading: "Convertisseur d’unités de longueur historiques",
          content: (
            <>
              <p>
                Convertissez directement entre arşın, endaze, pied
                byzantin, brasse byzantine et çığ, avec l’équivalent
                moderne en mètres. Pour voir toutes les unités de longueur
                modernes, ouvrez la{" "}
                <Link href="/fr/categories/longueur">bibliothèque complète des longueurs</Link>.
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
          heading: "Convertisseur d’unités de masse historiques",
          content: (
            <>
              <p>
                Convertissez entre l’okka ottomane, le dirhem, la litra
                byzantine et l’ounkia byzantine, en utilisant le gramme
                moderne comme référence. Pour des unités modernes comme le
                kilogramme et la tonne, ouvrez la{" "}
                <Link href="/fr/categories/masse">bibliothèque complète des masses</Link>.
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
          heading: "Unités de l’époque byzantine",
          content: (
            <>
              <p>
                Byzance a hérité d’une grande partie de la tradition de
                mesure grecque et romaine, et a créé des unités de
                longueur et de masse pratiques, restées en usage dans le
                commerce et la construction pendant des siècles.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "Unités de l’époque ottomane",
          content: (
            <>
              <p>
                Avant que l’État ottoman ne passe entièrement au système
                métrique au XXe siècle, des unités comme l’arşın,
                l’endaze, l’okka et le dirhem étaient utilisées dans le
                commerce, la construction et la vie quotidienne.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "Unités turques encore plus anciennes",
          content: (
            <>
              <p>
                Certaines unités anciennes restent connues grâce à des
                sources linguistiques et historiques, et sont importantes
                pour comprendre d’anciens écrits et les relier aux mesures
                modernes.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "Pourquoi ces unités sont-elles encore importantes aujourd’hui ?",
          content: (
            <>
              <p>
                Ces noms apparaissent encore aujourd’hui dans les actes de
                waqf, les anciens registres, la recherche historique et
                les travaux de traduction ; les convertir en mètres ou en
                grammes aide à les comprendre rapidement.
              </p>
              <p>
                Cette page est également utile pour les étudiants, les
                créateurs de contenu et toute personne souhaitant lire des
                chiffres historiques selon des repères modernes clairs.
              </p>
            </>
          ),
        },
        {
          heading: "Outils liés",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/fr/convertisseur-mesures-cuisine">Convertisseur de mesures de cuisine</Link>
              </li>
              <li>
                <Link href="/fr/convertisseur-de-recettes">Convertisseur de recettes</Link>
              </li>
              <li>
                <Link href="/fr/convertisseur-de-pointures">Convertisseur de pointures de chaussures</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
