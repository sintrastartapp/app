import { env } from "../env-config";
import { Assistant } from "./types";

export const ProductDiscoveryAssistant: Assistant = {
  id: env.ASSISTANT_ID_PRODUCT_DISCOVERY,
  name: "Product Discovery",
  slug: "product-discovery",
  examples: {
    title: "Product Discovery",
    tabs: [
      {
        name: "Overview",
        embeddedId: "J-ln_An2cv0",
        description: `Product Discovery using the Opportunity Solution Tree (OST) is a structured approach to identifying and prioritizing opportunities for product development. It helps product teams visualize and connect desired outcomes with user needs, potential solutions, and experiments to validate those solutions. This method is particularly effective in ensuring that product decisions are aligned with both business goals and user needs.

Overview of Product Discovery using OST

**Desired Product Outcome:**

The process begins with defining a clear, specific, measurable, and time-bound product outcome. This outcome should align with the broader business goals and address user needs or pain points.

**Opportunities:**
Opportunities are derived from user insights, focusing on their needs, desires, and pain points. These are areas where the product can make a significant impact on achieving the desired outcome.

**Solutions:**
For each opportunity, brainstorm potential solutions. These solutions should be evaluated based on feasibility, user desirability, and business viability.

**Experiments:**
Design lean experiments to test the proposed solutions. These experiments help validate whether the solutions effectively address the opportunities and contribute to the desired outcome.

**Integration into OST:**
The entire process is visualized in an Opportunity Solution Tree, where the desired outcome is at the top, branching into opportunities, which further branch into solutions and experiments.`,
      },
      {
        name: "Netflix example",
        description: `Business Context: Streaming Service

**Desired Product Outcome:** Increase average viewing time per user by 20% by the end of Q2 2024\.

**Opportunities:**

Content Discovery Challenges

- Impact: Users struggle to find content they enjoy.
- Importance: High, as it directly affects engagement.


Lack of Personalized Recommendations

- Impact: Users receive generic suggestions.
- Importance: Medium, affects user satisfaction.

**Solutions:**

For Content Discovery Challenges:

- Enhanced Search Functionality
- Curated Playlists Based on Viewing History

For Lack of Personalized Recommendations:

- Improved Recommendation Algorithm
- User-Generated Content Ratings

**Experiments:**

For Enhanced Search Functionality:

- A/B Testing of new search features
- User feedback sessions on search experience

For Improved Recommendation Algorithm:

- Machine learning model testing with a subset of users
- Analyze changes in viewing patterns`,
      },
      {
        name: "Shopify example",
        description: `Business Context: E-commerce Platform

**Desired Product Outcome:** Increase the average order value by 15% by the end of Q3 2024\.

**Opportunities:**

Limited Upselling Features

- Impact: Merchants struggle to increase order value.
- Importance: High, directly impacts revenue.

Lack of Cross-Selling Tools

- Impact: Merchants miss opportunities to sell complementary products.
- Importance: Medium, affects overall sales.

**Solutions:**

For Limited Upselling Features:

- AI-Driven Upsell Suggestions
- Bundled Product Offers

For Lack of Cross-Selling Tools:

- Automated Cross-Sell Recommendations
- Customizable Cross-Sell Widgets

**Experiments:**

For AI-Driven Upsell Suggestions:

- Pilot program with select merchants
- Measure changes in average order value

For Automated Cross-Sell Recommendations:

- A/B Testing with different cross-sell strategies
- Merchant feedback on tool effectiveness`,
      },
      {
        name: "Spotify example",
        description: `Business Context: Music Streaming Service

**Desired Product Outcome:** Increase user retention by 10% by the end of Q1 2024\.

**Opportunities:**

User Engagement with Playlists

- Impact: Users often churn due to lack of engagement.
- Importance: High, as playlists drive user activity.

Social Sharing Features

- Impact: Users lack ways to share music experiences.
- Importance: Medium, enhances community feel.

**Solutions:**

For User Engagement with Playlists:

- Collaborative Playlist Features
- Personalized Playlist Recommendations

For Social Sharing Features:

- Integrated Social Media Sharing
- In-App Music Sharing with Friends

**Experiments:**

For Collaborative Playlist Features:

- User testing with collaborative playlist prototypes
- Analyze engagement metrics

For Integrated Social Media Sharing:

- A/B Testing of sharing options
- Track social media engagement and referral traffic`,
      },
    ],
  },
};
