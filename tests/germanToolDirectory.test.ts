import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getMenuGroups, getTopLevelLinks } from "../app/i18n/siteNavigation";
import { germanToolGroups } from "../app/i18n/germanToolDirectory";
import { germanStandaloneTools } from "../app/i18n/germanStandaloneTools";

const deDir = path.join(__dirname, "..", "app", "de");
const hrefs = germanToolGroups.flatMap((group) => group.links.map((link) => link.href));

const standalonePaths = new Set(germanStandaloneTools.map((tool) => tool.germanPath));

function routeExists(href: string) {
  const clean = href.split("#")[0];
  if (clean === "/de" || standalonePaths.has(clean)) return true;
  return existsSync(path.join(__dirname, "..", "app", clean, "page.tsx"));
}

// Dizinde olması gerekmeyen Almanca sayfalar: yasal sayfalar, dönüşüm
// listeleri ve hub'ın kendisi.
const NOT_TOOLS = new Set([
  "alle-umrechnungen",
  "weitere-umrechnungen",
  "einheiten",
  "datenschutz",
  "kontakt",
  "nutzungsbedingungen",
  "uber-uns",
  "rechner",
]);

describe("Almanca araç dizini (/de/rechner)", () => {
  it("her bağlantı gerçek bir sayfaya gider", () => {
    expect(hrefs.filter((href) => !routeExists(href))).toEqual([]);
  });

  it("aynı araç iki kez listelenmez", () => {
    expect(hrefs.length).toBe(new Set(hrefs).size);
  });

  it("app/de altındaki her araç sayfası dizinde", () => {
    const pages = readdirSync(deDir).filter(
      (name) => !name.startsWith("[") && !NOT_TOOLS.has(name) && existsSync(path.join(deDir, name, "page.tsx"))
    );
    expect(pages.filter((name) => !hrefs.includes(`/de/${name}`))).toEqual([]);
  });

  it("ortak listeden üretilen araçlar (/de/[slug]) da dizinde", () => {
    expect([...standalonePaths].filter((href) => !hrefs.includes(href))).toEqual([]);
  });
});

describe("Almanca üst menü", () => {
  it("Umrechnungen, Rechner ve Kalender & Uhr grupları var", () => {
    expect(getMenuGroups("de").map((group) => group.label)).toEqual(["Umrechnungen", "Rechner", "Kalender & Uhr"]);
  });

  it("tüm bağlantılar gerçek sayfalara gider", () => {
    const links = [
      ...getTopLevelLinks("de"),
      ...getMenuGroups("de").flatMap((group) => [...group.links, ...(group.footer ?? [])]),
    ];
    const broken = links
      .map((link) => link.href)
      .filter((href) => !/^\/de\/kategorien\/[^/]+$/.test(href) && !routeExists(href));
    expect(broken).toEqual([]);
  });

  it("Almanca etiketlerde umlaut yerine ae/oe/ue kullanılmaz", () => {
    const labels = getMenuGroups("de").flatMap((group) => [...group.links, ...(group.footer ?? [])]).map((link) => link.label);
    const asciiSpellings = /Lange$|groessen|Groessen|Kuechen|kuechen|Waehrung|Flaeche|Laender|Masseinheit|fuer/;
    expect(labels.filter((label) => asciiSpellings.test(label))).toEqual([]);
    expect(labels).toContain("Länge");
  });
});
