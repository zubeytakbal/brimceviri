// Yeni yapidaki sayfalarin sade alt bilgisi (referanstaki gibi yalnizca kurumsal linkler).
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import { SITE_NAME } from "../../siteConfig";

export default function YeniAlt() {
  return (
    <footer className="yy yy-alt">
      <div className="yy-alt-ic">
        <span>
          © {new Date().getFullYear()} {SITE_NAME}
        </span>
        <Link href="/hakkimizda">Hakkımızda</Link>
        <Link href="/iletisim">İletişim</Link>
        <Link href="/editoryal-politika">Editoryal politika</Link>
        <Link href="/gizlilik">Gizlilik</Link>
        <Link href="/kullanim-kosullari">Kullanım koşulları</Link>
        <Link href="/tum-birimler">Tüm çeviriciler</Link>
        <Link href="/hesaplayicilar">Hesaplayıcılar</Link>
      </div>
    </footer>
  );
}
