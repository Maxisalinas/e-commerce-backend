import { prisma } from "../database/postgres/prisma-client.js";
import { ProductRepository } from "../../domain/product/repository.js";
import { ProductEntity } from "../../domain/product/entity.js";
import type { ProductFilter } from "../../application/product/interfaces/filter.js";
import { NotFoundError } from "../errors/notFoundError.js";

export class ProductRepositoryImpl implements ProductRepository {
    
    public async getById( id: number ): Promise<ProductEntity> {

        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });
        if (!product) throw new NotFoundError('No se encontró un producto con el número de ID proporcionado.');
        return ProductEntity.fromObject(product);
    }

    public async getMany( filter: ProductFilter ): Promise<ProductEntity[]> {

        const { page, limit, search, categoryId, minPrice, maxPrice } = filter;

        const products = await prisma.product.findMany({
            where: {
                // Filtro de búsqueda por nombre
                name: {
                    contains: search, 
                    mode: 'insensitive', // Insensible a mayúsculas/minúsculas
                },
                // Filtro por CategoryId (FK)
                categoryId: categoryId,  // Filtra solo si se pasa categoryId
                // Filtro de precio
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
            },
            skip: (page - 1) * limit,  // Paginación
            take: limit,  // Limita la cantidad de resultados
        });

        if (!products) throw new NotFoundError(`No se encontraron productos.`);
        return ProductEntity.fromObjectList(products);
    }


    public async create( product: ProductEntity ): Promise<ProductEntity> {
        const newProduct = await prisma.product.create({
            data: product
        });
        return ProductEntity.fromObject(newProduct);
    }

    public async update(product: ProductEntity): Promise<ProductEntity> {
        
        const updatedProduct = await prisma.product.update({
            where: {
                id: product.id
            },
            data: {
                ...product,
            }
        });
        return ProductEntity.fromObject(updatedProduct);
    }

    public async delete( id: number ): Promise<void> {
        await prisma.product.delete({
            where: { id }
        });
        return;
    }
}


