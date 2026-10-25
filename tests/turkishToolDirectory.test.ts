import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { everydayCalculators } from "../app/converter/everydayCalculators";
import { getMenuGroups, getTopLevelLinks } from "../app/i18n/siteNavigation";
import { turkishToolGroups } from "../app/i18n/turkishToolDirectory";

const appDir = path.join(__dirname, "..", "app");
const hrefs = turkishToolGroups.flatMap((group) => group.links.map((link) => link.href));

function routeExists(href: string) {
  const clean = href.split("#")[0];
  if (clean === "/") return true;
  return existsSync(path.join(appDir, clean, "page.tsx"));
}

describe("Türkçe araç dizini (/hesaplayicilar)", () => {
  it("her bağlantı gerçek bir sayfaya gider", () => {
    expect(hrefs.filter((href) => !routeExists(href))).toEqual([]);
  });

  it("aynı araç iki kez listelenmez", () => {
    expect(hrefs.length).toBe(new Set(hrefs).size);
  });

  it("gündelik hesaplayıcıların hepsi dizinde", () => {
    const missing = everydayCalculators
      .map((tool) => tool.href)
      .filter((href) => !href.endsWith("-araclari") && href !== "/meslekler")
      .filter((href) => !hrefs.includes(href));
    expect(missing).toEqual([]);
  });

  it("yeni eklenen ...-hesaplama sayfası dizine eklenmeden kalmaz", () => {
    const toolDirs = readdirSync(appDir).filter(
      (name) => name.endsWith("-hesaplama") && existsSync(path.join(appDir, name, "page.tsx"))
    );
    expect(toolDirs.filter((name) => !hrefs.includes(`/${name}`))).toEqual([]);
  });
});

describe("Türkçe üst menü", () => {
  it("açılır menüler ve üst bağlantılar gerçek sayfalara gider", () => {
    const links = [
      ...getTopLevelLinks("tr"),
      ...getMenuGroups("tr").flatMap((group) => [...group.links, ...(group.footer ?? [])]),
    ];
    const broken = links
      .map((link) => link.href)
      .filter((href) => {
        const match = href.match(/^\/kategoriler\/([^/]+)$/);
        return match ? false : !routeExists(href);
      });
    expect(broken).toEqual([]);
  });

  // Bilim, 25 Ekim 2026'da Hesaplamalar'a katıldı.
  it("beş ana başlık var", () => {
    expect(getMenuGroups("tr").map((group) => group.label)).toEqual([
      "Dönüşümler",
      "Hesaplamalar",
      "Mühendislik",
      "Dünya ve Coğrafya",
      "Tarih & Saat",
    ]);
  });

  it("diğer dillerin menüsü değişmedi", () => {
    expect(getMenuGroups("fr").map((group) => group.id)).toEqual(["conversions"]);
    expect(getMenuGroups("en").map((group) => group.id)).toEqual(["conversions", "calculators", "time"]);
  });
  it("İngilizce menü: saat araçları var, Christian Tools ana listede değil", () => {
    const [, calc, time] = getMenuGroups("en");
    expect(calc.links.some((l) => l.href === "/en/christian-tools")).toBe(false);
    expect(time.links.map((l) => l.href)).toContain("/en/world-clock");
  });
});
