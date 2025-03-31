import { env } from "../env-config";
import { Assistant } from "./types";

export const PirateMetricsAssistant: Assistant = {
  id: env.ASSISTANT_ID_PIRATE_METRICS,
  name: "Pirate Metrics",
  slug: "pirate-metrics",
  examples: {
    title: "Pirate Metrics",
    tabs: [
      {
        name: "Overview",
        embeddedId: "JDW0pI2gkS0",
        description: `The AARRR Product Funnel, also known as Pirate Metrics, is a framework created by Dave McClure to optimize customer conversion through five key stages. These stages are:

**Acquisition:** This stage focuses on how potential customers find your business. It's about attracting visitors to your website or app through various channels like social media, SEO, or advertising.

**Activation:** Here, the goal is to engage users and provide them with an "aha" moment where they see the value of your product or service. This often involves getting users to sign up, create an account, or take a specific action that indicates interest.

**Revenue:** This stage is about monetizing user engagement. It involves converting users into paying customers, whether through direct sales, subscriptions, or other revenue models.

**Retention:** Retention focuses on keeping customers coming back. It's about ensuring users continue to engage with your product or service over time, which can involve loyalty programs, personalized communication, or product improvements.

**Referral:** The final stage is about encouraging satisfied customers to refer others to your business. This can be achieved through referral programs, incentives, or simply providing an excellent product or service that people want to share.

Each stage of the AARRR funnel has a Key Metric, a Goal, and Initiatives (or tactics) to help achieve that goal. The framework helps businesses track and optimize the user journey from initial contact to becoming a loyal customer and advocate. `,
      },
      {
        name: "Netflix example",
        description: `**Acquisition**

Key Metric: Number of new website visitors
Goal: Increase new visitors by 20% in the next quarter
Initiative 1: Launch targeted social media ad campaigns
Initiative 2: Partner with influencers to promote new content

**Activation**

Key Metric: Number of free trial sign-ups
Goal: Achieve a 25% conversion rate from visitors to trial sign-ups
Initiative 1: Optimize the sign-up process for ease of use
Initiative 2: Offer personalized content recommendations during the trial

**Revenue**

Key Metric: Number of trial users converting to paid subscriptions
Goal: Increase conversion rate from trial to paid by 15%
Initiative 1: Send targeted email campaigns highlighting exclusive content
Initiative 2: Offer limited-time discounts for first-time subscribers

**Retention**

Key Metric: Monthly active users (MAU)
Goal: Increase MAU by 10% over the next six months
Initiative 1: Introduce new features based on user feedback
Initiative 2: Implement a loyalty program with rewards for continued subscriptions

**Referral**

Key Metric: Number of new users from referrals
Goal: Achieve 1,000 new users from referrals monthly
Initiative 1: Launch a referral program offering discounts for successful referrals
Initiative 2: Encourage sharing through social media integration`,
      },
      {
        name: "Shopify example",
        description: `**Acquisition**

Key Metric: Number of new merchant sign-ups
Goal: Increase sign-ups by 30% in the next quarter
Initiative 1: Host webinars and workshops for potential merchants
Initiative 2: Enhance SEO to attract more organic traffic

**Activation**

Key Metric: Number of merchants completing store setup
Goal: Achieve a 50% completion rate for new store setups
Initiative 1: Provide step-by-step onboarding tutorials
Initiative 2: Offer live chat support during setup

**Revenue**

Key Metric: Average revenue per merchant
Goal: Increase average revenue by 20% over the next year
Initiative 1: Upsell premium features and plugins
Initiative 2: Offer bundled service packages at a discount

**Retention**

Key Metric: Merchant churn rate
Goal: Reduce churn rate by 10% in the next six months
Initiative 1: Implement a feedback loop to address merchant concerns
Initiative 2: Develop a community forum for merchants to share tips and advice

**Referral**

Key Metric: Number of new merchants from referrals
Goal: Gain 500 new merchants from referrals monthly
Initiative 1: Create a referral program with financial incentives
Initiative 2: Highlight success stories of referred merchants`,
      },
      {
        name: "Spotify example",
        description: `**Acquisition**

Key Metric: Number of app downloads
Goal: Increase downloads by 25% in the next quarter
Initiative 1: Collaborate with artists for exclusive content releases
Initiative 2: Run targeted ads on music-related platforms

**Activation**

Key Metric: Number of users creating playlists
Goal: Achieve a 40% playlist creation rate among new users
Initiative 1: Introduce playlist creation tutorials
Initiative 2: Offer personalized playlist suggestions

**Revenue**

Key Metric: Number of premium subscriptions
Goal: Increase premium subscriptions by 15% in the next quarter
Initiative 1: Offer a free trial of premium features
Initiative 2: Highlight ad-free listening benefits in marketing

**Retention**

Key Metric: Monthly active users (MAU)
Goal: Increase MAU by 10% over the next six months
Initiative 1: Regularly update playlists with trending music
Initiative 2: Implement a loyalty program with exclusive content

**Referral**

Key Metric: Number of new users from referrals
Goal: Achieve 2,000 new users from referrals monthly
Initiative 1: Launch a referral program offering free months of premium
Initiative 2: Encourage sharing through social media integration`,
      },
    ],
  },
};
