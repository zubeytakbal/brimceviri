// Site sahibine haber verme: izlenen bir resmi kaynak degistiginde
// GitHub deposunda bir issue acilir; GitHub bunu sahibin e-postasina
// otomatik gonderir. GITHUB_ISSUE_TOKEN (yalnizca bu depoda Issues:
// Read and write izinli fine-grained token) yoksa sessizce atlanir.

const REPOSITORY = "zubeytakbal/brimceviri";

export async function openSourceChangeIssue(input: {
  label: string;
  url: string;
  pageHref?: string;
  checkedAt: string;
}): Promise<"created" | "skipped" | "failed"> {
  const token = process.env.GITHUB_ISSUE_TOKEN;
  if (!token) return "skipped";

  const body = [
    `The nightly source check found a change in **${input.label}**.`,
    "",
    `- Official source: ${input.url}`,
    input.pageHref ? `- Affected page: https://www.birimceviri.app${input.pageHref}` : null,
    `- Detected: ${input.checkedAt}`,
    "",
    "The site data was not changed automatically. Open the source, confirm whether the formula or rule changed, update the data file if needed, and set the new verification date. Visitors see a \"being re-checked\" notice until then.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "birimceviri-kaynak-kontrol",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: `Source changed: ${input.label} — please re-check`, body }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.log(`[kaynak-kontrol] GitHub issue failed: HTTP ${response.status}`);
    }
    return response.ok ? "created" : "failed";
  } catch (error) {
    console.log(`[kaynak-kontrol] GitHub issue failed: ${error instanceof Error ? error.message : String(error)}`);
    return "failed";
  }
}

// Kurulum testi: token eklendikten sonraki ilk cron calismasinda bir kez
// "bildirimler calisiyor" issue'su acar (sahibe e-posta gider). Tekrar
// denemek icin Redis'teki kaynak-kontrol:owner-alert-test anahtari silinir.
export async function openSetupTestIssue(): Promise<"created" | "skipped" | "failed"> {
  const token = process.env.GITHUB_ISSUE_TOKEN;
  if (!token) return "skipped";

  try {
    const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "birimceviri-kaynak-kontrol",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test: source change alerts are working",
        body: "This is a one-time test from the nightly source check. If you received this by email, change alerts are set up correctly. You can close this issue.",
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.log(`[kaynak-kontrol] GitHub issue failed: HTTP ${response.status}`);
    }
    return response.ok ? "created" : "failed";
  } catch (error) {
    console.log(`[kaynak-kontrol] GitHub issue failed: ${error instanceof Error ? error.message : String(error)}`);
    return "failed";
  }
}
