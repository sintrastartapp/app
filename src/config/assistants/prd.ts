import { env } from "../env-config";
import { Assistant } from "./types";

export const PrdAssistant: Assistant = {
  id: env.ASSISTANT_ID_PRD,
  name: "PRD",
  slug: "prd",
  examples: {
    title: "PRD",
    tabs: [
      {
        name: "Overview",
        description: `A complete Product Requirements Document (PRD) is a comprehensive document that outlines the essential aspects of a product or feature, serving as a guide for the product development team throughout the Discovery and Delivery phases. It typically includes:

**Problem Space:** Clearly defines the problem or opportunity the product aims to address, providing context and justification for its development.

**Solution:** Describes the proposed solution or feature, detailing how it will solve the identified problem or capitalize on the opportunity.

**User Stories:** Provides specific scenarios from the user's perspective, illustrating how they will interact with the product and what they aim to achieve.

**Goals and Metrics:** Outlines the key objectives for the product, including measurable success criteria and potential indicators of failure.

**User Segments:** Identifies the primary user groups for whom the product is being developed.

A complete PRD ensures that all stakeholders have a shared understanding of the product's purpose, scope, and expected outcomes, facilitating effective collaboration and decision-making throughout the product development process.`,
      },
      {
        name: "Netflix example",
        description: `Netflix: Personalized Content Recommendation System

**Problem Space:** Users often feel overwhelmed by the vast amount of content available and struggle to find shows or movies that match their interests, leading to decision fatigue and reduced engagement.

**Solution:** Develop an AI-driven recommendation system that personalizes content suggestions based on user viewing history, preferences, and behavior patterns.

**User Stories:**

As a user, I want to receive personalized movie and show recommendations so that I can easily find content that interests me.
As a user, I want to see a "Because You Watched" section that suggests similar content to what I've previously enjoyed.

**Goals and Metrics:**

Increase user engagement by 15% through personalized recommendations.
Reduce the time users spend searching for content by 20%.

**User Segments:**

Existing subscribers who frequently watch content.
New users exploring the platform for the first time.`,
      },
      {
        name: "Shopify example",
        description: `Shopify: Enhanced Analytics Dashboard

**Problem Space:** Merchants on Shopify lack comprehensive insights into their store performance, making it difficult to make data-driven decisions to optimize sales and marketing strategies.

**Solution:** Create an enhanced analytics dashboard that provides detailed reports on sales trends, customer behavior, and marketing campaign effectiveness.

**User Stories:**

As a merchant, I want to view detailed sales reports so that I can understand my store's performance over time.
As a merchant, I want to track customer behavior to identify popular products and optimize inventory.

**Goals and Metrics:**

Improve merchant satisfaction with analytics tools by 25%.
Increase the number of merchants using analytics features by 30%.

**User Segments:**

Small to medium-sized business owners using Shopify.
Marketing teams looking to optimize their campaigns.`,
      },
      {
        name: "Spotify example",
        description: `Spotify: Collaborative Playlist Feature

**Problem Space:** Users want to share and collaborate on playlists with friends, but current options are limited and not user-friendly, reducing social engagement on the platform.

**Solution:** Introduce a collaborative playlist feature that allows multiple users to add, remove, and reorder songs in a shared playlist seamlessly.

**User Stories:**

As a user, I want to create a playlist with my friends so that we can all contribute our favorite songs.
As a user, I want to see who added each song to the playlist to know my friends' music preferences.

**Goals and Metrics:**

Increase social interactions on the platform by 20%.
Boost the number of collaborative playlists created by 50%.

**User Segments:**

Users who frequently share music with friends.
Groups planning events or parties who want a shared playlist.`,
      },
    ],
  },
};
