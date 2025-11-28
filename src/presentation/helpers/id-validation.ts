import { z } from 'zod';

export const IdNumParamSchema  = z.object({
    id: z.coerce.number().int().positive('El ID proporcionado debe ser un número entero positivo'),
});

export type IdParam = z.infer<typeof IdNumParamSchema>;


export const UUIDParamSchema  = z.object({
    id: z.string().uuid('El ID proporcionado debe ser un string formato UUID'),
});

export type UUIDParam = z.infer<typeof UUIDParamSchema>;
