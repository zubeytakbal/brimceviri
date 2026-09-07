export type SocialMediaSizeRow = {
  id: string;
  platform: string;
  contentType: string;
  widthPx: number;
  heightPx: number;
};

// Platformlarin kendi yardim sayfalarindan degil, birden fazla guncel
// Turkce referans makalesinden capraz dogrulanmis standart boyutlar
// (Eylul 2026). Platformlar bu degerleri zaman zaman degistirir --
// kritik bir tasarim icin platformun kendi guncel yardim sayfasi esas
// alinmalidir. Twitter/X kapak fotografinda iki kaynak celisti (biri
// "1500x1500" gibi banner icin anlamsiz bir deger verdi); mantikli
// banner oranini (1500x500) veren kaynak tercih edildi.
export const socialMediaSizes: SocialMediaSizeRow[] = [
  { id: "ig-square", platform: "Instagram", contentType: "Kare Gönderi", widthPx: 1080, heightPx: 1080 },
  { id: "ig-portrait", platform: "Instagram", contentType: "Dikey Gönderi", widthPx: 1080, heightPx: 1350 },
  { id: "ig-landscape", platform: "Instagram", contentType: "Yatay Gönderi", widthPx: 1080, heightPx: 566 },
  { id: "ig-story", platform: "Instagram", contentType: "Story / Reels", widthPx: 1080, heightPx: 1920 },
  { id: "ig-profile", platform: "Instagram", contentType: "Profil Fotoğrafı", widthPx: 320, heightPx: 320 },
  { id: "yt-thumbnail", platform: "YouTube", contentType: "Video Thumbnail", widthPx: 1280, heightPx: 720 },
  { id: "yt-cover", platform: "YouTube", contentType: "Kanal Kapak Fotoğrafı", widthPx: 2560, heightPx: 1440 },
  { id: "yt-profile", platform: "YouTube", contentType: "Profil Fotoğrafı", widthPx: 800, heightPx: 800 },
  { id: "fb-cover", platform: "Facebook", contentType: "Kapak Fotoğrafı", widthPx: 851, heightPx: 315 },
  { id: "fb-post-square", platform: "Facebook", contentType: "Gönderi (Kare)", widthPx: 1200, heightPx: 1200 },
  { id: "fb-post-landscape", platform: "Facebook", contentType: "Gönderi (Yatay)", widthPx: 1200, heightPx: 630 },
  { id: "fb-profile", platform: "Facebook", contentType: "Profil Fotoğrafı", widthPx: 170, heightPx: 170 },
  { id: "x-cover", platform: "Twitter / X", contentType: "Kapak Fotoğrafı (Banner)", widthPx: 1500, heightPx: 500 },
  { id: "x-post", platform: "Twitter / X", contentType: "Gönderi Görseli", widthPx: 1600, heightPx: 900 },
  { id: "x-profile", platform: "Twitter / X", contentType: "Profil Fotoğrafı", widthPx: 400, heightPx: 400 },
  { id: "li-cover", platform: "LinkedIn", contentType: "Kapak Fotoğrafı", widthPx: 1128, heightPx: 191 },
  { id: "li-post", platform: "LinkedIn", contentType: "Gönderi", widthPx: 1200, heightPx: 628 },
  { id: "li-profile", platform: "LinkedIn", contentType: "Profil Fotoğrafı", widthPx: 400, heightPx: 400 },
  { id: "tiktok-video", platform: "TikTok", contentType: "Video (Dikey)", widthPx: 1080, heightPx: 1920 },
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function getAspectRatioLabel(widthPx: number, heightPx: number): string {
  const divisor = gcd(Math.round(widthPx), Math.round(heightPx));
  if (divisor === 0) return "-";
  return `${widthPx / divisor}:${heightPx / divisor}`;
}

export type CropSuggestion = {
  targetWidthPx: number;
  targetHeightPx: number;
  matchesExactly: boolean;
  cropDirection: "width" | "height" | "none";
  croppedFromPx: number;
};

// Kullanicinin kendi gorselinin (ownWidth x ownHeight) hedef platform
// oranina gore ortalanarak kirpilmasi durumunda, hangi kenardan kac
// piksel kirpilmasi gerektigini hesaplar (gorseli buyutmeden/kucultmeden,
// sadece oran uyumu acisindan).
export function calculateCropToFit(
  ownWidthPx: number,
  ownHeightPx: number,
  targetWidthPx: number,
  targetHeightPx: number
): CropSuggestion | null {
  if (
    !Number.isFinite(ownWidthPx) ||
    ownWidthPx <= 0 ||
    !Number.isFinite(ownHeightPx) ||
    ownHeightPx <= 0 ||
    !Number.isFinite(targetWidthPx) ||
    targetWidthPx <= 0 ||
    !Number.isFinite(targetHeightPx) ||
    targetHeightPx <= 0
  ) {
    return null;
  }

  const ownRatio = ownWidthPx / ownHeightPx;
  const targetRatio = targetWidthPx / targetHeightPx;

  if (Math.abs(ownRatio - targetRatio) < 0.001) {
    return {
      targetWidthPx,
      targetHeightPx,
      matchesExactly: true,
      cropDirection: "none",
      croppedFromPx: 0,
    };
  }

  if (ownRatio > targetRatio) {
    // Gorsel hedeften daha "genis" -- yanlardan kirpilmasi gerekir.
    const idealWidthAtOwnHeight = ownHeightPx * targetRatio;
    return {
      targetWidthPx,
      targetHeightPx,
      matchesExactly: false,
      cropDirection: "width",
      croppedFromPx: ownWidthPx - idealWidthAtOwnHeight,
    };
  }

  // Gorsel hedeften daha "uzun" -- ust/alttan kirpilmasi gerekir.
  const idealHeightAtOwnWidth = ownWidthPx / targetRatio;
  return {
    targetWidthPx,
    targetHeightPx,
    matchesExactly: false,
    cropDirection: "height",
    croppedFromPx: ownHeightPx - idealHeightAtOwnWidth,
  };
}
