
import { z } from 'zod';

export const TemporaryCartItemSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().min(1), 
});

export type TemporaryCartItemDTOProps = z.infer<typeof TemporaryCartItemSchema>;
