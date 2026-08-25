// Basit, bellek-ici IP bazli rate limit. Serverless ortamda instance'lar
// arasinda PAYLASILMAZ ve cold start'ta sifirlanir -- bu bilinen bir v1
// sinirlamasi. Gercek kotuye kullanim gorulurse Vercel KV/Upstash gibi
// dagitik bir cozume gecilmeli; konsepti kanitlamadan o altyapiya
// yatirim yapmiyoruz.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 60;

const requestLog = new Map<string, { count: number; windowStart: number }>();

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(clientIp);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    requestLog.set(clientIp, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;

  return entry.count > MAX_REQUESTS_PER_WINDOW;
}
