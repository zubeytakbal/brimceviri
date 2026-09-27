// BirimCeviri servis worker'i (v2).
// - Zaman araclari (saat, alarm, zamanlayici, kronometre, pomodoro, tabata, dunya
//   saatleri ve Ingilizce karsiliklari) ziyaret edildikce onbellege alinir; internet
//   yokken son surumleri acilir. Boylece yuklenen uygulamalar cevrimdisi da calisir.
// - /_next/static (hash'li, degismeyen) dosyalar, fontlar ve simgeler cache-first.
// - Diger sayfalar network-first; baglanti yoksa /cevrimdisi gosterilir.

const SHELL_CACHE = "birimceviri-shell-v2";
const PAGE_CACHE = "birimceviri-pages-v1";
const STATIC_CACHE = "birimceviri-static-v1";
const KEEP = [SHELL_CACHE, PAGE_CACHE, STATIC_CACHE];
const OFFLINE_URL = "/cevrimdisi";
const SHELL_ASSETS = [OFFLINE_URL, "/manifest.webmanifest", "/icon.png", "/icons/icon-192.png"];
const MAX_PAGES = 40;

const OFFLINE_PAGES = [
  "/online-saat",
  "/online-alarm-kur",
  "/zamanlayici",
  "/kronometre",
  "/pomodoro",
  "/tabata-zamanlayici",
  "/dunya-saatleri",
  "/geri-sayim",
  "/en/online-clock",
  "/en/alarm-clock",
  "/en/timer",
  "/en/stopwatch",
  "/en/pomodoro-timer",
  "/en/interval-timer",
  "/en/world-clock",
  "/en/countdown",
];

function isOfflinePage(pathname) {
  return OFFLINE_PAGES.some((base) => pathname === base || pathname.startsWith(base + "/"));
}

function isStaticAsset(pathname) {
  return pathname.startsWith("/_next/static/") || pathname.startsWith("/fonts/") || pathname.startsWith("/app-icons/") || pathname.startsWith("/icons/");
}

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i += 1) await cache.delete(keys[i]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => !KEEP.includes(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          })
      )
    );
    return;
  }

  if (request.mode !== "navigate") return;

  if (isOfflinePage(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches
              .open(PAGE_CACHE)
              .then((cache) => cache.put(url.pathname, copy))
              .then(() => trim(PAGE_CACHE, MAX_PAGES));
          }
          return response;
        })
        .catch(() =>
          caches
            .match(url.pathname)
            .then((cached) => cached || caches.match(OFFLINE_URL))
            .then((fallback) => fallback || Response.error())
        )
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(OFFLINE_URL).then((cached) => cached || Response.error()))
  );
});
