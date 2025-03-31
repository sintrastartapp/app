import { env } from "../env-config";
import { Assistant } from "./types";

export const CustomerInterviewAssistant: Assistant = {
  id: env.ASSISTANT_ID_CUSTOMER_INTERVIEW,
  name: "Customer Interview",
  slug: "customer-interview",
  examples: {
    title: "Customer Interview",
    tabs: [
      {
        name: "Overview",
        description: `Customer interviews are a qualitative research method used to gather in-depth insights directly from users or potential users. These interviews aim to understand customer needs, preferences, behaviors, and pain points. By engaging in open-ended conversations, businesses can validate assumptions, uncover unmet needs, and gather valuable feedback to inform product development, marketing strategies, and overall business decisions.`,
      },
      {
        name: "Netflix example",
        description: `**Objective**: Understand user preferences for content and improve user experience.

**Interview Scenario:**

**Interviewer**: Thank you for joining us today. We’re eager to learn about your experience with Netflix, especially regarding the types of content you enjoy.

**Interviewee**: Sure, happy to help\!

**Interviewer**: Can you tell us about the last few shows or movies you watched on Netflix and what drew you to them?

**Interviewee**: I recently watched a lot of crime documentaries. I find them intriguing because they’re both educational and entertaining.

**Interviewer**: What features do you use most when browsing for new content?

**Interviewee**: I often use the "Top Picks for You" section and the search function to find specific genres.

**Interviewer**: Is there anything you wish was different or improved in your Netflix experience?

**Interviewee**: Sometimes I wish there were more personalized recommendations based on my recent viewing history.

**Outcome**: Insights could lead to enhanced recommendation algorithms and more personalized content suggestions.`,
      },
      {
        name: "Shopify example",
        description: `**Objective**: Improve the onboarding experience for new store owners and enhance platform features.

**Interview Scenario:**

**Interviewer**: Thanks for taking the time to speak with us. We’d love to hear about your experience setting up your Shopify store.

**Interviewee**: No problem\! I’m excited to share my thoughts.

**Interviewer**: What was the most challenging part of setting up your store?

**Interviewee**: Figuring out the payment gateway options was a bit confusing at first.

**Interviewer**: Which features do you find most helpful for managing your business?

**Interviewee**: The inventory management tools are great. They help me keep track of stock levels easily.

**Interviewer**: How can we improve your experience with Shopify?

**Interviewee**: It would be helpful to have more tutorials or guides for beginners, especially around marketing tools.

**Outcome**: Feedback could inform the development of more beginner-friendly resources and enhanced support for payment setup.`,
      },
      {
        name: "Spotify example",
        description: `**Objective**: Enhance music discovery and playlist creation features.

**Interview Scenario:**

**Interviewer**: We appreciate you joining us today. We’re interested in learning about how you use Spotify, particularly for discovering new music.

**Interviewee**: Happy to be here\! I love discovering new music.

**Interviewer**: What inspires you to create a new playlist?

**Interviewee**: I usually create playlists for different moods or activities, like working out or relaxing.

**Interviewer**: How do you typically discover new music on Spotify?

**Interviewee**: I use the Discover Weekly playlist a lot, and sometimes I explore the curated playlists.

**Interviewer**: Are there any features you’d like to see added or improved?

**Interviewee**: It would be great to have more collaborative playlist options with friends.

**Outcome**: Insights could lead to enhanced collaborative features and improved music discovery tools.`,
      },
    ],
  },
};
