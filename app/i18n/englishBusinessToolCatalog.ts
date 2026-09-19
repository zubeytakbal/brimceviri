export type EnglishBusinessToolId = "break-even" | "profit-margin" | "roas" | "ad-performance";

export type EnglishBusinessTool = {
  id: EnglishBusinessToolId;
  href: string;
  title: string;
  description: string;
  formula: string;
  inputs: string;
  workedExample: string;
  limitations: string;
};

export const englishBusinessTools: EnglishBusinessTool[] = [
  { id: "break-even", href: "/en/business-calculators/break-even", title: "Break-Even Calculator", description: "Calculate the sales units and revenue needed to cover fixed and variable costs.", formula: "break-even units = fixed costs / (unit price - variable cost per unit)", inputs: "Fixed costs, selling price per unit and variable cost per unit.", workedExample: "With $5,000 fixed costs, a $50 selling price and $20 variable cost, contribution is $30 per unit and break-even is 166.67 units ($8,333.33 of sales).", limitations: "This is a contribution-margin estimate. It assumes a constant price and variable cost, and excludes taxes, financing, capacity limits, inventory timing and changes in sales mix." },
  { id: "profit-margin", href: "/en/business-calculators/profit-margin", title: "Profit Margin & Markup Calculator", description: "Calculate gross profit, gross margin and markup from a selling price and direct cost.", formula: "gross margin = (price - cost) / price; markup = (price - cost) / cost", inputs: "Selling price and direct cost per item, order or service.", workedExample: "At a $100 selling price and $60 direct cost, gross profit is $40, gross margin is 40% and markup is 66.67%.", limitations: "Gross margin is not net profit. Operating expenses, taxes, returns, discounts, financing and overhead are not included unless they are included in your cost input." },
  { id: "roas", href: "/en/business-calculators/roas", title: "ROAS Calculator", description: "Calculate return on ad spend as a ratio and percentage from attributed revenue and ad spend.", formula: "ROAS = attributed revenue / ad spend", inputs: "Attributed campaign revenue and the corresponding ad spend.", workedExample: "$4,000 attributed revenue from $1,000 ad spend produces 4:1 ROAS, or 400%.", limitations: "ROAS measures revenue relative to advertising spend, not profitability. Attribution model, refunds, agency fees, product cost and customer lifetime value can change the business decision." },
  { id: "ad-performance", href: "/en/business-calculators/ad-performance", title: "Ad Performance Calculator", description: "Calculate CPM, CTR, CPC, conversion rate, CPA and ROAS from one campaign data set.", formula: "CTR = clicks / impressions; CPM = spend / impressions x 1,000; CPA = spend / conversions", inputs: "Ad spend, impressions, clicks, conversions and attributed revenue for the same campaign period.", workedExample: "$1,000 spend, 50,000 impressions, 750 clicks, 30 conversions and $4,000 attributed revenue gives $20 CPM, 1.5% CTR, $1.33 CPC, 4% conversion rate, $33.33 CPA and 4:1 ROAS.", limitations: "The result is only as complete as the attribution and cost data entered. It does not establish incrementality, profitability, customer lifetime value or a universally good benchmark." },
];

export function findEnglishBusinessTool(id: string) {
  return englishBusinessTools.find((tool) => tool.id === id);
}
