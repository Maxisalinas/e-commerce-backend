import { z } from 'zod';

export const GetManyProductsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional().default(''),
    category: z.string().optional().default(''),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
});

export type GetManyProductsDTO = z.infer<typeof GetManyProductsSchema>;
