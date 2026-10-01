// Site ici link. Site tamamen statik (output: "export") ve derleme sonrasi
// Next.js'in sayfa gecis verisi (.txt) dosyalari siliniyor (Cloudflare
// Pages dosya siniri), bu yuzden next/link yerine duz <a> kullanilir:
// her tiklama hazir HTML sayfasini CDN'den yukler.
import type { AnchorHTMLAttributes } from "react";

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  /** next/link uyumlulugu icin kabul edilir, etkisi yoktur. */
  prefetch?: boolean | null;
};

export default function SiteLink({ href, ...props }: SiteLinkProps) {
  const anchorProps = { ...props };
  delete anchorProps.prefetch;
  return <a href={href} {...anchorProps} />;
}
