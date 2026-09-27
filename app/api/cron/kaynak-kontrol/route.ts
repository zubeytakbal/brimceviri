import { Redis } from "@upstash/redis";
import { revalidateTag } from "next/cache";
import { FX_CACHE_TAG } from "../../../converter/fx/fxData";
import { cgpaSourceMonitorTargets } from "../../../converter/cgpaSourceMonitor";
import { getRedisCredentials, licenseSourceMonitorTargets } from "../../../converter/licenseSourceMonitor";
import { openSetupTestIssue } from "../../../converter/ownerAlerts";
import { checkSourceTarget, type MonitorResult } from "../../../converter/sourceCheck";

// Kaynaklar paralel kontrol edilir; her biri kendi 20 sn zaman asimina sahip.
export const maxDuration = 60;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
  }

  // Doviz kurlari: kaynak (ExchangeRate-API) kuru her gun ~00:00 UTC'de
  // yayinliyor. Bu gunluk cron (03:00 UTC) doviz verisinin onbellegini
  // bayat olarak isaretler; bir sonraki ziyarette sayfalar yeni kurla
  // arka planda yeniden uretilir. Redis'ten bagimsizdir, bu yuzden en basta.
  let fxRevalidated = false;
  try {
    revalidateTag(FX_CACHE_TAG, "max");
    fxRevalidated = true;
  } catch {
    fxRevalidated = false;
  }

  const credentials = getRedisCredentials();

  if (!credentials) {
    console.log("[kaynak-kontrol] Redis not configured; source checks and alerts skipped");
    return jsonResponse(
      {
        error:
          "Redis env değişkenleri bulunamadı. Vercel dashboard > Storage üzerinden Upstash Redis entegrasyonunu ekleyip projeye bağlaman gerekiyor.",
        fxRevalidated,
      },
      503,
    );
  }

  const redis = new Redis(credentials);
  const targets: Array<{ id: string; label: string; url: string; persistent?: boolean; pageHref?: string }> = [
    ...licenseSourceMonitorTargets,
    ...cgpaSourceMonitorTargets,
  ];

  const results: MonitorResult[] = await Promise.all(targets.map((target) => checkSourceTarget(redis, target)));

  // Bildirim kurulum testi: token varken yalnizca bir kez calisir.
  let ownerAlertTest: "created" | "skipped" | "failed" | "already_sent" = "skipped";
  if (process.env.GITHUB_ISSUE_TOKEN) {
    const alreadySent = await redis.get<string>("kaynak-kontrol:owner-alert-test").catch(() => null);
    if (alreadySent) {
      ownerAlertTest = "already_sent";
    } else {
      ownerAlertTest = await openSetupTestIssue();
      if (ownerAlertTest === "created") {
        await redis.set("kaynak-kontrol:owner-alert-test", new Date().toISOString()).catch(() => undefined);
      }
    }
  }

  // Vercel Logs'ta gorunsun diye kisa ozet (token degeri asla yazilmaz).
  console.log(
    `[kaynak-kontrol] ownerAlertTest=${ownerAlertTest} tokenSet=${Boolean(process.env.GITHUB_ISSUE_TOKEN)} ` +
      results.map((result) => `${result.id}:${result.status}${result.ownerAlert ? `(${result.ownerAlert})` : ""}`).join(" "),
  );

  return jsonResponse({ fxRevalidated, ownerAlertTest, results });
}
