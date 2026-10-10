import { describe, expect, it } from "vitest";
import { buildSiteNavData } from "../app/i18n/siteNavBuild";
import { SITE_NAV_DATA } from "../app/i18n/siteNavData.generated";

// Uretilen menu verisi kaynakla ayni olmali; degilse `npx tsx scripts/generateSiteNav.ts` calistirin.
describe("siteNavData.generated", () => {
  it("siteNavigation ile birebir ayni", () => {
    expect(JSON.parse(JSON.stringify(SITE_NAV_DATA))).toEqual(JSON.parse(JSON.stringify(buildSiteNavData())));
  });
});
