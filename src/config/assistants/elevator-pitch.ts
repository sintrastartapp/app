import { env } from "../env-config";
import { Assistant } from "./types";

export const ElevatorPitchAssistant: Assistant = {
  id: env.ASSISTANT_ID_ELEVATOR_PITCH,
  name: "Elevator Pitch",
  slug: "elevator-pitch",
  examples: {
    title: "Elevator Pitch",
    tabs: [
      {
        name: "Overview",
        description: `An elevator pitch is a brief, persuasive speech that you can use to spark interest in what your organization does. You can also use it to create interest in a project, idea, or product. A good elevator pitch should last no longer than 30 to 60 seconds—the time it takes to ride an elevator from the top to the bottom of a building. The goal is to convey the essence of your idea or business in a way that is engaging and memorable, prompting the listener to want to know more or take action.

Key Components of an Elevator Pitch:

**Problem Statement:** Clearly define the problem or need your product or service addresses.
Solution: Explain how your offering solves the problem.

**Unique Value Proposition:** Highlight what makes your solution unique or better than existing alternatives.

**Target Market:** Identify who your primary customers or users are.

**Call to Action**: Suggest the next steps you want the listener to take.

Tips for Crafting an Effective Elevator Pitch

- Be Concise: Keep your pitch short and to the point.
- Focus on Benefits: Highlight how your product or service improves the customer's situation.
- Use Simple Language: Avoid jargon unless it's appropriate for your audience.
- Engage with a Story: Use a relatable scenario to capture interest.
- Show Enthusiasm: Convey passion and confidence to inspire trust and interest.`,
      },
      {
        name: "Netflix example",
        description: `"Imagine having a world of entertainment at your fingertips, available anytime, anywhere. That's Netflix—a leading streaming service offering a vast library of movies, TV shows, and original content. Unlike traditional cable, Netflix allows you to watch what you want, when you want, without commercials. Our target audience includes anyone with an internet connection who loves quality entertainment. We're constantly expanding our content library and global reach, inviting viewers to join us in redefining how the world watches TV."`,
      },
      {
        name: "Shopify example",
        description: `"Starting an online business shouldn't be complicated. Shopify is a comprehensive e-commerce platform that empowers entrepreneurs to build, manage, and grow their online stores with ease. Unlike other platforms, Shopify offers a user-friendly interface, customizable templates, and a suite of tools to handle everything from payments to shipping. Our primary users are small to medium-sized business owners looking to establish a strong online presence. We're here to support your entrepreneurial journey, making commerce better for everyone."`,
      },
      {
        name: "Spotify example",
        description: `"Music is a universal language, and Spotify is your gateway to a world of sound. As a leading music streaming service, Spotify offers millions of tracks and podcasts, personalized playlists, and seamless listening across devices. Unlike traditional radio, Spotify lets you discover new music tailored to your taste, anytime, anywhere. Our target market includes music lovers of all ages who crave a personalized listening experience. Join us in transforming how people discover and enjoy music, one playlist at a time."`,
      },
    ],
  },
};
