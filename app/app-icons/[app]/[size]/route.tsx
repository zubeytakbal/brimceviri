import { ImageResponse } from "next/og";
import { appIconSvg, findInstallableApp, installableApps } from "../../../converter/time/installableApps";

// Uygulama simgeleri derlemede statik uretilir (her istekte calismaz).
export const dynamic = "force-static";

const SIZES = ["192", "512"];

export function generateStaticParams() {
  return installableApps.flatMap((app) => SIZES.map((size) => ({ app: app.id, size })));
}

export async function GET(_request: Request, { params }: { params: Promise<{ app: string; size: string }> }) {
  const { app: id, size } = await params;
  const app = findInstallableApp(id);
  if (!app || !SIZES.includes(size)) return new Response("Not found", { status: 404 });
  const px = Number(size);
  const src = `data:image/svg+xml;base64,${Buffer.from(appIconSvg(app)).toString("base64")}`;
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} width={px} height={px} alt="" />
    ),
    { width: px, height: px }
  );
}
