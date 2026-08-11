import { findUnitSearchContent } from "../converter/unitSearchTopics";

type UnitSearchTopicsProps = {
  slug: string;
};

export default function UnitSearchTopics({
  slug,
}: UnitSearchTopicsProps) {
  const searchContent = findUnitSearchContent(slug);

  if (!searchContent) {
    return null;
  }

  return (
    <div className="unit-search-topics">
      {searchContent.topics.map((topic) => (
        <section
          className="conversion-section unit-search-topic"
          id={topic.id}
          key={topic.id}
        >
          <h2>{topic.title}</h2>

          <p className="search-topic-answer">
            {topic.directAnswer}
          </p>

          {topic.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {topic.items && (
            <ul>
              {topic.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}