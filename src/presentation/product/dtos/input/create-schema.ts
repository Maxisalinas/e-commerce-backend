import { z } from 'zod';

export const CreateProductSchema = z.object({
    categoryId: z.number().int().positive('El ID de la categoría debe ser un número entero positivo'),
    name: z.string().min(5, 'El nombre del producto debe tener al menos 5 caracteres'),
    description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
    price: z.number().min(0.01, 'El precio mínimo que puede asignar es $0.01'),
    stock: z.number().int().nonnegative('El stock no puede ser negativo'),
    imageUrl: z.string().url().max(2048, 'La URL de la imagen es demasiado larga'),
    weight: z.number().min(0, 'El peso no puede ser negativo'),
});

export type CreateProductDTOProps = z.infer<typeof CreateProductSchema>;
