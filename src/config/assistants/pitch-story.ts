import { env } from "../env-config";
import { Assistant } from "./types";

export const PitchStoryAssistant: Assistant = {
  id: env.ASSISTANT_ID_PITCH_STORY,
  name: "Pitch Story",
  slug: "pitch-story",
  examples: {
    title: "Pitch Story",
    tabs: [
      {
        name: "Overview",
        description: `A pitch story is a compelling narrative crafted to present and promote an idea, product, service, or business to an audience, such as potential investors, customers, or partners. Unlike a straightforward pitch that focuses solely on facts and figures, a pitch story weaves these elements into a narrative to engage the audience emotionally and intellectually.

**Purpose of a Pitch Story:**

- Engage the Audience: Stories are inherently more engaging than mere data, making your message more memorable.
- Highlight the Problem and Solution: Clearly illustrate the problem you're addressing and how your offering provides a solution.
- Differentiate Yourself: Showcase what makes your idea or product unique in the marketplace.
- Build Emotional Connection: Create a personal connection that can motivate the audience to support your venture.

**Key Components of a Pitch Story:**

- Introduction (Hook): Start with an attention-grabbing statement or question that relates to the problem.
- The Problem: Describe a relatable issue that your target market faces.
- The Journey: Share insights or experiences that led you to develop your solution.
- The Solution: Introduce your product or service, explaining how it addresses the problem effectively.
- Evidence of Success: Provide data, testimonials, or case studies that demonstrate traction and credibility.
- Vision and Impact: Articulate the broader impact or potential of your idea.
- Call to Action: End with a clear request, such as seeking investment, partnership, or a sale.

**Tips for Crafting an Effective Pitch Story:**

- Know Your Audience: Tailor the story to the interests and values of your listeners.
- Be Concise: Keep the story focused and avoid unnecessary details.
- Use Emotion and Logic: Balance emotional appeal with logical arguments.
- Include Personal Anecdotes: Personal stories can make your pitch more authentic and relatable.
- Practice Delivery: Rehearse to ensure smooth and confident presentation.

**Formats for a Pitch Story:**

- Elevator Pitch: A brief version lasting about 30-60 seconds, suitable for quick introductions.
- Investor Pitch: A detailed presentation often accompanied by a pitch deck during formal meetings.
- Product Demo: Demonstrating the product while telling the story of its development and impact.
- Written Proposal: A document that outlines your story and key information for stakeholders to review.

**Why a Pitch Story Matters:**

- Memorability: Stories are more likely to be remembered than isolated facts.
- Emotional Engagement: A good story can evoke emotions that motivate action.
- Persuasion: Combining narrative with evidence makes your argument more compelling.

**When to Use a Pitch Story:**

- Fundraising: Convincing investors or donors to provide financial support.
- Sales Meetings: Persuading potential clients or customers to purchase your product or service.
- Networking Events: Making a lasting impression on potential partners or collaborators.
- Media Opportunities: Engaging the press or public through storytelling.`,
      },
      {
        name: "Netflix example",
        description: `**Hook:**
Imagine a world where you can watch any movie or TV show you desire, anytime, without the inconvenience of visiting a rental store or the frustration of late fees.

**The Problem:**
"In the late 1990s, movie enthusiasts faced a common dilemma: limited selection at video rental stores, inconvenient trips to pick up and return DVDs, and the dreaded late fees when life got busy. This outdated model hindered the enjoyment of home entertainment."

**The Journey:**
"As avid movie lovers, we experienced these frustrations firsthand. We knew there had to be a better way to bring entertainment into people's homes—conveniently, affordably, and with more choices than ever before."

**The Solution:**
"That's why we founded Netflix—a revolutionary DVD-by-mail service. Subscribers can browse a vast online library, create a personalized list, and have DVDs delivered directly to their doorstep. No due dates, no late fees, and no hassles. Just pure entertainment on your terms."

**Evidence of Success**:
"Since launching, we've attracted over a million subscribers who enjoy unlimited rentals and a growing collection of titles. Our innovative recommendation system enhances user experience by suggesting movies and shows tailored to individual tastes."

**Vision and Impact:**
"But we didn't stop there. We envisioned a future where content could be streamed instantly over the internet, eliminating the need for physical media altogether. Today, we're pioneering streaming technology, offering instant access to thousands of movies and shows on multiple devices."

**Call to Action:**
"We're seeking strategic partners and investors to help us expand our streaming platform globally. Join us in transforming the entertainment industry and bringing unparalleled convenience and choice to viewers everywhere."`,
      },
      {
        name: "Shopify example",
        description: `**Hook:**
What if every entrepreneur could turn their passion into a thriving online business without the barriers of technical complexity or high costs?

**The Problem:**
"Small business owners and artisans have incredible products but often lack the resources or expertise to sell online. Existing e-commerce solutions are either too complicated, too expensive, or not tailored to their needs, preventing them from reaching a global market."

**The Journey:**
"When we tried to sell snowboarding equipment online, we faced these exact challenges. Frustrated by the lack of simple and affordable solutions, we realized that countless entrepreneurs were held back by the same obstacles."

**The Solution:**
"Introducing Shopify—a user-friendly e-commerce platform that empowers anyone to create a beautiful online store with ease. No coding skills required, no exorbitant fees—just a seamless way to bring your products to customers worldwide."

Evidence of Success:
"Over the past few years, more than 500,000 merchants have launched their businesses on Shopify, generating over $40 billion in sales. From local artisans to global brands, we're enabling success stories across industries."

**Vision and Impact:**
"Our mission is to make commerce better for everyone. We believe that by leveling the playing field, we can inspire innovation, support local economies, and redefine retail in the digital age."

**Call to Action:**
"We're looking for partners and investors who share our vision of empowering entrepreneurs. Together, we can expand our platform's capabilities, enter new markets, and fuel the growth of the next generation of businesses."`,
      },
      {
        name: "Spotify example",
        description: `**Hook:**
Imagine having all the music you love—and all the music you’ve yet to discover—available at your fingertips, anytime and anywhere.

**The Problem:**
"Music fans face limited access to diverse music due to high costs, while artists struggle with piracy and declining revenue from traditional sales. The existing models aren't serving the needs of listeners or creators in the digital era."

**The Journey:**
"As passionate music enthusiasts, we were disheartened by the challenges in accessing music legally and conveniently. We saw an opportunity to create a platform that benefits both the listeners craving variety and the artists deserving fair compensation."

**The Solution:**
"That's why we launched Spotify—a digital music streaming service that provides instant access to millions of songs. Users can enjoy music for free with ads or upgrade to a premium experience for uninterrupted listening. Our platform ensures artists are paid for every stream through licensing agreements."

**Evidence of Success:**
"Since our inception, we've garnered over 100 million active users and 50 million paying subscribers worldwide. Our personalized playlists and discovery features have transformed how people engage with music, increasing listening time and user satisfaction."

**Vision and Impact:**
"Our goal is to democratize music by connecting creators with fans, breaking down barriers, and fostering a sustainable ecosystem for the industry. We aim to become the world's go-to platform for all things audio."

**Call to Action:**
"We seek strategic investments and partnerships to enhance our technology, expand our content offerings, and reach new audiences. Join us in redefining the future of music consumption and supporting artists globally."`,
      },
    ],
  },
};
