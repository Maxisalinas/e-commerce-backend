import { z } from 'zod';

export const InitiatePaymentSchema = z.object({
    cardToken: z.string().optional(),
    payerEmail: z.string().email(),
});

export type InitiatePaymentDTOProps = z.infer<typeof InitiatePaymentSchema>;
