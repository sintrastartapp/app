import { env } from "../env-config";
import { Assistant } from "./types";

export const FinancialModelAssistant: Assistant = {
  id: env.ASSISTANT_ID_FINANCIAL_MODEL,
  name: "Financial Model",
  slug: "financial-model",
  examples: {
    title: "Financial Model",
    tabs: [
      {
        name: "Overview",
        description: `A financial model is a quantitative tool that represents a company's historical, current, or projected financial performance. It's typically built using spreadsheet software like Microsoft Excel and is designed to forecast future financial results based on a set of assumptions and variables. Financial models are essential for decision-making processes in finance, investment, and business strategy.

**Purpose of a Financial Model:**

Forecasting: Project future revenues, expenses, and cash flows to anticipate financial performance.

Valuation: Estimate the value of a business, project, or investment using methods like discounted cash flow (DCF) analysis.

Decision-Making: Assess the financial implications of strategic decisions such as mergers and acquisitions, capital investments, or entering new markets.

Risk Analysis: Evaluate potential risks and uncertainties by running sensitivity analyses and scenario planning.

Budgeting and Planning: Aid in creating budgets, setting financial targets, and aligning operational activities with financial goals.

**Components of a Financial Model:**

Income Statement (Profit & Loss Statement):
Projects revenues, cost of goods sold (COGS), gross profit, operating expenses, and net income.

Balance Sheet:
Forecasts assets, liabilities, and shareholders' equity over time.

Cash Flow Statement:
Details cash inflows and outflows from operating, investing, and financing activities.

Assumptions and Drivers:
Key variables such as growth rates, margins, interest rates, tax rates, and working capital requirements.

Supporting Schedules:
Detailed calculations for items like depreciation, amortization, capital expenditures, debt schedules, and inventory turnover.

Valuation Analysis:

Methods like DCF, comparable company analysis, and precedent transactions to estimate enterprise and equity value.

Sensitivity and Scenario Analysis:
Examines how changes in key assumptions affect outcomes, testing best-case, worst-case, and base-case scenarios.

**Types of Financial Models:**

Three-Statement Model:
Integrates the income statement, balance sheet, and cash flow statement into one cohesive model.

Discounted Cash Flow (DCF) Model:
Values a company or asset based on its projected future cash flows discounted back to present value.

Merger & Acquisition (M\&A) Model:
Assesses the financial impact of a merger or acquisition, including synergies and purchase price allocation.

Leveraged Buyout (LBO) Model:
Evaluates the feasibility and returns of acquiring a company using a significant amount of borrowed funds.

Budget Model:
Used internally to plan and monitor a company's financial performance against budgets.

Consolidation Model:
Combines the financials of multiple business units or subsidiaries into a single model.

Option Pricing Model:
Uses mathematical models like Black-Scholes to value options and other derivatives.

**Importance of Financial Models:**

Informed Decision-Making:
Provides a quantitative basis for strategic decisions, investments, and resource allocation.

Risk Management:
Identifies potential financial risks and helps in developing mitigation strategies.

Investor Communication:
Facilitates transparent discussions with investors, lenders, and stakeholders about financial expectations.

Performance Tracking:
Enables comparison of actual results against projections to measure performance and adjust strategies accordingly.

**Best Practices in Financial Modeling:**

Accuracy and Consistency:
Double-check formulas and ensure consistent use of units and formats.

Transparency:
Clearly document assumptions, sources, and methodologies.

Flexibility:
Design models that are easy to update and adjust as new information becomes available.

Clarity:
Use logical organization, labeling, and formatting to make the model easy to understand.

Validation:
Test the model with different scenarios to ensure it behaves as expected.

**Skills Required for Financial Modeling:**

Accounting Knowledge:
Understanding of financial statements and accounting principles (GAAP or IFRS).

Excel Proficiency:
Advanced skills in Excel functions, formulas, and possibly VBA macros.

Financial Analysis:
Ability to interpret financial data and understand key financial ratios and metrics.

Attention to Detail:
Precision in building models to prevent errors that could lead to incorrect conclusions.

Analytical Thinking:
Capability to analyze complex information and draw meaningful insights.

**Applications of Financial Models:**

Corporate Finance:
Capital budgeting, fundraising, dividend policy decisions, and financial planning.

Investment Analysis:
Evaluating stocks, bonds, real estate, and other investment opportunities.

Project Finance:
Assessing the viability and funding requirements of large-scale projects.

Strategic Planning:
Exploring the financial impact of strategic initiatives like entering new markets or launching new products.

Risk Management:
Stress testing financial stability under adverse economic conditions.

Conclusion:
A financial model is an indispensable tool that enables businesses, investors, and financial professionals to simulate the financial performance of a company or project. By incorporating various assumptions and variables, it helps stakeholders anticipate future outcomes, make informed decisions, and strategically plan for growth and sustainability.`,
      },
      {
        name: "Example",
        description: `[https://docs.google.com/spreadsheets/d/1ebR9z-v540eKRYBIYIqeO1UNpM2JqX8a](https://docs.google.com/spreadsheets/d/1ebR9z-v540eKRYBIYIqeO1UNpM2JqX8a/edit?usp=sharing&ouid=104879167635026697469&rtpof=true&sd=true)

This financial model example is a template that you can use to build your financial model, to do so, simply copy it to your drive, or download it.
`,
      },
    ],
  },
};
