import { z } from 'zod';

export const UpdateUserSchema = z.object({

    name: z
        .string()
        .max(30, 'El nombre no puede tener más de 30 caracteres.')
        .optional(),
    password: z // TODO: Implementar DTO especifico para ChangePasswordUseCase
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(255, 'La contraseña no puede tener más de 255 caracteres.')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número, y solo puede tener letras y números.'),
    role: z // TODO: Implementar DTO especifico para ChangeRoleUseCase
        .string()
        .optional(),
});

export type UpdateUserDTOProps = z.infer<typeof UpdateUserSchema>;
