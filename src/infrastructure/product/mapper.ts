import { ProductEntity } from "../../domain/product/entity.js";
import { Currency, Money } from "../../domain/shared/value-objects/money.js";

export class ProductMapper {

    static toDomain(dbProduct: any): ProductEntity {
        return new ProductEntity(
            dbProduct.id,
            dbProduct.categoryId,
            dbProduct.name,
            dbProduct.description,
            Money.of(dbProduct.price, dbProduct.currency as Currency),
            dbProduct.stock,
            dbProduct.imageUrl,
            dbProduct.weight,
            dbProduct.createdAt,
            dbProduct.updatedAt
        );
    }

    static toPersistence(product: ProductEntity) {
        return {
            id: product.id ?? undefined,
            categoryId: product.categoryId,
            name: product.name,
            description: product.description,
            price: product.price.value,
            currency: product.price.currency,
            stock: product.stock,
            imageUrl: product.imageUrl,
            weight: product.weight,
        };
    }


    static toDomainFromList(dbProducts: any[]): ProductEntity[] {
        return dbProducts.map(product => this.toDomain(product));
    }

    static toPersistenceFromList(products: ProductEntity[]) {
        return products.map(product => this.toPersistence(product));
    }

}

