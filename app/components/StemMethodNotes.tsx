import type { EnglishScienceTool } from "../i18n/englishScienceToolCatalog";

export function StemMethods({ tools }: { tools: EnglishScienceTool[] }) {
  return <div className="category-article-content">{tools.map((tool) => <div key={tool.id}><h3>{tool.title}</h3><p><strong>Formula:</strong> {tool.formula}</p><ul className="related-conversion-list">{tool.variables.map((variable) => <li key={`${tool.id}-${variable.symbol}`}><strong>{variable.symbol}</strong> — {variable.label}{variable.unit ? ` (${variable.unit})` : ""}</li>)}</ul><p><strong>Assumption:</strong> {tool.assumptions}</p></div>)}</div>;
}

export function StemWorkedExamples({ tools }: { tools: EnglishScienceTool[] }) {
  return <div className="category-article-content">{tools.map((tool) => <div key={tool.id}><h3>{tool.title}</h3><p>{tool.workedExample}</p></div>)}</div>;
}

export function StemLimitations({ tools }: { tools: EnglishScienceTool[] }) {
  return <ul className="related-conversion-list">{tools.map((tool) => <li key={tool.id}><strong>{tool.title}:</strong> {tool.limitations}</li>)}</ul>;
}
