// Mühendislik araç sayfalarının ortak düzeni: başlık, araç, bölümler, sonraki adım, kaynaklar, SSS.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ENGINEERING_FLOWS } from "../../converter/engineeringFlows";
import type { FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import EngineeringNextSteps from "./EngineeringNextSteps";

export type ArticleSection = { id: string; title: string; body: ReactNode };
export type ToolArticle = {
  path: string;
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  sections: ArticleSection[];
  faq: FaqItem[];
  sources: string;
};

export function toolArticleMetadata(a: ToolArticle): Metadata {
  return {
    title: a.metaTitle,
    description: a.description,
    alternates: { canonical: a.path },
    openGraph: { title: a.metaTitle, description: a.description, url: buildSiteUrl(a.path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default function ToolArticlePage({ article: a, tool }: { article: ToolArticle; tool: ReactNode }) {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/muhendislik-hesaplayicilari", label: "Mühendislik Hesaplayıcıları" },
        { href: a.path, label: a.h1 },
      ]}
      crumbLabel="Sayfa yolu"
      title={a.h1}
      intro={a.intro}
      tool={tool}
      tocTitle="Bu sayfada"
      tocItems={[...a.sections.map((s) => ({ id: s.id, label: s.title })), { id: "kaynaklar", label: "Kaynaklar" }, { id: "faq", label: "Sık sorulan sorular" }]}
      faqTitle="Sık sorulan sorular"
      faqItems={a.faq}
    >
      {a.sections.map((s) => (
        <section key={s.id}>
          <h2 id={s.id}>{s.title}</h2>
          {s.body}
        </section>
      ))}
      <EngineeringNextSteps links={ENGINEERING_FLOWS[a.path] ?? []} />
      <h2 id="kaynaklar">Kaynaklar ve doğrulama</h2>
      <p>{a.sources}</p>
    </TimeToolPage>
  );
}
