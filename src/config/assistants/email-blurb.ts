import { env } from "../env-config";
import { Assistant } from "./types";

export const EmailBlurbAssistant: Assistant = {
  id: env.ASSISTANT_ID_EMAIL_BLURB,
  name: "Email Blurb",
  slug: "email-blurb",
  examples: {
    title: "Email Blurb",
    tabs: [
      {
        name: "Overview",
        description: `An **email blurb** appears to refer to a pre-written email template or snippet that serves as a starting point for composing emails for various purposes. In the context you've provided, "email blurbs" are examples of messages that a founder might use to:

**Ask for an Introduction:** Reaching out to a mutual contact to request an introduction to someone else.
**Cold Email to Investors:** Introducing yourself and your company to potential investors who you haven't connected with before.
**Cold Email to Founders:** Networking with other founders to share experiences, contacts, or collaborate.
**\- Follow-Up After Intro:** Reconnecting with someone after an initial meeting or introduction to keep the conversation going.

These email blurbs help streamline communication by providing a structured framework that ensures all essential information is included. They typically contain:

**A Clear Purpose:** Stating why you're reaching out.
**Personalization:** Addressing the recipient by name and mentioning any mutual connections or relevant context.
**Company Introduction:** Briefly describing your role and what your company does.
**Value Proposition:** Highlighting key achievements, goals, or reasons why the recipient might be interested.
**Call to Action:** Encouraging the recipient to take the next step, such as scheduling a meeting.
**Professional Tone:** Maintaining a tone that's appropriate for the relationship and context.`,
      },
      {
        name: "Ask for intro",
        description: `Hello Miguel, are you comfortable making an intro to Daniel? I was looking at the startups he invested in and I think he would be a great fit as a partner for Rocket Check Leads.

I leave below a possible intro:

“Hey Ricardo,

I would like to introduce you to João, co-founder of Rocket Check Leads (https://rocketcheckleads.ai), an autonomous AI that helps small businesses gather qualified leads online. João and his co-founders have been bootstrapping the company. They have a product and paying customers and they are now raising 850k in SAFE notes at a 20M cap. I met João while he worked as an EIR and I am excited about what he is building within the autonomous AI industry.

I am sure this email will be the start of an interesting conversation between you two guys\!

I leave you to connect and remain at your full disposal,
Miguel.”`,
      },
      {
        name: "Cold email to investors",
        description: `Hello Ricardo,

I am João, a previous EIR and now co-founder of Rocket Check Lead. Rocket Check Leads is an autonomous AI that helps small businesses gather qualified leads online. The AutoGPT experiment has brought this industry into focus lately. We have been bootstrapping the company. We have a product and paying customers and we are now raising 850k in SAFE notes. I have been seeing that you have been investing in AI lately and I find multiple synergies with startups in your portfolio so I think we might be a fit. Would love to “steal” 15m from you to talk about it. What do you think? If it is easier for you, you can choose the best time for you in my calendly below:

[https://calendly.com/rocketcheckleads/30min](https://calendly.com/rocketcheckleads/30min)`,
      },
      {
        name: "Cold email to founders",
        description: `Hello Founder,

I am João, a previous EIR and now co-founder of Rocket Check Leads (https://rocketcheckleads.ai). Rocket Check Leads is an autonomous AI that helps small businesses gather qualified leads online. The AutoGPT experiment has brought this industry into focus lately. We have been bootstrapping the company. We have a product and paying customers and we are starting to raise now. I have been seeing that you have been actively fundraising so I would love to get in touch with you so we can share experiences and contacts. What do you think? If it is easier for you, you can choose the best time for you in my calendly below:

[https://calendly.com/rocketcheckleads/30min](https://calendly.com/rocketcheckleads/30min)`,
      },
      {
        name: "Follow-up after intro",
        description: `Hello Steve,

I hope you are doing great and excited about the Age of A.I.

It would be a pleasure to meet and pitch you Rocket Check Leads, you can choose the best timing for you in my calendly below:

https://calendly.com/rocketchekleads/30min

I'm sending you an attached deck and also a brief description below:

Update Rocket Check Leads,

**Description**

Rocket Check Leads is an AI-powered assistant that turns simple forms into lead-generation campaigns for small businesses. With Rocket Check Leads, small business owners can have an autonomous worker that brings clients for them so they can go back and focus on offering the best service for their existing clients.

**Key Product Metrics (28/02/2024)**

\- Registered users: \> 1.500
\- AVG Weekly growth of users: 100%
\- Total Revenue: 20.500€
\- Total Revenue Churn: 0
\- Organic Growth: 100%

**Goals for 2025**

\- 200K active users
\- 500K activities completed
\- 70k MRR
\- 15% of total Portuguese customers
\- 8% of total Spanish customers

**Fundraising**

We are raising 850k SAFE notes at 20M cap to execute 24 months to reach 70k MRR. We want to raise a priced pre-seed round of 1M at 6M Pre-money valuation, with the objective of expanding our operations either to Brazil or USA and consolidating our product to attack other verticals. With the co-founders’ initial investment, we have 6 months of runway and we successfully built the MVP and got our first clients.`,
      },
    ],
  },
};
