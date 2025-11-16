import { z } from 'zod';

export const GetManyUsersSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional().default(''),
    role: z.string().optional().default(''),
});

export type GetManyUsersDTOProps = z.infer<typeof GetManyUsersSchema>;
