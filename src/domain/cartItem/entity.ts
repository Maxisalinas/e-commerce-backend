import { ProductEntity } from "../product/entity.js";

export class CartItemEntity {
    
    constructor(
        public readonly id: string | null,
        public readonly cartId: string,
        public readonly productId: number,
        public readonly quantity: number,
        public readonly product: ProductEntity,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) { }

    public static create(params: {
        id: string | null;
        cartId: string;
        productId: number;
        quantity: number;
        product: ProductEntity;
    }): CartItemEntity {
        return new CartItemEntity(
            params.id ? params.id : null,
            params.cartId,
            params.productId,
            params.quantity,
            params.product,
        );
    }

}
