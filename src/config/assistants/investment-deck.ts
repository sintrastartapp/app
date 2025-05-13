import { env } from "../env-config";
import { Assistant } from "./types";

export const InvestmentDeckAssistant: Assistant = {
  id: env.ASSISTANT_ID_INVESTMENT_DECK,
  name: "Investment Deck",
  slug: "investment-deck",
  examples: {
    title: "Investment Deck",
    tabs: [
      {
        name: "Overview",
        description: `An investment deck, also known as a pitch deck, is a concise presentation used by entrepreneurs and startups to communicate the key aspects of their business to potential investors. Its primary purpose is to secure funding by providing a compelling overview of the company's vision, product or service, market opportunity, business model, team, and financial projections.

**Purpose of an Investment Deck:**
Attract Investment: Persuade potential investors to fund your business.
Communicate Value Proposition: Clearly articulate what makes your business unique and valuable.
Facilitate Discussion: Serve as a visual aid during meetings to guide conversations and answer questions.

**Typical Contents of an Investment Deck:**

Title Slide:
Company name and logo.
Tagline or mission statement.

Problem Statement:
Describe the specific problem or pain point your target market faces.
Use data or anecdotes to illustrate the significance of the problem.

Solution:
Introduce your product or service.
Explain how it effectively addresses the problem.

Market Opportunity:
Define your target market.
Provide market size, growth potential, and trends.
Highlight any niches or segments you plan to dominate.

Product or Service Details:
Showcase key features and benefits.
Include screenshots, demos, or prototypes if applicable.
Explain any proprietary technology or patents.

Business Model:
Outline how your company will generate revenue.
Discuss pricing strategies, sales channels, and customer acquisition plans.

Traction and Milestones:
Present any achievements to date (e.g., user growth, revenue, partnerships).
Use charts or graphs to visualize progress.

Competitive Analysis:
Identify main competitors.
Highlight your competitive advantages and differentiators.

Marketing and Sales Strategy:
Explain how you plan to attract and retain customers.
Discuss marketing channels, campaigns, and sales tactics.

Team:
Introduce key team members and their roles.
Highlight relevant experience and accomplishments.
Include advisors or board members if noteworthy.

Financial Projections:
Provide forecasts for revenue, expenses, and profitability over the next 3-5 years.
Include key assumptions behind your projections.

Funding Requirements:
Specify how much capital you're seeking.
Detail how the funds will be used (e.g., product development, marketing, hiring).

Exit Strategy:
Discuss potential exit opportunities for investors (e.g., acquisition, IPO).
Highlight industry trends that support your exit strategy.

Appendix (Optional):
Include additional information such as detailed financials, technical specs, or market research.

**Best Practices for Creating an Investment Deck:**

Keep It Concise:
Aim for 10-15 slides.
Focus on the most compelling information.

Tell a Story:
Create a narrative that connects with the audience emotionally.
Use a logical flow from the problem to the solution and beyond.

Visual Appeal:
Use high-quality graphics and consistent branding.
Avoid cluttered slides; use bullet points and whitespace effectively.

Be Data-Driven:
Support claims with credible data and sources.
Include metrics that demonstrate traction and potential.

Highlight the Team:
Emphasize the expertise and experience that make your team capable of executing the plan.

Customize for the Audience:
Tailor the content to the interests of specific investors or investment firms.
Research investors beforehand to align your pitch with their focus areas.

Practice Delivery:
Rehearse your presentation to ensure confidence and clarity.
Anticipate questions and prepare answers.

**Importance of an Investment Deck:**
An investment deck is crucial because it often serves as the first impression investors have of your company. A well-crafted deck can:

Open Doors:
Increase the likelihood of securing meetings and discussions.

Demonstrate Professionalism:
Show that you're serious, organized, and understand your business deeply.

Facilitate Understanding:
Help investors quickly grasp your business model and potential.

Drive Investment Decisions:
Provide the information investors need to decide whether to proceed with due diligence.

**Common Mistakes to Avoid:**

Overloading with Information:
Too much text or data can overwhelm and disengage your audience.

Lack of Clarity:
Vague descriptions or buzzwords without substance can undermine credibility.

Ignoring Competition:
Failing to acknowledge competitors suggests a lack of market awareness.

Unrealistic Projections:
Overly optimistic financials without justification can raise red flags.

Poor Design:
Unprofessional visuals can distract from your message.

**Tips for a Successful Investment Deck:**

Start Strong:
Capture attention early with a compelling problem statement or shocking statistic.

Be Honest and Transparent:
Acknowledge risks and challenges while emphasizing how you plan to address them.

Focus on Benefits:
Highlight how your product or service adds value to customers.

Use Testimonials or Endorsements:
Include quotes from customers, partners, or industry experts if available.

End with a Clear Ask:
Clearly state the investment amount you're seeking and what it will achieve.

**Example Slide Outline:**

- Cover Slide
- Problem
- Solution
- Market Opportunity
- Product Overview
- Business Model
- Traction
- Competitive Landscape
- Marketing & Sales Strategy
- Team
- Financial Projections
- Funding Needs
- Milestones & Use of Funds
- Closing Slide with Contact Information

Conclusion:
An investment deck is a vital tool for entrepreneurs seeking funding. It encapsulates your business's essence, potential, and roadmap in a format that is accessible and compelling to investors. Crafting an effective deck requires careful thought, thorough research, and a deep understanding of both your business and the needs of your potential investors.`,
      },
      {
        name: "Example",
        description: `[https://docs.google.com/presentation/d/1FnrRr3P3ngVLOt2vcknxf9ApmBxpjSbCZ2vBIoLymCk/edit#slide=id.gb60092d39a_0_62](https://docs.google.com/presentation/d/1FnrRr3P3ngVLOt2vcknxf9ApmBxpjSbCZ2vBIoLymCk/edit#slide=id.gb60092d39a_0_62)

This investment deck is a template that you can use to build your investment deck, to do so, simply copy it to your drive, or download it.`,
      },
    ],
  },
};
