import { z, defineCollection } from "astro:content"

export const collections = {
	papers: defineCollection({
		type: "content",
		schema: z.object({
			title: z.string(),
			author: z
				.array(
					z.object({
						name: z.string(),
						url: z.string().url().optional(),
						affiliation: z.string().optional(),
					})
				)
				.optional(),
			links: z.array(
				z.object({
					name: z.string(),
					url: z.string(),
				})
			),
			date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
			categories: z.array(z.string()).optional(),
			status: z.string(),
			// Marks the job market paper. Kept out of `status` so the status can
			// describe the paper's stage only, and so the homepage can find the
			// paper without pattern-matching on display text.
			jobMarketPaper: z.boolean().default(false),
			summary: z.string().optional(),
			// At-a-glance strip on the paper detail page.
			design: z.string().optional(),
			data: z.string().optional(),
			setting: z.string().optional(),
			// Scannable takeaways shown above the abstract.
			findings: z.array(z.string()).optional(),
			// Seminars and conferences where the paper has been presented.
			presentations: z.array(z.string()).optional(),
			draft: z.boolean().default(false),
			order: z.number().default(0),
		}),
	}),
	"open-source": defineCollection({
		type: "data",
		schema: z.object({
			title: z.string(),
			url: z.string().url(),
			description: z.string(),
		}),
	}),
	courses: defineCollection({
		type: "data",
		schema: z.object({
			title: z.string(),
			url: z.string().url(),
			description: z.string(),
		}),
	}),
	blog: defineCollection({
		type: "content",
		schema: z.object({
			title: z.string(),
			description: z.string(),
			author: z.array(
				z.object({
					name: z.string(),
					url: z.string().url(),
				})
			).optional(),
			date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
			categories: z.array(z.string()).optional(),
			draft: z.boolean().default(false),
			// New fields for Substack integration
			substackLink: z.string().url().optional(),
			substackAuthor: z.string().optional(),
			substackPublished: z.boolean().default(true),
		}),
	}),
}