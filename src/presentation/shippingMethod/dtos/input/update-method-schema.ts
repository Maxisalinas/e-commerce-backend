import { z } from 'zod';

export const UpdateShippingMethodSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    code: z.string().min(1).max(50).optional(),
    price: z.number().nonnegative().optional(),
    estimatedDays: z.number().int().positive().optional(),
    isActive: z.boolean().optional(),
});

export type UpdateShippingMethodDTOProps = z.infer<typeof UpdateShippingMethodSchema>;