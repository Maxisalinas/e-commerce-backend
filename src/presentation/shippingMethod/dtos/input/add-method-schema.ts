import { z } from 'zod';

export const AddShippingMethodSchema = z.object({
    name: z.string().min(1).max(100),
    code: z.string().min(1).max(50),
    price: z.number().nonnegative(),
    estimatedDays: z.number().int().positive(),
    isActive: z.boolean().default(true),
});

export type AddShippingMethodDTOProps = z.infer<typeof AddShippingMethodSchema>;
