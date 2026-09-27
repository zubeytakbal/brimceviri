// Sayfadaki "Check the official source now" dugmesi. Ziyaretci istedigi an
// resmi kaynak kontrol edilir; ayni kurum icin sonuc 1 saat saklanir ki
// dugme ne Vercel kotasini ne de universitenin sitesini yorsun. Veri asla
// otomatik degismez: degisiklik bulunursa sayfaya uyari duser ve site
// sahibine bildirim gider (gece cron'u ile ayni kod).
import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";
import { CGPA_TARGET_PREFIX, cgpaSourceMonitorTargets, isAlertActive } from "../../converter/cgpaSourceMonitor";
import { findCgpaUniversity } from "../../converter/india/cgpaUniversities";
import { getRedisCredentials } from "../../converter/licenseSourceMonitor";
import { checkSourceTarget } from "../../converter/sourceCheck";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MANUAL_CHECK_TTL_SECONDS = 60 * 60;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  let slug: unknown;
  try {
    ({ slug } = (await request.json()) as { slug?: unknown });
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const university = typeof slug === "string" ? findCgpaUniversity(slug) : undefined;
  const target = cgpaSourceMonitorTargets.find((entry) => entry.id === `${CGPA_TARGET_PREFIX}${slug}`);
  if (!university || !target) return json({ error: "unknown_university" }, 404);

  const credentials = getRedisCredentials();
  if (!credentials) return json({ error: "not_configured" }, 503);

  const redis = new Redis(credentials);
  const storageKey = `kaynak-kontrol:${target.id}`;
  const lockKey = `${storageKey}:manual`;

  // Son bir saatte kontrol edildiyse kaynaga gitmeden kayitli sonucu dondur.
  const acquired = await redis.set(lockKey, new Date().toISOString(), { nx: true, ex: MANUAL_CHECK_TTL_SECONDS });
  if (!acquired) {
    const [status, checkedAt, changedAt] = await Promise.all([
      redis.get<string>(`${storageKey}:status`),
      redis.get<string>(`${storageKey}:checkedAt`),
      redis.get<string>(`${storageKey}:changedAt`),
    ]);
    return json({
      status: status ?? "unknown",
      checkedAt,
      cached: true,
      alertActive: isAlertActive(university, changedAt),
      sourceUrl: university.sourceUrl,
    });
  }

  const result = await checkSourceTarget(redis, target);
  const changedAt = await redis.get<string>(`${storageKey}:changedAt`);
  const alertActive = isAlertActive(university, changedAt);

  if (result.status === "changed") {
    // Uyari notu hemen gorunsun.
    revalidatePath(`/en/cgpa-to-percentage/${university.slug}`);
    revalidatePath("/en/cgpa-to-percentage");
  }

  console.log(`[cgpa-source-check] ${target.id}:${result.status}${result.ownerAlert ? `(${result.ownerAlert})` : ""}`);

  return json({
    status: result.status,
    checkedAt: result.checkedAt,
    cached: false,
    alertActive,
    sourceUrl: university.sourceUrl,
  });
}
