import { z } from 'zod';

export const CheckoutSchema = z.object({
  shippingAddress: z.object({
    name: z.string().min(2, 'El nombre del destinatario es obligatorio'),
    street: z.string().min(5, 'La calle es obligatoria'),
    city: z.string().min(2, 'La ciudad es obligatoria'),
    state: z.string().min(2, 'El estado es obligatorio'),
    zip: z.string().min(2, 'El código postal es obligatorio'),
    country: z.string().min(2, 'El país es obligatorio'),
    phone: z.string().optional(),
  }),
  billingAddress: z.object({
    name: z.string().min(2, 'El nombre del titular es obligatorio'),
    street: z.string().min(5, 'La calle es obligatoria'),
    city: z.string().min(2, 'La ciudad es obligatoria'),
    state: z.string().min(2, 'El estado es obligatorio'),
    zip: z.string().min(2, 'El código postal es obligatorio'),
    country: z.string().min(2, 'El país es obligatorio'),
  }),
  notes: z.string().max(500).optional(),
});

export type CheckoutDTOProps = z.infer<typeof CheckoutSchema>;
