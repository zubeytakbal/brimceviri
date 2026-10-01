// GitHub Actions'ta her gun calisir (.github/workflows/deploy.yml): yillik
// degeri degisen araclar icin hatirlatma tarihi geldiyse GitHub'da issue
// acar; GitHub bunu sahibin e-postasina gonderir. Ayni basliktaki issue
// (acik ya da kapali) zaten varsa tekrar acilmaz.
import { annualUpdates, isReminderDue } from "../app/converter/annualUpdates";

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY ?? "zubeytakbal/brimceviri";

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "birimceviri-yillik-hatirlatma",
  "Content-Type": "application/json",
};

async function existingTitles(): Promise<Set<string>> {
  const titles = new Set<string>();
  for (let page = 1; page <= 10; page++) {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/issues?state=all&per_page=100&page=${page}`,
      { headers },
    );
    if (!response.ok) throw new Error(`GitHub issue listesi alinamadi: HTTP ${response.status}`);
    const issues = (await response.json()) as { title: string }[];
    for (const issue of issues) titles.add(issue.title);
    if (issues.length < 100) break;
  }
  return titles;
}

async function main() {
  if (!token) {
    console.log("GITHUB_TOKEN yok, hatirlatmalar atlandi.");
    return;
  }

  const due = annualUpdates.filter((update) => isReminderDue(update));
  if (due.length === 0) {
    console.log("Zamani gelen yillik guncelleme yok.");
    return;
  }

  const titles = await existingTitles();
  for (const update of due) {
    const nextYear = update.validYear + 1;
    const title = `Yearly update: ${update.label} — values for ${nextYear}`;
    if (titles.has(title)) {
      console.log(`Zaten var: ${title}`);
      continue;
    }

    const body = [
      `The official values for **${nextYear}** are usually published now. Please update:`,
      "",
      ...update.checklist.map((item) => `- [ ] ${item}`),
      "",
      `- Page: https://www.birimceviri.app${update.pageHref}`,
      "",
      `From 1 January ${nextYear} the page shows visitors a notice that the figures are for the previous year until validYear is updated in app/converter/annualUpdates.ts.`,
    ].join("\n");

    const response = await fetch(`https://api.github.com/repos/${repository}/issues`, {
      method: "POST",
      headers,
      body: JSON.stringify({ title, body }),
    });
    console.log(`${response.ok ? "Acildi" : `Basarisiz (HTTP ${response.status})`}: ${title}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
