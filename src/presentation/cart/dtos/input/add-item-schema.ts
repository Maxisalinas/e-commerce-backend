import { z } from 'zod';

export const AddCartItemSchema = z.object({       
    productId: z.number().int(),        
    quantity: z.number().int().min(1),
});

export type AddCartItemDTOProps = z.infer<typeof AddCartItemSchema>;
