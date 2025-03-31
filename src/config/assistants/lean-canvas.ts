import { env } from "../env-config";
import { Assistant } from "./types";

export const LeanCanvasAssistant: Assistant = {
  id: env.ASSISTANT_ID_LEAN_CANVAS,
  name: "Lean Canvas",
  slug: "lean-canvas",
  examples: {
    title: "Lean Canvas",
    tabs: [
      {
        name: "Overview",
        title: "Overview",
        embeddedId: "QoAOzMTLP5s",
        description: `The Lean Canvas is a strategic tool used by entrepreneurs and startups to outline their business model in a concise and visual format. It is a one-page document that helps teams quickly identify and validate their business assumptions, allowing for rapid iteration and improvement. The Lean Canvas is particularly useful for startups because it emphasizes problem-solving and customer-centric approaches.

**Lean Canvas Sections**

**Customer Segments**: Identify the specific groups of people or organizations that will benefit from your product or service. Understand their needs and characteristics.

**Problem**: Highlight the key problems or pain points that your target customers face. This section should focus on the most pressing issues that your solution aims to address.

**Existing Alternatives:** Describe the current solutions that customers use to address their problems. This includes direct competitors, indirect competitors, and any DIY solutions.

**Solution**: Outline your product or service that addresses the identified problems. Highlight key features and how they solve the customers' issues.

**Unique Value Proposition (UVP)**: Provide a clear and compelling message that explains why your solution is unique and worth buying. This should resonate with your target audience.

**Channels**: Specify the methods you will use to reach your customers and deliver your value proposition. This includes marketing, sales, and distribution channels.

**Revenue Streams:** Identify the different ways your business will generate income. This could include pricing models, subscription fees, or other revenue sources.

**Cost Structure:** Enumerate the costs associated with running your business, including fixed and variable costs. This helps in understanding the financial viability of the business.

**Key Metrics:** Define the essential indicators that will measure the performance and progress of your business. This includes metrics related to customer acquisition, engagement, and retention.

**Unfair Advantage:** Highlight any unique aspects of your business that cannot be easily replicated by competitors. This could include intellectual property, exclusive partnerships, or unique insights.

The Lean Canvas serves as a living document that can be updated as the business evolves and new insights are gained. It encourages entrepreneurs to think critically about their business model and make informed decisions based on validated learning.`,
      },
      {
        name: "Example ",
        description: `**Startup Idea:** A meal kit delivery service focused on healthy, organic ingredients.

**Customer Segments:** Health-conscious individuals and families, busy professionals, and fitness enthusiasts.

**Problem:**

- Difficulty in finding healthy meal options.
- Lack of time to shop and prepare meals.
- Confusion about meal planning and nutrition.

**Existing Alternatives:**

- Traditional grocery shopping.
- Other meal kit services (e.g., Blue Apron, HelloFresh).
- Fast food and takeout options.

**Solution:**

- A subscription-based meal kit service that delivers pre-portioned organic ingredients and easy-to-follow recipes.
- Customizable meal plans based on dietary preferences (e.g., vegan, gluten-free).
- Unique Value Proposition: "Healthy meals made easy—enjoy delicious, organic recipes delivered to your door, tailored to your dietary needs."

**Channels:**

- Social media advertising (Instagram, Facebook).
- Influencer partnerships in the health and wellness space.
- Content marketing through a blog focused on healthy eating.

**Revenue Streams:**

- Subscription fees for meal kits.
- One-time purchases for special meal kits or add-ons.
- Affiliate partnerships with health-related brands.

**Cost Structure:**

- Ingredient sourcing and packaging costs.
- Delivery and logistics expenses.
- Marketing and customer acquisition costs.

**Key Metrics:**

- Customer acquisition cost (CAC).
- Monthly recurring revenue (MRR).
- Customer retention rate.

**Unfair Advantage:**
Exclusive partnerships with local organic farms for fresh ingredients.
A proprietary algorithm that customizes meal plans based on user preferences and dietary restrictions.`,
      },
    ],
  },
};
