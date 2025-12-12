import { ProductEntity } from "../product/entity.js";

export class CartItemEntity {
    constructor(
        public readonly id: string,
        public readonly cartId: string,
        public readonly productId: number,
        public readonly quantity: number,
        public readonly product: ProductEntity,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    public static fromObject(object: any): CartItemEntity {
        return new CartItemEntity(
            object.id,
            object.cartId,
            object.productId,
            object.quantity,
            ProductEntity.fromObject(object.product),
            object.createdAt,
            object.updatedAt
        );
    }

    public static fromObjectList(objects: any[]): CartItemEntity[] {
        return objects.map(obj => CartItemEntity.fromObject(obj));
    }
}
