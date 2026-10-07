// CGPA formullerinin resmi kaynaklarini gece takip eder (kaynak-kontrol
// cron'u). Ehliyet takibinden farki: "changed" durumu ertesi gun
// kendiliginden kaybolmaz. Degisim ani (changedAt) Redis'te kalir ve
// kurumun verifiedOn tarihi bu andan yeni olana kadar sayfada ve bildirim
// zilinde uyari gosterilir. Formul yeniden dogrulaninca verifiedOn
// guncellenir, uyari kalkar.
import { cgpaUniversities, type CgpaUniversity } from "./india/cgpaUniversities";
import { getRedisCredentials, type SourceMonitorTarget } from "./licenseSourceMonitor";

export const CGPA_TARGET_PREFIX = "cgpa-";

export const cgpaSourceMonitorTargets: Array<SourceMonitorTarget & { persistent: true; pageHref: string }> =
  cgpaUniversities.map((university) => ({
    id: `${CGPA_TARGET_PREFIX}${university.slug}`,
    label: `${university.shortName} CGPA formula source`,
    url: university.sourceUrl,
    persistent: true,
    pageHref: `/en/cgpa-to-percentage#${university.slug}`,
  }));

export type CgpaSourceAlert = {
  university: CgpaUniversity;
  changedAt: string;
};

export function isAlertActive(university: Pick<CgpaUniversity, "verifiedOn">, changedAt: string | null | undefined) {
  return Boolean(changedAt) && changedAt!.slice(0, 10) > university.verifiedOn;
}

export async function getCgpaSourceAlerts(): Promise<CgpaSourceAlert[]> {
  const credentials = getRedisCredentials();
  if (!credentials) return [];

  try {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis(credentials);
    const values = await Promise.all(
      cgpaUniversities.map((university) =>
        redis.get<string>(`kaynak-kontrol:${CGPA_TARGET_PREFIX}${university.slug}:changedAt`)
      )
    );
    return cgpaUniversities.flatMap((university, index) => {
      const changedAt = values[index];
      return isAlertActive(university, changedAt) ? [{ university, changedAt: changedAt! }] : [];
    });
  } catch {
    return [];
  }
}
