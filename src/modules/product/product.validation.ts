import { z } from 'zod';

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  minPrice: z.coerce.number().min(0).optional(),

  maxPrice: z.coerce.number().min(0).optional(),

  sortBy: z.enum(['name', 'price', 'stock', 'createdAt']).default('createdAt'),

  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ProductQuery = z.infer<typeof productQuerySchema>;
