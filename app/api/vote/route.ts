import { Redis } from "@upstash/redis";
import { getRedisCredentials } from "../../converter/licenseSourceMonitor";

// Sayfa "faydali buldum / bulmadim" oylama sayaci. Ziyaretci basina
// birden fazla oy engeli sunucu tarafinda yok (hesap sistemi yok) --
// istemci tarafinda (TrustBar bilesenindeki localStorage kontrolu)
// engellenir, bu da hesap gerektirmeyen bir site icin makul bir
// denge (kusursuz spam korumasi degil, ama gercek/uydurma olmayan bir
// sayac).

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

const PAGE_ID_PATTERN = /^[a-z0-9-]{1,80}$/;

function getRedis(): Redis | null {
  const credentials = getRedisCredentials();
  if (!credentials) return null;
  return new Redis(credentials);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");

  if (!pageId || !PAGE_ID_PATTERN.test(pageId)) {
    return jsonResponse({ error: "Geçersiz pageId" }, 400);
  }

  const redis = getRedis();
  if (!redis) {
    return jsonResponse({ up: 0, down: 0 });
  }

  const [up, down] = await Promise.all([
    redis.get<number>(`vote:${pageId}:up`),
    redis.get<number>(`vote:${pageId}:down`),
  ]);

  return jsonResponse({ up: up ?? 0, down: down ?? 0 });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Geçersiz istek gövdesi" }, 400);
  }

  const { pageId, vote } = (body ?? {}) as { pageId?: unknown; vote?: unknown };

  if (typeof pageId !== "string" || !PAGE_ID_PATTERN.test(pageId)) {
    return jsonResponse({ error: "Geçersiz pageId" }, 400);
  }
  if (vote !== "up" && vote !== "down") {
    return jsonResponse({ error: "vote 'up' ya da 'down' olmalı" }, 400);
  }

  const redis = getRedis();
  if (!redis) {
    return jsonResponse({ error: "Oylama sistemi şu an kullanılamıyor" }, 503);
  }

  const newValue = await redis.incr(`vote:${pageId}:${vote}`);
  const otherKey = vote === "up" ? "down" : "up";
  const otherValue = (await redis.get<number>(`vote:${pageId}:${otherKey}`)) ?? 0;

  return jsonResponse({
    up: vote === "up" ? newValue : otherValue,
    down: vote === "down" ? newValue : otherValue,
  });
}
