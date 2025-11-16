import { z } from 'zod';

export const IdParamSchema  = z.object({
    id: z.coerce.number().int().positive('El ID proporcionado debe ser un número entero positivo'),
});

export type IdParam = z.infer<typeof IdParamSchema>;
