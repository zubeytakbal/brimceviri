"use client";

import Link from "next/link";
import { arabicStandaloneTools } from "../i18n/arabicStandaloneTools";
import { DecorativeIcon, type SiteIconName } from "./siteIcons";

function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon
        className="home-category-icon-svg"
        name={name}
        size={44}
      />
    </span>
  );
}

export default function ArabicHomeDirectory() {
  return (
    <main className="directory-home" lang="ar" dir="rtl">
      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">أدوات وحاسبات بالعربية</p>
            <h1>القسم العربي جاهز للانطلاق</h1>
            <p className="directory-lead">
              بدأنا بنسخة عربية عملية ومهيأة للاتجاه من اليمين إلى اليسار، مع
              أدوات يومية مفيدة يمكن توسيعها تدريجيا صفحة بعد صفحة.
            </p>
          </div>

          <div className="directory-hero-panel">
            <div className="arabic-hero-actions">
              <Link className="directory-section-link" href="/ar/other-conversions">
                <DecorativeIcon
                  className="directory-link-icon"
                  name="allConversions"
                  size={18}
                />
                استعرض الأدوات العربية
              </Link>

              <Link className="directory-section-link" href="/">
                <DecorativeIcon
                  className="directory-link-icon"
                  name="unitGuide"
                  size={18}
                />
                الصفحة التركية الأصلية
              </Link>
            </div>

            <dl className="directory-stats">
              <div>
                <dt>اللغة</dt>
                <dd>AR</dd>
              </div>
              <div>
                <dt>أدوات جاهزة</dt>
                <dd>{arabicStandaloneTools.length}</dd>
              </div>
              <div>
                <dt>RTL</dt>
                <dd>100%</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="directory-shell directory-content">
        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>الأدوات المتاحة بالعربية الآن</h2>
              <p>
                هذه هي الدفعة الأولى من الصفحات المعربة بالكامل، مع عناوين
                ومحتوى وواجهة استخدام عربية.
              </p>
            </div>

            <Link className="directory-section-link" href="/ar/other-conversions">
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              كل الأدوات العربية
            </Link>
          </header>

          <div className="directory-home-category-grid">
            {arabicStandaloneTools.map((tool) => (
              <article className="directory-home-card" key={tool.slug}>
                <Link
                  className="directory-card-stretch"
                  href={tool.arabicPath}
                  aria-label={`${tool.title} - ${tool.cardDescription}`}
                />

                <div className="directory-card-body directory-card-body-icon">
                  <CardIcon name={tool.iconName} />
                  <h3 className="home-category-title">{tool.title}</h3>
                  <p className="directory-card-description">
                    {tool.cardDescription}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>كيف سنوسع القسم العربي؟</h2>
              <p>
                المرحلة الحالية تركز على الصفحات الأكثر عملية، ثم نكمل الصفحات
                المرجعية والمحتوى الأوسع بنفس البنية بدون كسر الموقع.
              </p>
            </div>
          </header>

          <div className="directory-tool-grid">
            <article className="directory-home-card directory-tool-card">
              <div className="directory-card-body directory-card-body-icon">
                <CardIcon name="search" />
                <h3 className="home-category-title">مسار آمن للتوسع</h3>
                <p className="directory-card-description">
                  نضيف الصفحات العربية تدريجيا مع الحفاظ على الروابط والـ SEO
                  والاتجاه RTL.
                </p>
              </div>
            </article>

            <article className="directory-home-card directory-tool-card">
              <div className="directory-card-body directory-card-body-icon">
                <CardIcon name="unitGuide" />
                <h3 className="home-category-title">روابط جاهزة للغات</h3>
                <p className="directory-card-description">
                  البنية الحالية أصبحت مناسبة لإضافة عدد كبير من اللغات لاحقا
                  بدون إعادة تنظيم كاملة.
                </p>
              </div>
            </article>

            <article className="directory-home-card directory-tool-card">
              <div className="directory-card-body directory-card-body-icon">
                <CardIcon name="allConversions" />
                <h3 className="home-category-title">بداية عملية</h3>
                <p className="directory-card-description">
                  بدأنا بالأدوات التي تعطي فائدة مباشرة للمستخدم العربي قبل فتح
                  الأقسام الأوسع.
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
