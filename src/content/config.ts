import { defineCollection, z } from 'astro:content';

// Define schemas for content collections
const papersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).optional(),
    coauthors: z.string().optional(),
    abstract: z.string(),
    status: z.string().default('Working Paper'),
    date: z.date().optional(),
    year: z.string(),
    keywords: z.array(z.string()).optional(),
    paperUrl: z.string().optional(),
    slidesUrl: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const teachingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    code: z.string(),
    title: z.string(),
    level: z.enum(['UG', 'PG']).optional(),
    institution: z.string(),
    period: z.string(),
    url: z.string().optional(),
    description: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

// Export the collections
export const collections = {
  'papers': papersCollection,
  'teaching': teachingCollection,
};
