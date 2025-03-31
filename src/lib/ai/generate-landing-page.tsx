import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { openai } from "./openai";

const LandingPageProps = z.object({
  startupName: z.string(),
  heroTitle: z.string(),
  oneLinerPitch: z.string(),
  keyBenefits1Title: z.string(),
  keyBenefits1Description: z.string(),
  keyBenefits2Title: z.string(),
  keyBenefits2Description: z.string(),
  keyBenefits3Title: z.string(),
  keyBenefits3Description: z.string(),
  feature1Title: z.string(),
  feature1Description: z.string(),
  feature2Title: z.string(),
  feature2Description: z.string(),
  feature3Title: z.string(),
  feature3Description: z.string(),
});

export async function generateLandingPage(description: string) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini-2024-07-18",
    // model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that helps people create landing pages for their startups. You will be given a description of the startup and you will need to create a landing page copy for it. The landing page should be a simple webpage with a hero section, a one-liner pitch, a section for key benefits, and a section for features. The key benefits and features should be displayed in a grid with three columns.

          The "oneLinerPitch" should be a short, catchy phrase that captures the essence of the startup. It should contain around 300 characters.

          The "heroTitle" should be a compelling headline that grabs the attention of the reader and encourages them to learn more about the startup.

          The "keyBenefits1Title", "keyBenefits2Title" and "keyBenefits3Title" should be short, concise titles that summarize the key benefits of the startup. They should be no more than 10 words each.

          The "keyBenefits1Description", "keyBenefits2Description" and "keyBenefits3Description" should be short, clear sentences that describe the key benefits of the startup. They should be around 100 characters each.

          The "feature1Title", "feature2Title" and "feature3Title" should be short, concise titles that summarize the key features of the startup. They should be no more than 10 words each.

          The "feature1Description", "feature2Description" and "feature3Description" should be short, clear sentences that describe the key features of the startup. They should be around 100 characters each.`,
      },
      {
        role: "user",
        content: description,
      },
    ],
    response_format: zodResponseFormat(LandingPageProps, "landingPage"),
  });

  const data = completion.choices[0].message.parsed;

  return data;
}
