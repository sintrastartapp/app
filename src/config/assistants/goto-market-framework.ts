import { env } from "../env-config";
import { Assistant } from "./types";

export const GotoMarketFrameworkAssistant: Assistant = {
  id: env.ASSISTANT_ID_GO_TO_MARKET,
  name: "Go-to-Market Framework",
  slug: "goto-market-framework",
  examples: {
    title: "Go-to-Market Framework",
    tabs: [
      {
        name: "Overview",
        description: `A go-to-market (GTM) framework is a strategic plan that outlines how a company will launch a product or service into the market. It serves as a roadmap to ensure that the product reaches the right audience effectively and achieves the desired business objectives. Here are the key components of a GTM framework:

**Product/Service Overview:** A detailed description of the product or service, highlighting its unique features and core value proposition.

**Target Market Segment:** Identification of the specific audience segments that the product is intended for, including demographics, psychographics, and behavioral traits.

**Customer Insights:** Insights gathered from market research, user feedback, and surveys that provide an understanding of customer preferences and buying behavior.

**Competitive Landscape:** Analysis of the market competition, including direct and indirect competitors, their strengths, weaknesses, and market positioning.

**Sales Channels:** Identification of the most effective sales and distribution channels to reach the target market.

**Marketing Assets:** Existing marketing materials and resources that can be leveraged in the GTM strategy.

**Objectives:** Clear, measurable goals for the GTM strategy, such as sales targets, market share, and customer acquisition costs.

**Market Segmentation:** Prioritization of market segments based on size, growth potential, and alignment with the product/service.

**Positioning:** Development of a positioning statement that differentiates the product/service in the market and resonates with the target audience.

**Sales and Distribution Strategy:** Selection of the most effective channels to reach the target audience, considering cost, reach, and buyer preferences.

**Marketing and Promotional Activities:** Planning of key marketing campaigns and promotional activities to generate awareness and drive sales.

**Success Metrics:** Definition of key performance indicators (KPIs) and benchmarks to measure the success of the GTM strategy.

**Launch Timeline:** A detailed timeline for all GTM activities, ensuring coordination across teams and alignment with product readiness.

This framework helps ensure that all aspects of the product launch are strategically aligned and executed to maximize market impact and achieve business goals.`,
      },
      {
        name: "Netflix example",
        description: `Netflix: Interactive Storytelling Feature

**Product/Service Overview:** A new interactive storytelling feature that allows viewers to make choices that affect the storyline of a show or movie.

**Target Market Segment:** Tech-savvy millennials and Gen Z viewers who enjoy immersive and interactive entertainment experiences.

**Customer Insights:** This segment values innovative content and enjoys being part of the storytelling process. They are frequent users of streaming services and are open to trying new features.

**Competitive Landscape:** Competitors include other streaming platforms like Amazon Prime Video and Hulu, which may offer similar interactive content. Netflix's strength lies in its large subscriber base and original content library.

**Sales Channels:** Direct-to-consumer through the Netflix platform, leveraging existing subscriber base.

**Marketing Assets:** Trailers showcasing the interactive feature, behind-the-scenes content, and testimonials from early testers.

**Objectives:**

Achieve a 20% adoption rate among existing subscribers within the first six months.
Increase overall engagement time by 15%.

**Market Segmentation:** Focus on regions with high streaming adoption rates, such as North America and Europe.

**Positioning:** "Experience storytelling like never before with Netflix's new interactive feature, where you control the narrative."

**Sales and Distribution Strategy:** Utilize the Netflix app and website to promote the feature, with in-app notifications and email campaigns to existing subscribers.

**Marketing and Promotional Activities:**

Launch a social media campaign featuring influencers trying the feature.
Host virtual events with creators discussing the making of interactive content.
**Success Metrics:** Track feature adoption rates, engagement time, and user feedback.

**Launch Timeline:**

1 Month Pre-Launch: Release teaser trailers and start social media buzz.
Launch Week: Activate influencer campaigns and send out email notifications.
Post-Launch: Gather user feedback and iterate on the feature.`,
      },
      {
        name: "Shopify example",
        description: `Shopify: AI-Powered Product Recommendation Engine

**Product/Service Overview:** An AI-powered recommendation engine that helps online store owners provide personalized product suggestions to their customers.

**Target Market Segment:** Small to medium-sized e-commerce businesses looking to enhance customer experience and increase sales.

**Customer Insights:** These businesses seek tools that can improve conversion rates and customer satisfaction. They value easy-to-integrate solutions that require minimal technical expertise.

**Competitive Landscape:** Competitors include other e-commerce platforms like WooCommerce and BigCommerce, which may offer similar features. Shopify's advantage is its robust app ecosystem and user-friendly interface.

**Sales Channels:** Direct sales through Shopify's platform and partnerships with e-commerce consultants.

**Marketing Assets:** Case studies demonstrating increased sales, video tutorials, and testimonials from beta users.

**Objectives:**

Integrate the recommendation engine into 30% of Shopify stores within the first year.
Increase average order value by 10% for users of the feature.

**Market Segmentation:** Prioritize high-growth e-commerce sectors such as fashion, electronics, and home goods.

**Positioning:** "Boost your sales with Shopify's AI-powered recommendations, delivering the right products to the right customers at the right time."

**Sales and Distribution Strategy:** Promote through Shopify's app store, webinars, and partner networks.

**Marketing and Promotional Activities:**

Offer a free trial period for early adopters.
Conduct webinars showcasing success stories and best practices.
Success Metrics: Monitor integration rates, impact on sales metrics, and customer feedback.

**Launch Timeline:**

2 Months Pre-Launch: Begin beta testing with select merchants.
Launch Month: Announce feature availability and start promotional campaigns.
Quarterly Post-Launch: Review performance data and refine the engine.`,
      },
      {
        name: "Spotify example",
        description: `Spotify: Podcast Monetization Platform

**Product/Service Overview:** A new platform that allows podcasters to monetize their content through subscriptions and ad placements.

**Target Market Segment:** Independent podcasters and small podcast networks looking to generate revenue from their content.

**Customer Insights:** Podcasters are seeking reliable monetization options that offer flexibility and control over their content. They value platforms with a large listener base.

**Competitive Landscape:** Competitors include Apple Podcasts and Patreon, which offer monetization options. Spotify's strength is its large user base and existing podcast infrastructure.

**Sales Channels:** Direct outreach to podcasters through Spotify's platform and partnerships with podcast hosting services.

**Marketing Assets:** Success stories from early adopters, tutorials on setting up monetization, and promotional materials for podcasters to share with their audience.

**Objectives:**

Onboard 10,000 podcasters to the monetization platform within the first year.
Increase podcast listenership by 25% through exclusive content.
Market Segmentation: Focus on popular podcast genres such as true crime, comedy, and education.

**Positioning:** "Turn your passion into profit with Spotify's new podcast monetization platform, designed to help you grow and engage your audience."

**Sales and Distribution Strategy:** Leverage Spotify's existing podcast ecosystem and collaborate with podcast networks.

**Marketing and Promotional Activities:**

Host workshops and webinars for podcasters on monetization strategies.
Launch a campaign highlighting successful podcasters using the platform.
Success Metrics: Track the number of podcasters onboarded, revenue generated, and listener growth.

**Launch Timeline:**

3 Months Pre-Launch: Engage with key podcasters for feedback and early access.
Launch Month: Roll out the platform and initiate marketing campaigns.
Monthly Post-Launch: Collect user feedback and optimize the platform.`,
      },
    ],
  },
};
