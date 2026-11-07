import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";

export const metadata: Metadata = {
  title: "İnternet Bağlantısı Yok",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <header className="all-conversions-header">
          <h1>İnternet Bağlantısı Yok</h1>
          <p>
            Bu sayfayı görüntülemek için internet bağlantısı gerekiyor.
            Bağlantın geri geldiğinde{" "}
            <Link href="/">ana sayfaya dönebilirsin</Link>.
          </p>
          <p>
            Daha önce açtığın zaman araçları internet olmadan da çalışır:{" "}
            Online Saat, Alarm,{" "}
            Zamanlayıcı, Kronometre. / Time tools you opened before also work offline:{" "}
            Clock, Timer,{" "}
            Stopwatch.
          </p>
        </header>
      </div>
    </main>
  );
}
