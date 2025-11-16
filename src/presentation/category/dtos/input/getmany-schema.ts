import { z } from 'zod';

export const GetManyCategoriesSchema = z.object({
    search: z.string().optional().default(''),
});

export type GetManyCategoriesDTOProps = z.infer<typeof GetManyCategoriesSchema>;
