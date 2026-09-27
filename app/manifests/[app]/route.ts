import { findInstallableApp, installableApps } from "../../converter/time/installableApps";

// Her zaman araci icin ayri web uygulamasi manifesti (statik).
export const dynamic = "force-static";

export function generateStaticParams() {
  return installableApps.map((app) => ({ app: app.id }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ app: string }> }) {
  const app = findInstallableApp((await params).app);
  if (!app) return new Response("Not found", { status: 404 });
  const manifest = {
    id: app.path,
    name: app.name,
    short_name: app.shortName,
    description: app.description,
    lang: app.lang,
    start_url: app.path,
    scope: app.path,
    display: "standalone",
    display_override: app.fullscreen ? ["fullscreen", "standalone"] : ["standalone"],
    background_color: app.background,
    theme_color: app.background,
    icons: [
      { src: `/app-icons/${app.id}/192`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `/app-icons/${app.id}/512`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `/app-icons/${app.id}/512`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
  return new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
