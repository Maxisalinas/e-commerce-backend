import { z } from 'zod';
import { PaymentMethod } from '../../../../domain/payment/entity.js';

export const CreatePaymentSchema = z.object({
    orderId: z.string().uuid('El id de la orden debe ser un UUID válido'),
    method: z.enum(PaymentMethod),
    last4: z.string().length(4, 'Los últimos 4 dígitos de la tarjeta deben tener exactamente 4 caracteres'),
});

export type CreatePaymentDTOProps = z.infer<typeof CreatePaymentSchema>;
