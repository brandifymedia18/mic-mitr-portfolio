// This is an AI-powered content recommendation flow that selects relevant portfolio items based on user interests or industry trends.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioItemSchema = z.object({
  id: z.string().describe('Unique identifier for the portfolio item.'),
  category: z.string().describe('Category of the portfolio item (e.g., Graphics, Video).'),
  companyName: z.string().describe('Name of the company or brand.'),
  description: z.string().describe('Short description of the work.'),
  previewImage: z.string().optional().describe('URL or data URI for the preview image.'),
  previewVideo: z.string().optional().describe('URL or data URI for the preview video.'),
});

export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;

const ContentRecommendationsInputSchema = z.object({
  userInterests: z.string().describe('A description of the user interests to tailor the recommendations.'),
  industryTrends: z.string().describe('Current industry trends to consider for relevance.'),
  portfolioItems: z.array(PortfolioItemSchema).describe('The list of portfolio items to choose from.'),
  numberOfRecommendations: z.number().describe('The number of portfolio items to recommend.'),
});

export type ContentRecommendationsInput = z.infer<typeof ContentRecommendationsInputSchema>;

const ContentRecommendationsOutputSchema = z.object({
  recommendedItems: z.array(PortfolioItemSchema).describe('The portfolio items recommended for showcasing.'),
});

export type ContentRecommendationsOutput = z.infer<typeof ContentRecommendationsOutputSchema>;

export async function recommendContent(input: ContentRecommendationsInput): Promise<ContentRecommendationsOutput> {
  return recommendContentFlow(input);
}

const recommendContentPrompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: ContentRecommendationsInputSchema},
  output: {schema: ContentRecommendationsOutputSchema},
  prompt: `You are an expert marketing assistant that recommends portfolio items based on user interests and current industry trends.

  User Interests: {{{userInterests}}}
  Industry Trends: {{{industryTrends}}}

  Given the following portfolio items, select the top {{{numberOfRecommendations}}} items most relevant to the user's interests and current industry trends.  Explain why each item was selected.

  Portfolio Items:
  {{#each portfolioItems}}
  - ID: {{this.id}}
    Category: {{this.category}}
    Company: {{this.companyName}}
    Description: {{this.description}}
  {{/each}}

  Output only the portfolio items IDs in a JSON array under the key 'recommendedItems'.  For example:
  {
    "recommendedItems": ["id1", "id2"]
  }
  `,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: ContentRecommendationsInputSchema,
    outputSchema: ContentRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await recommendContentPrompt(input);

    if (!output || !output.recommendedItems) {
      return {
        recommendedItems: [],
      };
    }

    const recommendedItems = input.portfolioItems.filter(item => output.recommendedItems.some((id: any) => id === item.id));

    return {
      recommendedItems: recommendedItems,
    };
  }
);
