import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "BirimCeviri.app - Birim Çevirici",
    short_name: "BirimCeviri",
    description:
      "Birim çevirici, hesaplayıcılar ve zaman araçları: online saat, alarm, zamanlayıcı, dünya saatleri ve geri sayım.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f8f9",
    theme_color: "#168f8c",
    lang: "tr",
    // Simgeye basili tutunca acilan kisayollar.
    shortcuts: [
      { name: "Online Saat", url: "/online-saat", icons: [{ src: "/app-icons/saat/192", sizes: "192x192", type: "image/png" }] },
      { name: "Online Alarm", url: "/online-alarm-kur", icons: [{ src: "/app-icons/alarm/192", sizes: "192x192", type: "image/png" }] },
      { name: "Zamanlayıcı", url: "/zamanlayici", icons: [{ src: "/app-icons/zamanlayici/192", sizes: "192x192", type: "image/png" }] },
      { name: "Pomodoro", url: "/pomodoro", icons: [{ src: "/app-icons/pomodoro/192", sizes: "192x192", type: "image/png" }] },
    ],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
