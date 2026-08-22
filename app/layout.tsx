import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import {
  Inter,
  Manrope,
  Roboto_Condensed,
} from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { SITE_NAME, SITE_URL } from "./siteConfig";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-heading",
});

const logoFont = Roboto_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
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
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} ${logoFont.variable}`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
