"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader() {
  const pathname = usePathname();

  const isEnglish =
    pathname === "/en" || pathname.startsWith("/en/");

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          href={isEnglish ? "/en" : "/"}
          className="site-logo"
        >
          birimceviri<span>.app</span>
        </Link>

        {isEnglish ? (
          <nav
            className="site-navigation"
            aria-label="Main navigation"
          >
            <Link href="/en">Home</Link>

            <Link href="/en/categories/length">
              Length
            </Link>

            <Link href="/en/categories/mass">
              Mass
            </Link>

            <Link href="/en/categories/pressure">
              Pressure
            </Link>

            <Link href="/en/units">Unit Guide</Link>

            <Link href="/en/all-conversions">
              All Converters
            </Link>

            <LanguageSwitcher />
          </nav>
        ) : (
          <nav
            className="site-navigation"
            aria-label="Ana menü"
          >
            <Link href="/">Ana Sayfa</Link>

            <Link href="/kategoriler/uzunluk">
              Uzunluk
            </Link>

            <Link href="/kategoriler/kutle">
              Kütle
            </Link>

            <Link href="/kategoriler/basinc">
              Basınç
            </Link>

            <Link href="/birimler">Birim Rehberi</Link>

            <Link href="/tum-birimler">
              Tüm Dönüşümler
            </Link>

            <LanguageSwitcher />
          </nav>
        )}
      </div>
    </header>
  );
}
