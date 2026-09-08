import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import { getRedisCredentials, licenseSourceMonitorTargets } from "../../../converter/licenseSourceMonitor";

// Salt-okunur kaynak izleme: bu endpoint hicbir yayinlanmis icerigi
// degistirmez. Tek yaptigi, izlenen resmi kaynaklarin (su an sadece
// Karayollari Trafik Yonetmeligi) icerik hash'ini gunluk olarak
// kontrol edip bir onceki hash ile karsilastirmak ve durumu Redis'e
// yazmaktir. Icerik degistiyse yalnizca "changed" durumu isaretlenir --
// site verisi otomatik guncellenmez, bu bilinclidir.

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function hashContent(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

// Node'un fetch() hatalari genelde ustteki "fetch failed" mesajini
// verir, gercek sebep (SSL, DNS, baglanti reddi vb.) error.cause
// icinde saklidir -- teshis icin onu da cikarmak gerekir.
function describeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const parts = [error.message];
  let cause: unknown = (error as { cause?: unknown }).cause;
  while (cause) {
    if (cause instanceof Error) {
      parts.push(cause.message);
      cause = (cause as { cause?: unknown }).cause;
    } else {
      parts.push(String(cause));
      break;
    }
  }
  return parts.join(" <- caused by: ");
}

type MonitorResult = {
  id: string;
  label: string;
  url: string;
  status: "baseline_established" | "unchanged" | "changed" | "fetch_error";
  checkedAt: string;
  error?: string;
};

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
  }

  const credentials = getRedisCredentials();

  if (!credentials) {
    return jsonResponse(
      {
        error:
          "Redis env değişkenleri bulunamadı. Vercel dashboard > Storage üzerinden Upstash Redis entegrasyonunu ekleyip projeye bağlaman gerekiyor.",
      },
      503,
    );
  }

  const redis = new Redis(credentials);
  const results: MonitorResult[] = [];

  for (const target of licenseSourceMonitorTargets) {
    const checkedAt = new Date().toISOString();
    const storageKey = `kaynak-kontrol:${target.id}`;

    try {
      const response = await fetch(target.url, {
        headers: {
          "User-Agent": "BirimCeviri.app kaynak-kontrol botu (salt okunur izleme, iletisim: zubeytakbal9@gmail.com)",
        },
      });
      const body = await response.text();
      const currentHash = hashContent(body);
      const previousHash = await redis.get<string>(`${storageKey}:hash`);

      let status: MonitorResult["status"];
      if (!previousHash) {
        status = "baseline_established";
      } else if (previousHash === currentHash) {
        status = "unchanged";
      } else {
        status = "changed";
      }

      await redis.set(`${storageKey}:hash`, currentHash);
      await redis.set(`${storageKey}:status`, status);
      await redis.set(`${storageKey}:checkedAt`, checkedAt);

      results.push({ id: target.id, label: target.label, url: target.url, status, checkedAt });
    } catch (error) {
      const status: MonitorResult["status"] = "fetch_error";
      await redis.set(`${storageKey}:status`, status).catch(() => undefined);
      await redis.set(`${storageKey}:checkedAt`, checkedAt).catch(() => undefined);
      results.push({
        id: target.id,
        label: target.label,
        url: target.url,
        status,
        checkedAt,
        error: describeError(error),
      });
    }
  }

  return jsonResponse({ results });
}
