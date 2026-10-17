// Paylasim baglantisi: hash ve utm_* gibi izleme parametrelerini atar, geri kalani korur.

export function buildShareUrl(href: string): string {
  const url = new URL(href);
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (key.toLowerCase().startsWith("utm_") || key === "fbclid" || key === "gclid") {
      url.searchParams.delete(key);
    }
  }
  return url.toString();
}
