
import { z } from 'zod';

export const UpdateCartItemSchema = z.object({
    quantity: z.number().min(1), 
});

export type UpdateCartItemDTOProps = z.infer<typeof UpdateCartItemSchema>;
