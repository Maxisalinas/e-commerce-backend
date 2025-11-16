import { z } from 'zod';

export const LoginUserSchema = z.object({
    email: z
        .email('Debe proporcionar un formato de email válido')
        .max(50, 'El email no puede tener más de 50 caracteres.'),
    password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(255, 'La contraseña no puede tener más de 255 caracteres.')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número, y solo puede tener letras y números.'),
});

export type LoginUserDTOProps = z.infer<typeof LoginUserSchema>;
