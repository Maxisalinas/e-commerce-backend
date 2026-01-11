import { z } from 'zod';

export const CalculateShippingCostSchema = z.object({
    items: z.array(
        z.object({
            productId: z.number().min(1),
            quantity: z.number().min(1),
        })
    ),
    destination: {
        country: z.string().min(2).max(100),
        state: z.string().min(2).max(100).optional(),
        city: z.string().min(2).max(100),
        postalCode: z.string().min(2).max(20),
    },
    shippingMethodId: z.string().uuid()
});

export type CalculateShippingCostDTOProps = z.infer<typeof CalculateShippingCostSchema>;
