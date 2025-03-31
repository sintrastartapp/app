import { env } from "../env-config";
import { Assistant } from "./types";

export const OnePagerAssistant: Assistant = {
  id: env.ASSISTANT_ID_ONE_PAGER,
  name: "One Pager",
  slug: "one-pager",
  examples: {
    title: "One Pager",
    tabs: [
      {
        name: "Overview",
        description: `A one-pager is a single-page document that concisely summarizes key information about a business, product, project, or idea. It's designed to provide readers with a quick and clear understanding of the subject without the need for additional materials. One-pagers are commonly used in business, marketing, and project management to communicate essential details efficiently.

**Uses of a One-Pager:**

**Business Overview:** Summarize a company's mission, vision, products or services, target market, and competitive advantages.
**Product or Service Description:** Highlight the features, benefits, and unique selling propositions of a product or service.
**Project Proposal:** Outline the objectives, scope, timeline, budget, and expected outcomes of a project.
**Investor Pitch:** Provide potential investors with key financials, market opportunities, team backgrounds, and funding requirements.
**Marketing Material:** Serve as brochures or flyers for events, campaigns, or promotions.

**Key Components of a One-Pager:**

**Headline or Title:** A compelling statement that grabs attention.
**Introduction:** A brief overview or executive summary.
**Main Content:** Essential details organized into clear sections, often using headings and bullet points for readability.
**Visual Elements:** Graphics, charts, or images that enhance understanding and retention.
**Call to Action:** Information on next steps, contact details, or a specific request from the reader.

**Benefits of a One-Pager:**

**Clarity and Conciseness:** Forces the creator to distill information to its most vital points.
**Ease of Use:** Quick to read and easy to share, making it ideal for busy stakeholders.
**Versatility:** Applicable across various industries and purposes.
**Professionalism:** Demonstrates the ability to communicate effectively and efficiently.

**Tips for Creating an Effective One-Pager:**

**Know Your Audience:** Tailor the content to the interests and needs of your intended readers.
**Focus on Key Messages:** Include only the most important information to avoid overwhelming the reader.
**Use Visuals Wisely:** Incorporate images or charts that support the text and enhance understanding.
**Maintain a Clean Design:** Use whitespace, consistent fonts, and a logical layout to improve readability.
**Proofread:** Ensure the document is free of grammatical errors and typos.

Creating a well-crafted one-pager can significantly aid in communicating your message effectively, whether you're pitching to investors, informing stakeholders, or marketing a new product.`,
      },
    ],
  },
};
