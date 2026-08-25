import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BirimCeviri.app - Birim Çevirici",
    short_name: "BirimCeviri",
    description:
      "Uzunluk, kütle, sıcaklık, basınç, enerji ve mühendislik birimlerini hızlı ve doğru şekilde dönüştürün.",
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
