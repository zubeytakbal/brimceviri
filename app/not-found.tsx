import Link from "next/link";

export default function NotFound() {
  return (
    <main className="unit-information-page" lang="tr">
      <article className="unit-page-shell">
        <header className="unit-page-header">
          <h1>Sayfa bulunamadı</h1>
          <p>
            Aradığınız sayfa taşınmış olabilir veya geçerli bir adres
            olmayabilir.
          </p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>Devam etmek için</h2>
            <p>
              <Link className="text-link" href="/">
                Ana sayfaya dön
              </Link>
            </p>
            <p>
              <Link className="text-link" href="/en">
                Go to the English homepage
              </Link>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
