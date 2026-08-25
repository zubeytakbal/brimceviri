import "./globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { SITE_NAME, SITE_URL } from "./siteConfig";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `Online Birim Çevirici | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Uzunluk, kütle, sıcaklık, basınç, enerji ve mühendislik birimlerini hızlı ve doğru şekilde dönüştürün. Birimler hakkında bilimsel bilgiler, formüller ve dönüşüm tabloları.",

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
      "Birim dönüşümleri, bilimsel birim açıklamaları, dönüşüm formülleri ve hesaplama tabloları.",
  },

  twitter: {
    card: "summary",
    title: `Online Birim Çevirici | ${SITE_NAME}`,
    description:
      "Birim dönüşümleri, bilimsel bilgiler, formüller ve dönüşüm tabloları.",
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

function getLocaleFromPathname(pathname: string) {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return "de";
  }

  return "tr";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const isEmbed = pathname.startsWith("/embed/");

  return (
    <html lang={locale}>
      <head>
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
        className={`${plusJakartaSans.variable} ${notoSansHeading.variable} ${logoFont.variable}`}
      >
        {!isEmbed && <SiteHeader />}
        {children}
        {!isEmbed && <SiteFooter />}
      </body>
    </html>
  );
}
