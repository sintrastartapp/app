import { env } from "../env-config";
import { Assistant } from "./types";

export const CriticalHypothesisAssistant: Assistant = {
  id: env.ASSISTANT_ID_CRITICAL_HYPOTHESIS,
  name: "Critical Hypothesis",
  slug: "critical-hypothesis",
  examples: {
    title: "Critical Hypothesis",
    tabs: [
      {
        name: "Overview",
        description: `A critical hypothesis is a fundamental assumption that must hold true for a business model to succeed. These hypotheses are pivotal because they address the core elements of your business, such as customer needs, value propositions, feasibility, and viability. Testing these hypotheses helps entrepreneurs validate their business ideas, reduce risks, and make informed decisions.

**Market Hypotheses:**

- Customer Segments: Assumptions about who your target customers are.
- Customer Needs: Assumptions about the specific problems or needs your customers have.

**Value Proposition Hypotheses:**

- Unique Offering: Assumptions about what makes your product or service unique.
- Benefits: Assumptions about how your offering addresses customer needs.

**Feasibility Hypotheses:**

- Technical Viability: Assumptions about whether your solution can be built with current technology.
- Operational Capability: Assumptions about your ability to deliver the solution.

**Viability Hypotheses:**

- Revenue Streams: Assumptions about how your business will generate revenue.
- Cost Structure: Assumptions about the key costs involved in running your business.

**Growth Hypotheses:**

- Channels: Assumptions about how you will reach and acquire customers.
- Retention: Assumptions about how you will keep customers engaged.`,
      },
      {
        name: "Netflix example",
        description: `**Market Hypothesis:**

- Assumption: Consumers are interested in renting movies online and having them delivered to their homes.
- Test: Netflix initially offered a DVD rental service by mail, allowing them to test consumer interest in an online rental model.

**Value Proposition Hypothesis:**

- Assumption: A subscription model with no late fees is more appealing than traditional video rental stores.
- Test: Netflix introduced a subscription service, allowing unlimited rentals for a flat monthly fee, and monitored customer adoption and retention.

**Feasibility Hypothesis:**

- Assumption: The logistics of mailing DVDs can be managed efficiently and cost-effectively.
- Test: Netflix invested in a distribution network to ensure timely delivery and return of DVDs, testing operational capabilities.`,
      },
      {
        name: "Shopify example",
        description: `**Market Hypothesis:**

- Assumption: Small businesses and entrepreneurs need an easy way to set up and manage online stores.
- Test: Shopify initially targeted small businesses, offering a simple platform to create online stores and gauging interest through early adopters.

**Value Proposition Hypothesis:**

- Assumption: A user-friendly, customizable e-commerce platform will attract small business owners.
- Test: Shopify focused on building an intuitive interface and customizable templates, gathering feedback from users to refine the product.

**Viability Hypothesis:**

- Assumption: A subscription-based revenue model will be sustainable and profitable.
- Test: Shopify implemented a tiered subscription model, analyzing customer acquisition and retention rates to validate the business model.`,
      },
      {
        name: "Spotify example",
        description: `**Market Hypothesis:**

- Assumption: Consumers want access to a vast library of music on-demand, rather than owning individual tracks.
- Test: Spotify launched with a freemium model, offering free access to a large music library with ads, to test user interest and engagement.


**Value Proposition Hypothesis:**

- Assumption: A streaming service with personalized playlists and recommendations will enhance user experience.
- Test: Spotify developed algorithms for personalized playlists and recommendations, tracking user engagement and satisfaction.

**Growth Hypothesis:**

- Assumption: A freemium model will drive user acquisition, with a percentage converting to paid subscriptions.
- Test: Spotify monitored conversion rates from free to premium users, adjusting marketing strategies to optimize growth.`,
      },
    ],
  },
};
