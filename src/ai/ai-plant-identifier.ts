'use server';

/**
 * @fileOverview AI Plant Identifier Flow.
 *
 * This flow uses generative AI to identify the plant and its characteristics to influence plant growth effects, blooming variations, leaf shapes, and other particle effects for an enriched and visually diverse garden experience.
 *
 * @function identifyPlant - Identifies plant characteristics using AI.
 * @typedef {IdentifyPlantInput} IdentifyPlantInput - The input type for the identifyPlant function.
 * @typedef {IdentifyPlantOutput} IdentifyPlantOutput - The output type for the identifyPlant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyPlantInputSchema = z.object({
  plantImage: z
    .string()
    .describe(
      'A photo of the plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Ensure correct formatting
    ),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any additional details about the plant.'),
});
export type IdentifyPlantInput = z.infer<typeof IdentifyPlantInputSchema>;

const IdentifyPlantOutputSchema = z.object({
  plantType: z.string().describe('The identified type of plant.'),
  growthEffects: z
    .string()
    .describe('Suggested growth effects for the plant.'),
  bloomingVariations: z
    .string()
    .describe('Suggested blooming variations for the plant.'),
  leafShapes: z.string().describe('Suggested leaf shapes for the plant.'),
  particleEffects: z
    .string()
    .describe('Suggested particle effects for the plant.'),
});
export type IdentifyPlantOutput = z.infer<typeof IdentifyPlantOutputSchema>;

export async function identifyPlant(input: IdentifyPlantInput): Promise<IdentifyPlantOutput> {
  return aiPlantIdentifierFlow(input);
}

const aiPlantIdentifierPrompt = ai.definePrompt({
  name: 'aiPlantIdentifierPrompt',
  input: {schema: IdentifyPlantInputSchema},
  output: {schema: IdentifyPlantOutputSchema},
  prompt: `You are a botanist expert. You are helping a user identify a plant and its characteristics based on an image and additional details.

  Analyze the following information to suggest plant characteristics:

  Image: {{media url=plantImage}}

  Additional Details: {{additionalDetails}}

  Based on the image and details, identify the plant type, growth effects, blooming variations, leaf shapes, and particle effects to create visually diverse garden experience. Consider factors like plant family, native environment, and common growing conditions. Return the data as a well-formatted JSON object.
  `,
});

const aiPlantIdentifierFlow = ai.defineFlow(
  {
    name: 'aiPlantIdentifierFlow',
    inputSchema: IdentifyPlantInputSchema,
    outputSchema: IdentifyPlantOutputSchema,
  },
  async input => {
    const {output} = await aiPlantIdentifierPrompt(input);
    return output!;
  }
);
