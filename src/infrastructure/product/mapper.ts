import { ProductEntity } from "../../domain/product/entity.js";

export class ProductMapper {
    
    static toDomain(dbProduct: any): ProductEntity {
        return new ProductEntity(
            dbProduct.id,
            dbProduct.name,
            dbProduct.description,
            dbProduct.price,
            dbProduct.categoryId,
            dbProduct.stock,
            dbProduct.imageUrl,
            dbProduct.weight,
            dbProduct.createdAt,
            dbProduct.updatedAt
        );
    }
    static toPersistence(product: ProductEntity) {
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId,
            stock: product.stock,
            imageUrl: product.imageUrl,
            weight: product.weight,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }

    static toDomainFromList(dbProducts: any[]): ProductEntity[] {
        return dbProducts.map(product => this.toDomain(product));
    }

    static toPersistenceFromList(products: ProductEntity[]) {
        return products.map(product => this.toPersistence(product));
    }

}

