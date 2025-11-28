import { ProductEntity } from "../product/entity.js";

export class CartItemEntity {
    constructor(
        public readonly id: string,
        public readonly cartId: string,
        public readonly productId: number,
        public readonly quantity: number,
        public readonly product?: ProductEntity,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}

    public static fromObject(object: any): CartItemEntity {
        const { 
            id,
            cartId,
            productId,
            quantity,
            createdAt,
            updatedAt,
            product,
        } = object;

        const productEntity = product ? ProductEntity.fromObject(product) : undefined;


        return new CartItemEntity(
            id,
            cartId,
            productId,
            quantity,
            productEntity,
            createdAt,
            updatedAt
        );
    }

    public static fromObjectList(objects: any[]): CartItemEntity[] {
        return objects.map(obj => CartItemEntity.fromObject(obj));
    }
}
