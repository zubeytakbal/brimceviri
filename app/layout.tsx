import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Google font yükleme (istersen kaldırabiliriz)
const inter = Inter({
  subsets: ["latin"],
});

// Sitenin genel bilgisi
export const metadata: Metadata = {
  title: "Online Birim Çevirici",
  description: "Mühendisler için hızlı, modern ve kapsamlı bir birim dönüştürücü.",
};

// Root layout → tüm sayfalar bu sarmalayıcıyı kullanır
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}