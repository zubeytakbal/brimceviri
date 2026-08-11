"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SITE_CONTACT_EMAIL,
  SITE_NAME,
} from "../siteConfig";

type FooterLink = {
  href: string;
  label: string;
};

const footerLinks: Record<"tr" | "en", FooterLink[]> = {
  tr: [
    { href: "/", label: "Ana Sayfa" },
    { href: "/birimler", label: "Birim Rehberi" },
    { href: "/tum-birimler", label: "Tüm Dönüşümler" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/iletisim", label: "İletişim" },
    { href: "/gizlilik", label: "Gizlilik" },
    {
      href: "/kullanim-kosullari",
      label: "Kullanım Koşulları",
    },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/units", label: "Unit Guide" },
    {
      href: "/en/all-conversions",
      label: "All Conversions",
    },
    { href: "/en/about", label: "About" },
    { href: "/en/contact", label: "Contact" },
    { href: "/en/privacy", label: "Privacy" },
    { href: "/en/terms", label: "Terms" },
  ],
};

export default function SiteFooter() {
  const pathname = usePathname();
  const locale =
    pathname === "/en" || pathname.startsWith("/en/")
      ? "en"
      : "tr";
  const isEnglish = locale === "en";

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-copy">
          <strong>{SITE_NAME}</strong>
          <p>
            {isEnglish
              ? "Technical conversion tools, engineering calculators and unit guides prepared for practical reference."
              : "Teknik dönüşüm araçları, mühendislik hesaplayıcıları ve birim rehberleri pratik başvuru amacıyla hazırlanmıştır."}
          </p>
          <p>
            {isEnglish
              ? "For engineering, health or safety decisions, verify critical values with professional sources."
              : "Kritik mühendislik, sağlık veya güvenlik kararlarında sonuçları profesyonel kaynaklarla doğrulayın."}
          </p>
        </div>

        <nav
          className="site-footer-nav"
          aria-label={
            isEnglish ? "Footer navigation" : "Alt menü"
          }
        >
          {footerLinks[locale].map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer-meta">
          <a href={`mailto:${SITE_CONTACT_EMAIL}`}>
            {SITE_CONTACT_EMAIL}
          </a>
          <small>
            {isEnglish
              ? "Calculator inputs are processed in the browser for calculation flows on this site."
              : "Hesaplayıcı girişleri bu sitedeki hesaplama akışları için tarayıcı içinde işlenir."}
          </small>
        </div>
      </div>
    </footer>
  );
}
