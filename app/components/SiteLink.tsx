"use client";

// next/link sarmalayicisi: ekrana giren her linki arka planda onceden
// yuklemek (varsayilan prefetch) yerine, yalnizca fare linkin uzerine
// geldiginde veya linke dokunuldugunda o sayfayi onceden yukler.
//
// Neden: kategori sayfalarinda ~190, ana sayfada ~80 link var. Varsayilan
// davranista tek bir sayfa goruntulemesi onlarca arka plan istegi
// uretiyor ve Vercel'in istek / ISR okuma / veri aktarimi kotalarini
// dolduruyordu. Tiklama yine hizli: hedef sayfa hover'da hazirlanir.
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent, TouchEvent } from "react";

type SiteLinkProps = ComponentProps<typeof NextLink>;

export default function SiteLink({ prefetch, onMouseEnter, onTouchStart, href, ...props }: SiteLinkProps) {
  const router = useRouter();

  // Bir bilesen acikca prefetch istediyse ona dokunma.
  if (prefetch !== undefined && prefetch !== false) {
    return <NextLink href={href} prefetch={prefetch} onMouseEnter={onMouseEnter} onTouchStart={onTouchStart} {...props} />;
  }

  const prefetchOnIntent = () => {
    if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
      router.prefetch(href);
    }
  };

  return (
    <NextLink
      href={href}
      prefetch={false}
      onMouseEnter={(event: MouseEvent<HTMLAnchorElement>) => {
        prefetchOnIntent();
        onMouseEnter?.(event);
      }}
      onTouchStart={(event: TouchEvent<HTMLAnchorElement>) => {
        prefetchOnIntent();
        onTouchStart?.(event);
      }}
      {...props}
    />
  );
}
