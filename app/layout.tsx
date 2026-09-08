import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Cairo, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import RecentToolsTracker from "./components/RecentToolsTracker";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { LOCALE_DEFINITIONS } from "./i18n/config";
import { SITE_NAME, SITE_URL } from "./siteConfig";

// Kök layout'ta location.pathname'i sunucu tarafında bilmenin bir yolu yok
// (headers()/x-pathname okumak Dynamic API sayılır ve TÜM siteyi dinamik
// render'a zorlar — build çıktısında ~2869 rotanın "ƒ Dynamic" çıkmasının
// tek sebebi buydu). Bunun yerine <html> sabit "tr" ile statik üretilir,
// gerçek dil paint öncesi çalışan bu küçük senkron script ile client
// tarafında düzeltilir. Harita LOCALE_DEFINITIONS'tan build-zamanında
// üretilir (tek doğruluk kaynağı, ayrı bir hardcoded kopya yok).
const LOCALE_HTML_ATTRS = Object.fromEntries(
  Object.values(LOCALE_DEFINITIONS).map((definition) => [
    definition.pathPrefix.replace(/^\//, ""),
    { lang: definition.htmlLang, dir: definition.dir },
  ])
);

const localeCorrectionScript = `(function(){try{var seg=(location.pathname.split("/")[1]||"");var map=${JSON.stringify(
  LOCALE_HTML_ATTRS
)};var d=map[seg]||map[""];if(d){document.documentElement.lang=d.lang;document.documentElement.dir=d.dir;}}catch(e){}})();`;

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const notoSansHeading = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

const logoFont = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  display: "swap",
  variable: "--font-logo",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `Online Birim Çevirici | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Uzunluk, kütle, sıcaklık, basınç, enerji ve mühendislik birimlerini hızlı ve doğru şekilde çevirin. Birimler hakkında bilimsel bilgiler, formüller ve dönüşüm tabloları.",

  applicationName: SITE_NAME,

  authors: [
    {
      name: "BirimCeviri.app",
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `Online Birim Çevirici | ${SITE_NAME}`,
    description:
      "Birim çevirme ve dönüşüm bilgileri, bilimsel birim açıklamaları, dönüşüm formülleri ve hesaplama tabloları.",
  },

  twitter: {
    card: "summary",
    title: `Online Birim Çevirici | ${SITE_NAME}`,
    description:
      "Birim çevirme ve dönüşüm bilgileri, bilimsel bilgiler, formüller ve dönüşüm tabloları.",
  },

  verification: {
    google: "meFoeOlEAS1hhtFLvCSrNiQHNRWU1GCJBd79kswXeeA",
  },

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BirimCeviri",
  },
};

export const viewport: Viewport = {
  themeColor: "#168f8c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" dir="ltr">
      <head>
        <script
          id="locale-correction"
          dangerouslySetInnerHTML={{ __html: localeCorrectionScript }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9PGNSBT970"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9PGNSBT970');
          `}
        </Script>
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js').catch(function () {});
              });
            }
          `}
        </Script>
      </head>
      <body
        className={`${plusJakartaSans.variable} ${notoSansHeading.variable} ${logoFont.variable} ${cairo.variable}`}
      >
        <SiteHeader />
        <RecentToolsTracker />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
