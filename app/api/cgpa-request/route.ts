import { Redis } from "@upstash/redis";
import {
  REQUEST_ALERT_THRESHOLD,
  REQUESTS_PER_DAY_PER_VISITOR,
  requestKey,
  validateUniversityName,
  visitorHash,
} from "../../converter/cgpaRequests";
import { findCgpaUniversity, cgpaUniversities } from "../../converter/india/cgpaUniversities";
import { getRedisCredentials } from "../../converter/licenseSourceMonitor";
import { openUniversityRequestIssue } from "../../converter/ownerAlerts";

export const dynamic = "force-dynamic";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  let body: { university?: unknown };
  try {
    body = (await request.json()) as { university?: unknown };
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const name = validateUniversityName(body.university);
  if (!name) return json({ error: "invalid_name" }, 400);

  const key = requestKey(name);
  const listed = cgpaUniversities.find(
    (university) => requestKey(university.name) === key || requestKey(university.shortName) === key
  );
  if (listed || findCgpaUniversity(key.replace(/\s+/g, "-"))) {
    return json({ status: "already_listed", slug: (listed ?? findCgpaUniversity(key.replace(/\s+/g, "-")))!.slug });
  }

  const credentials = getRedisCredentials();
  if (!credentials) return json({ error: "not_configured" }, 503);
  const redis = new Redis(credentials);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const day = new Date().toISOString().slice(0, 10);
  const limiterKey = `cgpa-req:visitor:${visitorHash(ip, day)}`;
  const used = await redis.incr(limiterKey);
  if (used === 1) await redis.expire(limiterKey, 60 * 60 * 24);
  if (used > REQUESTS_PER_DAY_PER_VISITOR) return json({ error: "too_many_requests" }, 429);

  const count = await redis.zincrby("cgpa-req:counts", 1, key);
  await redis.hset("cgpa-req:names", { [key]: name });

  if (count >= REQUEST_ALERT_THRESHOLD) {
    const alerted = await redis.set(`cgpa-req:alerted:${key}`, day, { nx: true });
    if (alerted) {
      const result = await openUniversityRequestIssue(name, count);
      console.log(`[cgpa-request] "${name}" reached ${count} requests; owner alert ${result}`);
    }
  }

  return json({ status: "recorded" });
}
