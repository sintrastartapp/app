/**
Task: Enhance and polish the following product/idea description while maintaining its core message and intent:

[User's input text goes here]

Please:
1. Improve clarity and readability
2. Maintain the original tone and key features
3. Add relevant details where appropriate
4. Organize information logically
5. Ensure professional language and correct grammar
6. Keep the essence of the original description intact

Format the output as:
- An engaging opening paragraph
- Clear description of features/benefits
- Concise closing statement

Additional requirements:
- Maintain similar length to the original text
- Keep industry-specific terminology if present
- Preserve any unique selling points mentioned
 */

import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { openai } from "./openai";

const ImproveDescription = z.object({
  description: z.string(),
});

export async function improveDescription(description: string) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini-2024-07-18",
    // model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that helps people improve their product descriptions. You will be given a description of a product or idea, and you will need to improve it while maintaining its core message and intent. Your goal is to make the description more engaging, clear, and concise while preserving the original meaning. You will need to use clear and professional language, and ensure that the description is grammatically correct. Please provide a clear and concise description of the product or idea, along with any necessary details and unique selling points.

        Please:
        1. Improve clarity and readability
        2. Maintain the original tone and key features
        3. Add relevant details where appropriate
        4. Organize information logically
        5. Ensure professional language and correct grammar
        6. Keep the essence of the original description intact

        Format the output as:
        - An engaging opening paragraph
        - Clear description of features/benefits
        - Concise closing statement

        Additional requirements:
        - Maintain similar length to the original text
        - Keep industry-specific terminology if present
        - Preserve any unique selling points mentioned

        Here is an example of the expected output format:

        '''
        My project is a mobile application that helps users track their daily water intake and reminds them to stay hydrated throughout the day. The app also allows users to set personalized goals and provides tips on how to increase their water consumption. Additionally, it has a feature that tracks the environmental impact of plastic water bottle usage and encourages users to switch to reusable bottles. The ultimate goal of this project is to promote healthy habits and reduce plastic waste.
        '''

        `,
      },
      {
        role: "user",
        content: `Please improve the following product/idea:

        ${description}`,
      },
    ],
    response_format: zodResponseFormat(
      ImproveDescription,
      "improveDescription"
    ),
  });

  const data = completion.choices[0].message.parsed;

  return data;
}
