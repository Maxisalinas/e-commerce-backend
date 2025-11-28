
import { z } from 'zod';

export const CartItemSchema = z.object({
    cartId: z.string().uuid().optional(),
    productId: z.string().uuid(),
    quantity: z.number().min(1), 
});

export type CartItemDTOProps = z.infer<typeof CartItemSchema>;
