// Minimal servis worker -- sadece PWA kurulabilirligi ve basit bir
// cevrimdisi yedek sayfasi icin. Sitedeki yuzlerce dinamik route'u
// tam olarak onbellege almaya CALISMIYORUZ (karmasik ve kirilgan
// olurdu) -- sadece app shell'i onbellekliyoruz, sayfa istekleri
// icin network-first + basarisiz olursa /cevrimdisi'ne dusuyoruz.

const CACHE_NAME = "birimceviri-shell-v1";
const OFFLINE_URL = "/cevrimdisi";
const SHELL_ASSETS = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icon.png",
  "/icons/icon-192.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() =>
      caches
        .match(OFFLINE_URL)
        .then((cached) => cached ?? Response.error())
    )
  );
});
