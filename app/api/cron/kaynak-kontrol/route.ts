import { createHash } from "node:crypto";
import https from "node:https";
import tls from "node:tls";
import { Redis } from "@upstash/redis";
import { getRedisCredentials, licenseSourceMonitorTargets } from "../../../converter/licenseSourceMonitor";

// mevzuat.gov.tr (paylasilan Cumhurbaskanligi/*.tccb.gov.tr TLS sertifikasini
// kullanan altyapi) baglanti sirasinda ara sertifikayi (GeoTrust TLS RSA CA
// G1) gondermiyor -- standart istemciler (Node fetch dahil) zinciri bu yuzden
// dogrulayamiyor ("unable to verify the first certificate"). Bu, resmi CA
// dagitim adresinden (http://cacerts.geotrust.com/GeoTrustTLSRSACAG1.crt)
// indirilip openssl ile tam zincir dogrulamasi yapilarak (leaf.pem: OK)
// teyit edilen gercek ara sertifika; sadece bu eksik halkayi tamamlamak icin
// Node'un varsayilan kok sertifikalarina ekleniyor.
const GEOTRUST_TLS_RSA_CA_G1_PEM = `-----BEGIN CERTIFICATE-----
MIIEjTCCA3WgAwIBAgIQDQd4KhM/xvmlcpbhMf/ReTANBgkqhkiG9w0BAQsFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBH
MjAeFw0xNzExMDIxMjIzMzdaFw0yNzExMDIxMjIzMzdaMGAxCzAJBgNVBAYTAlVT
MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j
b20xHzAdBgNVBAMTFkdlb1RydXN0IFRMUyBSU0EgQ0EgRzEwggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQC+F+jsvikKy/65LWEx/TMkCDIuWegh1Ngwvm4Q
yISgP7oU5d79eoySG3vOhC3w/3jEMuipoH1fBtp7m0tTpsYbAhch4XA7rfuD6whU
gajeErLVxoiWMPkC/DnUvbgi74BJmdBiuGHQSd7LwsuXpTEGG9fYXcbTVN5SATYq
DfbexbYxTMwVJWoVb6lrBEgM3gBBqiiAiy800xu1Nq07JdCIQkBsNpFtZbIZhsDS
fzlGWP4wEmBQ3O67c+ZXkFr2DcrXBEtHam80Gp2SNhou2U5U7UesDL/xgLK6/0d7
6TnEVMSUVJkZ8VeZr+IUIlvoLrtjLbqugb0T3OYXW+CQU0kBAgMBAAGjggFAMIIB
PDAdBgNVHQ4EFgQUlE/UXYvkpOKmgP792PkA76O+AlcwHwYDVR0jBBgwFoAUTiJU
IBiV5uNu5g/6+rkS7QYXjzkwDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQGCCsG
AQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMDQGCCsGAQUFBwEB
BCgwJjAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AuZGlnaWNlcnQuY29tMEIGA1Ud
HwQ7MDkwN6A1oDOGMWh0dHA6Ly9jcmwzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEds
b2JhbFJvb3RHMi5jcmwwPQYDVR0gBDYwNDAyBgRVHSAAMCowKAYIKwYBBQUHAgEW
HGh0dHBzOi8vd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwDQYJKoZIhvcNAQELBQADggEB
AIIcBDqC6cWpyGUSXAjjAcYwsK4iiGF7KweG97i1RJz1kwZhRoo6orU1JtBYnjzB
c4+/sXmnHJk3mlPyL1xuIAt9sMeC7+vreRIF5wFBC0MCN5sbHwhNN1JzKbifNeP5
ozpZdQFmkCo+neBiKR6HqIA+LMTMCMMuv2khGGuPHmtDze4GmEGZtYLyF8EQpa5Y
jPuV6k2Cr/N3XxFpT3hRpt/3usU/Zb9wfKPtWpoznZ4/44c1p9rzFcZYrWkj3A+7
TNBJE0GmP2fhXhP1D/XVfIW/h0yCJGEiV9Glm/uGOa3DXHlmbAcxSyCRraG+ZBkA
7h4SeM6Y8l/7MBRpPCz6l8Y=
-----END CERTIFICATE-----`;

function fetchTextWithExtraTrustedCa(url: string, userAgent: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: { "User-Agent": userAgent },
        ca: [...tls.rootCertificates, GEOTRUST_TLS_RSA_CA_G1_PEM],
      },
      (response) => {
        const statusCode = response.statusCode ?? 0;
        if (statusCode >= 400) {
          response.resume();
          reject(new Error(`HTTP ${statusCode}`));
          return;
        }
        let data = "";
        response.setEncoding("utf8");
        response.on("data", (chunk: string) => {
          data += chunk;
        });
        response.on("end", () => resolve(data));
      },
    );
    request.on("error", reject);
    request.end();
  });
}

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
      const body = await fetchTextWithExtraTrustedCa(
        target.url,
        "BirimCeviri.app kaynak-kontrol botu (salt okunur izleme, iletisim: zubeytakbal9@gmail.com)",
      );
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
