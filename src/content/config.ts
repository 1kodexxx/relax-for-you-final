import { defineCollection, z } from "astro:content";

const masters = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    role: z.string(),
    experience: z.string(),
    rating: z.number().min(0).max(5),
    description: z.string(),
    photo: z.string(),
    gallery: z
      .array(z.union([z.string(), z.object({ image: z.string() })]))
      .min(1)
      .optional(),
    tags: z.array(z.string()).optional(),
    isFree: z.boolean().optional(),
    whatsappMessage: z.string().optional(),
    order: z.number().optional(),
  }),
});

const massages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    duration: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    categoryTitle: z.string().optional(),
    categoryNote: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
    highlight: z.boolean().optional(),
  }),
});

const reviews = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    date: z.string(),
    rating: z.number().min(0).max(5),
    source: z.string(),
    text: z.string(),
    photos: z.array(z.union([z.string(), z.object({ image: z.string() })])).optional(),
  }),
});

const gallery = defineCollection({
  type: "content",
  schema: z.object({
    caption: z.string(),
    image: z.string(),
    badge: z.string().optional(),
    description: z.string().optional(),
    alt: z.string().optional(),
    postedAt: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  masters,
  massages,
  reviews,
  gallery,
};
