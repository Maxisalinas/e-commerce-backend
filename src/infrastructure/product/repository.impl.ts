import { prisma } from "../database/postgres/prisma-client.js";
import { ProductRepository } from "../../domain/product/repository.js";
import { ProductEntity } from "../../domain/product/entity.js";
import { ProductFilter } from "../../application/product/use-cases/getmany.js";
import { NotFoundError } from "../errors/notFoundError.js";
import { UpdateProductDTO } from "../../presentation/product/dtos/input/update.js";

export class ProductRepositoryImpl implements ProductRepository {
    
    public async getById( id: number ): Promise<ProductEntity> {

        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });
        if (!product) throw new NotFoundError('No se encontró un producto con el número de ID proporcionado.');
        const productEntity: ProductEntity = ProductEntity.fromObject(product);
        return productEntity;
    }

    public async getMany( filter: ProductFilter ): Promise<ProductEntity[]> {

        const products = await prisma.product.findMany({}); // TODO: Falta la paginación.
        if (!products) throw new NotFoundError(`No se encontraron productos.`);
        return ProductEntity.fromObjectList(products);
    }


    public async create( product: ProductEntity ): Promise<ProductEntity> {
        
        const newProduct = await prisma.product.create({
            data: product
        });
        return ProductEntity.fromObject(newProduct);
    }

    public async update(id: number, product: ProductEntity, dto: UpdateProductDTO): Promise<ProductEntity> {
        
        const updatedProduct = await prisma.product.update({
            where: {
                id
            },
            data: {
                ...product,
                ...dto
            }
        });
        return ProductEntity.fromObject(updatedProduct);
    }

    public async delete( id: number ): Promise<void> {
        await this.getById(id);
        await prisma.product.delete({
            where: { id }
        });
        return;
    }
}