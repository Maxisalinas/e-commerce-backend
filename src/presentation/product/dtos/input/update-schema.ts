import { z } from 'zod';

export const UpdateProductSchema = z.object({
    categoryId: z.number().int().positive('El ID de la categoría debe ser un número entero positivo').optional(),
    name: z.string().min(5, 'El nombre del producto debe tener al menos 5 caracteres').optional(),
    price: z.number().min(0.01, 'El precio mínimo que puede asignar es $0.01').optional(),
    description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres').optional(),
    stock: z.number().int().nonnegative('El stock no puede ser negativo').optional(),
    imageUrl: z.string().url().max(2048, 'La URL de la imagen es demasiado larga').optional(),
    weight: z.number().min(0, 'El peso no puede ser negativo').optional(),
});

export type UpdateProductDTOProps = z.infer<typeof UpdateProductSchema>;
