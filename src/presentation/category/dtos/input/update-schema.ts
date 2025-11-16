import { z } from 'zod';

export const UpdateCategorySchema = z.object({
    name: z.string().min(5, 'El nombre del producto debe tener al menos 5 caracteres'),
});

export type UpdateCategoryDTOProps = z.infer<typeof UpdateCategorySchema>;
