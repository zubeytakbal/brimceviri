import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "BirimCeviri.app - Birim Çevirici",
    short_name: "BirimCeviri",
    description:
      "Birim çevirici ve hesaplayıcılar: uzunluk, ağırlık, alan, hacim, sıcaklık ve yüzlerce günlük ve mühendislik hesabı.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f8f9",
    theme_color: "#168f8c",
    lang: "tr",
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
