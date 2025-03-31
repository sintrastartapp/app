import { env } from "../env-config";
import { Assistant } from "./types";

export const ProductOkrsAssistant: Assistant = {
  id: env.ASSISTANT_ID_PRODUCT_OKRS,
  name: "Product OKRs",
  slug: "product-okrs",
  examples: {
    title: "Product OKRs",
    tabs: [
      {
        name: "Overview",
        description: `Product OKRs (Objectives and Key Results) are a strategic framework used by product teams to set and achieve goals. They help align the product development process with the overall business objectives, ensuring that the product team is focused on delivering value that contributes to the company's success. Here's a breakdown of what Product OKRs entail:

**Objective**: This is a clear, inspiring goal that the product team aims to achieve. It should be ambitious yet realistic, providing direction and motivation. For example, an objective might be "Enhance user satisfaction with our mobile app."

**Key Results:** These are specific, measurable outcomes that indicate progress toward the objective. Each objective typically has 2-3 key results. For example, key results for the above objective might include "Increase app store rating from 4.0 to 4.5" or "Reduce customer support tickets related to app usability by 30%."

**Initiatives:** These are the specific projects or tasks that the team will undertake to achieve the key results. They are actionable and within the team's control. For example, initiatives might include "Conduct user testing sessions" or "Implement a new onboarding tutorial."

Product OKRs help ensure that the product team is working on the right things, measuring success effectively, and aligning their efforts with the broader company strategy. They provide a clear framework for prioritizing work and tracking progress.`,
      },
      {
        name: "Netflix example",
        description: `**Objective 1:** Enhance User Engagement on the Platform

Key Result 1: Increase average viewing time per user by 15% by the end of Q2.
Key Result 2: Achieve a 20% increase in the number of users who watch at least one new release per month.
Key Result 3: Reduce the churn rate by 10% through improved content recommendations.

**Initiatives:**

Develop and launch a new recommendation algorithm.
Introduce interactive content features to increase engagement.
Conduct A/B testing on new user interface designs.`,
      },
      {
        name: "Shopify example",
        description: `**Objective 1:** Improve Merchant Conversion Rates

Key Result 1: Increase the average conversion rate of merchant stores by 25% by the end of Q3.
Key Result 2: Reduce cart abandonment rates by 15% through enhanced checkout processes.
Key Result 3: Launch 5 new marketing tools for merchants to boost sales.

**Initiatives:**

Develop a streamlined checkout process with fewer steps.
Implement AI-driven marketing insights for merchants.
Host webinars to educate merchants on best practices for conversion optimization.`,
      },
      {
        name: "Spotify example",
        description: `**Objective 1:** Expand User Base in Emerging Markets

Key Result 1: Increase the number of active users in emerging markets by 30% by the end of Q4.
Key Result 2: Launch localized content in 5 new languages.
Key Result 3: Establish partnerships with 10 local artists or labels in each target market.

**Initiatives:**

Develop and execute a marketing campaign tailored to emerging markets.
Collaborate with local artists to create exclusive content.
Optimize the app for low-bandwidth environments to improve accessibility.`,
      },
    ],
  },
};
